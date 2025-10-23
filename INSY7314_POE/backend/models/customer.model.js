import mongoose from "mongoose";

//Model.js freeCodeCamp.org (2024)

const customerSchema = new mongoose.Schema({
    id_number:{
        type: String,
        required: true
    },
    full_name:{
        type: String,
        required: true
    },
    account_number:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
}, {
    timestamps: true //createdAt + updatedAt freeCodeCamp.org (2024)
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;

/*
Reference list:
MERN Stack Tutorial with Deployment – Beginner's Course. 2024. YouTube video, added by freeCodeCamp.org. [Online]. Available at: https://www.youtube.com/watch?v=O3BUHwfHf84&t=1620s [Accessed 3 October 2025]. 
*/