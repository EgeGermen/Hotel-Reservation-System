# EYN Hotel Reservation System

**Author: Ege Germen**

## About the Project

EYN Hotel Reservation System is a web application that allows users to make hotel reservations, list hotels, filter them, and view hotel details. The project has been developed using modern architecture and technologies.

## Architectures

### Backend Architecture: Onion Architecture

The backend has been developed in accordance with **Onion Architecture** principles. This architecture ensures that the project has a layered structure, dependencies are unidirectional towards the center, and the project is more testable, maintainable, and scalable.

- **Core Layer:**
    - **Domain:** Contains the fundamental business logic and entities of the project. It has no dependencies on any layer.
    - **Application:** Contains business workflows, commands, queries, and DTOs (Data Transfer Objects). The CQRS (Command Query Responsibility Segregation) pattern has been implemented using the `MediatR` library.
- **Infrastructure Layer:**
    - **Persistence:** Contains database operations, Entity Framework Core context, and migrations. PostgreSQL database is used.
    - **Infrastructure:** Contains infrastructural services such as token management.
- **Presentation Layer:**
    - **WebApi.Api:** Contains API controllers that handle incoming requests from users and return responses. API documentation is provided with Swagger.

### Frontend Architecture: Component-Based Architecture

The frontend has been developed using **Angular** with **Component-Based Architecture**. This architecture allows the interface to be divided into reusable and manageable components.

- **Components:** Consists of components representing each part of the interface (e.g., `otel-liste`, `otel-detay`, `rezervasyon-onay`).
- **Services:** Contains business logic such as API requests, authentication, and state management.
- **Modules:** Consists of modules that group different features of the application.

## Technologies Used

### Backend

- **.NET 9.0:** The main platform on which the project is developed.
- **ASP.NET Core:** Framework used to create the Web API.
- **Entity Framework Core:** ORM (Object-Relational Mapping) tool used for database operations.
- **PostgreSQL:** Used as the database.
- **MediatR:** Used to implement the CQRS pattern.
- **JWT (JSON Web Token):** Used for authentication and authorization.
- **Swagger:** Used for API documentation.

### Frontend

- **Angular 18:** The framework on which the frontend application is developed.
- **TypeScript:** A statically typed superset of JavaScript.
- **RxJS:** Used for asynchronous and event-based programming.
- **SCSS:** An advanced version of CSS.

## Installation and Running

### Backend

1. **Database Settings:** Update the `ConnectionStrings` section in the `WebApi/Presentation/WebApi.Api/appsettings.json` file with your own PostgreSQL database information.
2. **Apply Migrations:** Run the following command in the directory where the `WebApi.Persistence` project is located to create the database schema:
   ```bash
   dotnet ef database update
   ```
3. **Run the Application:** Run the following command in the directory where the `WebApi.Api` project is located:
   ```bash
   dotnet run
   ```

### Frontend

1. **Install Dependencies:** Run the following command in the `EYNFront` directory:
   ```bash
   npm install
   ```
2. **Run the Application:** Run the following command in the `EYNFront` directory:
   ```bash
   ng serve
   ```
The application will run at `http://localhost:4200/`.

## API Documentation

When the backend application is running, you can access the API documentation through the Swagger interface. By default, the documentation is located at `http://localhost:5000/swagger` (or a similar port).

## Project Purpose

This project has been developed as part of an internship, aiming to create a hotel reservation system using modern web development technologies and architectures. The project covers both backend and frontend development processes, providing a complete web application development experience.
