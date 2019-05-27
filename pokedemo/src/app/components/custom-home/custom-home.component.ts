import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-custom-home',
  templateUrl: './custom-home.component.html',
  styleUrls: ['./custom-home.component.css']
})
export class CustomHomeComponent implements OnInit {

  localPokemons: Array<Pokemon> = [];


  constructor( private _utils: UtilsService,) { }

  ngOnInit() {
    this.getLocalPokemon();
  }


  openDialogAdd(){
    this._utils.openDialogAdd();
  }

  getLocalPokemon(){
    let tamp = JSON.parse(localStorage.getItem('localPokemons'));
    if(tamp === null) tamp = [];
    this.localPokemons = tamp;
  }

}
