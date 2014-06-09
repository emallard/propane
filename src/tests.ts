/// <reference path="propane.ts" />

module propaneTests
{

    export class testA
    {
        static idCount = 0;
        id:number;

        constructor()
        {
            this.id = testA.idCount++;
        }
    }


    export interface interfaceB
    {
        log():string;
    }

    export class testB1 implements interfaceB
    {
        singleInstanceA:testA = propane.inject(testA);
        newA:testA;

        createa:()=>testA = propane.injectFunc(testA);

        afterInject()
        {
            this.newA = this.createa();
        }

        log():string
        {
            return "singleInstanceA:" + this.singleInstanceA.id + "   newA:" + this.newA.id;
        }

    }
    export class testB2 implements interfaceB
    {
        log():string
        {
            return "testB2";
        }
    }


    export class testClassWithFunc
    {
        createTestA:()=>testA = propane.injectFunc(testA);

        afterInject()
        {
            var x = this.createTestA();
            var y = this.createTestA();

            console.log("x: " + x.id);
            console.log("y: " + y.id);
        }
    }

    export class testWithAfterInject
    {
        afterInject()
        {
            console.log("afterInject");
        }
    }
/*
    export class testSuite
    {

        doTest()
        {
            this.testSingleInstance();
            this.testAfterInject();
            this.testFunc();

        }

        testSingleInstance()
        {
            console.log("testSingleInstance");
            var injector = new propane.propaneContainer();
            var x:testB1 = injector.create(testB1);
            var y:testB1 = injector.create(testB1);

            console.log("x: " + x.log());
            console.log("y: " + y.log());
        }

        testFunc()
        {
            console.log("testFunc");
            var injector = new propane.propaneContainer();
            injector.create(testClassWithFunc);
        }

        testAfterInject()
        {
            console.log("testAfterInject");
            var injector = new propane.propaneContainer();
            injector.create(testWithAfterInject);
        }
    }
    */
}
