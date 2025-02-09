import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LichessService {

  getPGN(tournamentId: string): Observable<any> {
    const headers = { 'Accept': 'application/x-chess-pgn' };
    return this.http.get(`https://lichess.org/api/swiss/${ tournamentId }/games`, { headers, responseType: 'text' });
  }

  constructor(private http: HttpClient) { }
}
