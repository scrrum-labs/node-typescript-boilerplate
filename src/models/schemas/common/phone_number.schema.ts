import mongoose from "mongoose";

export const PhoneNumberSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    }
});
