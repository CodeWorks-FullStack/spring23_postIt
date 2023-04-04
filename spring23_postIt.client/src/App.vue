<template>
  <header>
    <Navbar />
  </header>


  <main class="container-fluid hero-bg">
    <router-view />
  </main>
  <!-- <footer class="bg-dark text-light">
    Made with 💖 by CodeWorks
  </footer> -->

  <Modal id="albumModal">
    <template #header>
      <div>Create Album</div>
    </template>

    <template #bigBody>
      <AlbumForm />
    </template>
  </Modal>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import Modal from './components/Modal.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

.hero-bg {
  background-image: url('../src/assets/img/Home\ Page\ 1.png');
  background-position: center;
  background-repeat: none;
  background-size: cover;
}
</style>
