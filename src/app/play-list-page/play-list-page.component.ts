import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { PlayListsService } from "../services/play-lists.service";
import { Observable, forkJoin } from "rxjs";

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
  token: any = "1072694e-6a8b-4973-9cd0-96ac1ee6e4a2";
  player = new Audio();

  ngOnInit(): void {
    this.playListId = this.actRoute.snapshot.params["id"];
    console.log("Play list ID:", this.playListId);
    this.getPlaylistSongs();
    this.combinAllAPI();
  }

  getPlaylistSongs() {
    this.playListsAPI.getSongsByPlaylistID(this.playListId).subscribe(data => {
      this.playListSongs = data;
      console.log(this.playListSongs);
    });
  }

  combinAllAPI() {
    let req1 = this.playListsAPI.featuredPlaylist();
    let req2 = this.playListsAPI.MoodPlaylist();
    forkJoin([req1, req2]).subscribe((data: Object[]) => {
      this.playlists3 = data.flat(1);
      console.log(" this.playlists3:", this.playlists3);
    });
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
    console.log(this.selectedRow);

    let element = <HTMLInputElement>(
      document.getElementById("imgClickAndChange")
    );
    element.classList.remove("playBtn");
    element.classList.add("showBtn");
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

  pauseSong() {
    this.player.pause();
  }
}
