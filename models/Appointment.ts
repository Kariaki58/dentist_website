import mongoose, { Document } from "mongoose";

export interface IAppointment extends Document {
    name: string;
    phone: string;
    email: string;
    date: Date;
    time: string;
    service: mongoose.Schema.Types.ObjectId;
    message?: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    createdAt: Date;
    updatedAt: Date;
}

const AppointmentSchema = new mongoose.Schema<IAppointment>({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    message: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    }
}, {
    timestamps: true
});

const Appointment = mongoose.models.Appointment || mongoose.model<IAppointment>("Appointment", AppointmentSchema);

export default Appointment;