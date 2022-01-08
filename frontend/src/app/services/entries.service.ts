import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entry } from '../models/Entry';
import { StaticResponse } from '../models/StaticResponse';

@Injectable({
  providedIn: 'root',
})
export class EntriesService {
  private serviceEndpoint = 'http://localhost:5118/api/entries';
  constructor(private httpClient: HttpClient) {}

  saveEntry(data: any): void {
    this.postEntry(data).subscribe();
  }

  private postEntry({
    projectId,
    description,
    startDate,
    fee,
    isFlatFee,
  }: {
    projectId: string;
    description: string;
    startDate: string;
    fee: number;
    isFlatFee: boolean;
  }): Observable<Entry> {
    const currentDate = new Date();
    return this.httpClient.post<Entry>(this.serviceEndpoint, {
      projectId,
      description,
      startDate,
      fee,
      isFlatFee,
      endDate: new Date(currentDate.getTime() + 150000 * 60000).toISOString(),
    });
  }

  getEntriesFromProject(id: string): Observable<Entry[]> {
    return this.httpClient
      .get<StaticResponse<Entry>>(`${this.serviceEndpoint}/project/${id}`)
      .pipe(map(({ data }) => data as Entry[]));
  }
}
