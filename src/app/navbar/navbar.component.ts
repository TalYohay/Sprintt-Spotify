import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentLocation: any
  menuItem: any
  menuLength: any

  constructor() { }

  ngOnInit(): void {



  }

  toggleActive() {
    let menutoggle = <HTMLInputElement>document.getElementById('toggle');
    let navbar = <HTMLInputElement>document.getElementById('navbar');
    menutoggle.classList.toggle('active2');
    navbar.classList.toggle('active2');
  }




}
