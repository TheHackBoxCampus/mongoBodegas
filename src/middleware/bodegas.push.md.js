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
        res.status(500).send({status: 500, message: err})
    }   
}

export default bodegasMD; 