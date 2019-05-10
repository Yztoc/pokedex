import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ApiService } from './api.service';
import { DialogComponent } from '../components/dialog/dialog.component';
import { Pokemon } from '../models/pokemon';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  bsModalRef: BsModalRef;

  constructor(
    private _api: ApiService,
    private modalService: BsModalService
  ) {}

  openDialog(name){
    this._api.getPokemon(name).toPromise().then((pokemon: Pokemon) =>{
      const initialState = {
        pokemon: pokemon,
      };
        this.bsModalRef = this.modalService.show(DialogComponent, {initialState});
        this.bsModalRef.content.pokemom = pokemon;
        this.bsModalRef.content.closeBtnName = 'Close';
    })
  }
  
}
