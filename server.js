import express from "express";
import router from './router.js';

const app = express()

app.use(express.json())
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`API on http://localhost:${PORT}`)
})