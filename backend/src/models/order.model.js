import { model, Schema } from "mongoose";
import mongoose from "mongoose";
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const orderSchema = new  mongoose.Schema({

    user: { type: String },
    products: { type: Schema.Types.Array },
    orderNumber: { type: Number, unique: true },
    dateTime: { type: String},
    status: { type: String, default: 'generada' },
    customerEmail: { type: String, required: true },
});

//orderSchema.plugin(AutoIncrement, { inc_field: 'orderNumber' });

export const Order = model('Order', orderSchema);


