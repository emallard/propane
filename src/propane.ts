module propane
{

    export function inject(f):any
    {
        var i:any = {};
        i.__inject = f;
        return i;
    }

    export function injectFunc(f):any
    {
        var i:any = {};
        i.__injectFunc = f;
        return i;
    }

    export class propaneContainer
    {
        showLog= false;

        static typeFunctionToString(typeFunction):string
        {
            var s:string = "" + typeFunction;
            return s.slice(0, s.indexOf('('));
        }

        singleInstances2:any = [];
        findSingleInstance(typeFunction:any)
        {
            var found = undefined;
            this.singleInstances2.forEach(s =>
            {
                if (s[0] === typeFunction)
                {
                    if (this.showLog)
                    {
                        console.log("single instance found : " + propaneContainer.typeFunctionToString(typeFunction));
                    }
                    found = s[1];
                }
            });
            return found;
        }

        insertSingleInstance(typeFunction, instance)
        {
            if (this.showLog)
            {
                console.log("single instance push : " + propaneContainer.typeFunctionToString(typeFunction));
            }
            this.singleInstances2.push([typeFunction, instance]);
        }


        injectFunc(owner:any, propertyName:string, injPlaceHolder:any):void
        {
            var typeFunction = injPlaceHolder.__injectFunc;
            owner[propertyName] = () =>
            {
                return this.create(typeFunction, true);
            }
        }

        inject(owner:any, propertyName:string, injPlaceHolder:any):void
        {
            var propertyTypeFunction = injPlaceHolder.__inject;
            owner[propertyName] = this.create(propertyTypeFunction);
        }

        create(typeFunction:any, forceNew ?:boolean):any
        {
            if (this.showLog)
            {
                var s:string = "" + typeFunction;
                console.log("inject " + s.slice(0, s.indexOf('(')));
            }

            if (typeFunction == undefined)
            {
                console.log("Error inject");
            }


            var o:any;
            if (forceNew == true)
            {
                o = new typeFunction();
            }
            else
            {
                var o = this.findSingleInstance(typeFunction);
                if (o == undefined)
                {
                    o = new typeFunction();
                    this.insertSingleInstance(typeFunction, o);
                }
                else
                {
                    return o;
                }
            }



            for(var propertyName in o)
            {
                if (o.hasOwnProperty(propertyName))
                {
                    var propertyValue:any = o[propertyName];
                    if (propertyValue != undefined)
                    {
                        if(propertyValue.__inject != undefined)
                        {
                            this.inject(o, propertyName, propertyValue);
                        }

                        if (propertyValue != undefined
                            && propertyValue.__injectFunc != undefined)
                        {
                            this.injectFunc(o, propertyName, propertyValue);
                        }
                    }
                }
            }

            if (o.afterInject != undefined)
            {
                o.afterInject();
            }

            return o;
        }

    }

}