import { Request,Response,Router } from 'express'
import { createUser, authUser, assignToken} from './controller'
const app=Router();

export const authRouteHandler=()=>{
    app.post("/login",loginHandler);
    app.post("/signup",signUpHandler)
    return app;
}

const loginHandler=async (req: Request,res: Response)=>{
   try{
      await authUser(req.body)
      const accessToken=await assignToken(req.body)
      if(accessToken===null) throw Error('accessToken not assigned')
      res.json({accessToken: accessToken})
   }catch(error){
       res.json({success: false,message: error})
   }
}

const signUpHandler=async (req: Request,res: Response)=>{
    try{
      await createUser(req.body)
      res.json({success: true,message: 'User Successfully created'})
    }catch(error){
        res.json({success: false,message: 'User not created'})
    }
}