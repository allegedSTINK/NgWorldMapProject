import { Component, ViewEncapsulation, OnDestroy, OnInit } from '@angular/core';
import { WorldBankApiService } from '../world-bank-api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-world-view',
  templateUrl: './world-view.component.svg',
  styleUrls: ['./world-view.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class WorldViewComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  private worldMap: HTMLElement | null = null;
  private countries: Array<SVGPathElement> | null = null;
  public name: string | null = null;
  public id: string | null = null;

  isLoading = false;

  constructor(
    private worldBankService: WorldBankApiService,
    private sharedDataService: SharedDataService,
    ) {}

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.worldMap = document.querySelector('#worldMap')
    this.countries = Array.from(this.worldMap?.querySelectorAll('path') || [])
    console.log(this.countries)

    this.countries.forEach((country) => {
      // MOUSE ENTER - ADD HOVER CLASS
      country.addEventListener("mouseenter", (e) => {
        const targetElement = e.target as SVGElement;
        this.name = targetElement.getAttribute('name');
        this.id = targetElement.getAttribute('id');

        targetElement.classList.add('hovered');
        console.log(`The country is: ${this.name}\n It's id is: ${this.id}`)
      })
      // MOUSE LEAVE - REMOVE HOVER CLASS
      country.addEventListener("mouseleave", (e) => {
        const targetElement = e.target as SVGElement;

        targetElement.classList.remove('hovered');
      })
      // MOUSE CLICK - API CALL FOR COUNTRY DATA
      country.addEventListener("click", (e) => {
        const targetElement = e.target as SVGSVGElement;
        this.name = targetElement.getAttribute('name');
        this.id = targetElement.getAttribute('id');
        this.isLoading = true;

        // CALL getCountry() METHOD FROM WorldBankService
        if (this.id) {
          this.worldBankService.getCountry(this.id)
          .pipe()
          .subscribe(
            (CountryData) => {
              console.log(CountryData);
              this.sharedDataService.cName = CountryData.extractedName;
              this.sharedDataService.cCapital = CountryData.extractedCapital;
              this.sharedDataService.cRegion = CountryData.extractedRegion.value;
              this.sharedDataService.cIncome = CountryData.extractedIncome.value;
              this.sharedDataService.cLatitude = CountryData.extractedLatitude;
              this.sharedDataService.cLongitude = CountryData.extractedLongitude;
              this.isLoading = false;
            },
            (error) => {
              console.error("Error fetching country CountryData: ", error);
              this.isLoading = false;
            } 
          ) 
        }
      })
    })
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}