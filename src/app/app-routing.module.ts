import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobListComponent } from './job-list/job-list.component';
import { MainPageComponent } from './main-page/main-page.component';


const routes: Routes = [
    { path: '', component: MainPageComponent },
    { path: 'jobs/:id', component: JobDetailsComponent},
    { path: 'jobs', component: JobListComponent}
    // { path: 'login', component: LoginComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}