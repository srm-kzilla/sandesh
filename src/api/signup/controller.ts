import { ObjectId } from 'mongodb';
import database from '../../loaders/database';
import LoggerInstance from '../../loaders/logger';
import { signUpInfo, userInfo, loginInfo} from '../../shared/customTypes';
import config from '../../config'
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

export const createUser=async (body: any)=>{
    try{
        const newUser: signUpInfo={...body};
        if(newUser.password!==newUser.confirmPass) throw Error('Passwords do not Match');
        const databaseResponse = await (await database()).collection('user').findOne({ email: newUser.email });
        if(databaseResponse!==null) throw Error('User already Exists')
        const hashedPassword=await bcrypt.hash(newUser.password,10);
        const obj={name : newUser.name,email: newUser.email,password: hashedPassword}
        const userData: userInfo={...obj}
        await(await database()).collection('user').insertOne(userData)
    }catch(error){
      LoggerInstance.error(error);
      throw Error(error);
    }
}

export const  authUser=async (body: any)=>{
    try{
        const User: loginInfo={...body};
        const databaseResponse = await (await database()).collection('user').findOne({ email: User.email });
        if(databaseResponse===null) throw Error('User does not exists')
        const check = await bcrypt.compare(User.password, databaseResponse.password);
        if(!check) throw Error("Password doesn't match")
    }catch(error){
        LoggerInstance.error(error);
        throw Error(error);
    }
}

export const assignToken=async (body: any)=>{
    try{
         const User: loginInfo={...body};
         const databaseResponse=await(await database()).collection('user').findOne({email: User.email})
         const accessToken=jwt.sign(databaseResponse._id,config.jwtSecret)
         return accessToken;
    }catch(error){
        LoggerInstance.error(error);
        throw Error(error);
    }
}

