import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { albumsService } from "../services/AlbumsService"

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/collaborators', this.getAlbumsImCollaboratedOn)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getAlbumsImCollaboratedOn(req, res, next) {
    try {
      let accountId = req.userInfo.id
      let albums = await albumsService.getAlbumsImCollaboratedOn(accountId)
      return res.send(albums)
    } catch (error) {
      next(error)
    }
  }
}
