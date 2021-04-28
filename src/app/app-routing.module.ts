import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrowseComponent } from './browse/browse.component';
import { LikedsongsComponent } from './likedsongs/likedsongs.component';
import {PlayListPageComponent} from './play-list-page/play-list-page.component'
import { GenrePageComponent } from './genre-page/genre-page.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'browse', component:BrowseComponent},
  {path:'likedsongs', component:LikedsongsComponent},
  {path:'playlist/:id', component:PlayListPageComponent},
  {path:'genre/:id', component:GenrePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
