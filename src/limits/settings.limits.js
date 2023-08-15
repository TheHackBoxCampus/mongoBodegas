import { rateLimit } from "express-rate-limit";

const requests = rateLimit({
    windowMs: 30 * 1000,
    max: 5,
    legacyHeaders: true,
    standardHeaders: true, 
    skip: (req, res) => {
         if(req.headers["content-length"] > 250) {
             res.status(413).send({status: 413, message: "la cantidad de bytes es mayor a la esperada"})
             return true
        }
    },
    message: (req, res) => {
        res.status(429).send({status: 429, message: "Limite de peticiones alcanzada"}) 
    }   
})

export default requests; 