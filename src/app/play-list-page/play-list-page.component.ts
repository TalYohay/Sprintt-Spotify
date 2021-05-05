import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { PlayListsService } from "../services/play-lists.service";
import { Observable, forkJoin } from "rxjs";
import { switchMap } from "rxjs/operators"; // RxJS v6

@Component({
  selector: "app-play-list-page",
  templateUrl: "./play-list-page.component.html",
  styleUrls: ["./play-list-page.component.css"]
})
export class PlayListPageComponent implements OnInit {
  
 
  constructor(
    public playListsAPI: PlayListsService,
    public actRoute: ActivatedRoute,
    public cd: ChangeDetectorRef
  ) {}
  selectedPlaylist: any;
  playListId: any;
  genrePlaylists: any = [];
  playListSongs: any = [];
  searchTerm: any;
  playlists3: any = [];
  selectedSong: any = {};
  image_tracker: any = "notLiked";
  selectedRow: any;
  selectedLikedSongIndex: any;
  nextSong: any;
  previousSong: any;
  volume: any;
  token: any = "1072694e-6a8b-4973-9cd0-96ac1ee6e4a2";
  player = new Audio();
  likedSong: any;
  currentTime: any;
  duration: any;
  progressPercent: any;
  minutes: any;
  seconds: any;
  ee: any;
  seek: any;
  playbackPosition: any;
  newPosition: any;
  bla: any;
  likedSongsArray: any = [];
  isPlaying: boolean = false;
  isLikedTrue: any = [];
  isLikedFalse: any = [];
  test10:boolean = false;

  ngOnInit(): void {
    this.playListsAPI.playlistID = this.actRoute.snapshot.params["id"];
    console.log("Play list ID:",this.playListsAPI.playlistID);
    this.getPlaylistInfo()
    // this.getPlaylistInfo(this.ee);
    this.getGenrePlaylists();
    this.getPlaylistSongs();
    // this.combinAllAPI();
    // this.playListsAPI.player.addEventListener("ended", () => {
    //   this.playNextSong();
    // });

  // this.getLikedSongs()

  }

  getPlaylistSongs() {
    this.playListsAPI.getSongsByPlaylistID(this.playListsAPI.playlistID).subscribe(data => {
      this.playListsAPI.playListSongs = data;
      console.log("playListSongs:", this.playListsAPI.playListSongs);
      // console.log("playListSongs:", this.playListSongs..tracks.length);
    });
  }

  getGenrePlaylists(){
    this.playListsAPI.getGenrePlaylists(this.playListsAPI.playlistID).subscribe(data=>{
      this.genrePlaylists = data;
      console.log(' this.genrePlaylists:',  this.genrePlaylists)
    })
  }

  combinAllAPI() {
    let req1 = this.playListsAPI.featuredPlaylist();
    let req2 = this.playListsAPI.MoodPlaylist();
    let req3 = this.playListsAPI.RecentlyPlayed();
    forkJoin([req1, req2, req3]).subscribe((data: Object[]) => {
      this.playlists3 = data.flat(1);
      console.log(" this.playlists3:", this.playlists3);
    });

  }



  getSongInfo(song: any) {
    this.playListsAPI.selectedSong = song;
    console.log("this.playListsAPI.selectedSong:",this.playListsAPI.selectedSong);
  }

  changeImg2() {
    let image = <HTMLInputElement>document.getElementById("imgClickAndChange");
    let image2 = <HTMLInputElement>(
      document.getElementById("imgClickAndChange2")
    );
    if (this.player.paused) {
      image.src = "../assets/pause_line_icon.png";
      image2.src = "../assets/controller_icons/bar_pause.png";
    } else {
      image.src = "../assets/play_line_icon.png";
      image2.src = "../assets/controller_icons/bar_play.png";
    }
  }

  setClickedRow(index: any) {
    // for(let i = 0; i<this.playListsAPI.playListSongs.tracks.length; i++){
    //   if( this.playListsAPI.selectedSong.track_id != this.playListsAPI.playListSongs.tracks[i].track_id ){
    //     console.log("FALSE")
    //   this.playListsAPI.selectedRow = null;
      
    // }else{
    //   this.playListsAPI.selectedRow = index;
    //   console.log("TRUE")
    //   break;
      
    // }
    // }
    this.playListsAPI.selectedRow = index;
  }

  setLikedSong(index: any) {
    this.selectedLikedSongIndex = index;
    // console.log(this.selectedLikedSongIndex);
  }



  togglePlaystateSong(id: number, index: number){
    this.playListsAPI.togglePlaystateSong(id, index);
  }



  toggleLikedSongs(id: any) {
    for (let i = 0; i < this.playListsAPI.playListSongs.tracks.length; i++) {
      if (
        this.playListsAPI.playListSongs.tracks[i].track_id == id &&
        this.playListsAPI.playListSongs.tracks[i].is_liked == 0
      ) {
        this.playListsAPI.playListSongs.tracks[i].is_liked = 1;
        this.playListsAPI.MarklikedSongs(id, true).subscribe((data: any) => {
          console.log("added:", this.selectedLikedSongIndex);
        });
        break;
      } else if (
        this.playListsAPI.playListSongs.tracks[i].track_id == id &&
        this.playListsAPI.playListSongs.tracks[i].is_liked == 1
      ) {
        this.playListsAPI.playListSongs.tracks[i].is_liked = 0;
        this.playListsAPI.MarklikedSongs(id, false).subscribe((data: any) => {
          console.log("removed:", this.selectedLikedSongIndex);
        });
        break;
      }
    }
  }



  getPlaylistInfo(){
    this.selectedPlaylist = this.playListsAPI.selectedPlaylist;

    console.log("this.selectedPlaylist:", this.playListsAPI.selectedPlaylist)
  }


}