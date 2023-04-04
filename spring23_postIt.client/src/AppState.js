import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {import('./models/Album.js').Album[]} */
  albums: [],

  /** @type {import('./models/Album.js').CollabAlbum[]} */
  myAlbums: [],

  /** @type {import('./models/Album.js').Album} */
  album: {},

  /** @type {import('./models/Picture.js').Picture[]} */
  pictures: [],

  /** @type {import('./models/AlbumMember.js').AlbumMember[]} */
  albumMembers: []
})
