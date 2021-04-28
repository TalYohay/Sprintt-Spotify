import { Component, OnInit } from '@angular/core';
import { PlayListsService } from '../services/play-lists.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  genresList: any = [];

  constructor(public playListsAPI: PlayListsService,) { }

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres(){
    this.playListsAPI.getGenres().subscribe(data=>{
      this.genresList = data;
      console.log("this.genresList:",this.genresList)
    })
  }

}
