import mongoose from 'mongoose';
import auditSchema from './auditSchema.js';

let Schema = mongoose.Schema;

const userSchema = auditSchema({
    id: {
        type: Number,
        index: true,
        unique: true,
        sparse: true
    },
    // name: { type: String, required: true },
    name: String,
    email: [
        Schema(
            {
                value: {
                    type: String,
                    trim: true,
                    lowercase: true
                }
            },
            { _id: false, strict: false }
        )
    ],
    type: String,
})


export default userSchema