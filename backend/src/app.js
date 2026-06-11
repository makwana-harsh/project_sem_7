import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import errorHandlerMiddleware from './shared/middleware/error.middleware.js';
import authRoutes from './modules/auth/auth.routes.js';
// import interviewRoutes from './modules/xyz/interview.routes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended:true }));
app.use(cors({
    origin : process.env.CLIENT_URL,
    credentials : true
}));

app.use('/api/auth', authRoutes);
// app.use('/api/interview', interviewRoutes);

app.use(errorHandlerMiddleware);

export default app;