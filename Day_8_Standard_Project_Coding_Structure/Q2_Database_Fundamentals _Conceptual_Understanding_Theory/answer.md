## Why is db.json not suitable as a database for real projects?

Using a file like db.json as a database for learning and small projects is fine,but it's not suitable for real-world applications

### Limitations of file-based storage:

- **Performance**: 
File based storage reads and writes always lead to overwrite of entire file or large parts of the file for every file operation, as the data grows this becomes very slow and inefficient comapared to databases.
- **Scalability**:
A JSON file doesn't scale well.Large amounts of data storage,it's management and updation is impossible.
- **Reliabilty**:
If the application crashes while writing to the file, then data can become corrupted or lost.There is no backup,built-in recovery like in databases.
- **Concurrency issues**:
Multiple users accessing same file at the same time can cause conflits,data overwrites or crashes because file-based storage doesn't handle concurrent access well.

## Ideal characteristics of a database system (apart from just storage)

- **Performance**:
The database should be able to retrieve and update quickly even when handling large datsets.
- **Concurrency**:
Multiple users can access and modify at same time without conflicts
- **Reliability**:
The system should ensure data safe and available,even during crashes, power failures
- **Data Integrity**:
The database should apply rules to keep data accurate, consistent and valid
- **Scalability**:
It should be able to grow with the application and handles more data and more users
- **Fault tolerance**:
The database should be able recover from failures using backups and recovery mechanisms

## Types of databases and their use cases

### Relational Databases (SQL)

**Relational Databases** stores data in sturctured tables with rows and columns
Examples: MySQL, PostgreSQL, Oracle, SQL Server

**Use cases:**
- Banking and financial systems
- E-commerce applications (orders, payments, users)
- School and university management systems
- Any application where data consistency and relationships are critical

Relational databases are ideal when data is well-structured and accuracy is very important.

### Non-relational (NoSQL) databases
**NoSQL databases** store data in flexible formats such as documents, key-value pairs, graphs, or wide-column stores. They are designed for large-scale and distributed systems.
Examples: MongoDB, Firebase, Cassandra, Redis

**Use cases:**
- Social media platforms
- Real-time analytics
- Chat applications
- IoT and big data applications

NoSQL databases are best when handling large volumes of unstructured or semi-structured data and when high scalability and flexibility are required.
