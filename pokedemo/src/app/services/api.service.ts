import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';

const API_URL = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getAllPokemons(param){
    return this.httpClient.get(API_URL + 'pokemon/?limit=' + param);
  }

  public getPokemon(id){
    return this.httpClient.get(API_URL + 'pokemon/' + id);
  }
}

