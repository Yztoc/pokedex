import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

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

  public getTypes(param){
    return this.httpClient.get<any>(API_URL + 'type/?limit=' + param);
  }

  public getAbilities(param){
    return this.httpClient.get<any>(API_URL + 'ability/?limit=' + param);
  }

  public getMoves(param){
    return this.httpClient.get<any>(API_URL + 'move/?limit=' + param);
  }
  
  public getPokemon(id){
    return this.httpClient.get(API_URL + 'pokemon/' + id);
  }

  public getInfoByRoute(url){
    return this.httpClient.get(url);
  }
}

