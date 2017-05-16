import { Routes } from '@angular/router';

import { HomeComponent } from './component/home/home.component';
import { AppreciationComponent } from './component/appreciation/appreciation.component';
import { CircularComponent } from './component/circular/circular.component';
import { ComplaintComponent } from './component/complaint/complaint.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EventComponent } from './component/events/event.component';
import { HomeworkComponent } from './component/homework/homework.component';
import { MessageComponent } from './component/message/message.component';
import { PollComponent } from './component/poll/poll.component';
import { SuggestionComponent } from './component/suggestion/suggestion.component';
import { SurveyComponent } from './component/survey/survey.component';
import { LoginComponent } from './component/login/login.component';
import { LoggedInGuard } from './component/login/login.gaurd';
import { ForgotPassword } from './component/login/forgot.password';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [LoggedInGuard] },
  { path: 'complaint', component: ComplaintComponent, canActivate: [LoggedInGuard] },
  { path: 'complaint/status/:statusId', component: ComplaintComponent},
  { path: 'complaint/category-status/category/:categoryId', component: ComplaintComponent},
  { path: 'complaint/category-status/:categoryId/:statusId', component: ComplaintComponent},
  // { path: 'edit/:complaint', component: EditComplaint},    
  { path: 'appreciation', component: AppreciationComponent, canActivate: [LoggedInGuard] },
  { path: 'circular', component: CircularComponent, canActivate: [LoggedInGuard] },
  { path: 'planner', component: EventComponent, canActivate: [LoggedInGuard] },
  { path: 'homework', component: HomeworkComponent, canActivate: [LoggedInGuard] },
  { path: 'poll', component: PollComponent, canActivate: [LoggedInGuard] },
  { path: 'survey', component: SurveyComponent, canActivate: [LoggedInGuard] },
  { path: 'conversation', component: MessageComponent, canActivate: [LoggedInGuard] },
  { path: 'suggestion', component: SuggestionComponent, canActivate:[LoggedInGuard]}  
];

