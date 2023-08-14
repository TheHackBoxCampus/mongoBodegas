import { Expose } from "class-transformer"
import  { IsDefined } from "class-validator"

class usuarios {
     @Expose({name: "nombre"})
     @IsDefined({ message: () => { throw "Parametro nombre requerido" }})
     nm: string 
    
     @Expose({name: "email"})
     @IsDefined({ message: () => { throw "Parametro email requerido" }})
     em: string 
    
     @Expose({name: "email_verified"})
     @IsDefined({ message: () => { throw "Parametro email_verified requerido" }})
     emv: Date 

     @Expose({name: "estado"})
     @IsDefined({ message: () => { throw "Parametro estado requerido" }})
     e: number 

     @Expose({name: "created_by"})
     @IsDefined({ message: () => { throw "Parametro created_by requerido" }})
     crb: number 

     @Expose({name: "update_by"})
     @IsDefined({ message: () => { throw "Parametro update_by requerido" }})
     urb: number 

     constructor(user:Partial<usuarios>) {
        Object.assign(this, user); 
        this.nm = "nombre"
        this.em = "example@gmail.com"   
        this.emv = new Date(2023, 8, 14)
        this.e = 1
        this.crb = 1   
        this.urb = 1   
        
     }
}