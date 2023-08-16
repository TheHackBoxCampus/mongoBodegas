import conx from "../config/db.js";
import { generateID, translateError } from "./bodegas.sort.js";

const generateDate = () => {
    let ndt = new Date();

    let year = ndt.getFullYear();
    let month = ndt.getMonth() + 1;
    let day = ndt.getDate();

    let formatDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    return formatDate;
}

console.log(generateDate())

const verifyPatterns = async (req, res) => {
    const { id_bodega, id_producto, cantidad } = req.body;

    try {
        let db = await conx();
        let col = await db.collection("inventarios");
        let searchPattern = await col.findOne({
            id_bodega,
            id_producto
        })

        if (searchPattern) {
            if (searchPattern.cantidad + cantidad >= 20) throw "La cantidad del producto supera las 20 unidades, modifica la cantidad o intenta mas tarde"

            await col.updateOne(
                { id_producto, id_bodega },
                { $inc: { cantidad } }
            )
            return res.status(201).send({ status: 201, message: "Se han actualizado los campos correctamente" })

        } else {
            let id = parseInt(generateID());
            let dt = generateDate();

            if (cantidad >= 20) throw "La cantidad sobrepasa las 20 unidades remodifica el numero!"

            let d = { _id: id, id_bodega, id_producto, cantidad, created_by: 10, update_by: 10, created_at: dt, update_at: dt, deleted_at: dt }
            await col.insertOne(d)
            return res.status(201).send({ status: 201, message: "Se han insertado los campos correctamente" })
        }

    } catch (err) {
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
    verifyPatterns,
    generateDate
};
