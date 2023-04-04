import { Schema } from "mongoose";

export const PicturesSchema = new Schema({
  imgUrl: {type: String, required: true, maxLength: 1000},
  albumId: {type: Schema.Types.ObjectId, required: true, ref: "Album"},
  creatorId: {type: Schema.Types.ObjectId, required: true, ref: "Account"}
}, { timestamps: true, toJSON: { virtuals: true }})


// NOTE MAKE SURE TO SET UP VIRTUAL FROM UML

PicturesSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: "Account"
})
