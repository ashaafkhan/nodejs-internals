import fs from 'fs';

setTimeout(()=>console.log('Hello from timer'),0);
setImmediate(()=> console.log('Hello from immediate'),0);

fs.readFile('sample.txt','utf-8',function(err,data) {
    console.log('File reading complete...');
});

console.log('Hello from top level code...');

/*
Expected output pattern:
- "Hello from top level code..." always prints first.

Common case:
Hello from top level code...
Hello from timer
Hello from immediate
File reading complete...

Possible alternate case:
Hello from top level code...
Hello from immediate
Hello from timer
File reading complete...

Reason:
- Top-level code runs immediately.
- Timer vs immediate order can vary outside I/O.
- fs.readFile callback runs only after file I/O completion, so it is asynchronous and may come later.
*/