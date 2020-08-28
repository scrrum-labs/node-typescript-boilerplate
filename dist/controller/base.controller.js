"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
var tsoa_1 = require("tsoa");
var error_1 = require("../utilities/error");
var BaseController = /** @class */ (function (_super) {
    __extends(BaseController, _super);
    function BaseController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
   * Send error response
   * @param occuredError error string
   * @param status status code
   * @param message error message
   * @param code default error code of the system
   */
    BaseController.prototype._errorResponse = function (occuredError, message, status) {
        var error;
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
        var response = {
            code: error.code,
            message: error.message
        };
        // logger.error("[" + error.code + "] - " + error.message);
        return response;
    };
    /**
     * Send error response
     * @param req request object
     * @param data send response
     * @param message response message
     * @param status status code if necessary
     */
    BaseController.prototype._successResponse = function (req, data, message, status, total) {
        // to be removed
        this.setStatus(status || 200);
        // this.setHeader("X-Request-Id", req.requestId);
        var response = {
            message: message || "Success!",
            total: total,
            data: data
        };
        return response;
    };
    return BaseController;
}(tsoa_1.Controller));
exports.BaseController = BaseController;
