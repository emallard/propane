var propane;
(function (propane) {
    function inject(f) {
        var i = {};
        i.__inject = f;
        return i;
    }
    propane.inject = inject;

    function injectFunc(f) {
        var i = {};
        i.__injectFunc = f;
        return i;
    }
    propane.injectFunc = injectFunc;

    var propaneContainer = (function () {
        function propaneContainer() {
            this.showLog = false;
            this.singleInstances2 = [];
        }
        propaneContainer.typeFunctionToString = function (typeFunction) {
            var s = "" + typeFunction;
            return s.slice(0, s.indexOf('('));
        };

        propaneContainer.prototype.findSingleInstance = function (typeFunction) {
            var _this = this;
            var found = undefined;
            this.singleInstances2.forEach(function (s) {
                if (s[0] === typeFunction) {
                    if (_this.showLog) {
                        console.log("single instance found : " + propaneContainer.typeFunctionToString(typeFunction));
                    }
                    found = s[1];
                }
            });
            return found;
        };

        propaneContainer.prototype.insertSingleInstance = function (typeFunction, instance) {
            if (this.showLog) {
                console.log("single instance push : " + propaneContainer.typeFunctionToString(typeFunction));
            }
            this.singleInstances2.push([typeFunction, instance]);
        };

        propaneContainer.prototype.injectFunc = function (owner, propertyName, injPlaceHolder) {
            var _this = this;
            var typeFunction = injPlaceHolder.__injectFunc;
            owner[propertyName] = function () {
                return _this.create(typeFunction, true);
            };
        };

        propaneContainer.prototype.inject = function (owner, propertyName, injPlaceHolder) {
            var propertyTypeFunction = injPlaceHolder.__inject;
            owner[propertyName] = this.create(propertyTypeFunction);
        };

        propaneContainer.prototype.create = function (typeFunction, forceNew) {
            if (this.showLog) {
                var s = "" + typeFunction;
                console.log("inject " + s.slice(0, s.indexOf('(')));
            }

            if (typeFunction == undefined) {
                console.log("Error inject");
            }

            var o;
            if (forceNew == true) {
                o = new typeFunction();
            } else {
                var o = this.findSingleInstance(typeFunction);
                if (o == undefined) {
                    o = new typeFunction();
                    this.insertSingleInstance(typeFunction, o);
                } else {
                    return o;
                }
            }

            for (var propertyName in o) {
                if (o.hasOwnProperty(propertyName)) {
                    var propertyValue = o[propertyName];
                    if (propertyValue != undefined) {
                        if (propertyValue.__inject != undefined) {
                            this.inject(o, propertyName, propertyValue);
                        }

                        if (propertyValue != undefined && propertyValue.__injectFunc != undefined) {
                            this.injectFunc(o, propertyName, propertyValue);
                        }
                    }
                }
            }

            if (o.afterInject != undefined) {
                o.afterInject();
            }

            return o;
        };
        return propaneContainer;
    })();
    propane.propaneContainer = propaneContainer;
})(propane || (propane = {}));
//# sourceMappingURL=propane.js.map
