import { Profile } from "./Account.js"


export class Album {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.coverImg = data.coverImg
    this.category = data.category
    this.archived = data.archived
    this.creatorId = data.creatorId
    this.creator = data.creator ? new Profile(data.creator) : null
    // TODO other data will go here when we have it
    this.memberCount = data.memberCount || 0
  }
}

export class CollabAlbum extends Album {
  constructor(data) {
    super(data.album)
    // NOTE this is the id of the collaboration relationship that is made i.e. collaborationId
    this.collaboratorId = data.id
  }
}