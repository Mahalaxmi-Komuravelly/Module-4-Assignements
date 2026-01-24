## 1. What schema design is and what a database schema represents

A **schema design** is the process of defining the structure of database before storing data into it.
It includes:
- tables
- columns
- data type of columns
- constraints and rules
- relationship between tables

**Database schema** is the blueprint of database.It represents the logical structure of database not the actual data.

## 2. Why schema design is required before writing backend code

Schema design is required before backend code because backend code mostly depends on how the data is stored and accessed.

If the schema is not good then 
- Backend logic becomes messy and error-prone
- Queries have to be written again and again

Good schema design allows backend developers to write clear API's, efficient queries and business logic without worrying about data inconsistencies.

## 3. How poor schema design impacts data consistency, maintenance, and scalability

If the schema design is poor then:
- Storing same data in multiple tables takes so much memory and can lead to get out of sync.For example, storing a user’s email in several tables can lead to different values for the same user.
- Poorly designed schemas are hard to understand and modify. Even small changes can break multiple parts of the system.
- As data grows, inefficient schemas lead to slow queries, complex joins, and performance issues.

## 4. What validations are in schema design and why databases enforce them

**Validations**(called as constraints) are rules applied by the database to ensure data correctness and integrity.

Common Examples:

- **NOT NULL** : Ensures column must have a value
- **UNIQUE** : Ensures column must have unique value
- **PRIMARY KEY** : Uniquely identifies each row in a table
- **FORIEGN KEY** : Ensures relationship between the tables
- **DEFAULT** : Assigns a default value if no value is provided

## 5. The difference between a database schema and a database table

A **database schema** is the overall structure that includes, all tables, columns, relationship between tables, constraints and rules.

**Database table** is a single entity within the schema that stores data in rows and columns

## 6. Why a table should represent only one entity

Each table should represent one entity which makes data organized, structured and avoids confusion.

If a table represents multiple entities, then:

- As the data grows, will face performance issues
- data modification becomes risky
- duplicate data
- unnecessary columns
- many values may be null

For Example, mixing users and order tables would make it difficult to manage.Maintaining them seperately makes database cleaner.

## 7. Why redundant or derived data should be avoided in table design

**Redundant data** is the data stored in multiple places
**Derived data** is the data calculated from other values (Ex: revenue = quantity * price)

These types of data should be avoided in table design because:
- It increases the storage
- It complicates updates and validations
- Leads to data inconsistency if one copy is updated and another is not 

## 8. The importance of choosing correct data types while designing tables

Choosing the correct data type is crucial because it affects:
- Data accuracy: Prevents invalid values (Ex: storing age as an integer, not text).
- Performance: Smaller, appropriate data types improve storage efficiency and query speed.
- Data integrity: Ensures the database enforces correct formats (Ex: DATE for dates, BOOLEAN for true/false values).






