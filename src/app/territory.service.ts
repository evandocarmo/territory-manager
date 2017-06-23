import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Household } from './household';
import { Codcard } from './codcard';
import 'rxjs/Rx';

const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');
contentHeaders.append('x-access-token',localStorage.getItem('token'));
let options = new RequestOptions( {method: 'GET', headers: contentHeaders });
const API_URL: string = "https://modern-territory-evandocarmo.c9users.io/api/";

@Injectable()
export class TerritoryService {

  constructor(private router: Router, private http: Http) { }

  public getAllCards(): Observable<Codcard[]>{
  	return this.http.get(API_URL + "cod_cards",options)
  		.map(this.extractData)
  		.catch(this.handleError);
  }
   public getMacroareas(): Observable<string[]>{
    return this.http.get(API_URL + "macroareas",options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  public getNeighborhoods(): Observable<string[]>{
    return this.http.get(API_URL + "neighborhoods",options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  public getNeighborhoodsByMacroarea(macroarea:string): Observable<string[]>{
    let params:URLSearchParams = new URLSearchParams();
    params.set('macroarea',macroarea);
    options.params = params;
    return this.http.get(API_URL + "neighborhoods",options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  public getAllAvailableCards():Observable<any[]>{
    let params:URLSearchParams = new URLSearchParams();
    params.set('available','yes');
    options.params = params;
  	return this.http.get(API_URL + "cod_cards",options)
  	  .map(this.extractData)
  	  .catch(this.handleError);
  }

    public getAllUnavailableCards():Observable<Codcard[]>{
    let params:URLSearchParams = new URLSearchParams();
    params.set('available','no');
    options.params = params;
    return this.http.get(API_URL + "cod_cards",options)
      .map(this.extractData)
      .catch(this.handleError);
  }

    public getCardsByUser(user):Observable<Codcard[]>{
    let params:URLSearchParams = new URLSearchParams();
    params.set('user',user);
    options.params = params;
    return this.http.get(API_URL + "cod_cards",options)
      .map(this.extractData)
      .catch(this.handleError);
  }

    public getCardsByMacroarea(macroarea: string):Observable<Codcard[]>{
    let params:URLSearchParams = new URLSearchParams();
    params.set('macroarea',macroarea);
    options.params = params;
    return this.http.get(API_URL + "cod_cards",options)
      .map(this.extractData)
      .catch(this.handleError);
  }

    public getCardsTakenInLast(days):Observable<Codcard[]>{
    let params:URLSearchParams = new URLSearchParams();
    params.set('last',days);
    options.params = params;
    return this.http.get(API_URL + "cod_cards",options)
      .map(this.extractData)
      .catch(this.handleError);
  }
    public getCardsByNeighborhood(neighborhood:string):Observable<Codcard[]>{
    let params:URLSearchParams = new URLSearchParams();
    params.set('area_name',neighborhood);
    options.params = params;
    return this.http.get(API_URL + "cod_cards",options)
      .map(this.extractData)
      .catch(this.handleError);
  }
    public getCardsTakenInMoreThan(days):Observable<Codcard[]>{
    let params:URLSearchParams = new URLSearchParams();
    params.set('more_than',days);
    options.params = params;
    return this.http.get(API_URL + "cod_cards",options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getCardsByCod(cod):Observable<Codcard[]>{
    let params:URLSearchParams = new URLSearchParams();
    params.set('cod',cod);
    options.params = params;
    return this.http.get(API_URL + "cod_cards",options)
      .map(this.extractData)
      .catch(this.handleError);

  }

  public checkOutCards(cod,user):Observable<any>{
    return this.http.put(API_URL + "cod_cards/checkout",JSON.stringify({cod,user}),options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  public returnCard(cod,user):Observable<any>{
    return this.http.put(API_URL + "cod_cards/return",JSON.stringify({cod,user}),options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    (JSON.stringify(body));
    return body || { };
  }
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }


}
