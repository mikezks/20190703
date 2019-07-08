import { Component, OnInit } from '@angular/core';
import { Flight } from '../../entities/flight';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
  providers: [ /* FlightService */ ]
})
export class FlightSearchComponent implements OnInit {
  from: string = 'Graz';
  to: string = 'Hamburg';
  flights: Flight[] = [];
  selectedFlight: Flight;

  basket: object = {
    "3": true,
    "5": true
  };

  constructor(private flightService: FlightService) { }

  ngOnInit() {
  }

  search(): void {
    if (!this.from || !this.to) {
      return;
    }
    
    this.flightService
      .find(this.from, this.to)
      .subscribe(
        flights => { 
          this.flights = flights;
          console.log(flights);
        },
        errResp => console.error('Error loading flights', errResp)
      );
  }

  select(flight: Flight): void {
    this.selectedFlight = flight;
  }
}
