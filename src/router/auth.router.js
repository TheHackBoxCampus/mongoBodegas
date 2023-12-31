import { Router } from "express";
import requests from "../limits/settings.limits.js";
import generateTokenSpecific from "../controller/generate.category.js";
import { warehouseSort, warehousesPush } from "../controller/bodegas.sort.js";
import countOfProducts from "../controller/bodegas.count.js";
import { customAuthPassport } from "../middleware/verifyToken/jwtVerify.js";
import { verifyPatterns } from "../controller/productos.news.js";
import bodegasMD from "../middleware/bodegas.push.md.js";
import Bodegas from "../storage/structure/bodegas.js";
import Inventarios from "../storage/structure/inventarios.js";
import { moveWarehouse } from "../controller/transladar.productos.js";

const auth = Router(); 

auth.get("/generar/:categoria", requests, generateTokenSpecific, (req, res) => res.status(200).send(req.categoria))
auth.get("/bodegas/orden", requests, customAuthPassport(Bodegas), warehouseSort);
auth.get("/productos/inventario/cantidad", requests, customAuthPassport(Inventarios), countOfProducts)
auth.post("/productos/nueva", requests, customAuthPassport(Inventarios), verifyPatterns)
auth.post("/productos/transladar", requests, customAuthPassport(Inventarios), moveWarehouse)
auth.post("/bodegas/nueva", requests, customAuthPassport(Bodegas), bodegasMD, warehousesPush); 

export default auth; 