# Role of Frontend (FE)
**Frontend (FE)** is a part of Web Application with which the user can see and directly interact.

## User interface:
Frontend is responsible for how the application looks like:
- Layouts,colors
- Buttons,navigation
- Responsiveness so that the application will look same in mobile,tablet and laptop/computer

## User interaction
Frontend is responsible for how the user interact with the application:
- Clicking on buttons,Links
- Filling and submitting the forms
- Showing Alerts and Error messages while validation
## Communication with backend
Frontend communicates with the backend using API's:
- Sends the request to backend
- Recieves the response from backend and shows it on the UI

Frontend focuses on presentation and user interaction.

# Role of Backend
**Backend (BE)** is a part of Web Application which applies the business logic, processes data and returns responses to the the frontend.

## Server-side processing
The backend is responsible for server-side operations,such as
- Processess the requests from the frontend
- Applies business logic and validations
- Performs caluculations
- Returns responses to frontend
## Database handling
The backend is responsible for database operations, such as
- Stores the application data
- Retrieves the data
- Update and delete data
- Maintance the consistency

## Security and Authentication
The backend ensures the security by
- Authenticated users
- Authorize based on role
- protects from unauthorized users

The backend focuses on business logic, security and data management.

# Business Logic

Business logic is the set of rules that define how the data should be processed
Examples of business logic are:

## Banking application corporate portals involves business logic like:
- Account validation
- User Login Credentials validation
- Blocks account on multiple attempts
- Role based access

## E-Commerce Order Processing:
- Product availability check
- Price, tax, discounts
- Caluculations

## Appointement booking:
- Availability of staff
- Date and time
- Cancellationof appointements
- Limit of appointements

# Client–Server Model

A **Client–Server Model** is a networking architecture where the client(frontend) sends the request,server(backend) processes it and returns processed data to client
- The client sends the request to the server
- The server processes the request, retrieves data from the database, applies business logic, and then sends the processed data back to the  client.
- The client and server communicate with each other through the APIs.


# Three-Tier Architecture

The **Three-Tier Architecture** is a widely used software architecture that divides an application into three separate layers for better scalability, security, and maintenance.

## Layers of 3-Tier Architecture:

**Presentation Layer (Frontend)** – The UI that users interact with.
**Application Layer (Backend)** – The logic that processes requests and applies business rules.
**Data Layer (Database)** – The storage system where application data is managed.

Three-Tier Architecture is widely used because of its
**Scalability** -  Each layer can be scaled independently, making it easy to handle large amounts of traffic.
**Security** – The separation of concerns enhances security by keeping the database protected from direct user access.
**Maintainability** – Changes in one layer do not affect others, making updates and debugging easier.
**Cloud & Microservices Compatibility** – Modern applications use cloud-based services and microservices, which align well with the 3-tier model.

## JavaScript as a Backend Language

JavaScript is widely used as a backend language because developers can build fast, scalable, and efficient server-side applications using Node.js.

## Performance
JavaScript provides strong backend performance due to:
- Asynchronous and non-blocking I/O
- Event-driven architecture
- Efficient handling of multiple requests at the same time

## Ecosystem
JavaScript has a rich ecosystem that supports backend development:
- npm with a large collection of packages
- Easy integration with databases and third-party services
- Strong community support and documentation

## Popular Backend Frameworks
Some popular JavaScript backend frameworks include:
- Node.js
- Express.js
- NestJS
- Fastify





