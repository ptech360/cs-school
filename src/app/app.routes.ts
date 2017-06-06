import { Routes } from '@angular/router';

import { HomeComponent } from './component/home/home.component';
import { AppreciationComponent } from './component/appreciation/appreciation.component';
import { CircularComponent } from './component/circular/circular.component';
import { AddCircular } from './component/circular/add/add';
import { ComplaintComponent } from './component/complaint/complaint.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EventComponent } from './component/events/event.component';
import { HomeworkComponent } from './component/homework/homework.component';
import { HomeworkAddComponent } from './component/homework/add/add';
import { CurrentHomework } from './component/homework/current/homework';
import { PassedHomework } from './component/homework/passed/homework';
import { MessageComponent } from './component/message/message.component';
import { PollComponent } from './component/poll/poll.component';
import { SuggestionComponent } from './component/suggestion/suggestion.component';
import { SurveyComponent } from './component/survey/survey.component';
import { SuggestionForMe } from './component/suggestion/suggestion.forme';
import { SuggestionByMe } from './component/suggestion/suggestion.byme';
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
  { path: 'complaint/status/:statusId', component: ComplaintComponent, canActivate: [LoggedInGuard] },
  { path: 'complaint/category-status/category/:categoryId', component: ComplaintComponent, canActivate: [LoggedInGuard] },
  { path: 'complaint/category-status/:categoryId/:statusId', component: ComplaintComponent, canActivate: [LoggedInGuard] },
  // { path: 'edit/:complaint', component: EditComplaint},    
  { path: 'appreciation', component: AppreciationComponent, canActivate: [LoggedInGuard] },
  { path: 'circular', component: CircularComponent, canActivate: [LoggedInGuard] },
  { path: 'add-circular', component:AddCircular, canActivate:[LoggedInGuard]},
  { path: 'planner', component: EventComponent, canActivate: [LoggedInGuard] },
  { path: 'homework', component: HomeworkComponent, canActivate: [LoggedInGuard],
    children:[      
      { path: 'current-homework', component:CurrentHomework, canActivate: [LoggedInGuard]},
      { path:'passed-homework', component:PassedHomework, canActivate: [LoggedInGuard]}
    ]
  },
  { path:'homework-add', component:HomeworkAddComponent, canActivate: [LoggedInGuard]},
  { path: 'poll', component: PollComponent, canActivate: [LoggedInGuard] },
  { path: 'survey', component: SurveyComponent, canActivate: [LoggedInGuard] },
  { path: 'conversation', component: MessageComponent, canActivate: [LoggedInGuard] },
  {
    path: 'suggestion', component: SuggestionComponent, canActivate: [LoggedInGuard],
    children: [
      { path: 'for-student', component: SuggestionByMe, pathMatch: 'full', canActivate: [LoggedInGuard] },
      { path: 'for-me', component: SuggestionForMe, pathMatch: 'full', canActivate: [LoggedInGuard]},
    ]
  },
  { path: 'suggestion/status/:statusId', component: SuggestionComponent, canActivate: [LoggedInGuard] },
];

