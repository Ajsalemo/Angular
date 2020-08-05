import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeBackgroundComponent } from './components/home-background/home-background.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeBackgroundComponent, 
    pathMatch: 'full',
    runGuardsAndResolvers: 'always' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
