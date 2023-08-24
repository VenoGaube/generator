export const JS_MIGRATIONS = [
    {
        'tag': 'initialMigration',
        'value': 'Generate initial migrations',
        'js':
`const Migrations = artifacts.require("Migrations");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
`
    },
    {
        'tag': 'tokenMigration',
        'value': 'Generate token migrations',
        'js':
`const Marketplace = artifacts.require("../contracts/Marketplace");
const MarketplaceToken = artifacts.require("../contracts/MarketplaceToken");

module.exports = async function (deployer) {
  await deployer.deploy(MarketplaceToken);

  const token = await MarketplaceToken.deployed();

  await deployer.deploy(Marketplace, token.address);

  const market = await Marketplace.deployed();

  await token.setMarketplace(market.address);
};
`
    }
];