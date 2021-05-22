import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PlayListsService } from '../services/play-lists.service';

@Component({
  selector: 'app-play-bar',
  templateUrl: './play-bar.component.html',
  styleUrls: ['./play-bar.component.css'],
})
export class PlayBarComponent implements OnInit {
  constructor(
    public playListsAPI: PlayListsService,
    public actRoute: ActivatedRoute,
    public cd: ChangeDetectorRef
  ) { }

  selectedPlaylist: any;
  playListId: any;
  genrePlaylists: any = [];
  playListSongs: any = [];
  searchTerm: any;
  selectedSong: any = {};
  image_tracker: any = 'notLiked';
  selectedRow: any;
  selectedLikedSongIndex: any;
  nextSong: any;
  previousSong: any;
  volume: any;
  token: any = '1072694e-6a8b-4973-9cd0-96ac1ee6e4a2';
  player = new Audio();
  likedSong: any;
  currentTime: any;
  duration: any;
  progressPercent: any;
  minutes: any;
  seconds: any;

  playbackPosition: any;

  likedSongsArray: any = [];
  isPlaying: boolean = false;

  ngOnInit(): void {
    this.updateProgress();
    this.playListsAPI.player.addEventListener('ended', () => {
      this.playNextSong();
    });
  }

  changeImg2() {
    let image2 = <HTMLInputElement>(
      document.getElementById('imgClickAndChange2')
    );
    if (!this.playListsAPI.player.paused) {
      image2.src = '../assets/controller_icons/bar_pause.png';
    } else {
      image2.src = '../assets/controller_icons/bar_play.png';
    }
  }

  playNextSong() {
    if (
      this.playListsAPI.currectPlayingPlaylist != null ||
      this.playListsAPI.LikedSongscurrectPlayingPlaylist != null
    ) {
      if (
        this.playListsAPI.currectPlayingPlaylistInfo.playlist_id != undefined &&
        this.playListsAPI.playlistID != undefined &&
        this.playListsAPI.currectPlayingPlaylistInfo.playlist_id == this.playListsAPI.playlistID
      ) {
        this.playListsAPI.LikedSongscurrectPlayingPlaylist = null;
        this.playListsAPI.nextSong = this.playListsAPI.currectPlayingPlaylist.tracks[this.playListsAPI.selectedRow + 1];
        this.playListsAPI.selectedRow = this.playListsAPI.selectedRow + 1;
        this.playListsAPI.playlistSelectedRowTrackerA = this.playListsAPI.selectedRow;
        console.log(
          this.playListsAPI.selectedRow,
          this.playListsAPI.playlistSelectedRowTrackerA
        );
      } else if (
        (this.playListsAPI.currectPlayingPlaylistInfo.playlist_id !=
          undefined &&
          this.playListsAPI.playlistID != undefined) ||
        (this.playListsAPI.playlistID == undefined &&
          this.playListsAPI.currectPlayingPlaylistInfo.playlist_id !=
          this.playListsAPI.playlistID)
      ) {
        if (
          this.playListsAPI.checkParamsID == false ||
          this.playListsAPI.checkParamsID == true ||
          this.playListsAPI.playlistID == undefined
        ) {
          this.playListsAPI.selectedRow = null;
          this.playListsAPI.nextSong =
            this.playListsAPI.currectPlayingPlaylist.tracks[this.playListsAPI.playlistSelectedRowTrackerA + 1];
          this.playListsAPI.playlistSelectedRowTrackerA = this.playListsAPI.playlistSelectedRowTrackerA + 1;
          console.log(
            this.playListsAPI.selectedRow,
            this.playListsAPI.playlistSelectedRowTrackerA,
            this.playListsAPI.playlistSelectedRowTrackerB
          );
        }
      } else if (
        this.playListsAPI.LikedSongscurrectPlayingPlaylist.length > 0
      ) {
        if (this.playListsAPI.checkParamsID == false) {
          console.log(
            this.playListsAPI.LikedSongscurrectPlayingPlaylist.length
          );
          this.playListsAPI.currectPlayingPlaylist = null;
          this.playListsAPI.currectPlayingPlaylistInfo.playlist_id = null;
          this.playListsAPI.selectedRow =
            this.playListsAPI.playlistSelectedRowTrackerA;
          this.playListsAPI.nextSong =
            this.playListsAPI.LikedSongscurrectPlayingPlaylist[
            this.playListsAPI.selectedRow + 1
            ];
          this.playListsAPI.selectedRow = this.playListsAPI.selectedRow + 1;
          this.playListsAPI.playlistSelectedRowTrackerA = this.playListsAPI.selectedRow;
          console.log(
            this.playListsAPI.selectedRow,
            this.playListsAPI.playlistSelectedRowTrackerA
          );
        } else {
          this.playListsAPI.currectPlayingPlaylist = null;
          this.playListsAPI.currectPlayingPlaylistInfo.playlist_id = null;
          this.playListsAPI.nextSong = this.playListsAPI.LikedSongscurrectPlayingPlaylist[this.playListsAPI.playlistSelectedRowTrackerA + 1];
          this.playListsAPI.playlistSelectedRowTrackerA = this.playListsAPI.playlistSelectedRowTrackerA + 1;
        }
      }
    }

    let image2 = <HTMLInputElement>(
      document.getElementById('imgClickAndChange2')
    );

    const token = this.playListsAPI.generateToken();
    const songUrl = `http://api.sprintt.co/spotify/play/${this.playListsAPI.nextSong.track_id}?access=${token}`;
    this.playListsAPI.player.src = songUrl;
    this.playListsAPI.player.load();
    this.playListsAPI.player.play();
    image2.src = '../assets/controller_icons/bar_pause.png';
    this.playListsAPI.isPlaying = true;

    (<HTMLInputElement>document.getElementById('bars')).value = '0';
    this.playListsAPI.selectedSong = this.playListsAPI.nextSong;
    console.log(
      'this.playListsAPI.selectedSong:',
      this.playListsAPI.selectedSong
    );

    if (this.playListsAPI.player.paused) {
      this.playListsAPI.isPlaying = false;
      this.playListsAPI.player.pause();

      image2.src = '../assets/controller_icons/bar_play.png';
    } else {
      this.playListsAPI.player.play();
      this.playListsAPI.isPlaying = true;
      image2.src = '../assets/controller_icons/bar_pause.png';
    }
  }

