export interface IPayment{
    accountId: string
      transactionAmount: number
      paymentAmount: number
      finalAmount: number
      isPaid: true,
      paidDate: Date
      installmentNumber:number
      id: string
      
}