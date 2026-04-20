import fs from 'fs';

setTimeout(()=>console.log('Hello from timer'),0);
setImmediate(()=>console.log('Hello from immediate'),0);

fs.readFile('sample.txt','utf-8',function(err,data){
    console.log('File reading completee...');

    setTimeout(()=>console.log('Time-2'),0);
    setTimeout(()=>console.log('Time-3'),0);
    setImmediate(()=> console.log('Immediate 2'),0);
});

console.log('Hello from top level code');

/*
Expected output pattern:
- "Hello from top level code" always prints first.
- For outer callbacks, either timer or immediate can come first.
- Inside fs.readFile callback, "Immediate 2" usually runs before "Time-2" and "Time-3".

One common output:
Hello from top level code
Hello from timer
Hello from immediate
File reading completee...
Immediate 2
Time-2
Time-3

Reason:
- setTimeout(0) vs setImmediate outside I/O is not strictly guaranteed.
- Inside an I/O callback, setImmediate executes in check phase before next timers phase.
*/
