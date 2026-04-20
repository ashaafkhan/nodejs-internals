import fs from 'fs';
import crypto from 'crypto';

const start=Date.now();

process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(()=> console.log('Hello from timer'),0);
setImmediate(()=> console.log('Hello from immediate'),0);

fs.readFile('sample.txt','utf-8',function(err,data) {
    console.log('File reading complete...');

    setTimeout(()=> console.log('Time-2'),0);
    setTimeout(()=> console.log('Time-3'),0);
    setImmediate(()=>console.log('Immediate-2'),0); 

    crypto.pbkdf2('password','salt',300000,1024,'sha256',()=>{
        console.log('Password 1 has been hashed',Date.now()-start);
    })

    crypto.pbkdf2('password','salt',300000,1024,'sha256',()=>{
        console.log('Password 2 has been hashed',Date.now()-start);
    })

    crypto.pbkdf2('password','salt',300000,1024,'sha256',()=>{
        console.log('Password 3 has been hashed',Date.now()-start);
    })

    crypto.pbkdf2('password','salt',300000,1024,'sha256',()=>{
        console.log('Password 4 has been hashed',Date.now()-start);
    })

    crypto.pbkdf2('password','salt',300000,1024,'sha256',()=>{
        console.log('Password 5 has been hashed',Date.now()-start);
    })

})


console.log('Hello from top level code');

/*
Expected output pattern:
- "Hello from top level code" always prints first.
- Outer "Hello from timer" and "Hello from immediate" can swap order.
- "File reading complete..." appears after file I/O callback is ready.
- Inside fs.readFile callback, "Immediate-2" usually runs before "Time-2" and "Time-3".
- "Password X has been hashed <ms>" logs appear later and completion order is not guaranteed.

Common shape:
Hello from top level code
Hello from timer / Hello from immediate (order can vary)
File reading complete...
Immediate-2
Time-2
Time-3
Password 1..5 has been hashed <time> (order can vary)

Reason:
- timer vs immediate outside I/O can be nondeterministic.
- setImmediate inside I/O runs in check phase before timers phase.
- pbkdf2 uses libuv thread pool; with size 4 and 5 tasks, one waits in queue.
*/