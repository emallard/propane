/// <reference path="propane.ts" />
var propaneTests;
(function (propaneTests) {
    var testA = (function () {
        function testA() {
            this.id = testA.idCount++;
        }
        testA.idCount = 0;
        return testA;
    })();
    propaneTests.testA = testA;

    var testB1 = (function () {
        function testB1() {
            this.singleInstanceA = propane.inject(testA);
            this.createa = propane.injectFunc(testA);
        }
        testB1.prototype.afterInject = function () {
            this.newA = this.createa();
        };

        testB1.prototype.log = function () {
            return "singleInstanceA:" + this.singleInstanceA.id + "   newA:" + this.newA.id;
        };
        return testB1;
    })();
    propaneTests.testB1 = testB1;
    var testB2 = (function () {
        function testB2() {
        }
        testB2.prototype.log = function () {
            return "testB2";
        };
        return testB2;
    })();
    propaneTests.testB2 = testB2;

    var testClassWithFunc = (function () {
        function testClassWithFunc() {
            this.createTestA = propane.injectFunc(testA);
        }
        testClassWithFunc.prototype.afterInject = function () {
            var x = this.createTestA();
            var y = this.createTestA();

            console.log("x: " + x.id);
            console.log("y: " + y.id);
        };
        return testClassWithFunc;
    })();
    propaneTests.testClassWithFunc = testClassWithFunc;

    var testWithAfterInject = (function () {
        function testWithAfterInject() {
        }
        testWithAfterInject.prototype.afterInject = function () {
            console.log("afterInject");
        };
        return testWithAfterInject;
    })();
    propaneTests.testWithAfterInject = testWithAfterInject;
})(propaneTests || (propaneTests = {}));
//# sourceMappingURL=tests.js.map
