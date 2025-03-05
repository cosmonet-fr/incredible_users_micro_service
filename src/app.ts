import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import sequelize from './config/database';

const app = express();

// Configuration de CORS
app.use(cors({
  origin: '*', // À restreindre en production (ex: "http://mon-frontend.com")
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/api/users', userRoutes);

sequelize.sync().then(() => {
  console.log('Database connected and models synchronized');
});

export default app;
