import { Component, OnInit } from '@angular/core';
import { ApiService }from '../../services/api.service'
import { UtilsService }from '../../services/utils.service'
import { Pokemon } from '../../models/pokemon';
import { Sprite } from '../../models/sprite';
import { formControlBinding } from '@angular/forms/src/directives/ng_model';

interface allPokemons {
  count?: number,
  next?: any,
  previous?: any,
  results?: Array<Pokemon>
}

interface detailPokemon {
  sprites: Sprite,
  weight: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private _api: ApiService,
              private _utils: UtilsService,) { }

  search= [];
  typeaheadSingleWords = true;
  selected: string;
  limit: number = 16;
  pokemons: Array<Pokemon> = [];
  pokemonsToShow: Array<Pokemon> = [];

  ngOnInit() {
    this.getFirstPokemons();
  }

  getFirstPokemons(){
    this._api.getAllPokemons(1000).toPromise().then((res: allPokemons) =>{
      res.results.forEach((element, index) => {
        if(index < this.limit){
          this._api.getPokemon(element.name).toPromise().then((pokemon :detailPokemon) =>{
            this.pokemonsToShow.push(new Pokemon(
                                    element.name,
                                    element.url,
                                    new Sprite(pokemon.sprites.front_default,
                                                pokemon.sprites.back_default,
                                                pokemon.sprites.front_shiny,
                                                pokemon.sprites.back_shiny)));
          })
        }
        this.pokemons.push(new Pokemon(
          element.name,
          element.url,
          new Sprite(null,null,null,null)));
        this.search.push(element.name);
      });        
    });
  }

  openDialog(event){
    if(event.key == "Enter"){
      this._utils.openDialog(this.selected);
    }
  }

  setImageToPokemons(){
    for(var i=this.limit;i<(this.limit+16);i++){
      var name = this.pokemons[i].name
      var url = this.pokemons[i].url
      this._api.getPokemon(name).toPromise().then((pokemon :detailPokemon) =>{
        this.pokemonsToShow.push(new Pokemon(
                                name,
                                url,
                                new Sprite(pokemon.sprites.front_default,
                                            pokemon.sprites.back_default,
                                            pokemon.sprites.front_shiny,
                                            pokemon.sprites.back_shiny)))
      })
    }
    this.limit += 16;
  }
}
