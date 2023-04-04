<template>
  <router-link :to="{ name: 'AlbumDetails', params: { albumId: album.id } }">
    <div class="AlbumCard card">
      <div>
        <img class="img-fluid" :src="album.coverImg" alt="">
      </div>

      <div>
        <h4>{{ album.title }}</h4>
      </div>

      <div>
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
    return {}
  }
};
</script>


<style lang="scss" scoped></style>