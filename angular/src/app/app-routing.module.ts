import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeBackgroundComponent } from './components/home-background/home-background.component';

const routes: Routes = [
  { path: '', component: HomeBackgroundComponent, pathMatch: 'full' },
  { path: 'main', component: HomeBackgroundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
