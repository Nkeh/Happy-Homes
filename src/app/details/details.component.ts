import { Component, Input, Inject, inject } from '@angular/core';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <article>
  <img class="listing-photo" [src]="housingLocation?.photo"
    alt="Exterior photo of {{housingLocation?.name}}"/>
  <section class="listing-description">
    <h2 class="listing-heading">{{housingLocation?.name}}</h2>
    <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
  </section>
  <section class="listing-features">
    <h2 class="section-heading">About this housing location</h2>
    <ul>
      <li>Units available: {{housingLocation?.availableUnits}}</li>
      <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
      <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
    </ul>
  </section>
  <section class="listing-apply">
      <h2 class="section-heading">Apply now to live here</h2>
      <form [formGroup]="applyForm" (submit)="submitApplication()">
        <label for="first-name">First Name</label>
        <input id="first-name" type="text" formControlName="firstName">

        <label for="email">Email</label>
        <input id="email" type="email" formControlName="email">

        <label for="location">Location</label>
        <input id="location" type="text" formControlName="location">

        <button type="submit" class="primary">Apply now</button>
      </form>
    </section>
</article>`,
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  housingLocation: HousingLocation | undefined;
  housingService: HousingService = inject(HousingService)

  applyForm = new FormGroup(
    {
      firstName: new FormControl(''),
      email: new FormControl(''),
      location: new FormControl('')
    }
  )

  constructor(){
    const housingLocationId = Number(this.route.snapshot.params['id'])
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName?? '',
      this.applyForm.value.email?? '',
      this.applyForm.value.location?? ''

    );
  }

}
