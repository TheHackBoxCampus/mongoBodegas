import { MongoClient } from "mongodb";
import globalProperties from "../env/env.js";

const conx = async () => {
    try {
        let credentials = JSON.parse(globalProperties.USERDB);
        let uri = `mongodb+srv://${credentials.username}:${credentials.password}@cluster0.lk9oe5f.mongodb.net/${credentials.database}`;
        let options = {
            useNewUrlParser: true,
            useunifiedtopology: true
        }
        let client = await MongoClient.connect(uri, options);
        console.log("db --> success");
        return client.db(); 
    }catch(err) {
        console.error(err.message)
    }
}

export default conx; 