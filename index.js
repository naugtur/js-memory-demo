(function () {

    var ProfyMem = require('profy/mem');
    var mem = new ProfyMem();
    var testname = process.argv[2];

    function zlog(m) {
        console.log("");
        console.log("\t" + m.tags.join("\t"));
        console.log("\t" + m.heaps.map(function (h) {
            return ((h / 1024) / 1024).toFixed(2) + 'M';
        }).join("\t"));
        console.log("");
    }
    console.log('- - - - - - - - - - - - - - - - - - - - - - - -');




    //clean heap
    global.gc();

    //magic starts here
    mem.start();

    //functional scope cleans itself
    // (function () {
    mem.log('before');

    var arr = [],
        tmpObj;

    switch (testname) {
    case "test1":
        console.log('plain key name ["foooof"]');
        for (var i = 0; i < 100000; i++) {
            tmpObj = {};
            tmpObj['foooof'] = 2;
            arr.push(tmpObj);
        }
        tmpObj = null;
        break;

    case "test2":
        console.log('weird key name ["fo-.of"]');
        for (var i = 0; i < 100000; i++) {
            tmpObj = {};
            tmpObj['fo-.of'] = 2;
            arr.push(tmpObj);
        }
        tmpObj = null;
        break;

    case "test3":
        console.log('functional scope');
        (function () {
            var arr = []; //declared in scope
            for (var i = 0; i < 100000; i++) {
                tmpObj = {};
                tmpObj['foooof'] = 2;
                arr.push(tmpObj);
            }
            tmpObj = null;
            mem.log('scope');
        })();
        break;


    case "test4":
        console.log('=null on plain key name');
        for (var i = 0; i < 100000; i++) {
            tmpObj = {};
            tmpObj['foooof'] = 2;
            arr.push(tmpObj);
        }
        arr = null;
        tmpObj = null;
        break;

    case "test5":
        console.log('delete on plain key name');
        for (var i = 0; i < 100000; i++) {
            tmpObj = {};
            tmpObj['foooof'] = 2;
            arr.push(tmpObj);
            delete(tmpObj['foooof']);
        }
        tmpObj = null;
        break;
    case "test6":
        console.log('delete in functional scope (the array gets collected)');
        (function () {
            var arr = []; //declared in scope
            for (var i = 0; i < 100000; i++) {
                tmpObj = {};
                tmpObj['foooof'] = 2;
                arr.push(tmpObj);
                delete(tmpObj['foooof']);
            }
            tmpObj = null;
            mem.log('scope');
        })();
        break;


    }


    mem.log('after');


    //clean heap
    global.gc();

    mem.log('GC run');

    zlog(mem.stop());

    setTimeout(console.log, 5000);
})();