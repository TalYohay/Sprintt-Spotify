import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { PlayListsService } from "../services/play-lists.service";
import { Observable, forkJoin } from "rxjs";
import { switchMap } from "rxjs/operators" // RxJS v6

@Component({
  selector: "app-play-list-page",
  templateUrl: "./play-list-page.component.html",
  styleUrls: ["./play-list-page.component.css"]
})
export class PlayListPageComponent implements OnInit {
  constructor(
    public playListsAPI: PlayListsService,
    public actRoute: ActivatedRoute
  ) {}

  playListId: any;
  playListSongs: any = [];
  searchTerm: any;
  playlists3: any = [];
  selectedSong: any = {};
  image_tracker: any = "play";
  selectedRow: any;
  nextSong:any;
  previousSong:any;
  token: any = "1072694e-6a8b-4973-9cd0-96ac1ee6e4a2";
  player = new Audio();
    test:any
    prodId:any
    test3:any
  ngOnInit(): void {
    this.playListId = this.actRoute.snapshot.params["id"];
     this.prodId = this.actRoute.snapshot.paramMap.get('id');
    console.log("Play list ID:", this.playListId);
    console.log("prodId:", this.prodId);
    this.getPlaylistSongs();
    this.combinAllAPI();
  }

  getPlaylistSongs() {
    this.playListsAPI.getSongsByPlaylistID(this.playListId).subscribe(data => {
      this.playListSongs = data;
      console.log("playListSongs:",this.playListSongs);
      console.log("playListSongs:",this.playListSongs.tracks.length);
    });
  }

  combinAllAPI() {
    let req1 = this.playListsAPI.featuredPlaylist();
    let req2 = this.playListsAPI.MoodPlaylist();
    let req3 = this.playListsAPI.RecentlyPlayed()
    forkJoin([req1, req2,req3]).subscribe((data: Object[]) => {
      this.playlists3 = data.flat(1);
      console.log(" this.playlists3:", this.playlists3);
    });
      //     for(let i=0;i<this.playlists3.length;i++){
      //       for(let j=0;j<this.playlists3.playlists.length;j++){
      //         if(this.playlists3.playlists[j].playlist_id==this.playListId){
      //           console.log(this.playlists3.playlists[j].playlist_id)
      //         }
      //       }
      // }

  }

  getSongInfo(song: any) {
    this.selectedSong = song;
    console.log(this.selectedSong);
  }

  changeImg2() {
    let image = <HTMLInputElement>document.getElementById("imgClickAndChange");
    let image2 = <HTMLInputElement>(
      document.getElementById("imgClickAndChange2")
    );
    if (this.image_tracker == "play") {
      image.src = "../assets/pause_line_icon.png";
      image2.src = "../assets/controller_icons/bar_pause.png";
      this.image_tracker = "pause";
    } else {
      image.src = "../assets/play_line_icon.png";
      image2.src = "../assets/controller_icons/bar_play.png";
      this.image_tracker = "play";
    }
  }

  setClickedRow(index: any) {
    this.selectedRow = index;
    console.log("this.selectedRow index:", this.selectedRow);

    let element = <HTMLInputElement>(
      document.getElementById("imgClickAndChange")
    );
    element.classList.remove("playBtn");
    element.classList.add("showBtn");
  }

  playNextSong(){
      // if(this.selectedSong){
      console.log(this.selectedSong)
      this.nextSong = this.playListSongs.tracks[this.selectedRow +1]
      console.log("next song:",this.nextSong.name) 
      this.selectedRow = this.selectedRow+1
      console.log(" NEW this.selectedRow index:", this.selectedRow);
    

      const token = this.playListsAPI.generateToken();
      const songUrl = `http://api.sprintt.co/spotify/play/${this.nextSong.track_id}?access=${token}`;
      this.player.src = songUrl;
      this.player.load();
      this.player.play();
      this.selectedSong=this.nextSong;
      if(this.player.ended){
        this.playNextSong()
      }
  // }
  
}


  playPreviousSong(){
      if(this.selectedSong){
      console.log(this.selectedSong)
      
      this.previousSong = this.playListSongs.tracks[this.selectedRow-1]
      console.log("previous song:",this.previousSong.name) 

      this.selectedRow = this.selectedRow-1
      console.log(" NEW this.selectedRow index:", this.selectedRow);

      const token = this.playListsAPI.generateToken();
      const songUrl = `http://api.sprintt.co/spotify/play/${this.previousSong.track_id}?access=${token}`;
      this.player.src = songUrl;
      this.player.load();
      this.player.play();
    }    
    this.selectedSong=this.previousSong;
  }


  togglePlaystateSong(id: number) {

    if (!this.selectedSong || this.selectedSong.track_id !== id) {
      const token = this.playListsAPI.generateToken();
      const songUrl = `http://api.sprintt.co/spotify/play/${id}?access=${token}`;
      this.player.src = songUrl;
      this.player.load();
      this.player.play();

    } else {
      if (this.player.paused) {
        this.player.play();
      } else {
        this.player.pause();
      }
    }

  }


}
