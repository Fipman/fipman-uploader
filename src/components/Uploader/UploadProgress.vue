<template>
<div style="height:100%; display:flex; flex-direction:column;"> 
    <div style="width:129.2rem;display:flex; margin-left:auto;flex:1; margin-right:auto; padding-top:11.3rem; padding-bottom:2rem">
        <div style="flex:1;">
            <div class="fip-progress-holder">
                <ProgressCircle v-bind:value="totalProgress" />
            </div>
        </div>
        <div style="flex:1;display:flex; flex-direction:column">
            <h2 style="padding-bottom:1rem; font-size: 3rem;font-weight: 600;font-style: normal;font-stretch: normal;line-height: normal;letter-spacing: .34rem;text-align: left;color: #4ab7b1;">{{$t('uploader.uploading')}}</h2>
            <div class="custom-scroll" style="overflow-y:auto;overflow-x:hidden;flex:1;padding-right:1rem">
               <File v-for="file in files" v-bind:key="file.size + file.fileName" v-bind:file="file"  />
            </div>
            <div style="height:4rem;" v-on:click="cancelAll">
                <div class="fip-btn" style="float:right">
                  {{$t('uploader.cancelAll')}}
                </div>
                <div class="fip-clear"/>
            </div>
        </div>
        
    </div>
    <Footer />
    </div>
</template>

<script>
import Footer from "../Footer";
import ProgressCircle from "../ProgressCircle.vue";
import File from "./File";

export default {
  props: ["fileName", "cancelAll", "files"],
  components: { Footer, ProgressCircle, File },
  computed : {
    totalProgress: function(){
        const progress = this.files.reduce((prev, current) => {
            prev.totalFileSize += current.size;
            prev.totalUploadedFileSize += current.fileStatus > 1 ? current.size :  current.uploadedSize;
            return prev;
        }, {
          totalFileSize : 0, totalUploadedFileSize : 0
        })
        return progress.totalUploadedFileSize / progress.totalFileSize * 100;
    }
  }
};
</script>

<style>
.upload-wait {
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
  padding-top: 2rem;
}
.custom-scroll::-webkit-scrollbar {
  width: 1em;
}

.custom-scroll::-webkit-scrollbar-track {
  -webkit-box-shadow: transparent;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background-color: #4ab7b1;
  border-radius: 0.5rem;
}
.fip-progress-holder {
  width: 59.7rem;
  height: 100%;
  border-radius: 0.4rem;
  background-color: #f6f6f6;
  border: solid 0.2rem #dddddd;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>