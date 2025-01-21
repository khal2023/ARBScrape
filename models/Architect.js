const mongoose = require("mongoose");
const { Schema } = mongoose;

const ArchitectSchema = new Schema(
{
    firstNames: {
        type: String, 
        required: true, 
    },
    surname: {
        type: String,
        required: true, 
        index: true, 
    },
    ARBRegistrationNumber: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    emailAddress: {
        type: String,
    },
    companyName: {
        type: String,
    },
    companyAddressFirstLines: {
        type: String,
    },
    companyTown: {
        type: String,
    },
    companyPostCode: {
        type: String,
    }, 
    companyCountry: {
        type: String,
    },

}, 
{
    timestamps: true, 
});

const Architect = mongoose.model("Architect", ArchitectSchema);

module.exports = Architect;