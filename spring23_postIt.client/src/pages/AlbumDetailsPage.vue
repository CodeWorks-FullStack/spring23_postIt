<template>
  <div class="row AlbumDetailsPage" v-if="album.id">
    <!-- SECTION LEFT SIDE -->
    <div class="col-md-4">
      <div>
        <div class="row">
          <img class="img-fluid" :src="album.coverImg" alt="">
          <div>
            <p>{{ album.title }}</p>
            <p>{{ album.creator?.name }}</p>
            <button v-if="isCollab" class="btn btn-success" data-bs-target="#pictureModal" data-bs-toggle="modal"
              :disabled="album.archived">Add Picture</button>
          </div>
        </div>

        <div class="row">
          <p>{{ albumMembers.length }}</p>

          <button v-if="!isCollab && account.id" class="btn btn-info" :disabled="album.archived"
            @click="createCollab()">Collab</button>

          <button v-else-if="account.id" class="btn btn-danger"
            @click="removeCollab(isCollab.collaboratorId)">UnCollab</button>

        </div>
      </div>

      <div v-if="album.archived">
        <h1 class="text-danger">ALBUM HAS BEEN ARCHIVED</h1>
      </div>

      <div class="row">
        <div class="col-md-2" v-for="m in albumMembers" :key="m.id">
          <img class="img-fluid rounded-circle" :src="m.picture" alt="">
          <p>{{ m.name }}</p>
        </div>
      </div>
    </div>

    <!-- SECTION RIGHT SIDE -->
    <div class="col-md-8">
      <div class="row">
        <!-- STUB Pictures will go here -->
        <div class="col-md-4 card" v-for="p in pictures" :key="p.id">
          <img class="img-fluid" :src="p.imgUrl" alt="">
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


<style lang="scss" scoped></style>