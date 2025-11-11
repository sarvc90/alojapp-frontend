import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './pages/home/home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
    declarations: [HomePageComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HomeRoutingModule
    ]
})
export class HomeModule {}