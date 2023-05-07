import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user.model';

const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mariadb',
    });

sequelize.addModels([User]);

export default sequelize;
