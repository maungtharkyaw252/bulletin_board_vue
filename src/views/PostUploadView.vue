<template>
  <div>
    <loading-spinner :isloading="loading" />
    <div v-show="alertVisible" class="alert alert-danger" role="alert">
      {{ alertMessage }}
    </div>
    <div class="cmn-form-blk">
      <h3 class="cmn-form-title">Upload Files</h3>
      <div class="cmn-input-container">
        <span v-show="fileUploadError !== ''" class="text-danger text-sm">{{ fileUploadError }}</span>
        <input type="file" @change="onChooseFile" />
      </div>
      <div class="d-flex">
        <button class="btn btn-success me-2" @click="uploadFile">Upload</button>
        <button class="btn btn-secondary">Clear</button>
      </div>
    </div>
  </div>
</template>
<script>
import LoadingSpinner from '@/components/LoadingSpinner.vue'
export default {
  components: { LoadingSpinner },
  data () {
    return {
      loading: false,
      alertVisible: false,
      alertMessage: '',
      fileUploadError: '',
      csvFile: null
    }
  },
  methods: {
    uploadFile () {
      this.closeAlert()
      if (this.csvFile) {
        if (this.csvFile.type !== 'text/csv') {
          this.openAlert('Please choose a csv format')
          return
        }

        // upload file
        const formData = new FormData()
        formData.append('upload_file', this.csvFile)

        this.loading = true

        this.axios.post('http://127.0.0.1:8000/api/uploadCsv', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then((response) => {
            const data = response.data
            console.log(data)
            if (data.errors) {
              this.fileUploadError = data.errors.upload_file[0]
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
      } else {
        this.openAlert('Please choose a file')
      }
    },
    onChooseFile (event) {
      const file = event.target.files[0]
      if (file) {
        this.csvFile = file
      }
    },
    openAlert (message) {
      this.alertVisible = true
      this.alertMessage = message
    },
    closeAlert () {
      this.alertVisible = false
      this.alertMessage = ''
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
