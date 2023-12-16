import express from 'express';
import urlRoutes from './routes/url.routes.js'
import fileUpload from "express-fileupload";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// server
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))

// middlewares
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))

// routes
app.use(urlRoutes);

app.use(express.static(join(__dirname, '../client/build')))

app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../client/build/index.html'))
})

export default app;