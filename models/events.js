import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  event_name: {
    type: Schema.Types.String,
    required: true,
  },
});

const Event = model("Event", eventSchema);

export { Event };
