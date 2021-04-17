import database from '../../loaders/database'
import {MailingList} from '../../shared/customTypes'
import LoggerInstance from '../../loaders/logger';
import {getCurrentDateTime} from '../../shared/utilities'

export const createMailingList=async (obj)=>{
    try{
        const mailingList : MailingList = {...obj};
        mailingList.createdOn=getCurrentDateTime()
        const result=await (await database()).collection('mailingList').findOne({name: mailingList.name})
        if(result) throw({message: 'Name Already Exists'})
        await (await database()).collection('mailingList').insertOne(mailingList)
    }catch(error){ 
        LoggerInstance.error(error)
        if(error.message==='Name Already Exists') throw(Error("Mailing List Name already Exists"))
        throw(Error("Error in Creating New Mailing List"))
    }
}

export const getMailingList=async ()=>{
    try{
       return await (await database()).collection('mailingList').find({}).toArray()
    }catch(error){
        LoggerInstance.error(error)
        throw(Error("Error in Fetching the Mailing lists"))
    }
}