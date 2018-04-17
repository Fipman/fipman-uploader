<template>
<div style="display:flex; flex-direction:column; height:100%; align-items:center">
  <Header />
  <div style="display:flex; flex-direction:column;height:100%; width:129.2rem;">
    <div class="fip-uploader-box">
          <div style="text-align:center">
            <img class="fip-upload-image" src="../../assets/images/logo_single.png" srcset="../../assets/images/logo_single@2x.png 2x, ../../assets/images/logo_single@3x.png 3x">
            <div class="fip-drag-drop-text">
              {{$t('uploader.dragDropMessage')}}
            </div>
            <div class="fip-btn fip-btn-primary" v-on:click="onClickUpload">{{$t('uploader.selectFiles')}}</div>
          </div>
        </div>
    </div>
  <Footer />
  <input id="fileInputMultiple" multiple v-bind:accept="options.allowFiles" type="file" style="display:none" v-on:change="onFileUploadChange" />
  <input id="fileInput" type="file" v-bind:accept="options.allowFiles" style="display:none" v-on:change="onFileUploadChange" />
</div>
</template>

<script>
import Header from "../Header";
import Footer from "../Footer";

export default {
  props: ["startUpload", "options"],
  components: { Header, Footer },
  methods: {
    onClickUpload: function() {
      if (this.options.allowMultipleUpload)
        document.getElementById("fileInputMultiple").click();
      else document.getElementById("fileInput").click();
    },
    onFileUploadChange: function() {
      const files = document.getElementById(
        this.options.allowMultipleUpload ? "fileInputMultiple" : "fileInput"
      ).files;
      this.startUpload(Object.keys(files).map(key => files[key]));
    }
  }
};
</script>

<style>
.fip-uploader-box {
  overflow-y: hidden;
  height: 100%;
  width: 100%;
  border-radius: 0.4rem;
  background-color: #f6f6f6;
  border: dashed 0.2rem #4ab7b1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fip-drop-active .fip-uploader-box{
  border-width: 0.4em;
}

.fip-drag-drop-text {
  width: 19.6rem;
  font-size: 2.4rem;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #2b3d51;
  margin: 5rem auto 1rem auto;
}

.fip-upload-image {
  width: 16.2rem;
}
</style>