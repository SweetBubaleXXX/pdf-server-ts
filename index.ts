import sequelize from './config/db.config';
import configureApp from './config/app.config';

const app = configureApp();

sequelize.authenticate().then(async () => {
  await sequelize.sync();
  app.listen(app.settings.port, () => {
    console.log(`Running on port ${app.settings.port}`);
  });
});
