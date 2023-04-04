import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class AlbumsService{

  // SOFT DELETE ALBUMS BY FLIPPING BOOL ON IT. THIS WON'T GET RID OF IT PERMANENTLY IN THE DATABASE
  async archive(albumId, userId) {
    let album = await this.getOne(albumId)

    // NOTE MAKE SURE YOU'RE MAKING A VERIFY CHECK TO MAKE SURE THE PERSON TRYING TO "DELETE" THIS ALBUM IS ALSO THE PERSON WHO CREATED IT
    if(album.creatorId != userId) {
      throw new Forbidden(`You do not have permission to archive Album ${album.title}.`)
    }

    if(album.archived == true) {
      throw new Forbidden(`Album: ${album.title} has already been archived.`)
    }

    // NOTE MAKE SURE TO FLIP THE BOOLEAN, THEN AWAIT AND SAVE ALBUMS IN YOUR DATABASE
    album.archived = true
    await album.save()

    return `Album: ${album.title} was successfully deleted.`
  }

  // GETTING ALBUM BY ID
  async getOne(albumId) {
    const album = await dbContext.Albums.findById(albumId)
    .populate("creator", 'picture name')

    if(album == null) {
      throw new BadRequest('This album does not exist.')
    }

    return album
  }

  // GETTING ALL ALBUMS
  async getAll() {
    const albums = await dbContext.Albums.find()
    // NOTE RETRIEVE AND POPULATE THE "picture" and "name" FIELDS OF THE "creator"
    .populate("creator", 'picture name')
    .populate("memberCount")
    return albums
  }

  // CREATE ALBUM
  async create(albumData) {
    const album = await dbContext.Albums.create(albumData)
    // NOTE MAKE SURE YOU'RE AWAITING YOUR POPULATE ON CREATES
    await album.populate("creator", 'picture name')
    return album
  }

  // SECTION ACCOUNT ALBUMS

  // GET ALL ALBUMS THAT I'M COLLABORATING ON
  async getAlbumsImCollaboratedOn(accountId) {
    let albums = await dbContext.Collaborators.find({accountId})
    // NOTE WE'RE CALLING TO OUR "album" VIRTUAL
    // NOTE THEN WE'RE TARGETING THAT SPECIFIC ALBUM, AND POPULATING IT'S VIRTUALS ON TO THE ORIGINAL "album" VIRTUAL
    .populate({path: "album",
        populate: {
        path: "creator memberCount"
    }})
    return albums
  }

}

export const albumsService = new AlbumsService()
