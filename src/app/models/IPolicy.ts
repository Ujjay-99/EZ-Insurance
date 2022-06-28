export interface IPolicy{
    insuranceTypeTitle:string
    insuranceSchemeTitle:string
    maturityDate:Date
    policyTerm:number
    installmentsCount:number
    installmentAmount:number
    totalPremiumAmount:number
    profitRatio:number
    sumAssured:number
    agentCommission:number
    id:string
    createdAt:Date
    accountId:string
}