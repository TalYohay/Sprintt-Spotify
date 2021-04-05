import { Component, OnInit } from '@angular/core';
import{ PlayListsService } from '../services/play-lists.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
FeaturedPlaylistPaginate:any;
RecentlyPlaylistPaginate:any;
MoodPlaylistPaginate:any;
p1:any;
p2:any;
p3:any;
p:any;
tests:any
FeaturedPlayLists:any=[]
MoodPlayLists:any=[]
RecentlyPlayedList:any=[]
  constructor(public playListsAPI:PlayListsService) { }

  ngOnInit(): void {
    this.featuredPlayList();
    this.MoodPlayList();
    this.RecentlyPlayed();

  }


  featuredPlayList(){
    this.playListsAPI.featuredPlaylist().subscribe((data)=>{
      this.FeaturedPlayLists = data;
      console.log('featuredPlayLists:',this.FeaturedPlayLists)
    })
  }

  MoodPlayList(){
    this.playListsAPI.MoodPlaylist().subscribe((data)=>{
      this.MoodPlayLists = data;
      console.log('MoodPlayLists:', this.MoodPlayLists)
    })
  }

  RecentlyPlayed(){
    this.playListsAPI.RecentlyPlayed().subscribe((data)=>{
      this.RecentlyPlayedList = data;
      console.log('RecentlyPlayed:', this.RecentlyPlayedList)
    })
  }
}
