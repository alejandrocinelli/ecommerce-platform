import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const orderSchema = new mongoose.Schema({

    user: { type: String },
    products: { type: Schema.Types.Array },
    orderNumber: { type: Number, unique: true },
    dateTime: { type: Date, required: true },
    status: { type: String, default: 'generada' },
    customerEmail: { type: String, required: true },
});

orderSchema.plugin(AutoIncrement, { inc_field: 'orderNumber' });

const Order = mongoose.model('Order', orderSchema);

export default Order;
