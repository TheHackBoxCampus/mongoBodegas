import { Router } from "express";
import requests from "../limits/settings.limits.js";
import generateTokenSpecific from "../controller/generate.category.js";
import { warehouseSort, warehousesPush } from "../controller/bodegas.sort.js";
import { customAuthPassport } from "../middleware/verifyToken/jwtVerify.js";
import bodegasMD from "../middleware/bodegas.push.md.js";
import Bodegas from "../storage/structure/bodegas.js";

const auth = Router(); 

auth.get("/generar/:categoria", requests, generateTokenSpecific, (req, res) => {
    res.status(200).send(req.categoria)
})

auth.get("/bodegas/orden", requests, customAuthPassport(Bodegas), warehouseSort);
auth.post("/bodegas/nueva", requests, customAuthPassport(Bodegas), bodegasMD, warehousesPush); 

export default auth; 