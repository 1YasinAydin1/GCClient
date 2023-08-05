import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }

  private generateUrl(requestParameters: Partial<RequestParameters>) {

    return requestParameters.fullEndPoint ? requestParameters.fullEndPoint :
      `${requestParameters.baseUrl ? requestParameters.baseUrl : this.baseUrl}/${requestParameters.controller}${requestParameters.action ? `/${requestParameters.action}` : ""}`
  }

  get<T>(requestParameters: Partial<RequestParameters>, Id?: string): Observable<T> {
    return this.httpClient.get<T>(`${this.generateUrl(requestParameters)}${Id ? `/${Id}` : ""}${requestParameters.queryString ? `?${requestParameters.queryString}`:''}`, { headers: requestParameters.httpHeader })
  }
  post<T>(requestParameters: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    debugger;
    return this.httpClient.post<T>(this.generateUrl(requestParameters), body, { headers: requestParameters.httpHeader })
  }
  put<T>(requestParameters: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    return this.httpClient.put<T>(this.generateUrl(requestParameters), body, { headers: requestParameters.httpHeader })
  }
  delete<T>(requestParameters: Partial<RequestParameters>, Id: string): Observable<T> {
    debugger;
    const sf = `${this.generateUrl(requestParameters)}${Id ? `/${Id}`:''}${requestParameters.queryString ? `?${requestParameters.queryString}`:''}`;

    return this.httpClient.delete<T>(sf, { headers: requestParameters.httpHeader })
  }
}


export class RequestParameters {
  controller?: string;
  action?: string;
  httpHeader?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string;
  queryString?: string;
}