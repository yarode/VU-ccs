const CarbonStorage = artifacts.require("CarbonStorage");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(CarbonStorage);
};
