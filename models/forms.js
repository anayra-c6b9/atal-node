import { Schema, model } from "mongoose";

const formSchema = new Schema({
    title: {
        type: Schema.Types.String,
        required: true,
    },
    description: {
        type: Schema.Types.String,
        required: true,
    },
    location: {
        type: Schema.Types.String,
        required: true,
    },
    isActive: {
        type: Schema.Types.Boolean,
    },
    outdoorActivity: {
        type: Schema.Types.String,
    },
    gtq: {
        type: Schema.Types.Boolean,
    },
    ltq: {
        type: Schema.Types.Boolean,
    },
    ltt: {
        type: Schema.Types.Boolean,
    },
});

const Form = model("Form", formSchema);

export { Form };