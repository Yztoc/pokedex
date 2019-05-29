import { Component, OnInit, } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { UtilsService } from '../../services/utils.service';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-custom-home',
  templateUrl: './custom-home.component.html',
  styleUrls: ['./custom-home.component.css']
})
export class CustomHomeComponent implements OnInit {

  localPokemons: Array<Pokemon> = [];
 
  
  constructor( private _utils: UtilsService,
               private _storage: StorageService) { }

  ngOnInit() {
    this.getLocalPokemon();
    this.followModalAction();
  }

  openDialogAdd(){
    this._utils.openDialogAdd();
  }

  getLocalPokemon(){
    let tamp = this._storage.getStorage('localPokemons')
    if(tamp === null) tamp = [];
    this.localPokemons = tamp;
  }  

  followModalAction() {
    const s = this._storage.storageChange$.subscribe(value => {
      if(value) this.getLocalPokemon()  
    });
  }

}
