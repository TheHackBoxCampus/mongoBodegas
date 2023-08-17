import "reflect-metadata"
import { classToPlain, plainToClass } from "class-transformer";
import passport from "../../passport/auth.passport.setting.js"

const verifyjwt = (decoded, cls) => {
    let copy = JSON.stringify({...decoded}); 
    let ref = JSON.stringify(classToPlain(plainToClass(cls, {}, {ignoreDecorators: true}))); 
    let verify = copy === ref; 
    return verify
}

const customAuthPassport = (cls) => (req, res, next) => {
    passport.authenticate("bearer", { session: false }, (err, decoded) => {
       if(err) res.status(500).send({status: 500, message: "Error en la autenticacion!"})
       else {
          let np = Object.entries(decoded).map(p => p[0] != "iat" && p[0] != "exp" ? p : false).filter(Boolean)
          let it = Object.fromEntries(np);
          let r = verifyjwt(it, cls)

          return r ? next() : res.status(500).send({status: 500, message: "token invalido o no es de esta categoria"});
  
        }
    })(req, res, next);
}

export {
    customAuthPassport,
    verifyjwt
}; 