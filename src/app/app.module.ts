import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{ PlayListsService } from './services/play-lists.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { BrowseComponent } from './browse/browse.component';
import { LikedsongsComponent } from './likedsongs/likedsongs.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { HttpClientModule } from '@angular/common/http';
import { PlayListPageComponent } from './play-list-page/play-list-page.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BrowseComponent,
    LikedsongsComponent,
    PlayListPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    HttpClientModule
  ],
  providers: [PlayListsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
