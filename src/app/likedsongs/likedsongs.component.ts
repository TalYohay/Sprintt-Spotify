import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayListsService } from '../services/play-lists.service';

@Component({
  selector: 'app-likedsongs',
  templateUrl: './likedsongs.component.html',
  styleUrls: ['./likedsongs.component.css'],
})
export class LikedsongsComponent implements OnInit {
  likedSongs: any = [];
  searchTerm: any;
  selectedRow: any;
  image_tracker: string = 'play';
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

  constructor(
    public playListsAPI: PlayListsService,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getLikedSongs();
    this.updateProgress();
    localStorage.removeItem('selectedPlaylist');
    this.playListsAPI.checkParamsID = this.actRoute.snapshot.paramMap.has('id');
    console.log(this.playListsAPI.checkParamsID);
    console.log(
      this.playListsAPI.selectedRow,
      this.playListsAPI.playlistSelectedRowTrackerA,
      this.playListsAPI.playlistSelectedRowTrackerB
    );
    this.player.addEventListener('ended', () => { });
    this.playListsAPI.playlistID = this.actRoute.snapshot.params['id'];
    console.log(this.playListsAPI.selectedRow);
    console.log(this.actRoute.snapshot.params['id']);
    console.log(this.playListsAPI.playlistID);
    console.log(this.playListsAPI.LikedSongscurrectPlayingPlaylist);
    this.playListsAPI.selectedRow =
      this.playListsAPI.playlistSelectedRowTrackerA;
  }

  getLikedSongs() {
    this.playListsAPI.getLikeSongs().subscribe((data) => {
      this.playListsAPI.likedSongs = data;
      console.log(
        'this.playListsAPI.likedSongs:',
        this.playListsAPI.likedSongs
      );

      if (
        this.playListsAPI.LikedSongscurrectPlayingPlaylist == null ||
        this.playListsAPI.LikedSongscurrectPlayingPlaylist.length == 0
      ) {
        this.playListsAPI.selectedRow = null;
        console.log(this.playListsAPI.selectedRow);
      }
    });
  }

  getSongInfo(song: any) {
    this.playListsAPI.selectedSong = song;
    console.log(
      'this.playListsAPI.selectedSong:',
      this.playListsAPI.selectedSong
    );
  }

  togglePlaystateSong(id: number, index: number) {
    this.playListsAPI.togglePlaystateSong(id, index);
  }

  changeImg2() {
    let image = <HTMLInputElement>document.getElementById('imgClickAndChange');
    let image2 = <HTMLInputElement>(
      document.getElementById('imgClickAndChange2')
    );
    if (this.player.paused) {
      image.src = '../assets/pause_line_icon.png';
      image2.src = '../assets/controller_icons/bar_pause.png';
    } else {
      image.src = '../assets/play_line_icon.png';
      image2.src = '../assets/controller_icons/bar_play.png';
    }
  }

  setClickedRow(index: any) {
    this.playListsAPI.currectPlayingPlaylistInfo.playlist_id = null;
    this.playListsAPI.currectPlayingPlaylistInfo == null;
    this.playListsAPI.LikedSongscurrectPlayingPlaylist = this.playListsAPI.likedSongs.liked_tracks;
    this.playListsAPI.selectedRow = index;
    this.playListsAPI.playlistSelectedRowTrackerA = index;
    console.log(
      this.playListsAPI.currectPlayingPlaylistInfo.playlist_id, this.playListsAPI.currectPlayingPlaylistInfo
    );
  }

  setLikedSong(index: any) {
    this.selectedLikedSongIndex = index;
  }

  toggleLikedSongs(id: any) {
    for (let i = 0; i < this.likedSongs.liked_tracks.length; i++) {
      if (
        this.likedSongs.liked_tracks[i].track_id == id &&
        this.likedSongs.liked_tracks[i].is_liked == 0
      ) {
        this.likedSongs.liked_tracks[i].is_liked = 1;
        this.playListsAPI.MarklikedSongs(id, true).subscribe((data: any) => {
          console.log('added:', this.selectedLikedSongIndex);
        });
        break;
      } else if (
        this.likedSongs.liked_tracks[i].track_id == id &&
        this.likedSongs.liked_tracks[i].is_liked == 1
      ) {
        this.likedSongs.liked_tracks[i].is_liked = 0;
        this.playListsAPI.MarklikedSongs(id, false).subscribe((data: any) => {
          console.log('removed:', this.selectedLikedSongIndex);
        });
        break;
      }
    }
  }

  updateProgress() {
    this.player.ontimeupdate = (event) => {
      this.seconds = Math.floor(this.player.currentTime % 60);
      this.seconds = this.seconds >= 10 ? this.seconds : '0' + this.seconds;
      this.minutes = Math.floor(this.player.currentTime / 60);
      this.minutes = this.minutes >= 10 ? this.minutes : '0' + this.minutes;
      this.currentTime = this.minutes + ':' + this.seconds;
      //  this.cd.detectChanges()
      //  }

      // this.player.ontimeupdate = () => {

      //   this.playbackPosition = this.player.currentTime;
      //   // console.log(" this.playbackPosition",  this.playbackPosition)
      // }
    };
  }
}
