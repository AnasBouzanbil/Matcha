# Matcha

Matcha is a modern platform designed to connect individuals who share common interests. Built as a next-generation dating and networking application, Matcha leverages advanced web technologies to deliver an intuitive, efficient, and seamless user experience.

---

## Key Features

- **Interest-Based Matching:** Discover and connect with people who genuinely share your passions and hobbies.
- **Modern User Interface:** Enjoy a responsive, visually appealing design built with modern web standards for optimal user engagement across all devices.
- **Scalable Architecture:** A robust backend system engineered to efficiently handle matchmaking algorithms, concurrent requests, and secure data storage.

---

## Technology Stack

Matcha is built using a modern full-stack architecture to ensure high performance, maintainability, and a smooth developer experience.

### Frontend
- **Next.js**: For server-side rendering, routing, and an optimized React development ecosystem.
- **Tailwind CSS**: For utility-first, responsive, and highly customizable styling.
- **CSS**: For additional custom styling requirements and refined animations.

### Backend
- **Express.js (TypeScript)**: For a strongly-typed, reliable, and fast RESTful API.
- **PostgreSQL**: For secure, relational, and highly structured data management.
- **Docker**: For consistent containerization and simplified deployment workflows.

---

## Project structure

| Folder or file | Purpose |
| --- | --- |
| [front](./front/) | Next.js frontend |
| [backend](./backend/) | Express and TypeScript backend |
| [DB](./DB/) | Database files |
| [docker-compose.yml](./docker-compose.yml) | Docker Compose configuration |

## Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites

Ensure you have the following installed on your local machine:
- Node.js
- Docker and Docker Compose
- PostgreSQL (if running the database locally outside of Docker)

### Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AnasBouzanbil/Matcha.git
   cd Matcha
   ```

2. **Start the database:**
   Navigate to the project root and launch the PostgreSQL database using Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. **Install dependencies:**
   ```bash
   npm install --prefix backend
   npm install --prefix front
   ```

4. **Run the development servers:**
   After configuring the database connection and any required environment variables, run the backend:
   ```bash
   npm run dev --prefix backend
   ```

   In a second terminal at the repository root, run the frontend:
   ```bash
   npm run dev --prefix front
   ```

   These commands use the scripts in each folder's `package.json`. A complete environment-variable reference is still needed.

---

## Development Status

Please note that this project is currently under active development. Features, database schemas, and documentation are continually being implemented and updated.