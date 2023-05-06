import 'dotenv/config';

import express from 'express';
import sequelize from './db';

const app = express();
const PORT = +(process.env.PORT || 3000);

sequelize.authenticate().then(async () => {
    await sequelize.sync();
    app.listen(PORT, () => {
        console.log(`Running on port ${PORT}`);
    });
});
