import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

export interface ApiResult{
  cast: any[];
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {
  }

  getTopRatedMovies(page = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(`${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`);
  }


  getMovieDetails(id: string) {
    return this.http.get(`${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`)
  }
  getMovieRecommendation(id: string, page = 1):Observable<ApiResult>  {
    return this.http.get<ApiResult>(`${environment.baseUrl}/movie/${id}/recommendations?api_key=${environment.apiKey}&page=${page}`)
  }

  getMovieCredits(id: string): Observable<ApiResult> {
    return this.http.get<ApiResult>(`${environment.baseUrl}/movie/${id}/credits?api_key=${environment.apiKey}`)
  }

  searchMovies(query: string, page = 1): Observable<ApiResult> {
    console.log('Search query:', query);
    return this.http.get<ApiResult>(`${environment.baseUrl}/search/movie?api_key=${environment.apiKey}&query=${query}&page=${page}`);
  }
}

