import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Region } from '../region';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataServiceService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  _baseUrl: string = '';

  // For Using Fake API by Using It's URL
  constructor(private http: Http) {
    this._baseUrl = " http://localhost:8080/region/";
  }
  updateRegion(regionId: string, region: Region) {
    const urlParams = new HttpParams().set("regionId", regionId.toString());
    return this.http.put(this._baseUrl + "updateRegion/"+regionId, region);
}
  createUser(region: Region){
//console.log(region);
    let saveUrl = this._baseUrl + "createRegion";
    return this.http.post(saveUrl, region); 
}
  // To fill the Datatable with Todos [Dummy Data]
  public GetAllTodos() {
    return this.http.get(this._baseUrl + 'viewAllRegion')
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  // To provide error description - Manav
  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
  deleteRegion(regionId: string){
    const urlParams = new HttpParams().set("regionId", regionId.toString());
    return this.http.delete(this._baseUrl + "deleteRegion/" + regionId);
}
  // deleteEmployeeById(regionId: number): Observable<number> {  

  //   return this.http.delete<number>(this._baseUrl + '/deleteRegion/'+regionId);  
  // }  
}
