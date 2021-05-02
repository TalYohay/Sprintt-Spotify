import { Component, OnInit } from '@angular/core';
import { PlayListsService } from "../services/play-lists.service";


@Component({
  selector: 'app-likedsongs',
  templateUrl: './likedsongs.component.html',
  styleUrls: ['./likedsongs.component.css']
})
export class LikedsongsComponent implements OnInit {
likedSongs:any = []
searchTerm: any;
selectedRow:any;
  image_tracker: string= "play"
  selectedSong: any;
  player = new Audio();
  playListSongs: any;
  previousSong: any;
  nextSong: any;
  selectedLikedSongIndex: any;
  isPlaying: boolean = false;
  volume: any;
  seconds: any;
  minutes: any;
  currentTime: any;

  constructor(public playListsAPI: PlayListsService) { }

  ngOnInit(): void {
    this.getLikedSongs();
    this.updateProgress();
    this.player.addEventListener("ended", () => {
      this.playNextSong();
    });
  }

  getLikedSongs(){
    this.playListsAPI.getLikeSongs().subscribe(data=>{
      this.likedSongs = data
      console.log("this.likedSongs:",this.likedSongs)
    })
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
    (<HTMLInputElement>document.getElementById("bars")).value = "0";
    this.selectedSong = this.nextSong;
  }

  playPreviousSong() {
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
  }

  togglePlaystateSong(id: number, index: number) {
    let image = <HTMLInputElement>document.getElementById("imgClickAndChange");
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
        image.classList.add("playBtn");
        image.classList.remove("pauseBtn");
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
    for (let i = 0; i < this.likedSongs.liked_tracks.length; i++) {
      if (
        this.likedSongs.liked_tracks[i].track_id == id &&
        this.likedSongs.liked_tracks[i].is_liked == 0
      ) {
        this.likedSongs.liked_tracks[i].is_liked = 1;
        this.playListsAPI.MarklikedSongs(id, true).subscribe((data: any) => {
          console.log("added:", this.selectedLikedSongIndex);
        });
        break;
      }
       else if (
        this.likedSongs.liked_tracks[i].track_id == id &&
        this.likedSongs.liked_tracks[i].is_liked == 1
      ) {
        this.likedSongs.liked_tracks[i].is_liked = 0;
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
}
