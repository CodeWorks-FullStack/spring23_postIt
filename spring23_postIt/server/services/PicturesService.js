import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"
import { albumsService } from "./AlbumsService"

class PicturesService {

  // GET ALL PICTURES IN ALBUM ID ALBUM
  async getAll(albumId) {
    // NOTE GO AND FIND ALL THE PICTURES WHERE THEIR albumId EQUALS THE albumId THAT IS BEING PASSED THROUGH THE PARAMETERS
    const pictures = await dbContext.Pictures.find({albumId})
    .populate("creator", 'picture name')
    return pictures
  }

  // CREATE PICTURE
  async create(pictureData) {
    let album = await albumsService.getOne(pictureData.albumId)

    if(album.archived == true) {
      throw new Forbidden(`Album ${album.title} does not exist. You can not create a picture on it.`)
    }

    let picture = await dbContext.Pictures.create(pictureData)
    await picture.populate("creator", 'picture name')
    return picture
  }

}

export const picturesService = new PicturesService()
