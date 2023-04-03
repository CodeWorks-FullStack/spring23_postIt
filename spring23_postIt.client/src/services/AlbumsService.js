import { AppState } from "../AppState.js"
import { Album } from "../models/Album.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class AlbumsService {

  async getAllAlbums() {
    const res = await api.get('api/albums')
    // logger.log('[GETTING ALL ALBUMS]', res.data)
    AppState.albums = res.data.map(a => new Album(a))
    logger.log('[ALBUMS IN THE APPSTATE]', AppState.albums)
  }

  async getAlbumById(albumId) {
    const res = await api.get(`api/albums/${albumId}`)
    logger.log('[GETTING ALBUM BY ID]', res.data)
    AppState.album = new Album(res.data)
  }

}


export const albumsService = new AlbumsService()