  playPreviousSong() {
    if (
      this.playListsAPI.currectPlayingPlaylist != null ||
      this.playListsAPI.LikedSongscurrectPlayingPlaylist != null
    ) {
      if (
        this.playListsAPI.currectPlayingPlaylistInfo.playlist_id != undefined &&
        this.playListsAPI.playlistID != undefined &&
        this.playListsAPI.currectPlayingPlaylistInfo.playlist_id == this.playListsAPI.playlistID
      ) {
        this.playListsAPI.LikedSongscurrectPlayingPlaylist = null;
        this.playListsAPI.previousSong = this.playListsAPI.currectPlayingPlaylist.tracks[this.playListsAPI.selectedRow - 1];
        this.playListsAPI.selectedRow = this.playListsAPI.selectedRow - 1;
        this.playListsAPI.playlistSelectedRowTrackerA = this.playListsAPI.selectedRow;
        console.log(
          this.playListsAPI.selectedRow,
          this.playListsAPI.playlistSelectedRowTrackerA
        );
      } else if (
        (this.playListsAPI.currectPlayingPlaylistInfo.playlist_id !=
          undefined &&
          this.playListsAPI.playlistID != undefined) ||
        (this.playListsAPI.playlistID == undefined &&
          this.playListsAPI.currectPlayingPlaylistInfo.playlist_id !=
          this.playListsAPI.playlistID)
      ) {
        if (
          this.playListsAPI.checkParamsID == false ||
          this.playListsAPI.checkParamsID == true ||
          this.playListsAPI.playlistID == undefined
        ) {
          this.playListsAPI.selectedRow = null;
          this.playListsAPI.previousSong = this.playListsAPI.currectPlayingPlaylist.tracks[this.playListsAPI.playlistSelectedRowTrackerA - 1];
          this.playListsAPI.playlistSelectedRowTrackerA = this.playListsAPI.playlistSelectedRowTrackerA - 1;
          console.log(
            this.playListsAPI.selectedRow,
            this.playListsAPI.playlistSelectedRowTrackerA,
            this.playListsAPI.playlistSelectedRowTrackerB
          );
        }
      } else if (
        this.playListsAPI.LikedSongscurrectPlayingPlaylist.length > 0
      ) {
        if (this.playListsAPI.checkParamsID == false) {
          console.log(
            this.playListsAPI.LikedSongscurrectPlayingPlaylist.length
          );
          this.playListsAPI.currectPlayingPlaylist = null;
          this.playListsAPI.currectPlayingPlaylistInfo.playlist_id = null;
          this.playListsAPI.selectedRow = this.playListsAPI.playlistSelectedRowTrackerA;
          this.playListsAPI.previousSong = this.playListsAPI.LikedSongscurrectPlayingPlaylist[this.playListsAPI.selectedRow - 1];
          this.playListsAPI.selectedRow = this.playListsAPI.selectedRow - 1;
          this.playListsAPI.playlistSelectedRowTrackerA = this.playListsAPI.selectedRow;
          console.log(
            this.playListsAPI.selectedRow,
            this.playListsAPI.playlistSelectedRowTrackerA
          );
        } else {
          this.playListsAPI.currectPlayingPlaylist = null;
          this.playListsAPI.currectPlayingPlaylistInfo.playlist_id = null;
          this.playListsAPI.previousSong =
            this.playListsAPI.LikedSongscurrectPlayingPlaylist[this.playListsAPI.playlistSelectedRowTrackerA - 1];
          this.playListsAPI.playlistSelectedRowTrackerA = this.playListsAPI.playlistSelectedRowTrackerA - 1;
        }
      }
    }

    let image2 = <HTMLInputElement>(
      document.getElementById('imgClickAndChange2')
    );

    const token = this.playListsAPI.generateToken();
    const songUrl = `http://api.sprintt.co/spotify/play/${this.playListsAPI.previousSong.track_id}?access=${token}`;
    this.playListsAPI.player.src = songUrl;
    this.playListsAPI.player.load();
    this.playListsAPI.player.play();
    image2.src = '../assets/controller_icons/bar_pause.png';
    this.playListsAPI.isPlaying = true;

    (<HTMLInputElement>document.getElementById('bars')).value = '0';
    this.playListsAPI.selectedSong = this.playListsAPI.previousSong;
    console.log(
      'this.playListsAPI.selectedSong:',
      this.playListsAPI.selectedSong
    );

    if (this.playListsAPI.player.paused) {
      this.playListsAPI.isPlaying = false;
      this.playListsAPI.player.pause();

      image2.src = '../assets/controller_icons/bar_play.png';
    } else {
      this.playListsAPI.player.play();
      this.playListsAPI.isPlaying = true;
      image2.src = '../assets/controller_icons/bar_pause.png';
    }
  }

