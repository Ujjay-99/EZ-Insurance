import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './admin/admin.component';
import { BasicPlanComponent } from './basic-plan/basic-plan.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewQueriesComponent } from './admin/view-queries/view-queries.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AddAgentComponent } from './admin/add-agent/add-agent.component';
import { AddPlanComponent } from './admin/add-plan/add-plan.component';
import { MainComponent } from './main/main.component';
import { AddTypeComponent } from './admin/add-type/add-type.component';
import { ViewTypeComponent } from './admin/view-type/view-type.component';
import { ViewSchemeComponent } from './admin/view-scheme/view-scheme.component';
import { AddSchemeComponent } from './admin/add-scheme/add-scheme.component';
import { ViewPlanComponent } from './admin/view-plan/view-plan.component';
import { AddCityComponent } from './admin/add-city/add-city.component';
import { ViewCityComponent } from './admin/view-city/view-city.component';
import { ViewStateComponent } from './admin/view-state/view-state.component';
import { AddStateComponent } from './admin/add-state/add-state.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDataService } from './admin/admin-services/admin-data.service';
import { AuthService } from './helpers/auth.service';
import { BearerInterceptor } from './helpers/bearer.interceptor';
import { AuthGuardService } from './helpers/auth-guard.service';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AddEmployeeComponent } from './admin/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './admin/view-employee/view-employee.component';
import { ViewAgentComponent } from './admin/view-agent/view-agent.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { EmployeeLoginComponent } from './employee/employee-login/employee-login.component';
import { EmployeeDashboardComponent } from './employee/employee-dashboard/employee-dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { EditAdminComponent } from './admin/edit-admin/edit-admin.component';

