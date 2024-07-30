import mongoose from 'mongoose';

let Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    sexe: { type: String },
    address: {
        street: String,
        city: String,
        zipcode: String
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
}, { virtuals: true });

userSchema.virtual('type_person')
    .get(function () {
        return this.age > 30 ? 'old' : 'young'
    })


// userSchema.index('username')
userSchema.virtual('fullName')
    .get(function () {
        return `${this.firstName} ${this.lastName}`;
    })
    .set(function (v) {
        const [firstName, lastName] = v.split(' ');
        this.firstName = firstName;
        this.lastName = lastName;
    });

export default userSchema