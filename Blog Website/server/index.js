import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './src/modules/users/user.route.js';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());  

app.user("/api/user", userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});