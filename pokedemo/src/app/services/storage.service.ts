import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

interface ICache {
  [ key: string ]: any
}

@Injectable()
export class StorageService implements OnDestroy {
  private onSubject = new Subject<{ key: string, value: any }>();
  public changes = this.onSubject.asObservable().subscribe()

  private storageChange = new BehaviorSubject(false);
  public storageChange$ = this.storageChange.asObservable();

  constructor() {    
    //this.start();
  }

  ngOnDestroy() {
    this.stop();
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


  private start(): void {
    window.addEventListener("storage", this.storageEventListener.bind(this));
  }

  private storageEventListener(event: StorageEvent) {
    if (event.storageArea == localStorage) {
      let v;
      try { 
        console.log("ICI bind")
        v = JSON.parse(event.newValue); 
      }
      catch (e) { v = event.newValue; }
      this.onSubject.next({ key: event.key, value: v });
    }
  }

  private stop(): void {
    window.removeEventListener("storage", this.storageEventListener.bind(this));
    this.onSubject.complete();
  }
}