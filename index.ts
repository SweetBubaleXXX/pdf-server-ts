import 'dotenv/config';

import express from 'express';
import sequelize from './db';
import { router as userRouter }  from './routes/user';

const PORT = +(process.env.PORT || 3000);
const app = express();

app.use(express.json());
app.use(userRouter);

sequelize.authenticate().then(async () => {
    await sequelize.sync();
    app.listen(PORT, () => {
        console.log(`Running on port ${PORT}`);
    });
});
