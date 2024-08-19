<template>
  <div v-if="visible" class="alert alert-success" role="alert">
    {{ message }}
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  props: ['message'],
  methods: {
    showAlert () {
      this.visible = true
      setTimeout(function () {
        this.visible = false
      }, 500)
    }
  },
  watch: {
    message (newMessage) {
      if (newMessage) this.showAlert()
    }
  }
}
</script>
