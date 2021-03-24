import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { VlaunchComponent } from './vlaunch.component';
import { HomeModule } from './home/home.module';
import { ProductsModule } from './products/products.module';
import { VlaunchRoutingModule } from './vlaunch-routing.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/shared/layouts/footer/footer.component';
import { FooterCategoryComponent } from 'src/app/shared/layouts/footer/footer-category/footer-category.component';
import { FooterSubscribeComponent } from 'src/app/shared/layouts/footer/footer-subscribe/footer-subscribe.component';
import { MatIconModule } from '@angular/material/icon';
import { NavigationComponent } from 'src/app/shared/layouts/navigation/navigation.component';
import { LoginComponent } from '../auth/login/login.component';
import { SectionSigninWithUsComponent } from './home/section-signin-with-us/section-signin-with-us.component';
import { RoomsModule } from './rooms/rooms.module';
import { StyletoolsModule } from './styletools/styletools.module';
import { BrandModule } from './brand/brand.module';
import { IdeasModule } from './ideas/ideas.module';
import { SitemapModule } from './sitemap/sitemap.module';
@NgModule({
  declarations: [
      VlaunchComponent,
      NavigationComponent,
      FooterComponent,
      FooterCategoryComponent,
      FooterSubscribeComponent,
      SectionSigninWithUsComponent,
      LoginComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    VlaunchRoutingModule,
    HomeModule,
    ProductsModule,
    RoomsModule,
    StyletoolsModule,
    BrandModule,
    IdeasModule,
    SitemapModule,
  ],
})
export class VlaunchModule { }