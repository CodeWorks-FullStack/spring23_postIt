<template>
  <router-link :to="{ name: 'AlbumDetails', params: { albumId: album.id } }">
    <div class="AlbumCard elevation-5 rounded" :style="{ backgroundColor: bg }">

      <img class="img-fluid album-img rounded" :src="album.coverImg" alt="">


      <div class="text-center p-1">
        <h5>{{ album.title }}</h5>
      </div>

      <div class="text-center p-1">
        <p> {{ album.memberCount }} <span>❤</span> </p>
      </div>
    </div>
  </router-link>
</template>


<script>

import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Album } from '../models/Album.js';
export default {

  props: {
    album: { type: Album, required: true }
  },

  setup() {

    const colors = ['blue', 'purple', 'chartreuse', 'bisque', 'orange', 'indigo', 'pink']

    return {
      bg: computed(() => colors[~~(Math.random() * colors.length)])
    }
  }
};
</script>


<style lang="scss">
.AlbumCard {
  max-height: 40em;
  color: black;
  // background-color: white;
  box-shadow: 4px 4px white;
}

.album-img {
  height: 10em;
  width: 100%;
}
</style>