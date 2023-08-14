import app from "./app.js";
import globalProperties from "./env/env.js";

const start = () => {
    try {
        let $server = JSON.parse(globalProperties.SERVER);
        app.listen($server, () => {
            console.log(`http://${$server.hostname}:${$server.port}`)
        })
    }catch (err) {
        console.log(err.message)
    }
}

start(); 