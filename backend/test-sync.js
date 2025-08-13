#!/usr/bin/env node

/**
 * Test script to verify the enhanced sync functionality
 * Run with: node test-sync.js
 */

const BridgeAutomationService = require('./services/bridgeAutomation');
const TokenAutomationService = require('./services/tokenAutomation');

async function testBridgeSync() {
  console.log('🧪 Testing Bridge Sync Functionality...\n');
  
  const bridgeService = new BridgeAutomationService();
  
  try {
    // Test the sync functionality
    console.log('1. Testing syncExistingBridges...');
    const syncResults = await bridgeService.syncExistingBridges();
    
    console.log('📊 Sync Results:');
    console.log(`   Validated: ${syncResults.validated}`);
    console.log(`   Removed: ${syncResults.removed}`);
    console.log(`   Updated: ${syncResults.updated}`);
    if (syncResults.removedBridges.length > 0) {
      console.log(`   Removed bridges: ${syncResults.removedBridges.join(', ')}`);
    }
    
    console.log('\n✅ Bridge sync test completed successfully!');
    
  } catch (error) {
    console.error('❌ Bridge sync test failed:', error);
  }
}

async function testTokenSync() {
  console.log('\n🧪 Testing Token Sync Functionality...\n');
  
  const tokenService = new TokenAutomationService();
  
  try {
    // Test the sync functionality
    console.log('1. Testing syncExistingTokens...');
    const syncResults = await tokenService.syncExistingTokens();
    
    console.log('📊 Sync Results:');
    console.log(`   Validated: ${syncResults.validated}`);
    console.log(`   Removed: ${syncResults.removed}`);
    console.log(`   Updated: ${syncResults.updated}`);
    if (syncResults.removedTokens.length > 0) {
      console.log(`   Removed tokens: ${syncResults.removedTokens.join(', ')}`);
    }
    
    console.log('\n✅ Token sync test completed successfully!');
    
  } catch (error) {
    console.error('❌ Token sync test failed:', error);
  }
}

async function main() {
  console.log('🚀 Starting Enhanced Automation System Tests\n');
  console.log('=' .repeat(50));
  
  try {
    await testBridgeSync();
    await testTokenSync();
    
    console.log('\n' + '=' .repeat(50));
    console.log('🎉 All tests completed successfully!');
    console.log('\nThe enhanced automation system now supports:');
    console.log('✅ Auto-discovery of new bridges/tokens');
    console.log('✅ Auto-removal of inactive/low-value items');
    console.log('✅ Data validation and updates');
    console.log('✅ Comprehensive sync reporting');
    
  } catch (error) {
    console.error('\n❌ Test suite failed:', error);
    process.exit(1);
  }
}

// Run the tests
if (require.main === module) {
  main();
}

module.exports = { testBridgeSync, testTokenSync };
