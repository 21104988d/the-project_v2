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

  async syncExistingBridges() {
    console.log('🔄 開始同步現有橋接協議...');
    
    try {
      // 1. 獲取當前DeFiLlama的所有橋接數據
      const currentBridgesData = await this.getAllDeFiLlamaBridges();
      const currentBridges = new Map();
      
      // 建立當前橋接的映射 (name -> bridge data)
      currentBridgesData.forEach(bridge => {
        currentBridges.set(bridge.name.toLowerCase(), bridge);
      });

      // 2. 讀取現有constants.tsx中的橋接
      const constantsContent = await fs.readFile(this.constantsPath, 'utf8');
      const existingBridges = this.extractExistingBridges(constantsContent);
      
      const syncResults = {
        validated: 0,
        removed: 0,
        updated: 0,
        removedBridges: []
      };

      // 3. 驗證每個現有橋接
      for (const existingBridge of existingBridges) {
        const bridgeName = existingBridge.name.toLowerCase();
        const currentBridge = currentBridges.get(bridgeName);

        if (!currentBridge) {
          // 橋接不再存在於DeFiLlama - 移除
          console.log(`❌ 橋接 ${existingBridge.name} 不再存在於DeFiLlama，準備移除`);
          await this.removeBridgeFromConstants(existingBridge);
          syncResults.removed++;
          syncResults.removedBridges.push(existingBridge.name);
        } else if (currentBridge.tvl < 1000000) {
          // TVL低於閾值 - 移除
          console.log(`📉 橋接 ${existingBridge.name} TVL過低 ($${currentBridge.tvl.toLocaleString()})，準備移除`);
          await this.removeBridgeFromConstants(existingBridge);
          syncResults.removed++;
          syncResults.removedBridges.push(existingBridge.name);
        } else {
          // 橋接仍然有效 - 可選擇更新數據
          console.log(`✅ 橋接 ${existingBridge.name} 驗證通過 (TVL: $${currentBridge.tvl.toLocaleString()})`);
          syncResults.validated++;
          
          // 可以在此處添加更新邏輯，如果TVL或其他數據有顯著變化
          if (Math.abs(existingBridge.tvl - currentBridge.tvl) > existingBridge.tvl * 0.5) {
            console.log(`📊 更新 ${existingBridge.name} 的TVL數據`);
            await this.updateBridgeTVL(existingBridge, currentBridge.tvl);
            syncResults.updated++;
          }
        }
      }

      console.log(`🔄 同步完成: 驗證 ${syncResults.validated} 個，移除 ${syncResults.removed} 個，更新 ${syncResults.updated} 個`);
      return syncResults;

    } catch (error) {
      console.error('同步現有橋接協議失敗:', error);
      return { validated: 0, removed: 0, updated: 0, removedBridges: [] };
    }
  }

  async getAllDeFiLlamaBridges() {
    try {
      const response = await axios.get('https://bridges.llama.fi/bridges', {
        timeout: 15000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Bridge-Automation/1.0)'
        }
      });

      return (response.data.bridges || []).map(bridge => ({
        name: bridge.displayName || bridge.name,
        tvl: bridge.tvl || 0,
        volume24h: bridge.volume24h || 0,
        chains: bridge.chains || []
      }));
    } catch (error) {
      console.error('獲取DeFiLlama橋接數據失敗:', error);
      return [];
    }
  }

  extractExistingBridges(constantsContent) {
    const bridges = [];
    const bridgeRegex = /{\s*id:\s*['"`]([^'"`]+)['"`][^}]*name:\s*['"`]([^'"`]+)['"`][^}]*tvl:\s*(\d+)[^}]*}/g;
    
    let match;
    while ((match = bridgeRegex.exec(constantsContent)) !== null) {
      bridges.push({
        id: match[1],
        name: match[2],
        tvl: parseInt(match[3]) || 0
      });
    }
    
    return bridges;
  }

  async removeBridgeFromConstants(bridge) {
    try {
      let content = await fs.readFile(this.constantsPath, 'utf8');
      
      // 創建更精確的匹配模式來移除整個橋接對象
      const bridgePattern = new RegExp(
        `\\s*{[^}]*id:\\s*['"\`]${bridge.id}['"\`][^}]*}[,\\s]*`,
        'g'
      );
      
      content = content.replace(bridgePattern, '');
      
      // 清理可能的多餘逗號
      content = content.replace(/,(\s*),/g, ',');
      content = content.replace(/,(\s*)\]/g, '$1]');
      
      await fs.writeFile(this.constantsPath, content, 'utf8');
      console.log(`🗑️ 已從constants.tsx移除橋接: ${bridge.name}`);
      
      // 同時從已知橋接集合中移除
      this.knownBridges.delete(bridge.name.toLowerCase());
      
    } catch (error) {
      console.error(`移除橋接 ${bridge.name} 失敗:`, error);
      throw error;
    }
  }

  async updateBridgeTVL(bridge, newTVL) {
    try {
      let content = await fs.readFile(this.constantsPath, 'utf8');
      
      // 更新TVL值
      const tvlPattern = new RegExp(
        `(id:\\s*['"\`]${bridge.id}['"\`][^}]*tvl:\\s*)\\d+`,
        'g'
      );
      
      content = content.replace(tvlPattern, `$1${newTVL}`);
      
      await fs.writeFile(this.constantsPath, content, 'utf8');
      console.log(`📊 已更新 ${bridge.name} 的TVL: $${newTVL.toLocaleString()}`);
      
    } catch (error) {
      console.error(`更新橋接 ${bridge.name} TVL失敗:`, error);
    }
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
    console.log('🚀 開始橋接協議自動化...');
    
    try {
      // 1. 同步現有橋接協議 (驗證和清理)
      console.log('🔄 同步現有橋接協議...');
      const syncResults = await this.syncExistingBridges();
      
      // 2. 發現新橋接協議
      console.log('🔍 發現新橋接協議...');
      const newBridges = await this.discoverNewBridges();
      
      if (newBridges.length === 0 && syncResults.removed === 0) {
        console.log('✅ 未發現新的橋接協議，無需移除舊協議');
        await this.generateReport([], 0, syncResults);
        return;
      }

      if (newBridges.length > 0) {
        console.log(`📋 發現 ${newBridges.length} 個新橋接協議:`);
        newBridges.forEach((bridge, index) => {
          console.log(`${index + 1}. ${bridge.name} (TVL: $${bridge.tvl.toLocaleString()})`);
        });
      }

      // 3. 添加新橋接協議
      let addedCount = 0;
      for (const bridge of newBridges) {
        const success = await this.addNewBridge(bridge);
        if (success) addedCount++;
      }

      console.log(`✅ 橋接協議自動化完成，新增 ${addedCount}/${newBridges.length} 個協議，移除 ${syncResults.removed} 個協議`);
      
      // 4. 生成報告
      await this.generateReport(newBridges, addedCount, syncResults);
      
    } catch (error) {
      console.error('❌ 橋接協議自動化失敗:', error);
      throw error;
    }
  }

  async generateReport(discoveredBridges, addedCount, syncResults = null) {
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

    // 添加同步結果到報告
    if (syncResults) {
      report.sync = {
        validated: syncResults.validated,
        removed: syncResults.removed,
        updated: syncResults.updated,
        removedBridges: syncResults.removedBridges
      };
    }

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
