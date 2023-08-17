import conx from "../config/db.js";
import { generateID, translateError} from "./bodegas.sort.js";
import { generateDate } from "./productos.news.js";

const moveWarehouse = async (req, res) => {
    try {
        if(Object.entries(req.body) < 1) throw 'Parametros requeridos!'

        let { id_producto, origen, destino, cantidad } = req.body; 
        const db = await conx(); 
        let Inventory = await db.collection("inventarios");
        let history = await db.collection("historiales");

        let originInventory = await Inventory.findOne({
            id_producto,
            id_bodega: origen
        })

        for(let x = 0; x < Object.values(req.body).length; x++) {
            if (typeof Object.values(req.body)[x]  != "number") throw "Parametros incorrectos, Descripcion: Tipo no es numero"
        }

        if (!originInventory) throw 'Bodega de origen desconocido!'
        
        else if (originInventory.cantidad < cantidad) {
            throw 'Cantidad insuficiente en la bodega de origen'
        }

        // updates 

        await Inventory.updateOne(
            {id_producto, id_bodega: origen },
            {$inc: { cantidad: -cantidad }}
        )

        await Inventory.updateOne(
            {id_producto, id_bodega: destino },
            {$inc: { cantidad }},
            {upsert: true}
        )

        // register history
        let _id = parseInt(generateID());
        let dt = generateDate(); 

        await history.insertOne({
            _id,
            cantidad,
            id_bodega_origen: origen, 
            id_bodega_destino: destino,
            id_inventario: originInventory._id,
            estado: 1,
            created_by: 10, 
            update_by: 10, 
            created_at: dt, 
            update_at: dt, 
            deleted_at: dt
        })

        return res.status(200).send({status: 200, message: "Traslado realizado exitosamente!"})
    }catch(err) {
        let errors = (err, p = null, q = null) => {
            let o = {
                121: { status: 500, message: `Lo sentimos, ocurrió un error. Detalles: ${q}. Por favor, intenta de nuevo más tarde.`, fields: p }
            }

            let v = o[err];
            return v
        }

        if (!errors(err.code)) {
            res.status(500).send({ status: 500, message: err })
        } else {
            let p = [];
            let p2 = ''

            for (let rule of err.errInfo.details.schemaRulesNotSatisfied) {
                for (let prop of rule.propertiesNotSatisfied) {
                    p.push(prop.propertyName)
                    p2 = prop.details[0].reason
                }
            }

            // translate error
            let tr = await translateError(p2)

            // settings error
            let e = errors(err.code, p, tr);
            return res.status(500).send(e)
        }
    }
    
}

export {
    moveWarehouse
}