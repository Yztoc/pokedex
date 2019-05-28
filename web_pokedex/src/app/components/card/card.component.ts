import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { UtilsService }from '../../services/utils.service'
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() data: Pokemon;
  
  isDarkTheme: boolean = false;
  
  constructor(private _utils: UtilsService,
              private _storage: StorageService) { }

  ngOnInit() {
  }

  openDialog(name: string, local: boolean){
    this._utils.openDialog(name,local);
    this.isDarkTheme = this._utils.isDarkTheme();
  }

  deleteLocalPokemon(name: string){
    let tamp = this._storage.getStorage('localPokemons');
    if(tamp === null) tamp = []; 
    tamp.splice(tamp.map(function(e) { return e.name; }).indexOf(name), 1);
    this._storage.store('localPokemons',JSON.stringify(tamp))
    this._storage.setStorageChange(true);

  }
}
