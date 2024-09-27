import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HousinglocationComponent } from '../housinglocation/housinglocation.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousinglocationComponent, DetailsComponent],
  template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by City" #filter/>
      <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
    <app-housinglocation *ngFor = "let housingLocation of filteredLocationList" [housingLocation]="housingLocation"></app-housinglocation>
  </section>
  `,
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  // housingLocate: HousingLocation | undefined = this.housingService.getHousingLocationById(1);

  filteredLocationList: HousingLocation[] = [];

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }

  constructor () {
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
  }


}
