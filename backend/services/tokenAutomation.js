const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

class TokenAutomationService {
  constructor() {
    this.constantsPath = path.join(__dirname, '../../constants.tsx');
    this.knownTokens = new Set();
    this.initializeKnownTokens();
  }

  async initializeKnownTokens() {
    try {
      const constantsContent = await fs.readFile(this.constantsPath, 'utf8');
      const tokenMatches = constantsContent.match(/symbol:\s*['"`]([^'"`]+)['"`]/g);
      if (tokenMatches) {
        tokenMatches.forEach(match => {
          const symbol = match.match(/symbol:\s*['"`]([^'"`]+)['"`]/)[1];
          this.knownTokens.add(symbol.toLowerCase());
        });
      }
      console.log(`已初始化 ${this.knownTokens.size} 個已知代幣`);
    } catch (error) {
      console.error('初始化已知代幣失敗:', error);
    }
  }

  async discoverNewTokens() {
    console.log('🔍 開始搜尋新的代幣...');
    
    const tokenSources = [
      {
        name: 'CoinGecko Top Tokens',
        url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1',
        parser: this.parseCoinGeckoTokens.bind(this)
      },
      {
        name: 'DeFi Pulse Tokens',
        url: null,
        parser: this.scanDeFiTokens.bind(this)
      },
      {
        name: 'Multi-Chain Tokens',
        url: null,
        parser: this.scanMultiChainTokens.bind(this)
      }
    ];

    const newTokens = [];

    for (const source of tokenSources) {
      try {
        console.log(`📡 從 ${source.name} 獲取數據...`);
        const tokens = await source.parser(source.url);
        
        for (const token of tokens) {
          if (!this.knownTokens.has(token.symbol.toLowerCase()) && 
              token.marketCap > 100000000) { // 只添加市值 > 100M 的代幣
            newTokens.push(token);
            console.log(`✅ 發現新代幣: ${token.symbol} (市值: $${token.marketCap.toLocaleString()})`);
          }
        }
      } catch (error) {
        console.error(`❌ 從 ${source.name} 獲取數據失敗:`, error.message);
      }
    }

    return newTokens;
  }

