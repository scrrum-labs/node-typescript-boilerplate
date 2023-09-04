"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
// firs step
const base_controller_1 = require("../base.controller");
const tsoa_1 = require("tsoa");
const student_service_1 = require("../../services/v1/student.service");
// second step
let StudentController = class StudentController extends base_controller_1.BaseController {
    studentList() {
        return __awaiter(this, void 0, void 0, function* () {
            const studentList = yield new student_service_1.StudentService().getStudentList();
            return this._successResponse('', studentList, 'Student List', 200, studentList.length);
        });
    }
    studentDetail(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentDetail = yield new student_service_1.StudentService().getStudentDetail(studentId);
            return this._successResponse('', studentDetail, 'Student Detail', 200, 1);
        });
    }
    addStudent(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield new student_service_1.StudentService().createStudent(requestBody);
            return this._successResponse('', student, 'Student Detail Added Successfully', 200, 1);
        });
    }
    deleteStudent(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentDetail = yield new student_service_1.StudentService().deleteStudentDetail(studentId);
            return this._successResponse('', studentDetail, 'Student Detail Deleted Successfully', 200, 1);
        });
    }
    updateStudentDetail(studentId, studentRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield new student_service_1.StudentService().updateStudent(studentId, studentRequest);
            return this._successResponse('', student, 'Student Detail Updated Successfully', 200, 1);
        });
    }
};
__decorate([
    tsoa_1.Get('/list')
], StudentController.prototype, "studentList", null);
__decorate([
    tsoa_1.Get('{studentId}/detail'),
    __param(0, tsoa_1.Path())
], StudentController.prototype, "studentDetail", null);
__decorate([
    tsoa_1.SuccessResponse('201', 'Student Registered successfully'),
    tsoa_1.Post('/create-student'),
    __param(0, tsoa_1.Body())
], StudentController.prototype, "addStudent", null);
__decorate([
    tsoa_1.Delete('{studentId}/delete'),
    __param(0, tsoa_1.Path())
], StudentController.prototype, "deleteStudent", null);
__decorate([
    tsoa_1.Put('{studentId}/update'),
    __param(0, tsoa_1.Path()), __param(1, tsoa_1.Body())
], StudentController.prototype, "updateStudentDetail", null);
StudentController = __decorate([
    tsoa_1.Tags('Student'),
    tsoa_1.Route('/student')
], StudentController);
exports.StudentController = StudentController;
//# sourceMappingURL=student.controller.js.map