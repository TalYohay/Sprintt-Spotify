import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { PlayListsService } from '../services/play-lists.service';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { map, filter} from 'rxjs/operators';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-genre-page',
  templateUrl: './genre-page.component.html',
  styleUrls: ['./genre-page.component.css']
})
export class GenrePageComponent implements OnInit {

  genrePlaylists:any;
  genretId: any;
  genres:any= []
  matchedCatergory: any;
  selectedPlaylist: any;
  @Output() childMessageEvent = new EventEmitter<any>()


  constructor(public playListsAPI: PlayListsService, public actRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.genretId = this.actRoute.snapshot.params["id"];
    this.getGenrePlaylists();
    this.getMatchingGenre();
  }


  getGenrePlaylists(){
    this.playListsAPI.getGenrePlaylists(this.genretId).subscribe(data=>{
      this.genrePlaylists = data;
      console.log(' this.genrePlaylists:',  this.genrePlaylists)
    })
  }

  getMatchingGenre(){
    // this.playListsAPI.getGenres().pipe(map(this.genres)=>this.genres.filter(genre=>genre.id ==this.genretId))
    this.playListsAPI.getGenres().subscribe(data=>{
      this.genres = data;
      console.log("this.genres:",this.genres)
      for(let i = 0; i<this.genres.categories.length; i++){
        if (this.genres.categories[i].category_id == this.genretId){
          this.matchedCatergory = this.genres.categories[i]
          console.log("this.matchedCatergory:", this.matchedCatergory)
        }
      }
    })

    
    
  }

  getPlaylistInfo(playlist:any){
    this.playListsAPI.selectedPlaylist = playlist
    console.log("playlist:", playlist)
  }
}
