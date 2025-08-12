const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

class BridgeAutomationService {
  constructor() {
    this.constantsPath = path.join(__dirname, '../../constants.tsx');
    this.iconsPath = path.join(__dirname, '../../components/Icons.tsx');
    this.knownBridges = new Set();
    this.initializeKnownBridges();
  }

  async initializeKnownBridges() {
    try {
      const constantsContent = await fs.readFile(this.constantsPath, 'utf8');
      const bridgeMatches = constantsContent.match(/name:\s*['"`]([^'"`]+)['"`]/g);
      if (bridgeMatches) {
        bridgeMatches.forEach(match => {
          const name = match.match(/name:\s*['"`]([^'"`]+)['"`]/)[1];
          this.knownBridges.add(name.toLowerCase());
        });
      }
      console.log(`已初始化 ${this.knownBridges.size} 個已知橋接協議`);
    } catch (error) {
      console.error('初始化已知橋接協議失敗:', error);
    }
  }

  async discoverNewBridges() {
    console.log('🔍 開始搜尋新的橋接協議...');
    
    const bridgeSources = [
      {
        name: 'DeFiLlama Bridges',
        url: 'https://bridges.llama.fi/bridges',
        parser: this.parseDeFiLlamaBridges.bind(this)
      },
      {
        name: 'Ecosystem Scan',
        url: null,
        parser: this.scanEcosystemBridges.bind(this)
      }
    ];

    const newBridges = [];

    for (const source of bridgeSources) {
      try {
        console.log(`📡 從 ${source.name} 獲取數據...`);
        const bridges = await source.parser(source.url);
        
        for (const bridge of bridges) {
          if (!this.knownBridges.has(bridge.name.toLowerCase()) && 
              bridge.tvl > 1000000) { // 只添加TVL > 1M的橋接
            newBridges.push(bridge);
            console.log(`✅ 發現新橋接: ${bridge.name} (TVL: $${bridge.tvl.toLocaleString()})`);
          }
        }
      } catch (error) {
        console.error(`❌ 從 ${source.name} 獲取數據失敗:`, error.message);
      }
    }

    return newBridges;
  }

