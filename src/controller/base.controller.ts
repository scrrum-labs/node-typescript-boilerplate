import { Controller } from 'tsoa';
import { SuccessResponse, ErrorResponse} from '../models/interfaces/common/IResponse';
import { MyError, MyErrorCodeEnum } from '../utilities/error';

export class BaseController extends Controller {
    /**
   * Send error response
   * @param occuredError error string
   * @param status status code
   * @param message error message
   * @param code default error code of the system
   */
  public _errorResponse(occuredError: any, message?: string, status?: number) {

    let error: MyError;

    if ((occuredError instanceof MyError)) {
      error = occuredError;
    } else if (message) {
      error = new MyError(MyErrorCodeEnum.TM00X, message, status || 500);
    }
    else {

    //   logger.error("Unknown error has appeared during runtime!");

      // generic error preset to 500
      status = 500;

      // try out some general module error catches

      // if error name exists, try to identify it
      if (occuredError.name) {
        switch (occuredError.name) {
          case "ValidationError":
            error = new MyError(MyErrorCodeEnum.TM00X, occuredError.name, 400);
            break;
          case "MongoError":
            error = new MyError(MyErrorCodeEnum.TM00X, occuredError.name, 422);
            break;
        }
      }

      // if error message exists, try to identify it
      if (status === 500 && occuredError.message) {
        switch (occuredError.message) {
          case "Invalid UUID.":
            error = new MyError(MyErrorCodeEnum.TM00X, occuredError.message, 400);
            break;
          case "NotFound":
            error = new MyError(MyErrorCodeEnum.TM003, occuredError.message, 404);
            break;
        }

      }

      error = new MyError(MyErrorCodeEnum.TM00X, occuredError.message);

    }

    // this.setStatus(error.responeStatus);
    this.setStatus(error.responeStatus!);

    const response: ErrorResponse = {
      code: error.code,
      message: error.message
    };
    // logger.error("[" + error.code + "] - " + error.message);
    return response;
  }

  /**
   * Send error response
   * @param req request object
   * @param data send response
   * @param message response message
   * @param status status code if necessary
   */
  public _successResponse(req: Express.Request, data: any | any[], message?: string, status?: number, total?: number) {
    // to be removed
    this.setStatus(status || 200);
    // this.setHeader("X-Request-Id", req.requestId);
    const response: SuccessResponse = {
      message: message || "Success!",
      total: total,
      data: data
    };
    return response;
  }
}