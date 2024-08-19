<template>
  <div v-show="visible" class="cmn-modal">
    <div class="cmn-modal-content">
        <div class="cmn-modal-header">
            <h2>{{ header }}</h2>
            <span class="cmn-modal-close modal__close" @click="close">&times;</span>
        </div>
        <div class="cmn-modal-body">
            <slot></slot>
        </div>
        <div class="cmn-modal-footer">
            <b-button custom-class="cmn-disabled-bg modal__close" @click="close">Close</b-button>
            <slot name="optional"></slot>
        </div>
    </div>
</div>

</template>
<script>
export default {
  props: ['visible', 'header'],
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style scoped>
.cmn-modal {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    background: rgba(77, 77, 77, 0.7);
    transition: all 0.4s;
}

.cmn-modal-content {
    width: 500px;
    padding: 0 2em;
    background: #fff;
    max-height: 90vh;
    border-radius: 4px;
    max-width: 90%;
    overflow-y: auto;
}

.cmn-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
    padding: 1em 0;
    border-bottom: 1px solid #b7b7b7;
}

.cmn-modal-close {
    color: #585858;
    font-size: 30px;
    text-decoration: none;
}

.cmn-modal-footer {
    display: flex;
    justify-content: flex-end;
    padding: 1em 0;
    border-top: 1px solid #b7b7b7;
    gap: 15px;
}

.cmn-modal-body .ttl {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 700;
}

.cmn-modal .post-info {
    display: flex;
    padding: 20px 0;
}

.cmn-modal .post-info .label {
    width: 150px;
}

.cmn-modal .post-info .value {
    color: #fc4f05;
}

.modal .del-btn {
    background-color: #ea4b4b;
}

.modal__close {
    cursor: pointer;
}

</style>
