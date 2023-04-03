import { dbContext } from "../db/DbContext"

class AlbumsService{
  async create(albumData) {
    const album = await dbContext.Albums.create(albumData)
    await album.populate("creator")
    return album
  }

}

export const albumsService = new AlbumsService()
