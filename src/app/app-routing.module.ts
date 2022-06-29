import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddAgentComponent } from './admin/add-agent/add-agent.component';
import { AddCityComponent } from './admin/add-city/add-city.component';
import { AddCustomerComponent } from './admin/add-customer/add-customer.component';
import { AddEmployeeComponent } from './admin/add-employee/add-employee.component';
import { AddPlanComponent } from './admin/add-plan/add-plan.component';
import { AddSchemeComponent } from './admin/add-scheme/add-scheme.component';
import { AddStateComponent } from './admin/add-state/add-state.component';
import { AddTypeComponent } from './admin/add-type/add-type.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminModuleModule } from './admin/admin-module/admin-module.module';
import { AdminViewCustomerComponent } from './admin/admin-view-customer/admin-view-customer.component';
import { AdminViewPaymentsComponent } from './admin/admin-view-payments/admin-view-payments.component';
import { AdminComponent } from './admin/admin.component';
import { EditAdminComponent } from './admin/edit-admin/edit-admin.component';
import { ViewAgentComponent } from './admin/view-agent/view-agent.component';
import { ViewCityComponent } from './admin/view-city/view-city.component';
import { ViewEmployeeComponent } from './admin/view-employee/view-employee.component';
import { ViewPlanComponent } from './admin/view-plan/view-plan.component';
import { ViewQueriesComponent } from './admin/view-queries/view-queries.component';
import { ViewSchemeComponent } from './admin/view-scheme/view-scheme.component';
import { ViewStateComponent } from './admin/view-state/view-state.component';
import { ViewTypeComponent } from './admin/view-type/view-type.component';
import { AddEditCustomerComponent } from './agent/add-edit-customer/add-edit-customer.component';
import { AgentDashboradComponent } from './agent/agent-dashborad/agent-dashborad.component';
import { AgentLoginComponent } from './agent/agent-login/agent-login.component';
import { AgentViewPoliciesComponent } from './agent/agent-view-policies/agent-view-policies.component';
import { AgentViewPolicyDetailComponent } from './agent/agent-view-policy-detail/agent-view-policy-detail.component';
import { AgentComponent } from './agent/agent.component';
import { EditAgentComponent } from './agent/edit-agent/edit-agent.component';
import { InsuranceDetailsComponent } from './agent/insurance-details/insurance-details.component';
import { MarketingComponent } from './agent/marketing/marketing.component';
import { ViewCommissionWithdrawalComponent } from './agent/view-commission-withdrawal/view-commission-withdrawal.component';
import { ViewCommissionComponent } from './agent/view-commission/view-commission.component';
import { ViewCustomerClaimsComponent } from './agent/view-customer-claims/view-customer-claims.component';
import { ViewCustomerPaymentsComponent } from './agent/view-customer-payments/view-customer-payments.component';
import { ViewCustomersComponent } from './agent/view-customers/view-customers.component';
import { WithdrawAmountComponent } from './agent/withdraw-amount/withdraw-amount.component';
import { AppComponent } from './app.component';
import { BasicPlanComponent } from './basic-plan/basic-plan.component';
import { ConfirmPurchaseComponent } from './customer/confirm-purchase/confirm-purchase.component';
import { CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard.component';
import { CustomerEnquiryComponent } from './customer/customer-enquiry/customer-enquiry.component';
import { CustomerInsuranceDetailsComponent } from './customer/customer-insurance-details/customer-insurance-details.component';
import { CustomerLoginComponent } from './customer/customer-login/customer-login.component';
import { CustomerViewQueriesComponent } from './customer/customer-view-queries/customer-view-queries.component';
import { CustomerComponent } from './customer/customer.component';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';
import { InsurancePolicyDetailComponent } from './customer/insurance-policy-detail/insurance-policy-detail.component';
import { PlansComponent } from './customer/plans/plans.component';
import { PurchasePlanComponent } from './customer/purchase-plan/purchase-plan.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { EmployeeAddEditAgentComponent } from './employee/employee-add-edit-agent/employee-add-edit-agent.component';
import { EmployeeDashboardComponent } from './employee/employee-dashboard/employee-dashboard.component';
import { EmployeeEditCityComponent } from './employee/employee-edit-city/employee-edit-city.component';
import { EmployeeEditPlanComponent } from './employee/employee-edit-plan/employee-edit-plan.component';
import { EmployeeEditSchemeComponent } from './employee/employee-edit-scheme/employee-edit-scheme.component';
import { EmployeeEditStateComponent } from './employee/employee-edit-state/employee-edit-state.component';
import { EmployeeEditTypeComponent } from './employee/employee-edit-type/employee-edit-type.component';
import { EmployeeLoginComponent } from './employee/employee-login/employee-login.component';
import { EmployeeViewAgentComponent } from './employee/employee-view-agent/employee-view-agent.component';
import { EmployeeViewCityComponent } from './employee/employee-view-city/employee-view-city.component';
import { EmployeeViewCustomersComponent } from './employee/employee-view-customers/employee-view-customers.component';
import { EmployeeViewPaymentsComponent } from './employee/employee-view-payments/employee-view-payments.component';
import { EmployeeViewPlanComponent } from './employee/employee-view-plan/employee-view-plan.component';
import { EmployeeViewQueriesComponent } from './employee/employee-view-queries/employee-view-queries.component';
import { EmployeeViewSchemeComponent } from './employee/employee-view-scheme/employee-view-scheme.component';
import { EmployeeViewStateComponent } from './employee/employee-view-state/employee-view-state.component';
import { EmployeeViewTypeComponent } from './employee/employee-view-type/employee-view-type.component';
import { EmployeeComponent } from './employee/employee.component';
import { MainComponent } from './main/main.component';
import { PlanDetailsComponent } from './main/plan-details/plan-details.component';
import { SchemesByTitleComponent } from './main/schemes-by-title/schemes-by-title.component';


const routes: Routes = [

  {path:'BasicPlan',component:BasicPlanComponent},
  {path:'',component:MainComponent},
  {path:'AdminLogin',component:AdminLoginComponent  },
  {path:'AgentLogin',component:AgentLoginComponent  },
  {path:'EmployeeLogin',component:EmployeeLoginComponent},
  {path:'AboutUs',component:AboutUsComponent  },
  {path:'CustomerLogin',component:CustomerLoginComponent  },

  {path:'PlanDetail/:id',component:PlanDetailsComponent  },

  {path:'SchemesByTitle/:title',component:SchemesByTitleComponent  },



  {path:'Customer',component:CustomerComponent,children:[
    {path:'CustomerDashboard',component:CustomerDashboardComponent},
    {path:'Plans',component:PlansComponent},
    {path:'PurchasePlan/:schemeName',component:PurchasePlanComponent},
    {path:'ConfirmPlan',component:ConfirmPurchaseComponent},
    {path:'InsurancePolicyDetail/:id',component:InsurancePolicyDetailComponent},

    {path:'InsuranceDetails',component:CustomerInsuranceDetailsComponent},
    {path:'EditCustomer/:id',component:EditCustomerComponent},

    {path:'Enquiry',component:CustomerEnquiryComponent},
    {path:'ViewQuery',component:CustomerViewQueriesComponent},

  ]  },

  {path:'Agent',component:AgentComponent,children:[
    {path:'AgentDashboard',component:AgentDashboradComponent},
    {path:'EditAgent/:id',component:EditAgentComponent},


    {path:'ViewCustomers',component:ViewCustomersComponent},
    {path:'AddCustomer',component:AddEditCustomerComponent},
    {path:'ViewPayment',component:ViewCustomerPaymentsComponent},
    {path:'ViewInsuranceDetails',component:InsuranceDetailsComponent},    
    {path:'ViewClaims',component:ViewCustomerClaimsComponent},

    {path:'ViewCommission',component:ViewCommissionComponent},
    {path:'ViewCommssionWithdrawal',component:ViewCommissionWithdrawalComponent},
    {path:'WithdrawCommssion',component:WithdrawAmountComponent},

    {path:'Marketing',component:MarketingComponent},
    {path:'ViewPolicies',component:AgentViewPoliciesComponent},
    {path:'ViewPolicyDetail',component:AgentViewPolicyDetailComponent},










    ]},


  {path:'Employee',component:EmployeeComponent, children:[
    {path:'EmployeeDashboard',component:EmployeeDashboardComponent},
    {path:'EditEmployee/:id',component:EditEmployeeComponent},


    {path:'EditState/:id',component:EmployeeEditStateComponent  },
    {path:'ViewState',component:EmployeeViewStateComponent  },

    {path:'ViewCity',component:EmployeeViewCityComponent  },
    {path:'EditCity/:id',component:EmployeeEditCityComponent },

    {path:'ViewType',component:EmployeeViewTypeComponent},
    {path:'EditType/:id',component:EmployeeEditTypeComponent},

    {path:'ViewScheme',component:EmployeeViewSchemeComponent},
    {path:'EditScheme/:id',component:EmployeeEditSchemeComponent},

    {path:'ViewPlan',component:EmployeeViewPlanComponent  },
    {path:'EditPlan/:id',component:EmployeeEditPlanComponent},

    {path:'AddAgent',component:EmployeeAddEditAgentComponent},
    {path:'ViewAgent',component:EmployeeViewAgentComponent  },
    {path:'EditAgent/:id',component:EmployeeAddEditAgentComponent},

    {path:'ViewCustomers',component:EmployeeViewCustomersComponent},
    {path:'ViewPayments',component:EmployeeViewPaymentsComponent},
    {path:'ViewQueries',component:EmployeeViewQueriesComponent},



  ]},
  {path:'Admin',component:AdminComponent,children:[
    {path:'AdminDashboard',component:AdminDashboardComponent},
    {path:'EditAdmin/:id',component:EditAdminComponent},


    {path:'AddAgent',component:AddAgentComponent},
    {path:'ViewAgent',component:ViewAgentComponent  },
    {path:'EditAgent/:id',component:AddAgentComponent},

    {path:'ViewType',component:ViewTypeComponent},
    {path:'AddType',component:AddTypeComponent},
    {path:'EditType/:id',component:AddTypeComponent},

    {path:'AddScheme',component:AddSchemeComponent},
    {path:'ViewScheme',component:ViewSchemeComponent},
    {path:'EditScheme/:id',component:AddSchemeComponent},

    {path:'AddPlan',component:AddPlanComponent},
    {path:'EditPlan/:id',component:AddPlanComponent},
    {path:'ViewPlan',component:ViewPlanComponent  },

    {path:'AddCity',component:AddCityComponent  },
    {path:'ViewCity',component:ViewCityComponent  },
    {path:'EditCity/:id',component:AddCityComponent  },

    {path:'AddState',component:AddStateComponent  },
    {path:'ViewState',component:ViewStateComponent  },
    {path:'EditState/:id',component:AddStateComponent  },

    {path:'AddEmployee',component:AddEmployeeComponent  },
    {path:'ViewEmployee',component:ViewEmployeeComponent  },
    {path:'EditEmployee/:id',component:AddEmployeeComponent  },

    {path:'ViewCustomers',component:AdminViewCustomerComponent  },
    {path:'AddCustomer',component:AddCustomerComponent  },

    {path:'ViewPayments',component:AdminViewPaymentsComponent  },


    
    


    
    {path:'ViewQueries',component:ViewQueriesComponent}
  ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
