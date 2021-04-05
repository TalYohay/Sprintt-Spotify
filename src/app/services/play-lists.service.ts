import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayListsService {

  url = 'http://api.sprintt.co/spotify'

  constructor(public http:HttpClient) { }



    featuredPlaylist(){
      const token = '1072694e-6a8b-4973-9cd0-96ac1ee6e4a2'
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'user-access-token': token
      });
      
      const httpOptions = {
        headers: headers
      };
      return this.http.get(`https://cors.bridged.cc/http://api.sprintt.co/spotify/featured_playlists?limit=10`, httpOptions);
      };


      MoodPlaylist(){
        const token = '1072694e-6a8b-4973-9cd0-96ac1ee6e4a2'
        let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'user-access-token': token
        });
        
        const httpOptions = {
          headers: headers
        };
        return this.http.get(`https://cors.bridged.cc/http://api.sprintt.co/spotify/mood_playlists?limit=10`, httpOptions);
        };
  
        RecentlyPlayed(){
          const token = '1072694e-6a8b-4973-9cd0-96ac1ee6e4a2'
          let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'user-access-token': token
          });
          
          const httpOptions = {
            headers: headers
          };
          return this.http.get(`http://api.sprintt.co/spotify/recently_played_playlists?limit=10`, httpOptions);
          };

          getSongsByPlaylistID(id:any){

            const token = '1072694e-6a8b-4973-9cd0-96ac1ee6e4a2'
            let headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'user-access-token': token
            });
            
            const httpOptions = {
              headers: headers
            };
            return this.http.get (`http://api.sprintt.co/spotify/playlist_tracks/${id}`, httpOptions)
          }




          playSong(id:any){
            const getEncryptedToken = (token:any='1072694e-6a8b-4973-9cd0-96ac1ee6e4a2') => {
              let date = new Date();
              let utcTime = `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`
              let stringToEncrypt = `${token}===${utcTime}`
              return btoa(stringToEncrypt)
            }
            return this.http.get(`http://api.sprintt.co/spotify/play/${id}?access=${getEncryptedToken()}`)
          }
        }

      
    
  


