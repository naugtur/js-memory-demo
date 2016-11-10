Legacy demos for node 0.10
==============

Simple tests demonstrating memory impact of certain bits of code

## Install first

    npm install .
    
## Enjoy
Run each in console:


    
- Benchmark test - creates 100000 objects with a property.
    
        node --expose-gc index.js test1
    
- Creates 100000 objects with a property that has weird characters in it. (weird things happen in V8, firefox is ok with that FYI)
    
        node --expose-gc index.js test2
    
- Demonstrates normal garbage collection after a function finishes execution.
    
        node --expose-gc index.js test3
    
- Demonstrates normal garbage collection after assigning null to all references.
    
        node --expose-gc index.js test4
    
- Creates 100000 objects with an ordinary property and then tries to use `delete` to remove the property from the objects. The horror!
    
        node --expose-gc index.js test5
    
- Does the same thing as test5, but the functional scope saves us (all the mutilated objects get garbage-collected with their parent array)

        node --expose-gc index.js test6
    
