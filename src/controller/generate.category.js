import "reflect-metadata";
import { classToPlain, plainToClass } from "class-transformer";
import globalProperties from "../env/env.js"
import jwt from "jsonwebtoken"
import Usuarios from "../storage/structure/usuarios.js"
import Bodegas from "../storage/structure/bodegas.js"
import Inventarios from "../storage/structure/inventarios.js"

const getClass = (cls) => {
    let classesAvailables = {
        'usuarios': Usuarios, 'bodegas': Bodegas, 'inventarios': Inventarios
    }  

    let isMatch = classesAvailables[cls];
    if(!isMatch) throw {status: 500, message: "Categoria incorrecta"}
    else return {plain: plainToClass(isMatch, {}, {ignoreDecorators:true})}
}

const generateTokenSpecific = async (req, res, next) => {
    try { 
        let structure = getClass(req.params.categoria).plain; 
        let token = new Promise((resolve, reject) => {
            jwt.sign(Object.assign({}, classToPlain(structure)), globalProperties.KEY, {algorithm: "HS256", expiresIn: "10m"}, (err, token) => {
                 err ? reject(err) : resolve(token) 
            })
        })
        let getToken = await token; 
        req.categoria = {status: 200, token: getToken, categoria: req.params.categoria}
        return next() 
    }catch(err) {
        res.status(500).send({status: 500, message: err.message})
    }
}

export default generateTokenSpecific; 