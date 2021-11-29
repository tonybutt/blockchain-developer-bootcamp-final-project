var SecureCode = artifacts.require("./SecureCode.sol");

module.exports = function (deployer) {
  deployer.deploy(SecureCode);
};
