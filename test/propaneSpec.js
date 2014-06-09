
describe("my suite", function()
{
    it("should be true", function()
    {
        var injector = new propane.propaneContainer();
        var x = injector.create(propaneTests.testB1);
        var y = injector.create(propaneTests.testB1);

        expect(x.log()).toBe("");
        expect(y.log()).toBe("");
    });
});
