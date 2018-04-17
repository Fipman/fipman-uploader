<template>
<div class="fip-file">
    <div v-bind:style="{ 'text-decoration': file.fileStatus === 3 ? 'line-through' : 'none' }">
        {{file.fileName}}
    </div>
    <div>
        <div class="fip-file-info">
            <div v-if="file.fileStatus === 3">
                {{$t('uploader.cancelled')}}
            </div>
            <div v-if="file.fileStatus != 3">
                {{uploadedFileSize.toFixed(1)}}MB of {{totalFileSize.toFixed(1)}}MB
            </div>
        </div>
        <div class="fip-btn-file-remove" v-on:click="cancelUpload">
            <i class="ion-close-round"></i>
        </div>
    </div>
    <div>
        <ProgressBar v-bind:value="file.progress"/>
    </div>
</div>
</template>

<script>
import ProgressBar from "../ProgressBar";

export default {
  props: ["file"],
  components: { ProgressBar },
  methods: {
    cancelUpload() {
      this.file.cancel();
    }
  },
  computed: {
    totalFileSize() {
      return this.file.size / 1000 / 1000;
    },
    uploadedFileSize() {
      return this.file.uploadedSize / 1000 / 1000;
    }
  }
};
</script>

<style>
.fip-file {
  margin-top: 2rem;
}
.fip-file > div:first-child {
  padding-bottom: 1.28rem;
  font-size: 1.9rem;
  text-align: left;
  color: #303030;
}
.fip-file > div:nth-child(2) {
  display: flex;
  justify-content: space-between;
}
.fip-file > div:last-child {
  padding-top: 1.5rem;
}
.fip-btn-file-remove {
  cursor: pointer;
  background-color: #a0a0a0;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fip-btn-file-remove > i {
  font-size: 1.2rem;
}
.fip-file-info {
  font-size: 1.8rem;
  text-align: left;
  color: #a8a8a8;
}
</style>