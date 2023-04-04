import { Schema } from "mongoose";

export const AlbumSchema = new Schema({
  title: {type: String, required: true, minLength: 3, maxLength: 500},
  // NOTE MAKE SURE YOU'RE PASSING YOUR ENUM AS AN ARRAY, AND YOUR OBJECTS AS A STRING
  category: {type: String, enum:["cars", "animals", "pokemon", "misc", "fish", "food", "germs", "coding", "games", "music"], default: "misc"},
  archived: {type: Boolean, default: false},
  coverImg: {type: String, required: true, maxLength: 1000},
  creatorId: {type: Schema.Types.ObjectId, required: true, ref: "Account"}
}, { timestamps: true, toJSON: { virtuals: true }})

// TODO SET UP MEMBER COUNT VIRTUAL AFTER COLLABORATORS IS MADE

AlbumSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: "Account"
})
