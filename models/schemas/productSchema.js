import mongoose from 'mongoose';
import auditSchema from './auditSchema.js';

let Schema = mongoose.Schema;

const productSchema = auditSchema({
    id: {
        type: Number,
        index: true,
        unique: true,
        sparse: true
    },
    name: String,
    price: String,
    stocked: Boolean
})


export default productSchema