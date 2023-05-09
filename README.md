# Login-Signup-API-Design
Login/Signup/OTP/Tokens/JWT Tokens/Forget-password/API-Design




README file for Login, Signup, OTP, Forget Password Verification Project
========================================================================

This project is a simple implementation of user authentication and verification system which includes the following functionalities:
- User signup
- User login
- OTP verification
- Forget password verification

## Technologies Used
- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT)
- Nodemailer

## Prerequisites
- Node.js installed on your system
- MongoDB instance setup and running
- SMTP server setup for Nodemailer

## Installation and Setup
1. Clone the repository:
```bash
git clone https://github.com/yourusername/login-signup-otp-forget-password.git
```
2. Navigate to the project directory:
```bash
cd login-signup-otp-forget-password
```
3. Install dependencies:
```bash
npm install
```
4. Configure environment variables by creating a `.env` file:
```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/login-signup-otp-forget-password
JWT_SECRET=your_jwt_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
```
5. Start the server:
```bash
npm start
```

## Usage
- To signup, make a `POST` request to `/api/auth/signup` with the following data:
    - `name`
    - `email`
    - `password`
- To login, make a `POST` request to `/api/auth/login` with the following data:
    - `email`
    - `password`
- To verify OTP, make a `POST` request to `/api/auth/verify` with the following data:
    - `email`
    - `otp`
- To send OTP for forget password verification, make a `POST` request to `/api/auth/forgot-password` with the following data:
    - `email`
- To reset password after forget password verification, make a `POST` request to `/api/auth/reset-password` with the following data:
    - `email`
    - `otp`
    - `password`

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.
