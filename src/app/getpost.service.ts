import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetpostService {

  constructor(private Http : HttpClient) { }

  getPosts() : Observable<any> {
    return this.Http.get('https://jsonplaceholder.typicode.com/posts')
    .pipe(
      map((ret: any) => {
        return ret;
      })
    );
  }
  getComments(id : any) : Observable<any> {
    return this.Http.get('https://jsonplaceholder.typicode.com/comments?postId='+id)
    .pipe(
      map((ret: any) => {
        return ret;
      })
    );
  }
}
