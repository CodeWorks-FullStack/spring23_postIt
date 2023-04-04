import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { albumsService } from "../services/AlbumsService";
import { picturesService } from "../services/PIcturesService";

export class AlbumsController extends BaseController{
  constructor(){
    super('api/albums')
    this.router
    .get("", this.getAll)
    .get("/:id", this.getOne)
    .get("/:id/pictures", this.getPictures)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post("", this.create)
    .delete("/:id", this.archive)
  }

  // CREATE
  async create(req, res, next) {
    try {
      // NOTE ALIASED OUT INTO albumData TO CREATE ONE OBJECT TO SEND TO SERVICES
      let albumData = req.body
      albumData.creatorId = req.userInfo.id
      let album = await albumsService.create(albumData)
      return res.send(album)
    } catch (error) {
      next(error)
    }
  }

  // GET ALL
  async getAll(req, res, next) {
    try {
      let albums = await albumsService.getAll()
      return res.send(albums)
    } catch (error) {
      next(error)
    }
  }

  // GET ONE
  async getOne(req, res, next) {
    try {
      let albumId = req.params.id
      let album = await albumsService.getOne(albumId)
      return res.send(album)
    } catch (error) {
      next(error)
    }
  }

  // ARCHIVE
  async archive(req, res, next) {
    try {
      let userId = req.userInfo.id
      let albumId = req.params.id
      let message = await albumsService.archive(albumId, userId)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }

  // SECTION PICTURES

  // GET ALL PICTURES
  async getPictures(req, res, next) {
    try {
      let albumId = req.params.id
      let pictures = await picturesService.getAll(albumId)
      return res.send(pictures)
    } catch (error) {
      next(error)
    }
  }
}
