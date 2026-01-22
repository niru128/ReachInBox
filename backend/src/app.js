import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import emailRoutes from './routes/emailRoutes.js';

const app = express();

app.use(cors())
app.use(express.json());


app.use('/api/emails',emailRoutes);

export default app;