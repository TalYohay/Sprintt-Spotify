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
    this.playListId = this.actRoute.snapshot.params["id"];
    console.log("Play list ID:", this.playListId);
    this.getPlaylistInfo()
    // this.getPlaylistInfo(this.ee);
    this.getGenrePlaylists();
    this.getPlaylistSongs();
    this.combinAllAPI();
    this.updateProgress();
    this.player.addEventListener("ended", () => {
      this.playNextSong();
    });

  // this.getLikedSongs()

  }

  getPlaylistSongs() {
    this.playListsAPI.getSongsByPlaylistID(this.playListId).subscribe(data => {
      this.playListSongs = data;
      console.log("playListSongs:", this.playListSongs);
      // console.log("playListSongs:", this.playListSongs..tracks.length);
    });
  }

  getGenrePlaylists(){
    this.playListsAPI.getGenrePlaylists(this.playListId).subscribe(data=>{
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
    //     for(let i=0;i<this.playlists3.length;i++){
    //       for(let j=0;j<this.playlists3.playlists.length;j++){
    //         if(this.playlists3.playlists[j].playlist_id==this.playListId){
    //           console.log(this.playlists3.playlists[j].playlist_id)
    //         }
    //       }
    // }
  }

// getLikedSongs(){
//   this.playListsAPI.getLikeSongs().subscribe(data => {
//     this.likedSongsArray = data;
//     console.log("this.likedSongsArray:", this.likedSongsArray)
//     console.log("this.likedSongsArray.liked_tracks.length:",this.likedSongsArray.liked_tracks.length)
//   });
// }

  getSongInfo(song: any) {
    this.selectedSong = song;
    console.log(this.selectedSong);
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
    this.selectedRow = index;
  }

  setLikedSong(index: any) {
    this.selectedLikedSongIndex = index;
    // console.log(this.selectedLikedSongIndex);
  }

  playNextSong() {
    let image2 = <HTMLInputElement>(
      document.getElementById("imgClickAndChange2"));
    console.log(this.selectedSong);
    this.nextSong = this.playListSongs.tracks[this.selectedRow + 1];
    console.log("next song:", this.nextSong.name);
    this.selectedRow = this.selectedRow + 1;
    console.log(" NEW this.selectedRow index:", this.selectedRow);

    const token = this.playListsAPI.generateToken();
    const songUrl = `http://api.sprintt.co/spotify/play/${
      this.nextSong.track_id
    }?access=${token}`;
    this.player.src = songUrl;
    this.player.load();
    this.player.play();
    image2.src = "../assets/controller_icons/bar_pause.png";
    this.isPlaying = true;

    (<HTMLInputElement>document.getElementById("bars")).value = "0";
    this.selectedSong = this.nextSong;

    if (this.player.paused) {
      this.isPlaying = false;
      this.player.pause();

      image2.src = "../assets/controller_icons/bar_play.png";
    } else {
      this.player.play();
      this.isPlaying = true;
      image2.src = "../assets/controller_icons/bar_pause.png";
      // image.classList.add("playBtn");
      // image.classList.remove("pauseBtn");
    }
  }

  playPreviousSong() {
    let image2 = <HTMLInputElement>(
      document.getElementById("imgClickAndChange2"));
    console.log(this.selectedSong);
    this.previousSong = this.playListSongs.tracks[this.selectedRow - 1];
    console.log("previous song:", this.previousSong.name);

    this.selectedRow = this.selectedRow - 1;
    console.log(" NEW this.selectedRow index:", this.selectedRow);

    const token = this.playListsAPI.generateToken();
    const songUrl = `http://api.sprintt.co/spotify/play/${
      this.previousSong.track_id
    }?access=${token}`;
    this.player.src = songUrl;
    this.player.load();
    this.player.play();
    (<HTMLInputElement>document.getElementById("bars")).value = "0";
    this.selectedSong = this.previousSong;
    this.player.load();
    this.player.play();
    image2.src = "../assets/controller_icons/bar_pause.png";
    this.isPlaying = true;

    (<HTMLInputElement>document.getElementById("bars")).value = "0";
    this.selectedSong = this.previousSong;

    if (this.player.paused) {
      this.isPlaying = false;
      this.player.pause();

      image2.src = "../assets/controller_icons/bar_play.png";
    } else {
      this.player.play();
      this.isPlaying = true;
      image2.src = "../assets/controller_icons/bar_pause.png";
      // image.classList.add("playBtn");
      // image.classList.remove("pauseBtn");
    }

    
  }

  togglePlaystateSong(id: number, index: number) {
    // let image = <HTMLInputElement>document.getElementById("imgClickAndChange");
    let image2 = <HTMLInputElement>(
      document.getElementById("imgClickAndChange2")
    );

    if (!this.selectedSong || this.selectedSong.track_id !== id) {
      const token = this.playListsAPI.generateToken();
      const songUrl = `http://api.sprintt.co/spotify/play/${id}?access=${token}`;
      this.player.src = songUrl;
      this.player.load();
      this.player.play();
      console.log("row's index:", index);
      this.isPlaying = true;
      this.test10 = true;
      image2.src = "../assets/controller_icons/bar_pause.png";
    } else {
      if (this.player.paused) {
        this.isPlaying = true;
        this.player.play();

        image2.src = "../assets/controller_icons/bar_pause.png";
      } else {
        this.player.pause();
        this.isPlaying = false;
        image2.src = "../assets/controller_icons/bar_play.png";
        // image.classList.add("playBtn");
        // image.classList.remove("pauseBtn");
      }
    }
  }

  setVolume(ev: any) {
    this.player.volume = ev.target.value;
    console.log(ev.target.value);
  }

  toggleMuteVolume() {
    if (this.player.muted == false && this.player.volume > 0) {
      this.volume = (<HTMLInputElement>(
        document.getElementById("volume1")
      )).value;
      console.log(this.volume);
      (<HTMLInputElement>document.getElementById("volume1")).value = "0";
      this.player.muted = true;
    } else {
      if ((<HTMLInputElement>document.getElementById("volume1")).value == "0") {
        this.player.muted = false;
        this.player.volume = this.volume;
        console.log(this.player.volume);
        (<HTMLInputElement>(
          document.getElementById("volume1")
        )).value = this.player.volume.toString();
      }
    }
  }


  toggleLikedSongs(id: any) {
    for (let i = 0; i < this.playListSongs.tracks.length; i++) {
      if (
        this.playListSongs.tracks[i].track_id == id &&
        this.playListSongs.tracks[i].is_liked == 0
      ) {
        this.playListSongs.tracks[i].is_liked = 1;
        this.playListsAPI.MarklikedSongs(id, true).subscribe((data: any) => {
          console.log("added:", this.selectedLikedSongIndex);
        });
        break;
      } else if (
        this.playListSongs.tracks[i].track_id == id &&
        this.playListSongs.tracks[i].is_liked == 1
      ) {
        this.playListSongs.tracks[i].is_liked = 0;
        this.playListsAPI.MarklikedSongs(id, false).subscribe((data: any) => {
          console.log("removed:", this.selectedLikedSongIndex);
        });
        break;
      }
    }
  }

  updateProgress() {
    this.player.ontimeupdate = event => {
      this.seconds = Math.floor(this.player.currentTime % 60);
      this.seconds = this.seconds >= 10 ? this.seconds : "0" + this.seconds;
      this.minutes = Math.floor(this.player.currentTime / 60);
      this.minutes = this.minutes >= 10 ? this.minutes : "0" + this.minutes;
      this.currentTime = this.minutes + ":" + this.seconds;
      //  this.cd.detectChanges()
      //  }

      // this.player.ontimeupdate = () => {

      //   this.playbackPosition = this.player.currentTime;
      //   // console.log(" this.playbackPosition",  this.playbackPosition)
      // }
    };
  }
  setProgress(ev: any) {
    this.selectedSong.currentTime = ev.target.value;
    console.log(
      "this.selectedSong.currentTime:",
      this.selectedSong.currentTime
    );
    (<HTMLInputElement>(
      document.getElementById("bars")
    )).value = this.selectedSong.currentTime;
    console.log(<HTMLInputElement>document.getElementById("bars"));
    this.player.currentTime = parseInt(ev.target.value);
    console.log("his.player.currentTime:", this.player.currentTime);
  }

  getPlaylistInfo(){
    this.selectedPlaylist = this.playListsAPI.selectedPlaylist;
    console.log("this.selectedPlaylist:", this.selectedPlaylist)
  }
}


