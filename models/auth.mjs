import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: Number,
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "customer"
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

const userModal = mongoose.model('userDetail', userSchema);

export default userModal;