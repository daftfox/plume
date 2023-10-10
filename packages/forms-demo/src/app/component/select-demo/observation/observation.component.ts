import {
  AbstractReactiveFormElementComponent,
  AbstractReactiveFormOutput
} from '@plume/forms';
import { MockObservation } from '../model/mock-observation';
import { Component, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export class Observation extends AbstractReactiveFormOutput<MockObservation> {
  component = ObservationComponent;
}

@Component({
  selector: 'demo-observation',
  templateUrl: './observation.component.html',
  styleUrls: [
    './observation.component.scss'
  ],
  standalone: true,
  imports: [ AsyncPipe, NgIf, DatePipe, FlexModule, MatCardModule, MatProgressBarModule, MatProgressSpinnerModule ],
})
export class ObservationComponent extends AbstractReactiveFormElementComponent<MockObservation> implements OnInit {
  observation: Observable<MockObservation>;

  override ngOnInit() {
    super.ngOnInit();
    this.observation = this.dataSource.connect();
  }
}
