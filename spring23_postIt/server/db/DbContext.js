import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { AlbumSchema } from "../models/Album";
import { PicturesSchema } from "../models/Picture";
import { CollaboratorSchema } from "../models/Collaborators";

class DbContext {

  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Albums = mongoose.model('Album', AlbumSchema);
  Pictures = mongoose.model("Picture", PicturesSchema);
  Collaborators = mongoose.model("Collaborator", CollaboratorSchema);
}

export const dbContext = new DbContext()
