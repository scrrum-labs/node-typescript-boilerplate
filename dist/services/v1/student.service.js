"use strict";
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
exports.StudentService = void 0;
const student_schema_1 = require("../../models/schemas/student.schema");
class StudentService {
    getStudentList() {
        return __awaiter(this, void 0, void 0, function* () {
            const studentList = yield student_schema_1.Student.find().exec();
            return studentList;
        });
    }
    getStudentDetail(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentDetail = yield student_schema_1.Student.findById(studentId).exec();
            return studentDetail;
        });
    }
    createStudent(studentRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = new student_schema_1.Student(studentRequest);
            const studentDetail = yield student.save();
            return studentDetail;
        });
    }
    deleteStudentDetail(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = student_schema_1.Student.findByIdAndDelete(studentId);
            return student;
        });
    }
    updateStudent(studentId, studentRequestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentUpdatedDetail = student_schema_1.Student.findByIdAndUpdate(studentId, studentRequestBody, { new: true });
            return studentUpdatedDetail;
        });
    }
}
exports.StudentService = StudentService;
//# sourceMappingURL=student.service.js.map