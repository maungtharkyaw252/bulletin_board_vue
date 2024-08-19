<template>
  <div>
    <LoadingSpinner :isloading="loading" />
    <AlertBox :message="successMessage" />
    <div class="cmn-form-blk">
      <div class="form-container">
        <h2 class="cmn-form-title">
          Create a post
        </h2>
        <hr class="cmn-line">
        <div class="cmn-input-container">
          <label for="title"><span class="text-danger">&#42;</span> Title</label>
          <b-form-input id="title" v-model="title" class="cmn-input" placeholder="Enter post title"></b-form-input>
          <span v-show="titleError !== ''" class="text-danger text-sm">{{ titleError }}</span>
        </div>
        <div class="cmn-input-container">
          <label for="description"><span class="text-danger">&#42;</span> Description</label>
          <b-form-input id="description" v-model="description" class="cmn-input" placeholder="Enter post description"></b-form-input>
          <span v-show="descriptionError !== ''" class="text-danger text-sm">{{ descriptionError }}</span>
        </div>
        <div>
          <b-button variant="success" class="me-2" @click="createPost">Create</b-button>
          <b-button @click="clearInput">Clear</b-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import AlertBox from '@/components/AlertBox.vue'
export default {
  components: {
    LoadingSpinner,
    AlertBox
  },
  data () {
    return {
      title: '',
      description: '',
      titleError: '',
      descriptionError: '',
      successMessage: '',
      loading: false
    }
  },
  methods: {
    clearInput: function () {
      this.title = ''
      this.description = ''
    },
    createPost: function () {
      this.loading = true
      this.axios.post('http://127.0.0.1:8000/api/post/create', {
        title: this.title,
        description: this.description
      })
        .then((response) => {
          const data = response.data
          if (data.errors) {
            this.titleError = data.errors.title[0]
            this.descriptionError = data.errors.description[0]
          }
          this.successMessage = data.message
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false
          }, 500)
        })
    }
  }
}
</script>
<style scoped>
.cmn-form-blk {
  width: 500px;
  margin: 20px auto;
  background-color: white;
  border-radius: 10px;
}

.cmn-form-title {
  font-size: 20px;
  text-align: center;
}

.cmn-line {
  margin-bottom: 25px;
  border: 1px solid #f1f1f1;
}

.cmn-input-container {
  margin-bottom: 22px;
}

.cmn-input {
  display: inline-block;
  width: 100%;
  margin: 5px 0;
  padding: 15px 10px;
  border: 1px solid #b8b8b8;
  background: #ffffff;
  letter-spacing: 2px;
}
</style>
