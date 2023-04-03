<template>
  <div class="row AlbumDetailsPage" v-if="album.id">
    <!-- SECTION LEFT SIDE -->
    <div class="col-md-4">
      <div class="row">
        <img class="img-fluid" :src="album.coverImg" alt="">
        <div>
          <p>{{ album.title }}</p>
          <p>{{ album.creator?.name }}</p>
          <button class="btn btn-success">Add Picture</button>
        </div>
      </div>

      <div class="row">
        <p># Collaborators</p>
        <button class="btn btn-info">Collab</button>
      </div>

      <div>
        <!-- STUB collab images will go here -->
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
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { useRoute } from 'vue-router';
import { albumsService } from '../services/AlbumsService.js';
import { picturesService } from '../services/PicturesService.js'
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

    onMounted(() => {
      getAlbumById()
      getPicturesByAlbum()
    })

    return {
      album: computed(() => AppState.album),
      pictures: computed(() => AppState.pictures),
    }
  }
};
</script>


<style lang="scss" scoped></style>