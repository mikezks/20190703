import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FlightSearchComponent } from './flight-search.component';
import { SharedModule } from '../../shared/shared.module';
import { FlightBookingModule } from '../flight-booking.module';
import { FormsModule } from '@angular/forms';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { FlightService } from '../services/flight.service';
import { Observable, of } from 'rxjs';
import { Flight } from 'src/app/entities/flight';
import { By } from '@angular/platform-browser';

describe('Unit test: flight-search.component', () => {
  let component: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FlightBookingModule,
        SharedModule
      ],
      providers: [
        // Fügen Sie hier eventuelle Provider aus
        // Ihrer app.module.ts ein (falls vorhanden)
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should not have any flights loaded initially', () => { 
    expect(component.flights.length).toBe(0);
  });

  it('should load flights when user entered from and to', () => {
    component.from = 'Graz';
    component.to = 'Hamburg';
    component.search();

    const httpTestingController: HttpTestingController 
        = TestBed.get(HttpTestingController);

    const req = httpTestingController.expectOne(
        'http://www.angular.at/api/flight?from=Graz&to=Hamburg'
    );
    // req.request.method === 'GET'
    
    req.flush([{
        id: 22,
        from: 'Graz',
        to: 'Hamburg',
        date: ''
    }]);

    expect(component.flights.length).toBe(1);
  });

  it('should have a disabled search button w/o params', fakeAsync(() => {
    tick();
  
    // Get input field for from
    const from = fixture
      .debugElement
      .query(By.css('input[name=from]'))
      .nativeElement;
  
    from.value = '';
    from.dispatchEvent(new Event('input'));
  
    // Get input field for to
    const to = fixture
      .debugElement
      .query(By.css('input[name=to]'))
      .nativeElement;
  
    to.value = '';
    to.dispatchEvent(new Event('input'));
  
    fixture.detectChanges();
    tick();
      
    // Get disabled
    const disabled = fixture
      .debugElement
      .query(By.css('button'))
      .properties['disabled'];
    
    expect(disabled).toBeTruthy();  
  }));
});

describe('Unit test with service mock: flight-search.component', () => {
  let component: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;
  const result = [
      { id: 17, from: 'Graz', to: 'Hamburg', date: 'now', delayed: true },
      { id: 18, from: 'Vienna', to: 'Barcelona', date: 'now', delayed: true },
      { id: 19, from: 'Frankfurt', to: 'Salzburg', date: 'now', delayed: true },
  ];

  const flightServiceMock = {
      find(from: string, to: string): Observable<Flight[]> {
          return of(result);
      },
      // Die nachfolgenden beiden Member werden nur in bestimmten
      // Scenarien benötigt
      flights: [],
      load(from: string, to: string): void {
          this.find(from, to).subscribe(f => { this.flights = f; });
      }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            FormsModule,
            SharedModule
        ],
        declarations: [  
            FlightSearchComponent,
            FlightCardComponent
        ]
    })
    .overrideComponent(FlightSearchComponent, {
        set: {
            providers: [
                {
                  provide: FlightService,
                  useValue: flightServiceMock
                }
            ]
        }
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  
  it('should not load flights w/o from and to', () => {
    component.from = '';
    component.to = '';
    component.search();

    expect(component.flights.length).toBe(0);
  });

  it('should load flights w/ from and to', () => {
      component.from = 'Hamburg';
      component.to = 'Graz';
      component.search();

      expect(component.flights.length).toBeGreaterThan(0);
  });
});
