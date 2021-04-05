import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayListsService {

  url = 'http://api.sprintt.co/spotify'
  userToken = '1072694e-6a8b-4973-9cd0-96ac1ee6e4a2'
  reqAudio:any

  songTracker='play'

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




          // playSong(id:any){
          //   const getEncryptedToken = (token:any=this.token) => {
          //     let date = new Date();
          //     let utcTime = `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`
          //     let stringToEncrypt = `${token}===${utcTime}`
          //     return btoa(stringToEncrypt)
          //   }
          //   return this.http.get(`http://api.sprintt.co/spotify/play/${id}?access=${getEncryptedToken()}`)
          // }

          playSong(id:any){
   
            const getEncryptedToken = (token:any=this.userToken) => {
               let date = new Date();
               let utcTime = `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`
               let stringToEncrypt = `${token}===${utcTime}`
               console.log(stringToEncrypt)
               return btoa(stringToEncrypt)
            }
            //generate token
            const token = getEncryptedToken();
            //init mp3 stream
            const audio = new Audio(`http://api.sprintt.co/spotify/play/${id}?access=${token}`);
            // this.reqAudio = audio
            console.log(audio)
            // audio.play();
            if(this.songTracker=="play"){
              audio.play();
              this.songTracker="pause"
              console.log("Paused?:",audio.paused)
            }else{
              audio.pause();
              this.songTracker="play"
              console.log("Paused?:", audio.paused)
            }


            // if(audio.played){
            //   audio.pause();
            //   console.log('play:',audio.played)
            // }else{
            //   audio.play();
            //   console.log("pause:",audio.paused)
            // }
            
          

            
            
         }

         pauseSong(id:any){
          const getEncryptedToken = (token:any='1072694e-6a8b-4973-9cd0-96ac1ee6e4a2') => {
            let date = new Date();
            let utcTime = `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`
            let stringToEncrypt = `${token}===${utcTime}`
            console.log(stringToEncrypt)
            return btoa(stringToEncrypt)
         }
         //generate token
         const token = getEncryptedToken();
         //init mp3 stream
         const audio = new Audio(`http://api.sprintt.co/spotify/play/${id}?access=${token}`);
         
         //load new track and play it
         
         audio.pause();
      }
         }
        

      
    
  


