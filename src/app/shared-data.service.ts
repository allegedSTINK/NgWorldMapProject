import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

cName: string | null = null;
cCapital: string | null = null;
cRegion: string | null = null;
cIncome: string | null = null;
cLatitude: string | null = null;
cLongitude: string | null = null;
captionLiteral: string | null = null;


}
