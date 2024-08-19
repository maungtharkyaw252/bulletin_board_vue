<template>
  <div>
    <LoadingSpinner :isloading="loading" />
    <ModalBox :visible="detailModalVisible" header="Post Detail" @close="closeDetailModal">
      <div class="post-info">
        <p class="label">Title</p>
        <p class="value">{{ post?.title }}</p>
      </div>
      <div class="post-info">
        <p class="label">Description</p>
        <p class="value">{{ post?.description }}</p>
      </div>
      <div class="post-info">
        <p class="label">Status</p>
        <p class="value">{{ post?.status === 1 ? "Active" : "Inactive" }}</p>
      </div>
      <div class="post-info">
        <p class="label">Created Date</p>
        <p class="value">{{ formatDate(post?.created_at) }}</p>
      </div>
      <div class="post-info">
        <p class="label">Created User</p>
        <p class="value">{{ post?.created_user.type === "0" ? "Admin" : "User" }}</p>
      </div>
      <div class="post-info">
        <p class="label">Updated Date</p>
        <p class="value">{{ formatDate(post?.updated_at) }}</p>
      </div>
      <div class="post-info">
        <p class="label">Updated User</p>
        <p class="value">{{ post?.updated_user.type === "0" ? "Admin" : "User" }}</p>
      </div>
    </ModalBox>
    <ModalBox :visible="deleteModalVisible" header="Are you sure to delete post?" @close="closeDeleteModal">
      <div class="post-info">
        <p class="label">Id</p>
        <p class="value">{{ post?.id }}</p>
      </div>
      <div class="post-info">
        <p class="label">Title</p>
        <p class="value">{{ post?.title }}</p>
      </div>
      <div class="post-info">
        <p class="label">Description</p>
        <p class="value">{{ post?.description }}</p>
      </div>
      <div class="post-info">
        <p class="label">Status</p>
        <p class="value">{{ post?.status === 1 ? "Active" : "Inactive" }}</p>
      </div>
      <template v-slot:optional>
        <button class="btn btn-danger" @click="deletePost">Delete</button>
      </template>
    </ModalBox>
    <div class="wrap">
      <div class="scroll-container">
        <div class="m-container">
          <div class="d-flex mt-5">
            <b-form-input v-model="keyword" class="keyword-input me-2" placeholder="Enter keyword"></b-form-input>
            <button class="btn btn-success me-2" @click="fetchPosts">Search</button>
            <router-link to="/post/create" class="btn btn-success me-2">Create</router-link>
            <router-link to="/post/upload" class="btn btn-success me-2">Upload</router-link>
            <button class="btn btn-success me-2" @click="downloadCsv">Download</button>
          </div>
          <table class="post-list-table">
            <thead>
              <tr>
                <th scope="col">Post Title</th>
                <th scope="col">Post Description</th>
                <th scope="col">Posted User</th>
                <th scope="col">Posted Date</th>
                <th scope="col">Operation</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="post in posts" :key="post.id">
                <td>
                  <span class="post-title" @click="openDetailModal(post.id)">{{ post.title }}</span>
                </td>
                <td class="post-desc">{{ post.description }}</td>
                <td class="post-created-user">{{ post.created_user.type === "0" ? "Admin" : "User" }}</td>
                <td class="post-created-date">{{ formatDate(post.created_at) }}</td>
                <td>
                  <router-link :to="{ path: `/post/edit/${post.id}` }" class="btn post-edit-btn">Edit</router-link>
                  <button class="btn post-delete-btn" @click="openDeleteModal(post.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ModalBox from '@/components/ModalBox.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
export default {
  data () {
    return {
      keyword: '',
      posts: [],
      postId: null,
      post: null,
      detailModalVisible: false,
      deleteModalVisible: false,
      loading: false
    }
  },
  mounted () {
    this.fetchPosts()
  },
  methods: {
    formatDate (dateString) {
      if (!dateString || dateString === '') return ''
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}/${month}/${day}`
    },
    fetchPosts () {
      this.loading = true
      this.axios.get('http://127.0.0.1:8000/api/post', {
        params: {
          keyword: this.keyword
        }
      })
        .then((response) => {
          const data = response.data
          console.log(data)
          this.posts = data.data
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
    fetchSinglePost () {
      this.axios.get(`http://127.0.0.1:8000/api/post/${this.postId}`)
        .then((response) => {
          const data = response.data
          this.post = data.data
          console.log(data.data)
        })
        .catch((error) => {
          console.error(error)
        })
    },
    deletePost () {
      this.loading = true
      this.axios.delete(`http://127.0.0.1:8000/api/post/delete/${this.postId}`)
        .then((response) => {
          const data = response.data
          if (data.post) {
            this.keyword = ''
            this.fetchPosts()
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.closeDeleteModal()
          setTimeout(() => {
            this.loading = false
          }, 500)
        })
    },
    downloadCsv () {
      this.axios.get('http://127.0.0.1:8000/api/downloadCsv', {
        responseType: 'blob'
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'lists.csv')
          document.body.appendChild(link)
          link.click()
          link.remove()
        })
        .catch((error) => {
          console.error(error)
        })
    },
    openDetailModal (postId) {
      this.detailModalVisible = true
      this.postId = postId
      this.fetchSinglePost()
    },
    closeDetailModal () {
      this.detailModalVisible = false
      this.postId = null
      this.post = null
    },
    openDeleteModal (postId) {
      this.deleteModalVisible = true
      this.postId = postId
      this.fetchSinglePost()
    },
    closeDeleteModal () {
      this.deleteModalVisible = false
      this.postId = null
      this.post = null
    }
  },
  components: {
    ModalBox,
    LoadingSpinner
  }
}
</script>
<style scoped>
.post-list-table {
  width: 100%;
  margin: 20px 0;
  /* need to fix */
  border: 1px solid #ccc;
  table-layout: fixed;
  border-collapse: collapse;
}

.post-list-table thead tr {
  background-color: #2396fa;
}

.post-list-table tr {
  border: 1px solid #ddd;
  background-color: #f8f8f8;
}

.post-list-table tr:nth-child(2n) {
  background-color: #fff;
}

.post-list-table th,
.post-list-table td {
  padding: .625em;
  text-align: center;
}

.post-list-table .post-title {
  text-decoration: underline;
  cursor: pointer;
}

.post-list-table th {
  font-size: .85em;
  text-transform: uppercase;
}

.post-list-table thead th {
  color: #fff;
}

.post-list-table .btn {
  padding: 8px 20px;
  border: none;
  color: #fff;
  font-family: "Roboto", sans-serif;
  font-size: .65em;
  text-align: center;
  transition: all 0.5s;
  border-radius: 5px;
}

.post-list-table .post-edit-btn {
  background-color: #2396fa;
  margin-right: 5px;
}

.post-list-table .post-delete-btn {
  background-color: #fa2323;
}

.no-data-msg {
  text-align: center;
  font-size: 18px;
}

.keyword-input {
    width: 200px;
}
</style>
