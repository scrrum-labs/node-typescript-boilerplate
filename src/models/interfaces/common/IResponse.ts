export interface ErrorResponse {
    code: string | number | undefined;
    message: string;
  }
  
  export interface ErrorResponseWrapped {
    error: ErrorResponse;
  }
  
  export interface SuccessListingResponseWrapped<T> {
    message: string;
    data: Array<T>;
    total?: number;
  }
  
  export interface SuccessResponseWrapped<T> {
    message: string;
    data: T;
  }
  
  export interface SuccessResponse {
    message: string;
    data: any | any[];
    total?: number;
  }
  
  export interface SuccessResponseWOData {
    message: string;
  }