import { EmployeeViewStateComponent } from './employee/employee-view-state/employee-view-state.component';
import { EmployeeEditStateComponent } from './employee/employee-edit-state/employee-edit-state.component';
import { EmployeeViewCityComponent } from './employee/employee-view-city/employee-view-city.component';
import { EmployeeEditCityComponent } from './employee/employee-edit-city/employee-edit-city.component';
import { EmployeeViewTypeComponent } from './employee/employee-view-type/employee-view-type.component';
import { EmployeeEditTypeComponent } from './employee/employee-edit-type/employee-edit-type.component';
import { EmployeeViewSchemeComponent } from './employee/employee-view-scheme/employee-view-scheme.component';
import { EmployeeEditSchemeComponent } from './employee/employee-edit-scheme/employee-edit-scheme.component';
import { EmployeeEditPlanComponent } from './employee/employee-edit-plan/employee-edit-plan.component';
import { EmployeeViewPlanComponent } from './employee/employee-view-plan/employee-view-plan.component';
import { EmployeeViewAgentComponent } from './employee/employee-view-agent/employee-view-agent.component';
import { EmployeeAddEditAgentComponent } from './employee/employee-add-edit-agent/employee-add-edit-agent.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { AgentComponent } from './agent/agent.component';
import { AgentLoginComponent } from './agent/agent-login/agent-login.component';
import { AgentDashboradComponent } from './agent/agent-dashborad/agent-dashborad.component';
import { ViewCustomersComponent } from './agent/view-customers/view-customers.component';
import { ViewCustomerPaymentsComponent } from './agent/view-customer-payments/view-customer-payments.component';
import { ViewCustomerClaimsComponent } from './agent/view-customer-claims/view-customer-claims.component';
import { ViewCommissionComponent } from './agent/view-commission/view-commission.component';
import { ViewCommissionWithdrawalComponent } from './agent/view-commission-withdrawal/view-commission-withdrawal.component';
import { WithdrawAmountComponent } from './agent/withdraw-amount/withdraw-amount.component';
import { MarketingComponent } from './agent/marketing/marketing.component';
import { EditAgentComponent } from './agent/edit-agent/edit-agent.component';
import { InsuranceDetailsComponent } from './agent/insurance-details/insurance-details.component';
import { PlanDetailsComponent } from './main/plan-details/plan-details.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerLoginComponent } from './customer/customer-login/customer-login.component';
import { CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard.component';
import { PlansComponent } from './customer/plans/plans.component';
import { CustomerInsuranceDetailsComponent } from './customer/customer-insurance-details/customer-insurance-details.component';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';
import { AddEditCustomerComponent } from './agent/add-edit-customer/add-edit-customer.component';
import { AddCustomerComponent } from './admin/add-customer/add-customer.component';
import { SchemesByTitleComponent } from './main/schemes-by-title/schemes-by-title.component';
import { PurchasePlanComponent } from './customer/purchase-plan/purchase-plan.component';
import { ConfirmPurchaseComponent } from './customer/confirm-purchase/confirm-purchase.component';
import { InsurancePolicyDetailComponent } from './customer/insurance-policy-detail/insurance-policy-detail.component';
import { OnCreateDirective } from './customer/on-create.directive';
import { EmployeeViewCustomersComponent } from './employee/employee-view-customers/employee-view-customers.component';
import { EmployeeViewPaymentsComponent } from './employee/employee-view-payments/employee-view-payments.component';
import { AdminViewCustomerComponent } from './admin/admin-view-customer/admin-view-customer.component';
import { AdminViewPaymentsComponent } from './admin/admin-view-payments/admin-view-payments.component';
import { CustomerEnquiryComponent } from './customer/customer-enquiry/customer-enquiry.component';
import { AgentService } from './agent/agent.service';
import { CustomerViewQueriesComponent } from './customer/customer-view-queries/customer-view-queries.component';
// import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    BasicPlanComponent,
    ViewQueriesComponent,
    AdminDashboardComponent,
    AddAgentComponent,
    AddPlanComponent,
    MainComponent,
    AddTypeComponent,
    ViewTypeComponent,
    ViewSchemeComponent,
    AddSchemeComponent,
    ViewPlanComponent,
    AddCityComponent,
    ViewCityComponent,
    ViewStateComponent,
    AddStateComponent,
    AdminLoginComponent,
    AddEmployeeComponent,
    ViewEmployeeComponent,
    ViewAgentComponent,
    AboutUsComponent,
    EmployeeLoginComponent,
    EmployeeDashboardComponent,
    EmployeeComponent, 
    EditAdminComponent, 
     EmployeeViewStateComponent, 
     EmployeeEditStateComponent, EmployeeViewCityComponent, EmployeeEditCityComponent, EmployeeViewTypeComponent, EmployeeEditTypeComponent, EmployeeViewSchemeComponent, EmployeeEditSchemeComponent, EmployeeEditPlanComponent, EmployeeViewPlanComponent, EmployeeViewAgentComponent, EmployeeAddEditAgentComponent, EditEmployeeComponent, AgentComponent, AgentLoginComponent, AgentDashboradComponent, ViewCustomersComponent, ViewCustomerPaymentsComponent, ViewCustomerClaimsComponent, ViewCommissionComponent, ViewCommissionWithdrawalComponent, WithdrawAmountComponent, MarketingComponent, EditAgentComponent, InsuranceDetailsComponent, PlanDetailsComponent, CustomerComponent, CustomerLoginComponent, CustomerDashboardComponent, PlansComponent, CustomerInsuranceDetailsComponent, EditCustomerComponent, AddEditCustomerComponent, AddCustomerComponent, SchemesByTitleComponent, PurchasePlanComponent, ConfirmPurchaseComponent, InsurancePolicyDetailComponent, OnCreateDirective, EmployeeViewCustomersComponent, EmployeeViewPaymentsComponent, AdminViewCustomerComponent, AdminViewPaymentsComponent, CustomerEnquiryComponent, CustomerViewQueriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,ReactiveFormsModule
  ],
  providers: [AdminDataService, AuthGuardService, AuthService,AgentService, { provide: HTTP_INTERCEPTORS, useClass: BearerInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
