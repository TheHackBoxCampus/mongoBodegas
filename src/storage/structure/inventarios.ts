import { Expose, Transform } from "class-transformer"
import  { IsDefined } from "class-validator"

class Inventarios {
     @Expose({name: "id_bodega"})
     @IsDefined({ message: () => { throw "Parametro id_bodega requerido" }})
     idb: number 
    
     @Expose({name: "id_producto"})
     @IsDefined({ message: () => { throw "Parametro id_producto requerido" }})
     idp: number 
    
     @Expose({name: "cantidad"})
     @IsDefined({ message: () => { throw "Parametro cantidad requerido" }})
     cnt: number 

     @Expose({name: "created_by"})
     @IsDefined({ message: () => { throw "Parametro created_by requerido" }})
     crb: number 

     @Expose({name: "update_by"})
     @IsDefined({ message: () => { throw "Parametro update_by requerido" }})
     urb: number 

     @Expose({ name: "created_at" })
     crat: Date
   
     @Expose({ name: "update_at" })
     urat: Date
   
     @Expose({ name: "deleted_at" })
     drat: Date

     constructor(user:Partial<Inventarios>) {
        Object.assign(this, user); 
        this.idb = 0
        this.idp = 0
        this.cnt = 0
        this.crb = 1   
        this.urb = 1   
        this.crat = new Date(2023, 8, 15)
        this.urat = new Date(2023, 8, 15)
        this.drat = new Date(2023, 8, 15)
     }
}

export default Inventarios;