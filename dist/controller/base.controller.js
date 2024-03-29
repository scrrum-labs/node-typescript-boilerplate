"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const tsoa_1 = require("tsoa");
const error_1 = require("../utilities/error");
class BaseController extends tsoa_1.Controller {
    /**
     * Send error response
     * @param occuredError error string
     * @param status status code
     * @param message error message
     * @param code default error code of the system
     */
    _errorResponse(occuredError, message, status) {
        let error;
        if ((occuredError instanceof error_1.MyError)) {
            error = occuredError;
        }
        else if (message) {
            error = new error_1.MyError(error_1.MyErrorCodeEnum.TM00X, message, status || 500);
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
                        error = new error_1.MyError(error_1.MyErrorCodeEnum.TM00X, occuredError.name, 400);
                        break;
                    case "MongoError":
                        error = new error_1.MyError(error_1.MyErrorCodeEnum.TM00X, occuredError.name, 422);
                        break;
                }
            }
            // if error message exists, try to identify it
            if (status === 500 && occuredError.message) {
                switch (occuredError.message) {
                    case "Invalid UUID.":
                        error = new error_1.MyError(error_1.MyErrorCodeEnum.TM00X, occuredError.message, 400);
                        break;
                    case "NotFound":
                        error = new error_1.MyError(error_1.MyErrorCodeEnum.TM003, occuredError.message, 404);
                        break;
                }
            }
            error = new error_1.MyError(error_1.MyErrorCodeEnum.TM00X, occuredError.message);
        }
        // this.setStatus(error.responeStatus);
        this.setStatus(error.responeStatus);
        const response = {
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
    _successResponse(req, data, message, status, total) {
        // to be removed
        this.setStatus(status || 200);
        // this.setHeader("X-Request-Id", req.requestId);
        const response = {
            message: message || "Success!",
            total: total,
            data: data
        };
        return response;
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=base.controller.js.map