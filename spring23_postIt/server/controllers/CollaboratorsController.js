import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { collaboratorsService } from "../services/CollaboratorsService";

export class CollaboratorsController extends BaseController{
  constructor() {
    super('api/collaborators')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post("", this.create)
    .delete("/:id", this.delete)
  }

  async create(req, res, next) {
    try {
      let collaboratorData = req.body
      collaboratorData.accountId = req.userInfo.id
      let collaborator = await collaboratorsService.create(collaboratorData)
      return res.send(collaborator)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      let collaboratorId = req.params.id
      let userId = req.userInfo.id
      let message = await collaboratorsService.delete(collaboratorId, userId)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}
