import { userType, credentialType, rolType } from "../types/types"
import { prisma } from "../libs/prisma";
export const modelUserSanitized= ((model:userType)=>{ 
    delete model.id
    return model
})

export const modelCredentialSanitized=(async (model:credentialType) =>{
    const rol = await prisma.rol.findUnique({where:{id:model.rol_id}})
    if(rol) model.rol=rol.name

        delete model.rol_id
        delete model.id
        delete model.user_id

    return model
})

export const modelUserCredentialSanitized=(async (model:any)=>{
    delete model.id
    if(!model.credentials) model.credentials={}
    else{
        const rol = await prisma.rol.findUnique({where:{id:model.credentials.rol_id}})
        if(rol) model.credentials.rol=rol.name
        delete model.credentials.id
        delete model.credentials.user_id
        delete model.credentials.rol_id
    }
    return model
})

export const modelCredentialUserSanitized=((model:any)=>{
    delete model.id
    delete model.user_id
    delete model.user.id
    return model
})


export const modelRolSanitized=((model:rolType)=>{
    delete model.id
    return model
})