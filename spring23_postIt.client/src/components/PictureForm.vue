<template>
  <form action="" @submit.prevent="createPicture()">
    <div>
      <label for="imgUrl">Add a Picture</label>
      <input class="form-control" type="url" required name="imgUrl" id="imgUrl" v-model="editable.imgUrl">
    </div>

    <div>
      <button class="btn btn-success" type="submit" data-bs-dismiss="modal">Create Picture</button>
    </div>

  </form>
</template>


<script>

import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop.js'
import { picturesService } from '../services/PicturesService.js';

export default {
  setup() {

    const editable = ref({})
    const route = useRoute()

    return {
      editable,

      async createPicture() {
        try {
          let pictureData = editable.value
          pictureData.albumId = route.params.albumId
          await picturesService.createPicture(pictureData)
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