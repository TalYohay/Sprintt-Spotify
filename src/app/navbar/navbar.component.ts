import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentLocation:any
  menuItem:any
  menuLength:any

  constructor() { }

  ngOnInit(): void {
    // this.currentLocation = location.href;
    // this.menuItem = document.querySelectorAll('a');
    // this.menuLength = this.menuItem.length;

    // for(let i = 0; i<this.menuLength; i++){
    //   if(this.menuItem[i].href ===this.currentLocation){
    //     console.log(this.currentLocation)
    //     this.menuItem[i].classList.add("active")
    //   }
    // }
    let buttons = document.querySelectorAll('a');
    buttons.forEach(button => {button.addEventListener('click', function(){
      buttons.forEach(btn=>{
        btn.classList.remove('active');
        this.classList.add('active')
      })
    })
      
    });
  }






}
