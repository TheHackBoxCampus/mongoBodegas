import express from "express";

const app = express(); 

/**
 * ! midlewares
 */

app.use(express.json())
app.use(express.text())


/**
 * Routes
 */

export default app; 