import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  pure:false
})
export class SearchPipe implements PipeTransform {

  transform(songs:any[], searchTerm : string): any[] {
    if(!songs || !searchTerm){
      return songs;
    }
    return songs.filter(song => 
      // tenant[type].toString().includes(searchTerm))
      (song.name.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1) ||
      (song.artists_names.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1) ||
      (song. album_name.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1) ||
       (song.release_date.toString().includes(searchTerm)))
  }

}



