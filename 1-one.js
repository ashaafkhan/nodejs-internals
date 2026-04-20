import fs from 'fs';

setTimeout(()=> console.log('Hello from timer'),0);

console.log('Hello from top level code');

/*
Expected output:
Hello from top level code
Hello from timer

Reason:
- Top-level code runs immediately.
- setTimeout(..., 0) schedules callback for timers phase in a later event-loop turn.
*/