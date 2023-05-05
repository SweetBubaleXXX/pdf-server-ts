import { Sequelize } from 'sequelize-typescript';
import dbConfig from '../config/db.config';
import { User } from './user.model';

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: 'mariadb',
    });

sequelize.addModels([User]);
