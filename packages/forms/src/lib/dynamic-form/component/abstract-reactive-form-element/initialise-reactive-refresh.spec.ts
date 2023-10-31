import { BehaviorSubject, Subject } from 'rxjs';
import { initialiseReactiveRefresh } from './initialise-reactive-refresh';
import clearAllMocks = jest.clearAllMocks;
import { AbstractObservableDataSource } from '../../model/abstract-observable-data-source';

const mockConnect = jest.fn();
const mockRefresh = jest.fn();

class MockDataSource extends AbstractObservableDataSource<string> {
  connect = mockConnect;
  refresh = mockRefresh;
}

const mockArguments1 = new Map([['mock1', 'Mock value1']]);
const mockArguments2 = new Map([['mock2', 'Mock value2']]);

describe('initialiseReactiveRefresh', () => {
  let mockClear: BehaviorSubject<null>;
  let mockUnsubscribe: Subject<null>;
  let mockDataSourceArguments: Subject<Map<string, unknown>>;
  let mockDataSource: MockDataSource;

  beforeEach(() => {
    mockClear = new BehaviorSubject<null>(null);
    mockUnsubscribe = new Subject();
    mockDataSourceArguments = new Subject<Map<string, unknown>>();
    mockDataSource = new MockDataSource();
  });

  afterEach(() => {
    clearAllMocks();
  });

  it("should call the data source's refresh method every time new data source arguments are emitted", () => {
    initialiseReactiveRefresh(
      false,
      mockClear,
      mockUnsubscribe,
      mockDataSourceArguments,
      mockDataSource,
    );

    mockDataSourceArguments.next(mockArguments1);
    expect(mockDataSource.refresh).toHaveBeenCalledTimes(1);
    expect(mockDataSource.refresh).toHaveBeenCalledWith(mockArguments1);

    mockDataSourceArguments.next(mockArguments2);
    expect(mockDataSource.refresh).toHaveBeenCalledTimes(2);
    expect(mockDataSource.refresh).toHaveBeenCalledWith(mockArguments2);
  });

  it('should accumulate arguments', () => {
    initialiseReactiveRefresh(
      true,
      mockClear,
      mockUnsubscribe,
      mockDataSourceArguments,
      mockDataSource,
    );

    mockDataSourceArguments.next(mockArguments1);
    expect(mockDataSource.refresh).toHaveBeenCalledTimes(1);
    expect(mockDataSource.refresh).toHaveBeenCalledWith(mockArguments1);

    mockDataSourceArguments.next(mockArguments2);
    expect(mockDataSource.refresh).toHaveBeenCalledTimes(2);
    expect(mockDataSource.refresh).toHaveBeenCalledWith(
      new Map([...mockArguments1, ...mockArguments2]),
    );
  });

  it('should clear accumulated arguments', () => {
    initialiseReactiveRefresh(
      true,
      mockClear,
      mockUnsubscribe,
      mockDataSourceArguments,
      mockDataSource,
    );

    mockDataSourceArguments.next(mockArguments1);
    expect(mockDataSource.refresh).toHaveBeenCalledTimes(1);
    expect(mockDataSource.refresh).toHaveBeenCalledWith(mockArguments1);

    mockDataSourceArguments.next(mockArguments2);
    expect(mockDataSource.refresh).toHaveBeenCalledTimes(2);
    expect(mockDataSource.refresh).toHaveBeenCalledWith(
      new Map([...mockArguments1, ...mockArguments2]),
    );

    mockClear.next(null);
    mockDataSourceArguments.next(mockArguments1);
    expect(mockDataSource.refresh).toHaveBeenCalledTimes(3);
    expect(mockDataSource.refresh).toHaveBeenCalledWith(mockArguments1);
  });
});
