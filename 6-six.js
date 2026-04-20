import fs from 'fs';

setTimeout(()=> console.log('Hello from Timer'),0);
setImmediate(()=> console.log('Hello from Immediate'),0);

// console.log('Hello from Top Level Code');

/*
Expected output (order can vary):
Case 1:
Hello from Timer
Hello from Immediate

Case 2:
Hello from Immediate
Hello from Timer

Reason:
- This schedules setTimeout(..., 0) and setImmediate from top-level.
- Outside an I/O callback, order is timing-dependent and not strictly guaranteed.
*/