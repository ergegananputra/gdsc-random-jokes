# GDSC Random Jokes
Random jokes with Node.js application from a MySQL database.

## Prerequisites
- Node.js
- MySQL

## Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/gdsc-random-jokes.git

```

2. Install the dependencies:

```bash
npm install

```

3. Create/set .env file
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=jokes_db
```

4. Populate the jokes table
```bash
node seeder.js
```

5. Run the application
```bash
nodemon npm start
```