import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PlayListsService } from '../services/play-lists.service';
import { Observable, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators'; // RxJS v6

@Component({
  selector: 'app-play-list-page',
  templateUrl: './play-list-page.component.html',
  styleUrls: ['./play-list-page.component.css'],
})
export class PlayListPageComponent implements OnInit {
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
  playlists3: any = [];
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
  likedSongsArray: any = [];
  isPlaying: boolean = false;
  test: any;
  test10: any;

  ngOnInit(): void {
    console.log('WATCH THIS!!', this.playListsAPI.selectedRow);

    this.playListsAPI.playlistID = this.actRoute.snapshot.params['id'];
    console.log('Play list ID:', this.playListsAPI.playlistID);
    this.playListsAPI.checkParamsID = this.actRoute.snapshot.paramMap.has('id');
    this.getPlaylistInfo();
    this.getPlaylistSongs();
    this.compareID();
  }

  getPlaylistSongs() {
    this.playListsAPI
      .getSongsByPlaylistID(this.playListsAPI.playlistID)
      .subscribe((data) => {
        this.playListsAPI.playListSongs = data;
        console.log('playListSongs:', this.playListsAPI.playListSongs);
      });
  }

  getGenrePlaylists() {
    this.playListsAPI
      .getGenrePlaylists(this.playListsAPI.playlistID)
      .subscribe((data) => {
        this.genrePlaylists = data;
        console.log(' this.genrePlaylists:', this.genrePlaylists);
      });
  }

  getSongInfo(song: any) {
    this.playListsAPI.selectedSong = song;
    console.log(
      'this.playListsAPI.selectedSong:',
      this.playListsAPI.selectedSong
    );
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
    this.playListsAPI.LikedSongscurrectPlayingPlaylist = null;
    console.log(
      'this.playListsAPI.LikedSongscurrectPlayingPlaylist:',
      this.playListsAPI.LikedSongscurrectPlayingPlaylist
    );
    this.playListsAPI.selectedRow = index;
    this.playListsAPI.playlistSelectedRowTrackerA = index;
    if (this.playListsAPI.selectedPlaylist != undefined) {
      this.playListsAPI.currectPlayingPlaylistInfo =
        this.playListsAPI.selectedPlaylist;
    } else {
      this.playListsAPI.currectPlayingPlaylistInfo =
        localStorage.getItem('selectedPlaylist');
      this.playListsAPI.currectPlayingPlaylistInfo = JSON.parse(
        this.playListsAPI.currectPlayingPlaylistInfo
      );
      console.log(
        'this.playListsAPI.currectPlayingPlaylistInfo:',
        this.playListsAPI.currectPlayingPlaylistInfo
      );
      this.playListsAPI.currectPlayingPlaylist =
        this.playListsAPI.playListSongs;
      console.log(
        'this.playListsAPI.currectPlayingPlaylist:',
        this.playListsAPI.currectPlayingPlaylist
      );
    }

    this.playListsAPI.currectPlayingPlaylistInfo.playlist_id =
      this.actRoute.snapshot.params['id'];

    console.log(
      'this.playListsAPI.currectPlayingPlaylistInfo:',
      this.playListsAPI.currectPlayingPlaylistInfo
    );
    this.playListsAPI
      .getSongsByPlaylistID(
        this.playListsAPI.currectPlayingPlaylistInfo.playlist_id
      )
      .subscribe((data) => {
        this.playListsAPI.currectPlayingPlaylist = data;
        console.log(
          'this.playListsAPI.currectPlayingPlaylist:',
          this.playListsAPI.currectPlayingPlaylist
        );
      });
  }

  compareID() {
    this.playListsAPI.savedLocalPlaylist =
      localStorage.getItem('selectedPlaylist');
    this.playListsAPI.savedLocalPlaylist = JSON.parse(
      this.playListsAPI.savedLocalPlaylist
    );
    console.log(
      'this.playListsAPI.test:',
      this.playListsAPI.savedLocalPlaylist.image_url
    );

    if (
      this.playListsAPI.currectPlayingPlaylistInfo.playlist_id == this.actRoute.snapshot.params['id']
    ) {
      this.playListsAPI.selectedRow = this.playListsAPI.playlistSelectedRowTrackerA;
    } else {
      console.log(
        'this.playListsAPI.selectedRow:',
        this.playListsAPI.selectedRow
      );
      this.playListsAPI.selectedRow = null;
      console.log(
        'this.playListsAPI.selectedRow:',
        this.playListsAPI.selectedRow,
        'this.playListsAPI.playlistSelectedRowTrackerA:',
        this.playListsAPI.playlistSelectedRowTrackerA,
        'this.playListsAPI.playlistSelectedRowTrackerB :',
        this.playListsAPI.playlistSelectedRowTrackerB
      );
    }
    console.log(
      'this.playListsAPI.currectPlayingPlaylistInfo:',
      this.playListsAPI.currectPlayingPlaylistInfo
    );
    console.log(
      'this.playListsAPI.selectedPlaylist:',
      this.playListsAPI.selectedPlaylist
    );
  }

  setLikedSong(index: any) {
    this.selectedLikedSongIndex = index;
  }

  togglePlaystateSong(id: number, index: number) {
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
          console.log('added:', this.selectedLikedSongIndex);
        });
        break;
      } else if (
        this.playListsAPI.playListSongs.tracks[i].track_id == id &&
        this.playListsAPI.playListSongs.tracks[i].is_liked == 1
      ) {
        this.playListsAPI.playListSongs.tracks[i].is_liked = 0;
        this.playListsAPI.MarklikedSongs(id, false).subscribe((data: any) => {
          console.log('removed:', this.selectedLikedSongIndex);
        });
        break;
      }
    }
  }

  getPlaylistInfo() {
    this.selectedPlaylist = this.playListsAPI.selectedPlaylist;
    console.log('this.selectedPlaylist:', this.playListsAPI.selectedPlaylist);
  }
}
