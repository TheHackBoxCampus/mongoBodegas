import conx from "../config/db.js";

const countOfProducts = async (req, res) => {
    try {
        let db = await conx();
        let count = await db.collection('productos').aggregate([
            {
                $lookup: {
                    from: 'inventarios',
                    localField: '_id',
                    foreignField: 'id_producto',
                    as: 'inventarios'
                }
            },
            {
                $unwind: '$inventarios'
            },
            {
                $group: {
                    _id: '$_id',
                    Total: { $sum: '$inventarios.cantidad' }
                }
            },

            {
                $project: {
                    _id: 0,
                    Total: 1,
                    producto: "$_id"
                }
            },

            {
                $sort: { Total: -1 }
            }
        ]).toArray();
        return res.status(200).send(count)
    } catch (err) {
        console.log(err)
    }
}

export default countOfProducts; 