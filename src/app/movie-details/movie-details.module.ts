import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieDetailsPageRoutingModule } from './movie-details-routing.module';

import { MovieDetailsPage } from './movie-details.page';
import { CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {TabsPageModule} from "../tabs/tabs.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieDetailsPageRoutingModule,
    TabsPageModule,
  ],
  declarations: [MovieDetailsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MovieDetailsPageModule {}
