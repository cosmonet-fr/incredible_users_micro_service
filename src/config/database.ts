import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { Country } from '../models/Country';
import { Password } from '../models/Password';
import { User } from '../models/User';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [Country, Password, User]
});

export default sequelize;
