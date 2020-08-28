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
exports.MyErrorCodeEnum = exports.MyError = void 0;
var MyError = /** @class */ (function (_super) {
    __extends(MyError, _super);
    /**
     *
     * @param param1 MyErrorCodeEnum or an instance of error or just a string
     * @param param2 an instance of error or just a string
     * @param param3 response status code
     * @param param4 any details needed to pass down.
     */
    function MyError(param1, param2, param3, param4) {
        var _this = this;
        var stack;
        if (param1 instanceof MyError) {
            return param1;
        }
        if (param1 instanceof Error) {
            if (!param4)
                param4 = param1;
            stack = param1.stack;
            if (!param2)
                param2 = param1.message;
            param1 = MyErrorCodeEnum.TM00X;
        }
        if (param4 instanceof Error) {
            stack = param4.stack;
            if (!param2)
                param2 = param4.message;
        }
        if (param2 instanceof Error) {
            if (!param4)
                param4 = param2;
            stack = param2.stack;
            param2 = param2.message;
        }
        if (param3 instanceof Error) {
            if (!param4)
                param4 = param3;
            stack = param3.stack;
            if (!param2)
                param2 = param3.message;
            param1 = MyErrorCodeEnum.TM00X;
            param3 = 500;
        }
        var data = getMessageFromCode(param1);
        if (!param2) {
            param2 = data.message;
        }
        if (!param3) {
            param3 = data.responeStatus;
        }
        _this = _super.call(this, param2) || this;
        _this.code = param1;
        _this.stack = stack;
        if (!_this.stack)
            Error.captureStackTrace(_this, MyError);
        if (param4) {
            _this.details = param4;
        }
        _this.message = param2;
        _this.responeStatus = param3 || 500;
        // Set the prototype explicitly.
        Object.setPrototypeOf(_this, MyError.prototype);
        return _this;
    }
    MyError.prototype.toString = function () {
        return this.code + ": " + this.message;
    };
    MyError.prototype.toJSON = function () {
        var ret = {
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
    };
    return MyError;
}(Error));
exports.MyError = MyError;
var MyErrorCodeEnum;
(function (MyErrorCodeEnum) {
    // UFO Custom Error
    MyErrorCodeEnum["TM00X"] = "TM00X";
    MyErrorCodeEnum["TM001"] = "TM001";
    MyErrorCodeEnum["TM002"] = "TM002";
    MyErrorCodeEnum["TM003"] = "TM003";
    MyErrorCodeEnum["TM004"] = "TM004";
    MyErrorCodeEnum["TM005"] = "TM005";
    MyErrorCodeEnum["TM006"] = "TM006";
    MyErrorCodeEnum["TM007"] = "TM007";
    MyErrorCodeEnum["TM008"] = "TM008";
    MyErrorCodeEnum["TM009"] = "TM009";
    MyErrorCodeEnum["TM010"] = "TM010";
    MyErrorCodeEnum["TM011"] = "TM011";
    MyErrorCodeEnum["TM012"] = "TM012";
    MyErrorCodeEnum["TM013"] = "TM013";
    MyErrorCodeEnum["TM014"] = "TM014";
    MyErrorCodeEnum["TM015"] = "TM015";
})(MyErrorCodeEnum = exports.MyErrorCodeEnum || (exports.MyErrorCodeEnum = {}));
function getMessageFromCode(c) {
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
