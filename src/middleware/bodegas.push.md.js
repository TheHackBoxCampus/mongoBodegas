import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator"
import Bodegas from "../storage/structure/bodegas.js";

const bodegasMD = async (req, res, next) => {
    try {
        let data = plainToClass(Bodegas, req.body, {excludeExtraneousValues: true});
        await validate(data);
        req.data = JSON.parse(JSON.stringify(data)); 
        return next()
    }catch(err)  {  
        if (error.name === "MongoError" && error.code === 121) {
            // El código 121 generalmente se refiere a errores de validación en MongoDB
            const validationErrors = error.errmsg.match(/: (.+)/)[1];
            // Aquí `validationErrors` contendrá el mensaje de error de validación
            console.error("Error de validación:", validationErrors);
        
            // Luego puedes enviar `validationErrors` como respuesta en tu API
            res.status(400).json({ error: validationErrors });
        }else res.status(500).send({status: 500, message: err})
    }   
}

export default bodegasMD; 