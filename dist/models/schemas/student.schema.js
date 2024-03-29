"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = exports.studentSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.studentSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Student = mongoose_1.default.model('student', exports.studentSchema);
//# sourceMappingURL=student.schema.js.map