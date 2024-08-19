<template>
  <div>
    <LoadingSpinner :isloading="loading" />
    <div class="cmn-form-blk">
      <div class="form-container">
        <h2 class="cmn-form-title">
          Edit a post
        </h2>
        <hr class="cmn-line">
        <div class="cmn-input-container">
          <label for="title"><span class="text-danger">&#42;</span> Title</label>
          <b-form-input id="title" v-model="post.title" class="cmn-input" placeholder="Enter post title"></b-form-input>
          <span v-show="titleError !== ''" class="text-danger text-sm">{{ titleError }}</span>
        </div>
        <div class="cmn-input-container">
          <label for="description"><span class="text-danger">&#42;</span> Description</label>
          <b-form-input id="description" v-model="post.description" class="cmn-input" placeholder="Enter post description"></b-form-input>
          <span v-show="descriptionError !== ''" class="text-danger text-sm">{{ descriptionError }}</span>
        </div>
        <div class="cmn-input-container">
          <b-form-checkbox id="checkbox-1" v-model="post.status" name="checkbox-1" value="1" unchecked-value="0">
            Active Status
          </b-form-checkbox>
        </div>
        <div class="d-flex">
          <button type="button" class="btn btn-info me-2" @click="updatePost">Edit</button>
          <button type="button" class="btn btn-secondary" @click="setOriginalState">Clear</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LoadingSpinner from '@/components/LoadingSpinner.vue'
export default {
  data () {
    return {
      originalPost: null,
      post: {
        title: '',
        description: '',
        status: 0
      },
      titleError: '',
      descriptionError: '',
      loading: false
    }
  },
  mounted () {
    const id = this.$route.params.id
    this.fetchSinglePost(id)
  },
  methods: {
    fetchSinglePost (postId) {
      this.loading = true
      this.axios.get(`http://127.0.0.1:8000/api/post/${postId}`)
        .then((response) => {
          const data = response.data
          this.post = data.data
          this.originalPost = data.data
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false
          }, 500)
        })
    },
    updatePost () {
      this.post.status = Number(this.post.status)
      this.loading = true
      this.axios.put(`http://127.0.0.1:8000/api/post/edit/${this.post.id}`, this.post)
        .then((response) => {
          const data = response.data
          console.log(data)
          if (data.errors) {
            this.titleError = data.errors.title[0]
            this.descriptionError = data.errors.description[0]
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false
          }, 500)
        })
    },
    setOriginalState () {
      this.post = {
        title: this.originalPost.title,
        description: this.originalPost.description,
        status: this.originalPost.status
      }
    }
  },
  components: {
    LoadingSpinner
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
