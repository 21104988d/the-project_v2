const BridgeAutomationService = require('./services/bridgeAutomation');
const TokenAutomationService = require('./services/tokenAutomation');
const fs = require('fs').promises;
const path = require('path');

class AutomationScheduler {
  constructor() {
    this.bridgeService = new BridgeAutomationService();
    this.tokenService = new TokenAutomationService();
    this.configPath = path.join(__dirname, 'config.json');
    this.config = {};
    this.configLoaded = false;
  }

  async loadConfig() {
    try {
      const configContent = await fs.readFile(this.configPath, 'utf8');
      this.config = JSON.parse(configContent);
    } catch (error) {
      // 使用默認配置
      this.config = {
        bridgeAutomation: {
          enabled: true,
          interval: 24 * 60 * 60 * 1000, // 24小時
          maxNewBridges: 5
        },
        tokenAutomation: {
          enabled: true,
          interval: 12 * 60 * 60 * 1000, // 12小時
          maxNewTokens: 10
        },
        notifications: {
          enabled: true,
          webhook: null
        }
      };
      await this.saveConfig();
    }
    this.configLoaded = true;
  }

  async saveConfig() {
    try {
      await fs.writeFile(this.configPath, JSON.stringify(this.config, null, 2));
    } catch (error) {
      console.error('保存配置失敗:', error);
    }
  }

  async runBridgeAutomation() {
    if (!this.config.bridgeAutomation.enabled) {
      console.log('🔒 橋接協議自動化已禁用');
      return;
    }

    console.log('🌉 開始橋接協議自動化...');
    try {
      await this.bridgeService.runAutomation();
      await this.sendNotification('橋接協議自動化完成', '成功檢查並更新橋接協議');
    } catch (error) {
      console.error('橋接協議自動化失敗:', error);
      await this.sendNotification('橋接協議自動化失敗', error.message);
    }
  }

  async runTokenAutomation() {
    if (!this.config.tokenAutomation.enabled) {
      console.log('🔒 代幣自動化已禁用');
      return;
    }

    console.log('💰 開始代幣自動化...');
    try {
      await this.tokenService.runAutomation();
      await this.sendNotification('代幣自動化完成', '成功檢查並更新代幣支援');
    } catch (error) {
      console.error('代幣自動化失敗:', error);
      await this.sendNotification('代幣自動化失敗', error.message);
    }
  }

  async runFullAutomation() {
    console.log('🚀 開始完整自動化流程...');
    
    const startTime = Date.now();
    
    // 並行執行橋接和代幣自動化
    await Promise.all([
      this.runBridgeAutomation(),
      this.runTokenAutomation()
    ]);
    
    const duration = Date.now() - startTime;
    console.log(`✨ 完整自動化流程完成，耗時: ${Math.round(duration / 1000)}秒`);
    
    // 生成綜合報告
    await this.generateSummaryReport();
  }

  async generateSummaryReport() {
    try {
      const reportsDir = path.join(__dirname, 'reports');
      const files = await fs.readdir(reportsDir);
      
      const bridgeReports = files.filter(f => f.startsWith('bridge-automation-'))
        .sort().slice(-5); // 最近5個報告
      const tokenReports = files.filter(f => f.startsWith('token-automation-'))
        .sort().slice(-5); // 最近5個報告

      const summary = {
        timestamp: new Date().toISOString(),
        bridgeReports: bridgeReports.length,
        tokenReports: tokenReports.length,
        lastBridgeReport: bridgeReports.length > 0 ? bridgeReports[bridgeReports.length - 1] : null,
        lastTokenReport: tokenReports.length > 0 ? tokenReports[tokenReports.length - 1] : null
      };

      const summaryPath = path.join(reportsDir, `automation-summary-${Date.now()}.json`);
      await fs.writeFile(summaryPath, JSON.stringify(summary, null, 2));
      
      console.log(`📋 綜合報告已生成: ${summaryPath}`);
    } catch (error) {
      console.error('生成綜合報告失敗:', error);
    }
  }

  async sendNotification(title, message) {
    if (!this.config.notifications.enabled) {
      return;
    }

    console.log(`📢 通知: ${title} - ${message}`);
    
    // 如果配置了webhook，發送通知
    if (this.config.notifications.webhook) {
      try {
        const axios = require('axios');
        await axios.post(this.config.notifications.webhook, {
          title,
          message,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error('發送webhook通知失敗:', error);
      }
    }
  }

  startScheduler() {
    console.log('⏰ 啟動自動化調度器...');
    
    // 確保配置已載入
    if (!this.configLoaded) {
      console.log('⏳ 等待配置載入...');
      setTimeout(() => this.startScheduler(), 1000);
      return;
    }
    
    // 立即執行一次
    this.runFullAutomation();
    
    // 設置橋接協議自動化定時器
    if (this.config.bridgeAutomation.enabled) {
      setInterval(() => {
        this.runBridgeAutomation();
      }, this.config.bridgeAutomation.interval);
      
      console.log(`🌉 橋接協議自動化已設置，間隔: ${this.config.bridgeAutomation.interval / 1000 / 60}分鐘`);
    }

    // 設置代幣自動化定時器
    if (this.config.tokenAutomation.enabled) {
      setInterval(() => {
        this.runTokenAutomation();
      }, this.config.tokenAutomation.interval);
      
      console.log(`💰 代幣自動化已設置，間隔: ${this.config.tokenAutomation.interval / 1000 / 60}分鐘`);
    }

    console.log('✅ 自動化調度器啟動完成');
  }

  async updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    await this.saveConfig();
    console.log('⚙️ 配置已更新');
  }

  getStatus() {
    return {
      bridgeAutomation: {
        enabled: this.config.bridgeAutomation.enabled,
        nextRun: new Date(Date.now() + this.config.bridgeAutomation.interval).toISOString()
      },
      tokenAutomation: {
        enabled: this.config.tokenAutomation.enabled,
        nextRun: new Date(Date.now() + this.config.tokenAutomation.interval).toISOString()
      },
      uptime: process.uptime()
    };
  }
}

// 如果直接執行此文件，啟動調度器
if (require.main === module) {
  const scheduler = new AutomationScheduler();
  
  // 處理優雅關閉
  process.on('SIGINT', () => {
    console.log('\n🛑 收到關閉信號，正在關閉自動化調度器...');
    process.exit(0);
  });
  
  process.on('SIGTERM', () => {
    console.log('\n🛑 收到終止信號，正在關閉自動化調度器...');
    process.exit(0);
  });
  
  scheduler.startScheduler();
}

module.exports = AutomationScheduler;
