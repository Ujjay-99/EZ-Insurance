import { ICommission } from "./ICommission"

export interface IWithdrawAccount{
    id:string,
    agentId:string,
    totalAmount:number
    createdAt:Date
    commissions:ICommission[]
    
}