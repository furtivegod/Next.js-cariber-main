export interface ResponseDataList<T> {
  data: T[];
  error: Error;
}

export interface ResponseData<T> {
  data: T;
  error: Error;
}