import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PlayListsService {
  url = "http://api.sprintt.co/spotify";
  userToken = "1072694e-6a8b-4973-9cd0-96ac1ee6e4a2";
  reqAudio: any;
  selectedPlaylist: any;

  selectedSong:any;
  selectedRow:any;
  selectedLikedSongIndex:any;
  nextSong:any;
  previousSong:any;
  player = new Audio();
  playListSongs: any = [];
  index:any;
  isPlaying: boolean = false;
  playlistID:any;
  savedLocalPlaylist:any
 
  
  playlistSelectedRowTrackerA:any;
 
  currectPlayingPlaylistInfo:any = []
  currectPlayingPlaylist:any = []
  playlistSelectedRowTrackerB:any;
  constructor(public http: HttpClient) {}

  featuredPlaylist() {
    const token = "1072694e-6a8b-4973-9cd0-96ac1ee6e4a2";
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "user-access-token": token
    });

    const httpOptions = {
      headers: headers
    };
    return this.http.get(
      `https://cors.bridged.cc/http://api.sprintt.co/spotify/featured_playlists?limit=10`,
      httpOptions
    );
  }

  MoodPlaylist() {
    const token = "1072694e-6a8b-4973-9cd0-96ac1ee6e4a2";
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "user-access-token": token
    });

    const httpOptions = {
      headers: headers
    };
    return this.http.get(
      `https://cors.bridged.cc/http://api.sprintt.co/spotify/mood_playlists?limit=10`,
      httpOptions
    );
  }

  RecentlyPlayed() {
    const token = "1072694e-6a8b-4973-9cd0-96ac1ee6e4a2";
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "user-access-token": token
    });

    const httpOptions = {
      headers: headers
    };
    return this.http.get(
      `http://api.sprintt.co/spotify/recently_played_playlists?limit=10`,
      httpOptions
    );
  }

  getSongsByPlaylistID(id: any) {
    const token = "1072694e-6a8b-4973-9cd0-96ac1ee6e4a2";
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "user-access-token": token
    });

    const httpOptions = {
      headers: headers
    };
    return this.http.get(
      `http://api.sprintt.co/spotify/playlist_tracks/${id}`,
      httpOptions
    );
  }

  MarklikedSongs(id:any, status:any){
    const token = "1072694e-6a8b-4973-9cd0-96ac1ee6e4a2";
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "user-access-token":token
      
    });

    const httpOptions = {
      headers: headers
    };
    return this.http.post(`https://api.sprintt.co/spotify/liked_tracks/${id}?status=${status}`,{},httpOptions);
  }

  // const headers = new Headers({
  //   'Content-Type': 'application/json',
  //   'Authorization': `Bearer ${auth_token}`
  // });

  getLikeSongs(){
    const token = "1072694e-6a8b-4973-9cd0-96ac1ee6e4a2";
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "user-access-token": token
    });

    const httpOptions = {
      headers: headers
    };
    return this.http.get('https://api.sprintt.co/spotify/liked_tracks',httpOptions)
  }

  generateToken() {
    let date = new Date();
    let utcTime = `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
    let stringToEncrypt = `${this.userToken}===${utcTime}`;
    return btoa(stringToEncrypt);
  }

  getGenres(){
    const token = "1072694e-6a8b-4973-9cd0-96ac1ee6e4a2";
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "user-access-token": token
    });

    const httpOptions = {
      headers: headers
    };
    return this.http.get('https://api.sprintt.co/spotify/categories',httpOptions)
  }

  getGenrePlaylists(genre_id:any){
    const token = "1072694e-6a8b-4973-9cd0-96ac1ee6e4a2";
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "user-access-token": token
    });

    const httpOptions = {
      headers: headers
    };
    return this.http.get(`https://api.sprintt.co/spotify/category_playlists/${genre_id}`,httpOptions)
  }


  togglePlaystateSong(id: number, index: number) {
    let image2 = <HTMLInputElement>(
      document.getElementById("imgClickAndChange2")
    );

   

    if (!this.selectedSong || this.selectedSong.track_id !== id) {
      const token = this.generateToken();
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

      }
    }
  }





}
