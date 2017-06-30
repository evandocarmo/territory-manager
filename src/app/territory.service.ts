import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response, RequestOptions, URLSearchParams,ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import { Household } from './household';
import { Codcard } from './codcard';
import 'rxjs/Rx';

const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');
contentHeaders.append('x-access-token',localStorage.getItem('token'));
const API_URL: string = "https://modern-territory-evandocarmo.c9users.io/api/";

@Injectable()
export class TerritoryService {

  constructor(private router: Router, private http: Http) { }

  public getAllCards(): Observable<Codcard[]>{
    let options = new RequestOptions( {method: 'GET', headers: contentHeaders });
  	return this.http.get(API_URL + "cod_cards",options)
  		.map(this.extractData)
  		.catch(this.handleError);
  }
   public getMacroareas(): Observable<string[]>{
     let options = new RequestOptions( {method: 'GET', headers: contentHeaders });
    return this.http.get(API_URL + "macroareas",options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  public getNeighborhoods(): Observable<string[]>{
    let options = new RequestOptions( {method: 'GET', headers: contentHeaders });
    return this.http.get(API_URL + "neighborhoods",options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  public getNeighborhoodsByMacroarea(macroarea:string): Observable<string[]>{
    let options = new RequestOptions( {method: 'GET', headers: contentHeaders });
    let params:URLSearchParams = new URLSearchParams();
    params.set('macroarea',macroarea);
    options.params = params;
    return this.http.get(API_URL + "neighborhoods",options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  public getAreaByNeighborhood(neighborhood):Observable<any>{
    let options = new RequestOptions( {method: 'GET', headers: contentHeaders });
    let params:URLSearchParams = new URLSearchParams();
    params.set('neighborhood',neighborhood);
    options.params = params;
    return this.http.get(API_URL + "areas",options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  public getAllAvailableCards():Observable<any[]>{
    let options = new RequestOptions( {method: 'GET', headers: contentHeaders });
    let params:URLSearchParams = new URLSearchParams();
    params.set('available','yes');
    options.params = params;
  	return this.http.get(API_URL + "cod_cards",options)
  	  .map(this.extractData)
  	  .catch(this.handleError);
  }

    public getAllUnavailableCards():Observable<Codcard[]>{
    let options = new RequestOptions( {method: 'GET', headers: contentHeaders });
    let params:URLSearchParams = new URLSearchParams();
    params.set('available','no');
    options.params = params;
    return this.http.get(API_URL + "cod_cards",options)
      .map(this.extractData)
      .catch(this.handleError);
  }

    public getCardsByUser(user):Observable<Codcard[]>{
    let options = new RequestOptions( {method: 'GET', headers: contentHeaders });
    let params:URLSearchParams = new URLSearchParams();
    params.set('user',user);
    options.params = params;
    return this.http.get(API_URL + "cod_cards",options)
      .map(this.extractData)
      .catch(this.handleError);
  }

    public getCardsByMacroarea(macroarea: string):Observable<Codcard[]>{
    let options = new RequestOptions( {method: 'GET', headers: contentHeaders });
    let params:URLSearchParams = new URLSearchParams();
    params.set('macroarea',macroarea);
    options.params = params;
    return this.http.get(API_URL + "cod_cards",options)
      .map(this.extractData)
      .catch(this.handleError);
  }

    public getCardsTakenInLast(days):Observable<Codcard[]>{
    let options = new RequestOptions( {method: 'GET', headers: contentHeaders });
    let params:URLSearchParams = new URLSearchParams();
    params.set('last',days);
    options.params = params;
    return this.http.get(API_URL + "cod_cards",options)
      .map(this.extractData)
      .catch(this.handleError);
  }
    public getCardsByNeighborhood(neighborhood:string):Observable<Codcard[]>{
    let options = new RequestOptions( {method: 'GET', headers: contentHeaders });
    let params:URLSearchParams = new URLSearchParams();
    params.set('area_name',neighborhood);
    options.params = params;
    return this.http.get(API_URL + "cod_cards",options)
      .map(this.extractData)
      .catch(this.handleError);
  }
    public getCardsTakenInMoreThan(days):Observable<Codcard[]>{
    let options = new RequestOptions( {method: 'GET', headers: contentHeaders });
    let params:URLSearchParams = new URLSearchParams();
    params.set('more_than',days);
    options.params = params;
    return this.http.get(API_URL + "cod_cards",options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getCardsByCod(cod):Observable<Codcard[]>{
    let options = new RequestOptions( {method: 'GET', headers: contentHeaders });
    let params:URLSearchParams = new URLSearchParams();
    params.set('cod',cod);
    options.params = params;
    return this.http.get(API_URL + "cod_cards",options)
      .map(this.extractData)
      .catch(this.handleError);

  }

  public checkOutCards(cod,user):Observable<any>{
    let options = new RequestOptions( {method: 'PUT', headers: contentHeaders });
    return this.http.put(API_URL + "cod_cards/checkout",JSON.stringify({cod,user}),options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  public returnCard(cod,user):Observable<any>{
    let options = new RequestOptions( {method: 'PUT', headers: contentHeaders });
    return this.http.put(API_URL + "cod_cards/return",JSON.stringify({cod,user}),options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  public addNewCard(card){
    let options = new RequestOptions ({method:'POST',headers:contentHeaders})
    return this.http.post(API_URL + "cod_cards",JSON.stringify(card),options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getCustomQuery(queries){
    let options = new RequestOptions( {method: 'GET', headers: contentHeaders});
    let params:URLSearchParams = new URLSearchParams();
    for(let property in queries){
      if(queries[property] !== ''){
        console.log(property);
        params.set(property,queries[property]);
      }
    }
    console.log(params);
    options.params = params;
    return this.http.get(API_URL + "cod_cards",options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public downloadExcel(queries){
    let options = new RequestOptions( {method: 'GET', headers: contentHeaders,responseType:ResponseContentType.Blob});
    let params:URLSearchParams = new URLSearchParams();
    params.set('excel','yes');

    for(let property in queries){
      if(queries[property] !== ''){
        console.log(property);
        params.set(property,queries[property]);
      }
    }
    options.params = params;
    return this.http.get(API_URL + "cod_cards",options)
      .map(response => response.blob())
      .catch(this.handleError)
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
