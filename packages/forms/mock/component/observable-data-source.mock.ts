import { AbstractObservableDataSource } from '../../src/lib/dynamic-form/model/abstract-observable-data-source';
import { of } from 'rxjs';

export class MockObservableDataSource extends AbstractObservableDataSource<string> {
  connect = jest.fn().mockImplementation(() => of('test'));
  refresh = jest.fn();
}
