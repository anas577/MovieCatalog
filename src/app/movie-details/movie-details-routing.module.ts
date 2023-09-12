import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieDetailsPage } from './movie-details.page';
import {TabsPage} from "../tabs/tabs.page";

const routes: Routes = [
  {
    path: '',
    component: MovieDetailsPage,
    children: [
      {
        path: 'tab1',
        redirectTo: '/tabs/tab1',
      },
      {
        path: 'tab2',
        redirectTo: '/tabs/tab2',
      },
      {
        path: 'tab3',
        redirectTo: '/tabs/tab3',
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieDetailsPageRoutingModule {}
