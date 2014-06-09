Propane
=======

Simple property injection in typescript. The use of this injector came from a project mostly made of viewmodels.
After some tries with constructor injection using string parsing, I finally made this one using properties.

 
# inject

Write your class using the inject keyword

``` javascript
class myService
{
    use():void
    {
    }
}


class serviceUser
{
      service:myService = inject(myService);
}
```

# afterInject


Injection are made after object construction, so instances are not available in constructor.
Instead the container will run the after_inject callback if written.


``` javascript
class serviceUser
{
    service:myService = propane.inject(myService);
      
    after_inject():void
    {
          myService.use();
    }
}
```



# inject_func


All injection are single instances, in order to get several instances, ask for a function injection:

``` javascript

class serviceUser
{
      createService:()=>myService = propane.inject_func(myService);
      service1:myService;
      service2:myService;
      
      after_inject():void
      {
            this.service1 = createService();
            this.service2 = createService();
      }
}

```

# container and application root

``` javascript
class applicationRoot
{
}

var injector = new propane.propaneContainer();
var root = injector.create(applicationRoot);
  
```

# Injection Cycles

Since properties are used, there is no cycle.

# Bugs/Improvements

- No interface support.



This is my first project on github, feel free to give me any advice : deployment / tests / ...