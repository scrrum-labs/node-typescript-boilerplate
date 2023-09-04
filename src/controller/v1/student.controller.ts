// firs step
import { BaseController } from '../base.controller';
import { Route, Get, Tags, Query, Security, Post, Request, Body, Header, Put, Response, Delete, Example, SuccessResponse, Path } from "tsoa";
import { IStudent } from '../../models/interfaces/IStudent';
import { StudentService } from '../../services/v1/student.service';

// second step
@Tags('Student')
@Route('/student')
export class StudentController extends BaseController {
    @Get('/list')
    public async studentList() {
        const studentList = await new StudentService().getStudentList();
        return this._successResponse('', studentList, 'Student List', 200, studentList.length);
    }

    @Get('{studentId}/detail')
    public async studentDetail(@Path() studentId: string) {
        const studentDetail = await new StudentService().getStudentDetail(studentId);
        return this._successResponse('', studentDetail, 'Student Detail', 200, 1);
    }

    @SuccessResponse('201', 'Student Registered successfully')
    @Post('/create-student')
    public async addStudent(@Body() requestBody: IStudent) {
        const student = await new StudentService().createStudent(requestBody);
        return this._successResponse('', student, 'Student Detail Added Successfully', 200, 1);
    }

    @Delete('{studentId}/delete')
    public async deleteStudent(@Path() studentId: string) {
        const studentDetail = await new StudentService().deleteStudentDetail(studentId);
        return this._successResponse('', studentDetail, 'Student Detail Deleted Successfully', 200, 1);
    }

    @Put('{studentId}/update')
    public async updateStudentDetail(@Path() studentId: string, @Body() studentRequest: IStudent) {
        const student = await new StudentService().updateStudent(studentId, studentRequest);
        return this._successResponse('', student, 'Student Detail Updated Successfully', 200, 1);
    }
}