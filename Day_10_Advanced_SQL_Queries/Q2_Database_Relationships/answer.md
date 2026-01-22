# Database Relationships

A **database relationship** defines how two or more tables are connected to each other. These relationships are established using primary keys and foreign keys to ensure data integrity, avoid duplicates.

In relational databases, relationships help represent real-world connections between entities such as customers, orders, products, and payments.

## Types of Database Relationships

There are three types of database relationships
- One-to-One(1:1)
- One-to-Many(1:N)
- Many-to-Many(M:N)

### One-to-One(1:1)

A one-to-one relationship occurs when one record in Table A is associated with only one record in Table B, and vice versa.

**E-Commerce Example**

**Customer ↔ Customer_Profile**
- Each customer has exactly one profile
- Each profile belongs to exactly one customer

**Tables**
- Customers(customer_id, name, email)
- Customer_Profile(profile_id, customer_id, address, phone)

customer_id in Customer_Profile is a foreign key referencing Customers.

![https://www.beekeeperstudio.io/assets/img/database-relationships/one-to-one-59751b752058a5d378adc3a9a5ab4f1a7c0b7f2a1bede234aa9a8c2bfb91ee41f7c6c06208d7ae7a00257965313f9a0031578bb8e46bc5d5cbbcded30d5fc454.svg]

### One-to-Many Relationship (1:N)

A **one-to-many** relationship occurs when one record in Table A can be associated with multiple records in Table B, but each record in Table B relates to only one record in Table A.

**E-Commerce Example**

**Customer ↔ Orders**
- One customer can place many orders
- Each order belongs to one customer

**Tables**
- Customers(customer_id, name)
- Orders(order_id, customer_id, order_date, total_amount)

![https://www.beekeeperstudio.io/assets/img/database-relationships/one-to-many-b1aa868f0a89fde8f4a4802df798d5dd065d946a0369ab9161c50452311e3c67e6be54379b96d7569c723572525c48b503b6437a237b8e596180e945459b7c61.svg]

### Many-to-Many Relationship (M:N)

A **many-to-many** relationship occurs when multiple records in Table A are associated with multiple records in Table B.

This relationship is implemented using a junction (bridge) table.

**E-Commerce Example**

**Orders ↔ Products**
- An order can contain many products
- A product can appear in many orders

**Tables**
- Orders(order_id, order_date)
- Products(product_id, product_name, price)
- Order_Items(order_id, product_id, quantity)

Here Order_Items is the bridge table

![https://community.dbdiagram.io/uploads/default/original/1X/10dc1c727879f3cfeebcd8dff11b4bce22d37c41.png]

Database relationships are essential for designing efficient and scalable e-commerce applications. By correctly implementing one-to-one, one-to-many, and many-to-many relationships, databases can accurately represent real-world business rules, maintain data integrity, and support complex queries.