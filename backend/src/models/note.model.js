const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    content: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

const noteModel = mongoose.model("notes", noteSchema);

module.exports = noteModel;
