import { Profile } from "./Account.js"


export class Album {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.coverImg = data.coverImg
    this.category = data.category
    this.archived = data.archived
    this.creatorId = data.creatorId
    this.creator = new Profile(data.creator)
    // TODO other data will go here when we have it
  }
}