  togglePlaystateSong(id: number, index: number) {
    this.playListsAPI.togglePlaystateSong(id, index);
  }
  setVolume(ev: any) {
    this.playListsAPI.player.volume = ev.target.value;
    console.log(ev.target.value);
  }

  toggleMuteVolume() {
    if (
      this.playListsAPI.player.muted == false && this.playListsAPI.player.volume > 0
    ) {
      this.volume = (<HTMLInputElement>(
        document.getElementById('volume1')
      )).value;
      console.log(this.volume);
      (<HTMLInputElement>document.getElementById('volume1')).value = '0';
      this.playListsAPI.player.muted = true;
    } else {
      if ((<HTMLInputElement>document.getElementById('volume1')).value == '0') {
        this.playListsAPI.player.muted = false;
        this.playListsAPI.player.volume = this.volume;
        console.log(this.playListsAPI.player.volume);
        (<HTMLInputElement>document.getElementById('volume1')).value =
          this.playListsAPI.player.volume.toString();
      }
    }
  }

  updateProgress() {
    this.playListsAPI.player.ontimeupdate = (event) => {
      this.seconds = Math.floor(this.playListsAPI.player.currentTime % 60);
      this.seconds = this.seconds >= 10 ? this.seconds : '0' + this.seconds;
      this.minutes = Math.floor(this.playListsAPI.player.currentTime / 60);
      this.minutes = this.minutes >= 10 ? this.minutes : '0' + this.minutes;
      this.currentTime = this.minutes + ':' + this.seconds;
    };
  }
}
