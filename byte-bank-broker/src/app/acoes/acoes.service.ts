import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators'
import { Acao, Acoes, AcoesAPI } from './modelo/acoes';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(
    private http: HttpClient
  ) { }

  public getAcoes(valor?: string): Observable<Acoes> {
    const params = valor ? new HttpParams().append('valor', valor) : undefined

    return this.http.get<AcoesAPI>(`http://localhost:3000/acoes`, { params })
            .pipe(
              pluck('payload'),
              map((acoes) => 
                acoes.sort((acaoA, acaoB) => this.ordernaPorCodigo(acaoA, acaoB))
              ),
              tap((valor) => console.log(valor)),
            )
  }

  private ordernaPorCodigo(acaoA: Acao, acaoB: Acao) {
    if(acaoA.codigo > acaoB.codigo) {
      return 1;
    }

    if(acaoA.codigo < acaoB.codigo) {
      return -1;
    }

    return 0;
  } 

}
