import express from 'express';
import urlRoutes from './routes/url.routes.js'
import fileUpload from "express-fileupload";

// server
const app = express();

// middlewares
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))

// routes
app.use(urlRoutes);

export default app;