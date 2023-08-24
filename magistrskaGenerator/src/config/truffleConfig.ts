export const CONFIG_TRUFFLE = [
    {
        'tag': 'configTruffle',
        'value': 'Generate config Truffle',
        'js':
`module.exports = {

    networks: {
     development: {
       host: "127.0.0.1",
       port: 8545,
       network_id: 5777,
       gas: 6721975
     }
   },
 
   mocha: {
     // timeout: 100000
   },
 
   // Configure your compilers
   compilers: {
     solc: {
       version: "0.8.7",    // Fetch exact version from solc-bin (default: truffle's version)
       // docker: true,     // Use "0.5.1" you've installed locally with docker (default: false)
       settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        }
       }
     }
   }
 };
 
`
    }
];