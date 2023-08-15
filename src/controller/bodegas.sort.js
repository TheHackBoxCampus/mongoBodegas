import conx from "../config/db.js";
import translate from "@iamtraction/google-translate";

const translateError = async (err) => {
    try {
        const translationResult = await translate(err, { from: 'en', to: 'es' });
        return translationResult.text;
      } catch (error) {
        console.error('Translation error:', error);
        return 'Error during translation';
      }
}


const generateID = () => {
    let id = '';

    for (let i = 1; i <= 4; i++) {
        id += Math.floor(Math.random() * 4);
    }

    return id;
}
const warehouseSort = async (req, res) => {
    let db = await conx();
    let warehouses = await db.collection("bodegas");
    let sort = await warehouses.find().sort({ nombre: 1 }).toArray()
    res.status(200).send(sort)
}

const warehousesPush = async (req, res) => {
    let nID = parseInt(generateID());
    let { nombre,
        id_responsable,
        estado,
        created_by,
        update_by,
        created_at,
        update_at,
        deleted_at
    } = req.body;

    let formatCorrect = {
        _id: nID,
        nombre,
        id_responsable,
        estado,
        created_by,
        update_by,
        created_at,
        update_at,
        deleted_at
    }

    try {
        let db = await conx();
        let warehouses = await db.collection("bodegas");
        let insertWarehouse = await warehouses.insertOne(formatCorrect)
        res.status(201).send({ status: 201, message: "Se ha agregado una nueva bodega" })
    } catch (err) {
       
        translate("hello world!!", {from: "en", to: "es"}).then(res => {
            console.log(res.text)
        })
       
        let errors = (err, p, q) => {
            let o = {
                121: { status: 500, message: `Lo sentimos, ocurrió un error. Detalles: ${q} en el campo ${p}. Por favor, intenta de nuevo más tarde.` }
            }   

            let v = o[err]; 
            return v 
        }

        let p = '';
        let p2 = ''

        for(let rule of err.errInfo.details.schemaRulesNotSatisfied) {
            for(let prop of rule.propertiesNotSatisfied){
                p += prop.propertyName                
                p2 += prop.details[0].reason
            }
        }

        // translate error
        let tr = await translateError(p2)
        
        // settings error
        let e = errors(err.code, p, tr);
        e ? res.status(500).send(e) : res.status(500).send({ status: 500, message: err.message }) 
    }
}

export {
    warehouseSort,
    warehousesPush
};