# 📝 MERN TODO Backend

This is the backend server for the MERN TODO application. It includes a RESTful API for user authentication and task management, using **Node.js**, **Express**, **MongoDB**, and **Mongoose**.

---

## 🚀 Features

- 👤 User Registration and Login with hashed passwords
- ✅ Task: Add, Update, Delete, and Get All Tasks
- 🔐 Passwords hashed with Bcrypt
- 🧪 Unit, Integration, and API tests using Jest, Supertest, and mongodb-memory-server
- 📊 Test coverage with `jest --coverage`

---

## 📁 Project Structure

![image](https://github.com/user-attachments/assets/9592b799-bacb-42c6-97af-6e497fc9428b)


![image](https://github.com/user-attachments/assets/6a7630bc-8a4c-4b6e-801e-a0936cebbfdf)

# 🧪 Testing Overview

This project includes **Unit**, **Integration**, and **API tests** to ensure reliability and correctness.

---

## ✅ 1. Unit Tests

Unit tests are written for:

* Core business logic (e.g., hashing passwords, saving users)
* Independent route handlers using mocking (e.g., mocking Mongoose models)

✔️ Tools Used:

* `jest`
* `mongodb-memory-server` (for isolated DB)
* `supertest`

---

## 🔄 2. Integration Tests

Integration tests check:

* MongoDB + Express flow end-to-end
* Actual database interactions (create, read, update, delete)

🧪 Example:

const mongoServer = await MongoMemoryServer.create();
await mongoose.connect(mongoServer.getUri());


Tests:

* Register/Login with real hashed password
* Create task and verify in DB
* Link task to user and fetch

---

## 🌐 3. API Tests

These tests validate the API routes:

* Validate HTTP status codes
* Validate response structure and data
* Simulate user scenarios like login failure, task not found

🧪 Example:

const res = await request(app)
  .post('/api/v1/register')
  .send({ email: 'test@example.com', password: '1234' });
expect(res.statusCode).toBe(201);


---

## 📊 Test Coverage

Run the following to check coverage:


     npm run test:coverage


Generates:

![image](https://github.com/user-attachments/assets/d6417f57-6783-4e23-9fb0-7eda79860e87)



* Line, Function, and Branch coverage report
* `coverage/` folder with full HTML report

🟩 Target: At least 70%+ test coverage

---

## 🗂 Test File Structure


tests/
├── auth.test.js    # Tests for /register and /signin routes
├── task.test.js    # Tests for /addTask, /updateTask, etc.
└── setup.js        # In-memory MongoDB setup and teardown


## 🚀 Run All Tests

     npm run test


✔️ Passes all unit/integration/API tests with coverage.