  async parseDeFiLlamaBridges(url) {
    try {
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Bridge-Automation/1.0)'
        }
      });

      const bridges = response.data.bridges || [];
      return bridges.map(bridge => ({
        name: bridge.displayName || bridge.name,
        icon: bridge.icon || '🌉',
        networks: bridge.chains || [],
        tvl: bridge.tvl || 0,
        volume24h: bridge.volume24h || 0,
        description: `Cross-chain bridge supporting ${(bridge.chains || []).length} networks`,
        website: bridge.url || `https://${bridge.name.toLowerCase().replace(/\s+/g, '')}.com`,
        fees: 'Variable',
        timeEstimate: '1-30 minutes'
      }));
    } catch (error) {
      console.error('解析DeFiLlama橋接數據失敗:', error);
      return [];
    }
  }

  async scanEcosystemBridges() {
    // 手動維護的潛在新橋接列表
    const potentialBridges = [
      {
        name: 'LayerZero',
        icon: '🔗',
        networks: ['Ethereum', 'Arbitrum', 'Optimism', 'Polygon', 'Avalanche', 'BSC'],
        tvl: 50000000,
        volume24h: 5000000,
        description: 'Omnichain interoperability protocol',
        website: 'https://layerzero.network',
        fees: '0.1-0.5%',
        timeEstimate: '1-5 minutes'
      },
      {
        name: 'Wormhole',
        icon: '🌀',
        networks: ['Ethereum', 'Solana', 'Terra', 'BSC', 'Polygon', 'Avalanche'],
        tvl: 80000000,
        volume24h: 8000000,
        description: 'Cross-chain communication protocol',
        website: 'https://wormhole.com',
        fees: '0.05-0.3%',
        timeEstimate: '1-10 minutes'
      },
      {
        name: 'Connext',
        icon: '🔄',
        networks: ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Gnosis', 'Milkomeda'],
        tvl: 25000000,
        volume24h: 2500000,
        description: 'Modular interoperability protocol',
        website: 'https://connext.network',
        fees: '0.05%',
        timeEstimate: '1-3 minutes'
      },
      {
        name: 'Axelar',
        icon: '🛰️',
        networks: ['Ethereum', 'Cosmos', 'Avalanche', 'Polygon', 'Fantom', 'Moonbeam'],
        tvl: 35000000,
        volume24h: 3500000,
        description: 'Secure cross-chain communication',
        website: 'https://axelar.network',
        fees: '0.1-0.2%',
        timeEstimate: '2-15 minutes'
      }
    ];

    return potentialBridges;
  }

  async addNewBridge(bridge) {
    try {
      console.log(`➕ 添加新橋接協議: ${bridge.name}`);

      // 1. 更新 constants.tsx
      await this.updateConstants(bridge);

      // 2. 更新 Icons.tsx
      await this.updateIcons(bridge);

      // 3. 添加到已知橋接集合
      this.knownBridges.add(bridge.name.toLowerCase());

      console.log(`✅ 成功添加橋接協議: ${bridge.name}`);
      return true;
    } catch (error) {
      console.error(`❌ 添加橋接協議失敗 ${bridge.name}:`, error);
      return false;
    }
  }

  async updateConstants(bridge) {
    try {
      let content = await fs.readFile(this.constantsPath, 'utf8');

      // 生成新的橋接配置
      const bridgeConfig = `  {
    id: '${bridge.name.toLowerCase().replace(/\s+/g, '-')}',
    name: '${bridge.name}',
    icon: '${bridge.icon}',
    description: '${bridge.description}',
    networks: [${bridge.networks.map(n => `'${n}'`).join(', ')}],
    fees: '${bridge.fees}',
    timeEstimate: '${bridge.timeEstimate}',
    externalUrl: '${bridge.website}',
    tvl: ${bridge.tvl},
    volume24h: ${bridge.volume24h}
  },`;

      // 在BRIDGES數組的最後一個元素之前插入
      const bridgesArrayMatch = content.match(/(export const BRIDGES[^=]*=\s*\[)([\s\S]*?)(\];)/);
      if (bridgesArrayMatch) {
        const beforeArray = bridgesArrayMatch[1];
        const arrayContent = bridgesArrayMatch[2];
        const afterArray = bridgesArrayMatch[3];

        const newContent = beforeArray + arrayContent + '\n' + bridgeConfig + '\n' + afterArray;
        content = content.replace(bridgesArrayMatch[0], newContent);

        await fs.writeFile(this.constantsPath, content, 'utf8');
        console.log(`📝 已更新 constants.tsx，添加 ${bridge.name}`);
      }
    } catch (error) {
      console.error('更新constants.tsx失敗:', error);
      throw error;
    }
  }

  async updateIcons(bridge) {
    try {
      let content = await fs.readFile(this.iconsPath, 'utf8');

      // 生成圖標組件名稱
      const iconName = bridge.name.replace(/\s+/g, '') + 'Icon';
      
      // 生成新的圖標組件
      const iconComponent = `
export const ${iconName}: React.FC<IconProps> = ({ size = 24 }) => (
  <div 
    className="flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600"
    style={{ width: size, height: size }}
  >
    <span style={{ fontSize: size * 0.6 }}>${bridge.icon}</span>
  </div>
);`;

      // 在文件末尾添加新圖標
      content += iconComponent;

      await fs.writeFile(this.iconsPath, content, 'utf8');
      console.log(`🎨 已更新 Icons.tsx，添加 ${iconName}`);
    } catch (error) {
      console.error('更新Icons.tsx失敗:', error);
      throw error;
    }
  }

  async runAutomation() {
    console.log('🚀 開始橋接協議自動化服務...');
    
    try {
      const newBridges = await this.discoverNewBridges();
      
      if (newBridges.length === 0) {
        console.log('📋 沒有發現新的橋接協議');
        return;
      }

      console.log(`🎯 發現 ${newBridges.length} 個新橋接協議`);

      let addedCount = 0;
      for (const bridge of newBridges) {
        const success = await this.addNewBridge(bridge);
        if (success) {
          addedCount++;
        }
        
        // 添加延遲避免過於頻繁的操作
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      console.log(`✨ 自動化完成！成功添加 ${addedCount} 個新橋接協議`);
      
      // 生成報告
      await this.generateReport(newBridges, addedCount);

    } catch (error) {
      console.error('🚨 橋接協議自動化服務執行失敗:', error);
    }
  }

  async generateReport(discoveredBridges, addedCount) {
    const report = {
      timestamp: new Date().toISOString(),
      discovered: discoveredBridges.length,
      added: addedCount,
      bridges: discoveredBridges.map(b => ({
        name: b.name,
        tvl: b.tvl,
        networks: b.networks.length
      }))
    };

    const reportPath = path.join(__dirname, '../reports', `bridge-automation-${Date.now()}.json`);
    
    try {
      await fs.mkdir(path.dirname(reportPath), { recursive: true });
      await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
      console.log(`📊 報告已生成: ${reportPath}`);
    } catch (error) {
      console.error('生成報告失敗:', error);
    }
  }
}

module.exports = BridgeAutomationService;
