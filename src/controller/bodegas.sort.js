import conx from "../config/db.js";

const warehouseSort = async (req, res) => {
    let db = await conx(); 
    let warehouses = await db.collection("bodegas"); 
    let sort = await warehouses.find().sort({nombre: 1}).toArray()
    res.status(200).send(sort)
}

const warehousesPush = async (req, res) => {
    let { nombre, id_responsable, estado, created_by, update_by, created_at, update_at, deleted_at} = req.body; 
    let formatCorrect = {nombre, id_responsable, estado, created_by, update_by, created_at, update_at, deleted_at}
    
    try {   
        let db = await conx(); 
        let warehouses = await db.collection("bodegas"); 
        let insertWarehouse = await warehouses.insertOne(formatCorrect) 
        res.status(201).send({status: 201, message: "Se ha agregado una nueva bodega"})
    }catch (err) {
        res.status(500).send({status: 500, message: err.message})
    }
    
}

export {
    warehouseSort,
    warehousesPush
};