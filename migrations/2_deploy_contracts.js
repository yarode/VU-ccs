const CarbonStorage = artifacts.require("CarbonCapture");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(CarbonStorage);
};
