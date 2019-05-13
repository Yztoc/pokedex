import { FilterPokemonPipePipe } from '../../services/filter-pokemon--pipe.pipe';
import { formControlBinding } from '@angular/forms/src/directives/ng_model';
import { Component, OnInit, HostListener } from '@angular/core';
import { UtilsService }from '../../services/utils.service'
import { ApiService }from '../../services/api.service'
import { Pokemon } from '../../models/pokemon';
import { Ability } from '../../models/ability';
import { Sprite } from '../../models/sprite';
import { Stat } from '../../models/stat';
import { Type } from '../../models/type';

interface allPokemons {
  count?: number,
  next?: any,
  previous?: any,
  results?: Array<Pokemon>
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
  isShowMore: boolean = false;
  limit: number = 16;
  pokemons: Array<Pokemon> = [];
  pokemonsToShow: Array<Pokemon> = [];

  ngOnInit() {
    this.getFirstPokemons();
  }


  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    console.log("TOP  : " + document.documentElement.scrollTop )
    console.log("OFFSET  : " + document.documentElement.offsetHeight)
    console.log("POSITION : " + pos + " MAX :" + max)
    if(pos == max )   {
      console.log('ici');
    }
  }

  getFirstPokemons(){
    this._api.getAllPokemons(1000).toPromise().then((res: allPokemons) =>{
      res.results.forEach((element, index) => {
        if(index < this.limit){
          this._api.getPokemon(element.name).toPromise().then((pokemon :any) =>{
            this.pokemonsToShow.push(this._utils.creationPokemon(pokemon));
          })
        }
        this.pokemons.push(new Pokemon(
          element.name,
          element.url,
          new Sprite(null,null,null,null),
          [],
          [],
          []));
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
    if(!this.isShowMore) this.isShowMore = true;
    for(var i=this.limit;i<(this.limit+32);i++){
      var name = this.pokemons[i].name
      var url = this.pokemons[i].url
      var stats = this.pokemons[i].stats
      var types = this.pokemons[i].types
      var abilities = this.pokemons[i].abilities
      this._api.getPokemon(name).toPromise().then((pokemon :any) =>{
        this.pokemonsToShow.push(new Pokemon(
                                name,
                                url,
                                new Sprite(pokemon.sprites.front_default,
                                            pokemon.sprites.back_default,
                                            pokemon.sprites.front_shiny,
                                            pokemon.sprites.back_shiny),
                                stats,
                                types,
                                abilities));
      });
    }
    this.limit += 32;
  }
}