  async parseCoinGeckoTokens(url) {
    try {
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Token-Automation/1.0)'
        }
      });

      const tokens = response.data || [];
      return tokens.map(token => ({
        symbol: token.symbol.toUpperCase(),
        name: token.name,
        address: token.contract_address || '0x' + '0'.repeat(40),
        decimals: 18,
        network: 'Ethereum',
        icon: token.image || '💰',
        marketCap: token.market_cap || 0,
        category: this.categorizeToken(token.name, token.symbol),
        coingeckoId: token.id
      }));
    } catch (error) {
      console.error('解析CoinGecko代幣數據失敗:', error);
      return [];
    }
  }

  async scanDeFiTokens() {
    // 重要的DeFi代幣
    const defiTokens = [
      {
        symbol: 'AAVE',
        name: 'Aave',
        address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
        decimals: 18,
        network: 'Ethereum',
        icon: '👻',
        marketCap: 1500000000,
        category: 'defi'
      },
      {
        symbol: 'COMP',
        name: 'Compound',
        address: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
        decimals: 18,
        network: 'Ethereum',
        icon: '🏛️',
        marketCap: 800000000,
        category: 'defi'
      },
      {
        symbol: 'MKR',
        name: 'Maker',
        address: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
        decimals: 18,
        network: 'Ethereum',
        icon: '🏗️',
        marketCap: 1200000000,
        category: 'defi'
      },
      {
        symbol: 'SNX',
        name: 'Synthetix',
        address: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
        decimals: 18,
        network: 'Ethereum',
        icon: '⚡',
        marketCap: 600000000,
        category: 'defi'
      },
      {
        symbol: 'YFI',
        name: 'yearn.finance',
        address: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
        decimals: 18,
        network: 'Ethereum',
        icon: '🌾',
        marketCap: 400000000,
        category: 'defi'
      }
    ];

    return defiTokens;
  }

  async scanMultiChainTokens() {
    // 多鏈重要代幣
    const multiChainTokens = [
      // Layer 2 代幣
      {
        symbol: 'ARB',
        name: 'Arbitrum',
        address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
        decimals: 18,
        network: 'Arbitrum',
        icon: '🔵',
        marketCap: 2000000000,
        category: 'layer2'
      },
      {
        symbol: 'OP',
        name: 'Optimism',
        address: '0x4200000000000000000000000000000000000042',
        decimals: 18,
        network: 'Optimism',
        icon: '🔴',
        marketCap: 1800000000,
        category: 'layer2'
      },
      // BSC 代幣
      {
        symbol: 'CAKE',
        name: 'PancakeSwap',
        address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
        decimals: 18,
        network: 'BSC',
        icon: '🥞',
        marketCap: 500000000,
        category: 'dex'
      },
      // Polygon 代幣
      {
        symbol: 'QUICK',
        name: 'QuickSwap',
        address: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
        decimals: 18,
        network: 'Polygon',
        icon: '⚡',
        marketCap: 150000000,
        category: 'dex'
      },
      // Avalanche 代幣
      {
        symbol: 'JOE',
        name: 'Trader Joe',
        address: '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd',
        decimals: 18,
        network: 'Avalanche',
        icon: '☕',
        marketCap: 200000000,
        category: 'dex'
      },
      // Solana 代幣
      {
        symbol: 'RAY',
        name: 'Raydium',
        address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
        decimals: 6,
        network: 'Solana',
        icon: '🌞',
        marketCap: 300000000,
        category: 'dex'
      }
    ];

    return multiChainTokens;
  }

  categorizeToken(name, symbol) {
    const defiKeywords = ['aave', 'compound', 'uniswap', 'sushiswap', 'maker', 'curve'];
    const layer2Keywords = ['arbitrum', 'optimism', 'polygon', 'matic'];
    const dexKeywords = ['swap', 'dex', 'exchange', 'pancake', 'trader', 'quick'];
    
    const lowerName = name.toLowerCase();
    const lowerSymbol = symbol.toLowerCase();
    
    if (defiKeywords.some(keyword => lowerName.includes(keyword) || lowerSymbol.includes(keyword))) {
      return 'defi';
    }
    if (layer2Keywords.some(keyword => lowerName.includes(keyword) || lowerSymbol.includes(keyword))) {
      return 'layer2';
    }
    if (dexKeywords.some(keyword => lowerName.includes(keyword) || lowerSymbol.includes(keyword))) {
      return 'dex';
    }
    
    return 'major';
  }

  async addNewToken(token) {
    try {
      console.log(`➕ 添加新代幣: ${token.symbol} (${token.name})`);

      // 1. 更新 constants.tsx
      await this.updateConstants(token);

      // 2. 添加到已知代幣集合
      this.knownTokens.add(token.symbol.toLowerCase());

      console.log(`✅ 成功添加代幣: ${token.symbol}`);
      return true;
    } catch (error) {
      console.error(`❌ 添加代幣失敗 ${token.symbol}:`, error);
      return false;
    }
  }

  async updateConstants(token) {
    try {
      let content = await fs.readFile(this.constantsPath, 'utf8');

      // Map network names to chain indices based on the CHAINS array order
      const chainMapping = {
        'ethereum': 0,
        'arbitrum': 1, 
        'polygon': 2,
        'optimism': 3,
        'bsc': 4,
        'avalanche': 5,
        'solana': 6,
        'tron': 7,
        'sui': 8,
        'near': 9,
        'cronos': 10,
        'base': 11,
        'gnosis': 12,
        'fantom': 13,
        'polygon-zkevm': 14,
        'zksync': 15,
        'linea': 16
      };

      const networkKey = token.network.toLowerCase().replace(/\s+/g, '-');
      const chainIndex = chainMapping[networkKey] || 0; // Default to Ethereum

      // Use a generic token icon that should exist (like UsdtIcon)
      const iconComponent = token.symbol === 'USDT' ? 'UsdtIcon' : 
                           token.symbol === 'USDC' ? 'UsdcIcon' :
                           token.symbol === 'ETH' ? 'EthIcon' :
                           token.symbol === 'BTC' || token.symbol === 'WBTC' ? 'WbtcIcon' :
                           'UsdtIcon'; // Default fallback

      // Generate new token configuration in the correct format
      const tokenConfig = `  {
    id: '${token.symbol.toLowerCase()}-${networkKey}',
    symbol: '${token.symbol}',
    name: '${token.name}',
    chain: CHAINS[${chainIndex}],
    icon: <${iconComponent} />,
    decimals: ${token.decimals},
    contractAddress: '${token.address}',
  },`;

      // Find the end of the TOKENS array and insert before the closing bracket
      const tokensArrayEndMatch = content.match(/(],)\s*(\];)$/m);
      if (tokensArrayEndMatch) {
        // Insert the new token before the closing of the TOKENS array
        const newContent = content.replace(/(\],)\s*(\];)$/m, tokenConfig + '\n$1\n$2');
        
        await fs.writeFile(this.constantsPath, newContent, 'utf8');
        console.log(`📝 已更新 constants.tsx，添加 ${token.symbol}`);
      } else {
        console.warn(`⚠️ 無法找到 TOKENS 數組結尾，跳過添加 ${token.symbol}`);
        console.log('Current content preview:', content.slice(-500)); // Debug info
      }
    } catch (error) {
      console.error('更新constants.tsx失敗:', error);
      throw error;
    }
  }

  async runAutomation() {
    console.log('🚀 開始代幣自動化服務...');
    
    try {
      const newTokens = await this.discoverNewTokens();
      
      if (newTokens.length === 0) {
        console.log('📋 沒有發現新的代幣');
        return;
      }

      console.log(`🎯 發現 ${newTokens.length} 個新代幣`);

      let addedCount = 0;
      for (const token of newTokens) {
        const success = await this.addNewToken(token);
        if (success) {
          addedCount++;
        }
        
        // 添加延遲避免過於頻繁的操作
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      console.log(`✨ 自動化完成！成功添加 ${addedCount} 個新代幣`);
      
      // 生成報告
      await this.generateReport(newTokens, addedCount);

    } catch (error) {
      console.error('🚨 代幣自動化服務執行失敗:', error);
    }
  }

  async generateReport(discoveredTokens, addedCount) {
    const report = {
      timestamp: new Date().toISOString(),
      discovered: discoveredTokens.length,
      added: addedCount,
      tokens: discoveredTokens.map(t => ({
        symbol: t.symbol,
        name: t.name,
        network: t.network,
        marketCap: t.marketCap,
        category: t.category
      }))
    };

    const reportPath = path.join(__dirname, '../reports', `token-automation-${Date.now()}.json`);
    
    try {
      await fs.mkdir(path.dirname(reportPath), { recursive: true });
      await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
      console.log(`📊 報告已生成: ${reportPath}`);
    } catch (error) {
      console.error('生成報告失敗:', error);
    }
  }
}

module.exports = TokenAutomationService;
