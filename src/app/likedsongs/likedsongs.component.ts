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

  constructor(public playListsAPI: PlayListsService) { }

  ngOnInit(): void {
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

  }

  playNextSong(){
  
    if(this.selectedSong){
      console.log(this.selectedSong)
      this.nextSong = this.likedSongs.liked_tracks[this.selectedRow +1]
      console.log("next song:",this.nextSong.name) 
      this.selectedRow = this.selectedRow+1
      console.log(" NEW this.selectedRow index:", this.selectedRow);
    

      const token = this.playListsAPI.generateToken();
      const songUrl = `http://api.sprintt.co/spotify/play/${this.nextSong.track_id}?access=${token}`;
      this.player.src = songUrl;
      this.player.load();
      this.player.play();
      this.selectedSong=this.nextSong;
    }
     
}


  playPreviousSong(){
      
      console.log(this.selectedSong)
      
      this.previousSong = this.likedSongs.liked_tracks[this.selectedRow-1]
      console.log("previous song:",this.previousSong.name) 

      this.selectedRow = this.selectedRow-1
      console.log(" NEW this.selectedRow index:", this.selectedRow);

      const token = this.playListsAPI.generateToken();
      const songUrl = `http://api.sprintt.co/spotify/play/${this.previousSong.track_id}?access=${token}`;
      this.player.src = songUrl;
      this.player.load();
      this.player.play();
   
    this.selectedSong=this.previousSong;
  }


  togglePlaystateSong(id: number) {

    if (!this.selectedSong || this.selectedSong.track_id !== id) {
      const token = this.playListsAPI.generateToken();
      const songUrl = `http://api.sprintt.co/spotify/play/${id}?access=${token}`;
      this.player.src = songUrl;
      this.player.load();
      this.player.play();
      if(this.player.onended){
        console.log("this.player.onended:",this.player.onended)
        this.player.addEventListener("ended", this.playNextSong)
      }
    } else {
      if (this.player.paused) {
        this.player.play();

      } else {
        this.player.pause();
      }
    }
  }
}
