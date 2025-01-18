mongoose = require("mongoose");
const { schema } = 'mongoose';

const ArchitectSchema = new Schema(
{
    firstName: {
        type: String, 
        required: true, 
        index: true,
    },
    otherNames: 
})