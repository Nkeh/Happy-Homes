import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  url = `${environment.apiUrl}/locations`;

  constructor() { }

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined>{
    const data = await fetch(` ${this.url}/${id}`)
    return await data.json() ?? {};
  }

  submitApplication(firstName: string, email: string, location: string) {
    console.log(`Homes application received: firstName: ${firstName}, email: ${email}, location: ${location}`);
  }
  

}
