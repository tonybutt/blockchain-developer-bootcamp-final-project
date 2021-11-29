const SecureCode = artifacts.require("SecureCode");
const getRandomInt = () => {
  return Math.floor(Math.random() * 10000);
};

const convertToBN = (num) => {
  return web3.utils.toBN(num);
};

const PIPELINE_STUB = {
  sha: "",
  id: convertToBN(getRandomInt()),
  status: "success",
};
contract("SecureCode", function(accounts) {
  describe("Deployment", async () => {
    let contract;
    beforeEach(async () => {
      contract = await SecureCode.deployed();
    });
    it("deploys", async () => {
      assert.exists(contract);
    });
    it("can retrieve the owner", async () => {
      const owner = await contract.owner();
      assert.equal(owner, accounts[0]);
    });
  });
  describe("Pipelines", async () => {
    let contract;
    beforeEach(async () => {
      contract = await SecureCode.deployed();
    });
    describe("Get", async () => {
      it("can get pipelines", async () => {
        const pipelines = await contract.getPipelines(accounts[0]);
        assert.exists(pipelines);
      });
    });
    describe("Set", async () => {
      let pipelines;
      beforeEach(async () => {
        await contract.setPipeline(
          PIPELINE_STUB.sha,
          PIPELINE_STUB.status,
          PIPELINE_STUB.id
        );
        pipelines = await contract.getPipelines(accounts[0]);
      });
      it("has correct pipeline properties", async () => {
        assert.equal(pipelines[0].commitSha, PIPELINE_STUB.sha);
        assert.equal(pipelines[0].id, PIPELINE_STUB.id);
        assert.equal(pipelines[0].status, PIPELINE_STUB.status);
      });
      it("sets approved to false by default", async () => {
        assert.isFalse(pipelines[0].approved);
      });
      it("adds address to codeOwners", async () => {
        const codeOwners = await contract.getCodeOwnerAccts();
        assert.include(codeOwners, accounts[0]);
      });
    });
  });
});
