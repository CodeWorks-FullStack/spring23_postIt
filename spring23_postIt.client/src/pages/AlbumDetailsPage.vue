<template>
  <div class="row AlbumDetailsPage" v-if="album.id">
    <!-- SECTION LEFT SIDE -->
    <div class="col-md-4">
      <div>
        <div class="row">
          <div class="col-md-6">
            <img class="img-fluid rounded white-shadow" :src="album.coverImg" alt="">
          </div>
          <div class="col-md-6">
            <div class="bg-warning white-shadow rounded p-2">
              <h4>{{ album.title }}</h4>
              <p>by: <span>{{ album.creator?.name }}</span></p>
            </div>
            <div class="pt-3">
              <button v-if="isCollab" class="btn btn-info" data-bs-target="#pictureModal" data-bs-toggle="modal"
                :disabled="album.archived"> <i class="mdi mdi-plus"></i> Picture</button>
            </div>
          </div>
        </div>

        <div class="row m-2">
          <div class="col-md-4 bg-info text-light rounded p-1">
            <p class="m-0"><b>{{ albumMembers.length }}</b></p>
            <p><b>Collaborators</b></p>
          </div>

          <div class="col-md-6">
            <button v-if="!isCollab && account.id" class="btn btn-info" :disabled="album.archived"
              @click="createCollab()"> <i class="mdi mdi-heart-outline"></i>
              <p>Collab</p>
            </button>

            <button v-else-if="account.id" class="btn btn-danger" @click="removeCollab(isCollab.collaboratorId)"> <i
                class="mdi mdi-heart-broken"></i>
              <p>UnCollab</p>
            </button>
          </div>


        </div>
      </div>

      <div v-if="album.archived">
        <h1 class="text-danger">ALBUM HAS BEEN ARCHIVED</h1>
      </div>

      <div class="row m-2">
        <div class="col-md-2 bg-primary rounded p-1" v-for="m in albumMembers" :key="m.id">
          <img class="img-fluid rounded-circle" :src="m.picture" alt="">
          <p class="text-center text-light">{{ m.name }}</p>
        </div>
      </div>
    </div>

    <!-- SECTION RIGHT SIDE -->
    <div class="col-md-8">
      <div class="row">
        <!-- STUB Pictures will go here -->
        <div class="col-md-4 p-4" v-for="p in pictures" :key="p.id">
          <img class="img-fluid rounded picture-style" :src="p.imgUrl" alt="">
        </div>
      </div>
    </div>
  </div>


  <Modal id="pictureModal" class="bg-primary">
    <template #header>
      <div>Create Picture</div>
    </template>

    <template #bigBody>
      <PictureForm />
    </template>

  </Modal>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { useRoute } from 'vue-router';
import { albumsService } from '../services/AlbumsService.js';
import { picturesService } from '../services/PicturesService.js'
import { albumMembersService } from '../services/AlbumMembersService.js'

export default {
  setup() {
    const route = useRoute()

    async function getAlbumById() {
      try {
        const albumId = route.params.albumId
        await albumsService.getAlbumById(albumId)
      } catch (error) {
        console.error(error)
        // @ts-ignore 
        Pop.error(('[ERROR]'), error.message)
      }
    }

    async function getPicturesByAlbum() {
      try {
        const albumId = route.params.albumId
        await picturesService.getPicturesByAlbum(albumId)
      } catch (error) {
        console.error(error)
        // @ts-ignore 
        Pop.error(('[ERROR]'), error.message)
      }
    }

    async function getAlbumMembers() {
      try {
        const albumId = route.params.albumId
        await albumMembersService.getAlbumMembers(albumId)
      } catch (error) {
        console.error(error)
        // @ts-ignore 
        Pop.error(('[ERROR]'), error.message)
      }
    }

    onMounted(() => {
      getAlbumById()
      getPicturesByAlbum()
      getAlbumMembers()
    })

    return {
      album: computed(() => AppState.album),
      pictures: computed(() => AppState.pictures),
      albumMembers: computed(() => AppState.albumMembers),
      account: computed(() => AppState.account),

      isCollab: computed(() => AppState.albumMembers.find(c => c.id == AppState.account.id)),

      async createCollab() {
        try {
          await albumMembersService.createCollab({ albumId: route.params.albumId })
        } catch (error) {
          console.error(error)
          // @ts-ignore 
          Pop.error(('[ERROR]'), error.message)
        }
      },

      async removeCollab(collaboratorId) {
        try {
          if (await Pop.confirm('Are you sure you want to stop collaborating?')) {
            await albumMembersService.removeCollab(collaboratorId)
          }
        } catch (error) {
          console.error(error)
          // @ts-ignore 
          Pop.error(('[ERROR]'), error.message)
        }
      }

    }
  }
};
</script>


<style lang="scss" scoped>
.picture-style {
  box-shadow: 4px 4px purple;
}

.white-shadow {
  box-shadow: 4px 4px white;
}
</style>