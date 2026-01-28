## Why is cascade delete better handled at the database level instead of the application level?

Cascade delete is better handled at database level because:
- Ensures child records are automatically deleted when parent record is deleted
- Application code is clear and less error-prone
- Database optimises cascade deletes internally, incase of app-level needs to handle with multiple queries

**Example**: 

If we have two tables order and order Items then:
- Incase of cascade delete at database level if we delete one order is automatically deletes it's related order items records
- Incase of deleting at app-level, we need to write the code to handle the order items deletion based on orders, and if the code crashes after deleting orders then order items records will become orphan records