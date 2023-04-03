import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { albumsService } from "../services/AlbumsService";

export class AlbumsController extends BaseController{
  constructor(){
    super('api/albums')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post("", this.create)
  }

  async create(req, res, next) {
    try {
      // let userId = req.userInfo.id
      let albumData = req.body
      albumData.creatorId = req.userInfo.id
      let album = await albumsService.create(albumData)
      return res.send(album)
    } catch (error) {
      next(error)
    }
  }
}
