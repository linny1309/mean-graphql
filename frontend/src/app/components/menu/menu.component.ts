import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  crudElements: Array<string> = ["quotes","authors"];

  constructor() { }

  hideElements() {
    this.crudElements.forEach((elem) => {
      document.getElementById(elem).style.visibility = "hidden";
    });
  }

  showElement(id: string) {
    document.getElementById(id).style.visibility = "visible";
  }

  ngOnInit(): void {
  }

}
