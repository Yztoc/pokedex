import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { UtilsService }from '../../services/utils.service'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() data: Pokemon;
  
  isDarkTheme: boolean = false;
  
  constructor(private _utils: UtilsService) { }

  ngOnInit() {
  }

  openDialog(name, local){
    this._utils.openDialog(name,local);
    this.isDarkTheme = this._utils.isDarkTheme();
  }
}
