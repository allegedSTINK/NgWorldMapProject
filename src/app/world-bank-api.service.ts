import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface CountryData {
  id: string;
  name: string;
  capitalCity: string;
  region: string;
  incomeLevel: string;
  latitude: string;
  longitude: string;
  
}
// HAD TO CREATE TWO INTERFACE OBJECTS TO DIG OUT THE DATA AND MAKE TYPESCRIPT HAPPY
interface RegionData {
  id: string;
  iso2code: string;
  value: string;
}
interface IncomeData {
  id: string;
  iso2code: string;
  value: string;
}
interface CountryDataObject {
  extractedId: string;
  extractedName: string;
  extractedCapital: string;
  extractedRegion: RegionData;
  extractedIncome: IncomeData;
  extractedLatitude: string;
  extractedLongitude: string;
}

@Injectable({
  providedIn: 'root'
})

export class WorldBankApiService {

  constructor(private http: HttpClient) {}

  getCountry(name: string): Observable<CountryDataObject> {
    const worldBankURL: string = `http://api.worldbank.org/v2/country/${name}?format=json`

    // Make an HTTP GET request to the API
    return this.http.get(worldBankURL).pipe(
      map((response: any) => {
        // EXTRACT PROPERTIES AND CREATE NEW OBJECT
        const countryData: CountryDataObject = {
          extractedId: response[1][0].id,
          extractedName: response[1][0].name,
          extractedCapital: response[1][0].capitalCity,
          extractedRegion: response[1][0].region,
          extractedIncome: response[1][0].incomeLevel,
          extractedLatitude: response[1][0].latitude,
          extractedLongitude: response[1][0].longitude,
        };
        return countryData;
      }),
      catchError((error: any) => {
        console.error("Error fetching country data: ", error);
        return throwError(error);
      })
    );

    
  }
}
