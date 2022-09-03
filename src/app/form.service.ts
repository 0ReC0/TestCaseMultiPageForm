import {Injectable} from '@angular/core';
import {delay, finalize, Observable, of} from "rxjs";
import {Request, Response} from "./types";

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private _isLoading = false;

  constructor() {
  }

  get isLoading() {
    return this._isLoading;
  }

  sendRequest(data: Request): Observable<Response> {
    this._isLoading = true;
    return of<Response>({id: '1dsddf2d', status: 'success'}).pipe(
      delay(2000),
      finalize(() => this._isLoading = false)
    )
  }
}
