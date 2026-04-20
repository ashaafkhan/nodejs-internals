import fs from 'fs';

setTimeout(()=>console.log('Hello from Timer'),0);
setImmediate(()=>console.log('Hello from immediate'),0);
console.log('Hello from top level code');

/*
Expected output (top-level always first):
Case 1:
Hello from top level code
Hello from Timer
Hello from immediate

Case 2:
Hello from top level code
Hello from immediate
Hello from Timer

Reason:
- Outside an I/O callback, setTimeout(..., 0) and setImmediate ordering is not guaranteed.
- Their execution depends on event-loop timing at runtime.
*/