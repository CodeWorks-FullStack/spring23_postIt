<template>
  <!-- SECTION MY ALBUMS or ALBUMS THAT I COLLAB ON -->
  <div class="row justify-content-center p-3">
    <div class="col-md-10" v-if="account.id && myAlbums.length">
      <h3 class="text-light">My Albums</h3>
      <div class="row">
        <div class="col-md-2" v-for="m in myAlbums" :key="m.id">
          <AlbumCard :album="m" />
        </div>
      </div>
    </div>
  </div>

  <!-- SECTION FILTER BAR-->
  <div class="row justify-content-center p-4">
    <div class="col-md-10 bg-primary p-2 rounded">
      <div class="d-flex justify-content-evenly">
        <button class="btn btn-outline-light" @click="changeFilterCategory('')">ALL</button>
        <button class="btn btn-outline-light" @click="changeFilterCategory(c)" v-for="c in categories">{{ c.toUpperCase()
        }}</button>
      </div>
    </div>
  </div>

  <!-- SECTION ALL ALBUMS -->
  <div class="row justify-content-center p-3">
    <div class="col-md-7">
      <div class="row">
        <div class="col-md-3 p-3" v-for="a in albums" :key="a.id">
          <!-- STUB Album cards will go here -->
          <AlbumCard :album="a" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pop from '../utils/Pop.js';
import { albumsService } from '../services/AlbumsService.js'
import { onMounted, computed, ref } from 'vue';
import { AppState } from '../AppState.js';

export default {
  setup() {

    const filterCategory = ref('')

    const categories = ["cars", "animals", "pokemon", "misc", "fish", "food", "germs", "coding", "games", "music"]

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
      categories,

      myAlbums: computed(() => AppState.myAlbums),
      account: computed(() => AppState.account),

      albums: computed(() => {
        if (!filterCategory.value) {
          return AppState.albums
        } else { return AppState.albums.filter(a => a.category == filterCategory.value) }
      }),

      changeFilterCategory(category) {
        filterCategory.value = category
      }
    }
  }
}
</script>

<style lang="scss"></style>
