import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class AlbumsService{
  async archive(albumId, userId) {
    let album = await this.getOne(albumId)
    if(album.creatorId != userId) {
      throw new Forbidden(`You do not have permission to archive Album ${album.title}.`)
    }

    album.archived = true
    await album.save()
    return `Album: ${album.title} was successfully deleted.`
  }
  async getOne(albumId) {
    const album = await dbContext.Albums.findById(albumId).populate("creator")
    if(album == null) {
      throw new BadRequest('This album does not exist.')
    }
    return album
  }
  async getAll() {
    const albums = await dbContext.Albums.find().populate("creator")
    return albums
  }
  async create(albumData) {
    const album = await dbContext.Albums.create(albumData)
    await album.populate("creator")
    return album
  }

}

export const albumsService = new AlbumsService()
