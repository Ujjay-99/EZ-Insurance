import { IClaim } from "./IClaim"
import { IPayment } from "./IPayment"
import { IPolicy } from "./IPolicy"

export interface IInsuranceAccount{
    id:string
    customerId:string
    agentId:string    
    policies:IPolicy[]
    payments:IPayment[]
    claims:IClaim[]
}