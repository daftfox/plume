import {
  AbstractReactiveFormElementComponent,
  AbstractReactiveFormOutput
} from '@plume/forms';
import { MockObservation } from '../model/mock-observation';
import { Component, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe, JsonPipe, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Observable } from 'rxjs';

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
  imports: [ AsyncPipe, NgIf, DatePipe, FlexModule, MatCardModule, MatProgressBarModule ],
})
export class ObservationComponent extends AbstractReactiveFormElementComponent<MockObservation> implements OnInit {
  observation: Observable<MockObservation>;

  override ngOnInit() {
    super.ngOnInit();
    this.observation = this.dataSource.connect();
  }
}
