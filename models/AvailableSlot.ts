import mongoose, { Document } from "mongoose";

export interface IAvailableSlot extends Document {
    date: Date;
    availableTimes: string[];
    service: mongoose.Schema.Types.ObjectId;
    maxAppointments: number;
    currentAppointments: number;
}

const AvailableSlotSchema = new mongoose.Schema<IAvailableSlot>({
    date: {
        type: Date,
        required: true
    },
    availableTimes: {
        type: [String],
        required: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    maxAppointments: {
        type: Number,
        default: 1
    },
    currentAppointments: {
        type: Number,
        default: 0
    }
});

const AvailableSlot = mongoose.models.AvailableSlot || mongoose.model<IAvailableSlot>("AvailableSlot", AvailableSlotSchema);

export default AvailableSlot;