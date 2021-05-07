import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { PlayListsService } from "../services/play-lists.service";

@Component({
  selector: 'app-play-bar',
  templateUrl: './play-bar.component.html',
  styleUrls: ['./play-bar.component.css']
})
export class PlayBarComponent implements OnInit {

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

        this.updateProgress();
        this.playListsAPI.player.addEventListener("ended", () => {
          this.playNextSong();
        });
    
  }



  changeImg2() {
    let image2 = <HTMLInputElement>(
      document.getElementById("imgClickAndChange2")
    );
    if (!this.playListsAPI.player.paused) {
      image2.src = "../assets/controller_icons/bar_pause.png";
    } else {
      image2.src = "../assets/controller_icons/bar_play.png";
    }
  }

  
  playNextSong() {
    let image2 = <HTMLInputElement>(
      document.getElementById("imgClickAndChange2"));
    console.log(this.playListsAPI.selectedSong);

    this.playListsAPI.nextSong = this.playListsAPI.test500.tracks[this.playListsAPI.selectedRow + 1];
    console.log("next song:", this.playListsAPI.nextSong.name);
    
    this.playListsAPI.selectedRow = this.playListsAPI.selectedRow + 1;
    this.playListsAPI.index99 = this.playListsAPI.selectedRow
    console.log(" NEW this.selectedRow index:", this.playListsAPI.selectedRow);
  
    const token = this.playListsAPI.generateToken();
    const songUrl = `http://api.sprintt.co/spotify/play/${
      this.playListsAPI.nextSong.track_id
    }?access=${token}`;
    this.playListsAPI.player.src = songUrl;
    this.playListsAPI.player.load();
    this.playListsAPI.player.play();
    image2.src = "../assets/controller_icons/bar_pause.png";
    this.playListsAPI.isPlaying = true;

    (<HTMLInputElement>document.getElementById("bars")).value = "0";
    this.playListsAPI.selectedSong = this.playListsAPI.nextSong;
    console.log('this.playListsAPI.selectedSong:', this.playListsAPI.selectedSong)

    if (this.playListsAPI.player.paused) {
      this.playListsAPI.isPlaying = false;
      this.playListsAPI.player.pause();

      image2.src = "../assets/controller_icons/bar_play.png";
    } else {
      this.playListsAPI.player.play();
      this.playListsAPI.isPlaying = true;
      image2.src = "../assets/controller_icons/bar_pause.png";
    }
  
}
  playPreviousSong() {
    let image2 = <HTMLInputElement>(
      document.getElementById("imgClickAndChange2"));
    console.log(this.playListsAPI.selectedSong);
    this.playListsAPI.previousSong = this.playListsAPI.test500.tracks[this.playListsAPI.selectedRow - 1];
    console.log("previous song:", this.playListsAPI.previousSong.name);

    this.playListsAPI.selectedRow = this.playListsAPI.selectedRow - 1;
    this.playListsAPI.index99 = this.playListsAPI.selectedRow

    console.log(" NEW this.selectedRow index:", this.playListsAPI.selectedRow);

    const token = this.playListsAPI.generateToken();
    const songUrl = `http://api.sprintt.co/spotify/play/${
      this.playListsAPI.previousSong.track_id
    }?access=${token}`;
    this.playListsAPI.player.src = songUrl;
    this.playListsAPI.player.load();
    this.playListsAPI.player.play();
    (<HTMLInputElement>document.getElementById("bars")).value = "0";
    this.playListsAPI.selectedSong = this.playListsAPI.previousSong;
    this.playListsAPI.player.load();
    this.playListsAPI.player.play();
    image2.src = "../assets/controller_icons/bar_pause.png";
    this.playListsAPI.isPlaying = true;

    (<HTMLInputElement>document.getElementById("bars")).value = "0";
    this.playListsAPI.selectedSong = this.playListsAPI.previousSong;

    if (this.playListsAPI.player.paused) {
      this.playListsAPI.isPlaying = false;
      this.playListsAPI.player.pause();

      image2.src = "../assets/controller_icons/bar_play.png";
    } else {
      this.playListsAPI.player.play();
      this.playListsAPI.isPlaying = true;
      image2.src = "../assets/controller_icons/bar_pause.png";

    }

    
  }
  
  togglePlaystateSong(id: number, index: number){
    this.playListsAPI.togglePlaystateSong(id, index);
  }
  setVolume(ev: any) {
    this.playListsAPI.player.volume = ev.target.value;
    console.log(ev.target.value);
  }

  toggleMuteVolume() {
    if (this.playListsAPI.player.muted == false && this.playListsAPI.player.volume > 0) {
      this.volume = (<HTMLInputElement>(
        document.getElementById("volume1")
      )).value;
      console.log(this.volume);
      (<HTMLInputElement>document.getElementById("volume1")).value = "0";
      this.playListsAPI.player.muted = true;
    } else {
      if ((<HTMLInputElement>document.getElementById("volume1")).value == "0") {
        this.playListsAPI.player.muted = false;
        this.playListsAPI.player.volume = this.volume;
        console.log(this.playListsAPI.player.volume);
        (<HTMLInputElement>(
          document.getElementById("volume1")
        )).value = this.playListsAPI.player.volume.toString();
      }
    }
  }

  updateProgress() {
    this.playListsAPI.player.ontimeupdate = event => {
      this.seconds = Math.floor(this.playListsAPI.player.currentTime % 60);
      this.seconds = this.seconds >= 10 ? this.seconds : "0" + this.seconds;
      this.minutes = Math.floor(this.playListsAPI.player.currentTime / 60);
      this.minutes = this.minutes >= 10 ? this.minutes : "0" + this.minutes;
      this.currentTime = this.minutes + ":" + this.seconds;
 
    };
  }




}
