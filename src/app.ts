import express from 'express';
import userRoutes from './routes/userRoutes';
import sequelize from './config/database';

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

sequelize.sync().then(() => {
  console.log('Database connected and models synchronized');
});

export default app;
