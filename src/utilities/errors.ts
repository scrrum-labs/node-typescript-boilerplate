export class MyError extends Error {
    code: MyErrorCodeEnum | undefined;
    stack: string | undefined;
    details: string | undefined;
    responeStatus: number | undefined;
    /**
     *
     * @param param1 MyErrorCodeEnum or an instance of error or just a string
     * @param param2 an instance of error or just a string
     * @param param3 response status code
     * @param param4 any details needed to pass down.
     */
    constructor(param1: MyErrorCodeEnum | Error | MyError, param2?: string | Error, param3?: number | Error, param4?: any) {
      let stack;
  
      if (param1 instanceof MyError) {
        return param1;
      }
  
      if (param1 instanceof Error) {
        if (!param4) param4 = param1;
        stack = param1.stack;
        if (!param2) param2 = param1.message;
        param1 = MyErrorCodeEnum.TM00X;
      }
  
      if (param4 instanceof Error) {
        stack = param4.stack;
        if (!param2) param2 = param4.message;
      }
      if (param2 instanceof Error) {
        if (!param4) param4 = param2;
        stack = param2.stack;
        param2 = param2.message;
      }
      if (param3 instanceof Error) {
        if (!param4) param4 = param3;
        stack = param3.stack;
        if (!param2) param2 = param3.message;
        param1 = MyErrorCodeEnum.TM00X;
        param3 = 500;
      }
      const data = getMessageFromCode(param1);
      if (!param2) {
        param2 = data.message;
      }
      if (!param3) {
        param3 = data.responeStatus;
      }
      super(param2);
      this.code = param1;
      this.stack = stack;
      if (!this.stack) Error.captureStackTrace(this, MyError);
      if (param4) {
        this.details = param4;
      }
      this.message = param2;
      this.responeStatus = param3 || 500;
      // Set the prototype explicitly.
      Object.setPrototypeOf(this, MyError.prototype);
    }
  
    public toString() {
      return `${this.code}: ${this.message}`;
    }
  
    public toJSON() {
      const ret = {
        name: this.name,
        responeStatus: this.responeStatus,
        code: this.code,
        stack: this.stack,
        message: this.message
      };
      if (process.env.JSON_LOGS_EXCLUDE_STACK_CLUTTER) {
        delete ret.stack;
      }
      return ret;
    }
  
  }
  
  
  export enum MyErrorCodeEnum {
    // UFO Custom Error
    TM00X = "TM00X",
    TM001 = "TM001",
    TM002 = "TM002",
    TM003 = "TM003",
    TM004 = "TM004",
    TM005 = "TM005",
    TM006 = "TM006",
    TM007 = "TM007",
    TM008 = "TM008",
    TM009 = "TM009",
    TM010 = "TM010",
    TM011 = "TM011",
    TM012 = "TM012",
    TM013 = "TM013",
    TM014 = "TM014",
    TM015 = "TM015",
  }
  
  function getMessageFromCode(c: MyErrorCodeEnum): { message: string, responeStatus: number } {
    switch (c) {
      case MyErrorCodeEnum.TM001:
        return {
          message: "Missing required parameter from request body",
          responeStatus: 403
        };
      case MyErrorCodeEnum.TM002:
        return {
          message: "Not Implemented",
          responeStatus: 501
        };
      case MyErrorCodeEnum.TM003:
        return {
          message: "Not found",
          responeStatus: 404
        };
      case MyErrorCodeEnum.TM004:
        return {
          message: "Cast to ObjectId failed",
          responeStatus: 400
        };
      case MyErrorCodeEnum.TM005:
        return {
          message: "Data for Dependency Missing",
          responeStatus: 500
        };
      case MyErrorCodeEnum.TM006:
        return {
          message: "Bad Auth Challenge",
          responeStatus: 401
        };
      case MyErrorCodeEnum.TM007:
        return {
          message: "Forbidden",
          responeStatus: 403
        };
      case MyErrorCodeEnum.TM008:
        return {
          message: "Valid but conflicting input",
          responeStatus: 422
        };
      case MyErrorCodeEnum.TM009:
        return {
          message: "Invalid Input",
          responeStatus: 400
        };
      case MyErrorCodeEnum.TM010:
        return {
          message: "Couldn't generate random but compliant password",
          responeStatus: 500
        };
      case MyErrorCodeEnum.TM011:
        return {
          message: "Forbidden - Get a Fresh Token",
          responeStatus: 403
        };
      case MyErrorCodeEnum.TM012:
        return {
          message: "Failed to start - Environment variables missing",
          responeStatus: 500
        };
      case MyErrorCodeEnum.TM013:
        return {
          message: "Not Safe To Do This Operation",
          responeStatus: 500
        };
      case MyErrorCodeEnum.TM014:
        return {
          message: "State Transfer not allowed",
          responeStatus: 400
        };
      case MyErrorCodeEnum.TM015:
        return {
          message: "Route mismatch found",
          responeStatus: 400
        };
      
      default:
        return {
          message: "Unknown Error",
          responeStatus: 422
        };
        break;
    }
  }
  