require('dotenv').config();

const express = require('express');
const app = express();
const cors = require("cors");
// ✅ Allow requests from frontend
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true, // Allow cookies (if needed)
}));

// ✅ OR, allow all origins (for development only)
app.use(cors());
const connectDB = require('./db/connect');

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

const userRouter=require("./routes/userRouter");
const contestRouter=require("./routes/contestRouter");
const authRouter=require("./routes/authRouter");

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/contests',contestRouter);


const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();