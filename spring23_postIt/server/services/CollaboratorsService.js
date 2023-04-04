import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { albumsService } from "./AlbumsService"

class CollaboratorsService{
  async delete(collaboratorId, userId) {
    let collaborator = await dbContext.Collaborators.findById(collaboratorId)
    if(collaborator == null) {
      throw new BadRequest("That Collaborator doesn't exist.")
    }
    if(userId != collaborator.accountId) {
      throw new Forbidden(`You can't delete somebody else. FOO!`)
    }

    await collaborator.remove()
    return `You are no longer collaborated on this project.`
  }
  async getCollaboratorsOnAlbum(albumId) {
    let collaborators = await dbContext.Collaborators.find({albumId})
    .populate("profile", 'name picture')
    return collaborators
  }
  async create(collaboratorData) {
    const album = await albumsService.getOne(collaboratorData.albumId)
    if(album.archived == true) {
      throw new BadRequest(`Sorry, something went wrong.`)
    }
    let collaborator = await dbContext.Collaborators.create(collaboratorData)
    await collaborator.populate("album")
    await collaborator.populate("profile")
    return collaborator
  }

}

export const collaboratorsService = new CollaboratorsService()
