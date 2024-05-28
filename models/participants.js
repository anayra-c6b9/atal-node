import { Schema, model } from "mongoose";

const participantSchema = new Schema({
  prefix: {
    type: Schema.Types.String,
    required: true,
  },
  name: {
    type: Schema.Types.String,
    required: true,
  },
  institute: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
  department: {
    type: Schema.Types.String,
    required: true,
  },
  contact: {
    type: Schema.Types.Number,
    required: true,
  },
  event_id: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
});

const Participant = model("Participant", participantSchema);

export { Participant };
