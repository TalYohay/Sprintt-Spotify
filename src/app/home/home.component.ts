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
  test: any;
  constructor(public playListsAPI:PlayListsService) { }

  ngOnInit(): void {
    this.featuredPlayList();
    this.MoodPlayList();
    this.RecentlyPlayed();

  }


  featuredPlayList(){
    this.playListsAPI.featuredPlaylist().subscribe((data)=>{
      this.FeaturedPlayLists = data;
      // console.log('featuredPlayLists:',this.FeaturedPlayLists)
    })
  }

  MoodPlayList(){
    this.playListsAPI.MoodPlaylist().subscribe((data)=>{
      this.MoodPlayLists = data;
      // console.log('MoodPlayLists:', this.MoodPlayLists)
    })
  }

  RecentlyPlayed(){
    this.playListsAPI.RecentlyPlayed().subscribe((data)=>{
      this.RecentlyPlayedList = data;
      // console.log('RecentlyPlayed:', this.RecentlyPlayedList)
    })
  }

  getPlaylistInfo(playlist:any){
    this.playListsAPI.selectedPlaylist = playlist;
    console.log("playlist:", playlist)
    localStorage.setItem("selectedPlaylist", JSON.stringify(this.playListsAPI.selectedPlaylist))

    // this.playListsAPI.listOfSelectedPlaylists.push(playlist);
    // console.log("this.playListsAPI.listOfSelectedPlaylists:", this.playListsAPI.listOfSelectedPlaylists)
  }
}
