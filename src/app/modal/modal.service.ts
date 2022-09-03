import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _isOpen = false;

  constructor() { }

  get isOpen(){
    return this._isOpen;
  }

  open(){
    this._isOpen = true;
  }

  close() {
    this._isOpen = false;
  }
}
