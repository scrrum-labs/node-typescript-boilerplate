import { IStudent } from '../../models/interfaces/IStudent';
import {studentSchema, Student} from '../../models/schemas/student.schema'

export class StudentService {
    public async getStudentList () {
        const studentList = await Student.find().exec();
        return studentList;
    }

    public async getStudentDetail(studentId: string) {
        const studentDetail = await Student.findById(studentId).exec();
        return studentDetail;
    }

    public async createStudent(studentRequest: IStudent) {
        const student = new Student(studentRequest);
        const studentDetail = await student.save();
        return studentDetail;
    }

    public async deleteStudentDetail(studentId: string) {
        const student = Student.findByIdAndDelete(studentId);
        return student;
    }

    public async updateStudent(studentId: string, studentRequestBody: IStudent) {
        const studentUpdatedDetail = Student.findByIdAndUpdate(studentId, studentRequestBody, {new: true});
        return studentUpdatedDetail;
    }
}