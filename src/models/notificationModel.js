// import mongoose from "mongoose";

// const notificationSchema = new mongoose.Schema({
//     img: {
//         type: String,
        
//     },
//     lecturer: {
//         type: String,
//         unique: true,
//     },
//     time: {
//         type: String,
//     },
//     venue: {
//         type: Boolean,
//         default: false,
//     },
//     unit: {
//         type: String,
//         default: false,
//         unique: true,
//     },
//     time: {
//         type: Number,
//         default: false,
//     },
//     detail: {
//         type: String,
//         default: false,
//     },
//     registrationNumber: {
//         type: String,
//         default: false,
//     },
// })

// const Notification = mongoose.models.notification || mongoose.model("notification", notificationSchema);

// export default Notification 
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    lecturer: {
        type: String,
    },
    saa: {
        type: String,
    },
    venue: {
        type: String,
        
    },
    unit: {
        type: String,
    },
    detail: {
        type: String,
    },
});

const Notification = mongoose.models.notification || mongoose.model("notification", notificationSchema);

export default Notification;
