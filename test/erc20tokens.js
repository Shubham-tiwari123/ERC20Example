var ERC20Token = artifacts.require("./ERC20Token.sol");

contract("ERC20Token", (accounts) =>{

  let instance = null;

  before( async () => {
    instance = await ERC20Token.new({ from: accounts[0]})
    assert.ok(instance)
  })

  describe("Testing ERC20Token functions", () => {
    it("Get total supply!!", async() => {
      const res = await instance.totalSupply();
      // console.log("Res1:", res.toNumber());
      assert.equal(res.toNumber(), 1000)
    });

    it("Get balance of owner!!", async() => {
      const res = await instance.balanceOf(accounts[0]);
      // console.log("Res2:", res.toNumber());
      assert.equal(res.toNumber(), 1000)
    });

    it("Approve buyer!!", async() => {
      const res = await instance.approveUser(accounts[1], { from: accounts[0]});
      // console.log("Res3:", res);
      assert.equal(res.logs[0].event, "ApprovedMsg")
    });

    it("Get balance of buyer!!", async() => {
      const res = await instance.balanceOf(accounts[1]);
      // console.log("Res4:", res.toNumber());
      assert.equal(res.toNumber(), 0)
    });

    it("Buy token!!", async() => {
      const res = await instance.buyToken({from: accounts[1], value: 10});
      // console.log("Res5:", res);
      assert.equal(res.logs[0].event, "Transfer")
    });

    it("Get balance of buyer after purchase!!", async() => {
      const res = await instance.balanceOf(accounts[1]);
      // console.log("Res6:", res.toNumber());
      assert.equal(res.toNumber(), 10)
    });

    it("Get balance of contract owner after purachase!!", async() => {
      const res = await instance.balanceOf(accounts[0]);
      // console.log("Res7:", res.toNumber());
      assert.equal(res.toNumber(), 990);
    });
  });
  
});