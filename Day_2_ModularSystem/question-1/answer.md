# Node.js Architecture

Node.js is designed to build fast,scalable and efficient server-side applications.Its architecture is built around non-blocking I/O, an event-driven model and efficient use of resources.

## JavaScript Engine (V8):
- v8 is the javascript engine developed by google and used by Node.js
- It compiles javascript code directly to machine code
- v8 also handles memory management,execution of javascript code and garbage collection

## Node.js Core APIs
- Core APIs are built-in modules provided ny Node.js
- These APIs allow developers to interact with file system(fs),operating system(os),networking(http),timers
- Core API's acts as a bridge between javascript code and system-level operations
- They are written partly in JavaScript and partly in C/C++.
## Native Bindings
- Native Bindings are used to connect javascript APIs with c/c++ implementations
- They allow node.js to access low-level system functions which are noot accessible by javascript
- These native bindings make the Node.js fast and capable of handling OS-level tasks.

## Event Loop
- It is the heart of Node.js's non-blocking behaviour
- It continuously checks whether call stack is empty and callback queue is ready for execution
- Event loop decides what to run next and when

# libuv
-libuv is a C library used internally by Node.js.
-It provides:
Asynchronous I/O
Event loop implementation
Thread pool
Cross-platform support

## Why Node.js Needs libuv

- JavaScript alone cannot perform non-blocking system operations.
- libuv allows Node.js to:
Handle file system operations
Perform networking
Work consistently across different operating systems
Without libuv, Node.js would not be asynchronous.

## Responsibilities of libuv
- Managing the event loop
- Handling asynchronous I/O operations
- Managing the thread pool

# Thread Pool
Thread Pool is a set of threads handled seperatly from main event loop to perform heavy tasks 

## Why Node.js Uses a Thread Pool
- Some operations are blocking by nature.Running them on the main thread would block the event loop.
- The thread pool allows Node.js to stay responsive.

## Operations Handled by the Thread Pool
- File system operations (fs.readFile, fs.writeFile)
- DNS lookups
- Compression and decompression
- Cryptographic operations (hashing, encryption)

# Worker Threads

Worker threads are separate JavaScript execution threads.
-Each worker has:
Its own event loop and V8 instance

## Why Are Worker Threads Needed?
JavaScript is single-threaded and struggles with heavy CPU tasks.
- Worker threads allow:
Parallel execution
Better CPU utilization

## Difference Between Thread Pool and Worker Threads
- Thread Pool is managed by libuv where as Worker Threads is managed by Node.js
- Thread Pool is used for async I/O where as Worker Threads is used for heavy CPU tasks
- Thread Pool is not controllable directly where as Worker Threads are fully controllable

# Event Loop Queues

## Macro Task Queue
- Contains tasks that come from: setTimeout, setInterval, setImmediate, I/O callbacks
Examples:
Timer callbacks
Network request callbacks

## Micro Task Queue
- Contains high-priority tasks.
Processed immediately after the current execution stack.
Examples:
Promise.then()
process.nextTick()

## Execution Priority
- Call Stack
- Micro Task Queue
= Macro Task Queue
Micro tasks always execute before macro tasks.

