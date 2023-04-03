import { AppState } from "../AppState.js"
import { Picture } from "../models/Picture.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PicturesService {

  async getPicturesByAlbum(albumId) {
    const res = await api.get(`api/albums/${albumId}/pictures`)
    // logger.log('[GETTING ALBUM PICTURES]', res.data)
    AppState.pictures = res.data.map(p => new Picture(p))
    logger.log('[PICTURES IN THE APPSTATE]', AppState.pictures)
  }
}


export const picturesService = new PicturesService()