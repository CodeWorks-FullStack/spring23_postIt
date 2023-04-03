<template>
  <!-- SECTION MY ALBUMS or ALBUMS THAT I COLLAB ON -->
  <div class="row">
    <p>My Albums</p>
  </div>

  <!-- SECTION FILTER BAR-->
  <div class="row">
    <p>Filter Bar</p>
  </div>

  <!-- SECTION ALL ALBUMS -->
  <div class="row">
    {{ albums }}
  </div>
</template>

<script>
import Pop from '../utils/Pop.js';
import { albumsService } from '../services/AlbumsService.js'
import { onMounted, computed } from 'vue';
import { AppState } from '../AppState.js';

export default {
  setup() {

    async function getAllAlbums() {
      try {
        await albumsService.getAllAlbums()
      } catch (error) {
        console.error(error)
        // @ts-ignore 
        Pop.error(('[ERROR]'), error.message)
      }
    }

    onMounted(() => {
      getAllAlbums()
    })

    return {
      albums: computed(() => AppState.albums)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
