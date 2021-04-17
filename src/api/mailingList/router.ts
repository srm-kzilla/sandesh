import {Request,Response,Router} from 'express'
import {requestValidation} from '../../shared/middlewares/validationMiddleware'
import {createMailingListSchema} from './schema'
import {createMailingList,getMailingList} from './controller'


export const mailingListHandler=(): Router=>{
    const app=Router()
    app.post("/create",requestValidation('body',createMailingListSchema),handelCreateMails)
    app.get("/getList",handelGetMails)
    return app;
}

const handelCreateMails=async (req: Request,res: Response)=>{
    try{
        await createMailingList(req.body)
        res.json({success: true,message: 'Created New Mailing List'})
    }catch(error){
        res.json({success: false,message: error.message})
    }
}

const handelGetMails=async (req: Request,res: Response)=>{
    try{
          const mailingLists=await getMailingList()
          res.json({success: true,data: mailingLists})
    }catch(error){
        res.json({success: false,message: error.message})
    }
}