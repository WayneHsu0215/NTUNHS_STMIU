import controllers from '../controllers/index.js';
import express from 'express';
import viteExpress from 'vite-express';

const app = express();

app.use(express.json()); // 支持 JSON 请求
app.use('/api', controllers);

const server = app.listen(4567, () => {
  console.log('Server is running on http://localhost:4567');
});

viteExpress.bind(app, server);
