<p align="center">
  <img src="frontend/public/logo192.png" alt="Smart Stock Manager logo" width="96" />
</p>

<h1 align="center">Smart Stock Manager</h1>

<p align="center">Off-the-shelf web application for tracking IT equipment stock, assignments and access control.</p>

## Overview

Smart Stock Manager gives an IT department a single inventory of its hardware and software. It records every computer, monitor and mobile phone, who holds it, where it is, and what happened to it over time.

Users sign in against a corporate directory, and what each one can do is controlled by fine-grained roles and privileges managed from the application itself. The user interface is in Spanish.

## Features

- **Equipment inventory:** computers, monitors and mobile phones, each with its type-specific data, brand and model.
- **Assignments:** assign equipment to people, release it and review who has held it.
- **Change history:** per-item audit log of the changes made to a resource.
- **Decommissioning:** retired equipment is kept in a separate view instead of being deleted.
- **Software licenses:** license records stored alongside the hardware inventory.
- **Organizational data:** people, cost centers, logistics centers, regions and localities.
- **Catalog management:** brands and models maintained from the UI.
- **Role-based access control:** users, roles and privileges administered from the UI, enforced on the API and reflected in the interface.
- **Directory authentication:** credentials are validated by an external service whose URL is set through an environment variable.

## Tech stack

| Layer | Technology |
| --- | --- |
| Backend | Java 11, Spring Boot 2.6, Spring Security, Spring Data JPA |
| Database | MySQL 5.7 |
| Frontend | React 18 (Create React App), React Router 6, Bootstrap 5, Axios |
| Packaging | WAR via Maven Wrapper, Docker Compose for local MySQL |

## Project structure

```text
.
├── backend/                    Spring Boot REST API
│   ├── application.properties  Runtime configuration, driven by environment variables
│   └── src/main/java/com/smartstock/
│       ├── controllers/        REST endpoints
│       ├── services/           Business logic
│       ├── repositories/       Spring Data JPA repositories
│       ├── models/             JPA entities
│       ├── dtos/               Request and response objects
│       └── security/           Authentication, privileges and CORS
├── frontend/                   React single-page application
│   ├── public/environment.js   Runtime API URL
│   └── src/
│       ├── views/              Application pages
│       ├── component/          Layout, permission guards, modals and inputs
│       └── services/           HTTP and API clients
└── docker/
    ├── docker-compose.yml      Local MySQL instance
    └── backup.sql              Database schema and seed data
```

## Getting started

### Prerequisites

- JDK 11
- Node.js and npm
- Docker with Docker Compose

### 1. Start the database

The backend validates the schema on startup and does not create it, so the dump must be imported first.

```bash
docker compose -f docker/docker-compose.yml up -d
docker compose -f docker/docker-compose.yml exec -T db mysql -uroot -ppassword abm < docker/backup.sql
```

The dump seeds the privileges, an `ADMIN` role and an `admin` user. The credentials in `docker-compose.yml` are local development defaults.

### 2. Start the backend

Run it from `backend/`, where `application.properties` is located. The `dev` profile replaces the external authentication service, as described under [Authentication](#authentication).

```bash
cd backend
export DB_URL=jdbc:mysql://localhost:3306/abm
export DB_USER=user
export DB_PASS=password
export FRONTEND_URL=http://localhost:3000
SPRING_PROFILES_ACTIVE=dev ./mvnw spring-boot:run
```

The API listens on `http://localhost:8080`.

### 3. Start the frontend

```bash
cd frontend
npm install
npm start
```

The application opens on `http://localhost:3000`. With the `dev` profile, sign in as `admin` with the password `demo`.

## Configuration

### Backend

| Variable | Description | Example |
| --- | --- | --- |
| `DB_URL` | JDBC connection URL | `jdbc:mysql://localhost:3306/abm` |
| `DB_USER` | Database user | `user` |
| `DB_PASS` | Database password | `password` |
| `AUTH_API_URL` | Base URL of the authentication service. Required unless the `dev` profile is active. | `https://ldap-gateway.example.com` |
| `FRONTEND_URL` | Origin allowed by CORS | `http://localhost:3000` |

### Frontend

The API URL is read from `window.__env.API_URL` in `public/environment.js`, so it can be changed at deployment time without rebuilding. `REACT_APP_API_URL` is used as a fallback at build time.

## Authentication

The backend does not store passwords. Sign-in has two steps:

1. Credentials are validated by the external service at `AUTH_API_URL`.
2. The user must also exist in the local `usuario` table. Their roles determine the privileges granted for the session.

To connect a directory, set `AUTH_API_URL` to an HTTP service in front of it that implements this contract:

```http
POST {AUTH_API_URL}/api/auth/login
Content-Type: application/json

{ "usuario": "jdoe", "password": "secret" }
```

Any `2xx` response means the credentials are valid. Any other response, or a connection failure, rejects the sign-in.

To support a different mechanism, such as a direct LDAP bind, implement the `ExternalAuthClient` interface and activate the new component with a Spring profile.

| Profile | Authentication client | Behavior |
| --- | --- | --- |
| `api` or default | `ExternalAuthClientApi` | Calls the service at `AUTH_API_URL` |
| `dev` | `ExternalAuthClientDev` | Accepts the password `demo` for any user in the local table |

> **Warning:** never enable the `dev` profile in a deployed environment.

## Building for deployment

```bash
cd backend
./mvnw clean package
```

This produces `target/smart-stock-manager-0.0.1-SNAPSHOT.war`, which can be deployed to a servlet container. `application.properties` is not packaged in the WAR, so supply it with `spring.config.additional-location`.

```bash
cd frontend
npm run build
```

This produces a static bundle in `frontend/build`. Set the API URL for the target environment in `environment.js`.
