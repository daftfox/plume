import { AbstractObservableDataSource } from '../../src';
import { of } from 'rxjs';

export class MockObservableDataSource extends AbstractObservableDataSource<string> {
  connect = jest.fn().mockImplementation(() => of('test'));
  refresh = jest.fn();
}
