import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

interface ICache {
  [ key: string ]: any
}

@Injectable()
export class StorageService {
  private onSubject = new Subject<{ key: string, value: any }>();
  public changes = this.onSubject.asObservable().subscribe()

  private storageChange = new BehaviorSubject(false);
  public storageChange$ = this.storageChange.asObservable();

  constructor() {    
  }

  public setStorageChange(change: boolean) {
    this.storageChange.next(change);
  }

  public getStorage(key: string) {
    try{
      return JSON.parse(localStorage.getItem(key));
    }catch{
      return localStorage.getItem(key);
    }
  }

  public store(key: string, data: any): void {
    localStorage.setItem(key, data);
    this.onSubject.next({ key: key, value: data})
  }

  public clear(key) {
    localStorage.removeItem(key);
    this.onSubject.next({ key: key, value: null });
  }
}