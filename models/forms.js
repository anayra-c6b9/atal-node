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
  crowdSize: {
    type: Schema.Types.String,
  },
});

const Form = model("Form", formSchema);

export { Form };
