import { AppState } from "../AppState.js"
import { CollabAlbum } from "../models/Album.js"
import { AlbumMember } from "../models/AlbumMember.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class AlbumMembersService {

  async getAlbumMembers(albumId) {
    const res = await api.get(`api/albums/${albumId}/collaborators`)
    // logger.log('[GETTING ALBUM COLLABORATORS]', res.data)
    AppState.albumMembers = res.data.map(m => new AlbumMember(m))
    logger.log('[ALBUM MEMBER IN THE APPSTATE]', AppState.albumMembers)
  }

  async createCollab(albumData) {
    const res = await api.post('api/collaborators', albumData)
    // logger.log('[CREATING COLLAB]', res.data)
    AppState.albumMembers.push(new AlbumMember(res.data))
    AppState.myAlbums.push(new CollabAlbum(res.data))
  }

  async removeCollab(collaboratorId) {
    const res = await api.delete(`api/collaborators/${collaboratorId}`)
    logger.log('[REMOVING COLLAB]', res.data)

    // NOTE removing the relationship in albumMembers
    const collabIndex = AppState.albumMembers.findIndex(c => c.collaboratorId == collaboratorId)
    if (collabIndex !== -1) {
      AppState.albumMembers.splice(collabIndex, 1)
    }
    // NOTE removing the relationship in myAlbums
    const myAlbumIndex = AppState.myAlbums.findIndex(m => m.collaboratorId == collaboratorId)
    if (myAlbumIndex !== -1) {
      AppState.myAlbums.splice(myAlbumIndex, 1)
    }

  }

}


export const albumMembersService = new AlbumMembersService()