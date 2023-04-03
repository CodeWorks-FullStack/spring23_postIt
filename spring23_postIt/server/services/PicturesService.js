import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"
import { albumsService } from "./AlbumsService"

class PicturesService {
  async getAll(albumId) {
    const pictures = await dbContext.Pictures.find({albumId}).populate("creator", 'picture name')
    return pictures
  }
  async create(pictureData) {
    let album = await albumsService.getOne(pictureData.albumId)
    if(album.archived == true) {
      throw new Forbidden(`Album ${album.title} does not exist. You can not create a picture on it.`)
    }

    // TODO ADD FUNCTION TO VERIFY USER IS A COLLABORATOR

    let picture = await dbContext.Pictures.create(pictureData)
    await picture.populate("creator")
    return picture
  }

}

export const picturesService = new PicturesService()
