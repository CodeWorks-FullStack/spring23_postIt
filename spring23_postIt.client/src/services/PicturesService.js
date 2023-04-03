import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PicturesService {

  async getPicturesByAlbum(albumId) {
    const res = await api.get(`api/albums/${albumId}/pictures`)
    logger.log('[GETTING ALBUM PICTURES]', res.data)
  }
}


export const picturesService = new PicturesService()