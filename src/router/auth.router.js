import { Router } from "express";
import requests from "../limits/settings.limits.js";
import generateTokenSpecific from "../controller/generate.category.js";

const auth = Router(); 

auth.get("/generar/:categoria", requests, generateTokenSpecific, (req, res) => {
    res.status(200).send(req.categoria)
})

export default auth; 