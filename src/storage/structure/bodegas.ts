import { Expose } from "class-transformer"
import  { IsDefined } from "class-validator"

class Bodegas {
     @Expose({name: "nombre"})
     @IsDefined({ message: () => { throw "Parametro nombre requerido" }})
     nm: string 
    
     @Expose({name: "id_responsable"})
     @IsDefined({ message: () => { throw "Parametro id_responsable requerido" }})
     idr: number 
    
     @Expose({name: "estado"})
     @IsDefined({ message: () => { throw "Parametro estado requerido" }})
     e: number 

     @Expose({name: "create_by"})
     @IsDefined({ message: () => { throw "Parametro create_by requerido" }})
     crtb: number 

     @Expose({name: "update_by"})
     @IsDefined({ message: () => { throw "Parametro update_by requerido" }})
     urb: number 

     @Expose({name: "create_at"})
     @IsDefined({ message: () => { throw "Parametro create_at requerido" }})
     crat: Date

     @Expose({name: "update_at"})
     @IsDefined({ message: () => { throw "Parametro update_at requerido" }})
     urat: Date

     @Expose({name: "deleted_at"})
     @IsDefined({ message: () => { throw "Parametro update_at requerido" }})
     drat: Date

     constructor(user:Partial<Bodegas>) {
        Object.assign(this, user); 
        this.nm = "nombre"
        this.idr = 1
        this.e = 1
        this.crtb = 1
        this.urb = 1   
        this.crat = new Date(2023, 8, 15)
        this.urat = new Date(2023, 8, 15)
        this.drat = new Date(2023, 8, 15)
     }
}

export default Bodegas;