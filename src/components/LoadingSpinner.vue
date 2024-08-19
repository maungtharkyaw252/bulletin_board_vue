<template>
  <div v-if="isloading" class="loading-container">
    <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['isloading']
}
</script>
<style scoped>
.loading-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
