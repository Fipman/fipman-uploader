<template>
    <div style="height:100%">   
      <div v-bind:class="{'fip-drop-active' : dropZoneActive }" v-if="activeView===0" style="height:100%" droppable="true" v-on:drop="onDropFile" v-on:dragover="onDragOver" v-on:dragleave="onDragLeave">
        <UploadBox  v-bind:startUpload="startUpload" v-bind:options="options" />
      </div>
      <UploadProgress v-if="activeView===1" v-bind:files="fipman.uploader.uploadQueue" v-bind:cancelAll="cancelUpload" />
    </div>
</template>

<script>

import UploadBox from "./UploadBox";
import UploadProgress from "./UploadProgress";
import { getUrlParameter } from "../../utils/common";
import Fipman from "../../utils/Fipman";


export default {
  data() {
    return {
      activeView: 0,
      dropZoneActive: false,
      files: [],
      fipman : {},
    };
  },
  props: ["options"],
  mounted(){
    this.fipman = new Fipman(this.options);
  },
  methods: {
    startUpload: function(files) {
      this.activeView = 1;
      this.fipman.uploader.addFile(files);
      this.fipman.uploader.start().then(res => {
        this.activeView = 0;
        parent.postMessage(
          {
            event_id: "fipman-end",
            data: res
          },
          "*"
        );
      }, x => {
        Object.assign(this, { activeView : 0, dropZoneActive : false});
      });
    },
    cancelUpload: function() {
      this.fipman.uploader.cancelUpload();
      this.activeView = 0;
    },
    onDropFile: function(ev) {
      ev.preventDefault();
      var files = [];

      if (ev.dataTransfer.items) {
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
          if (ev.dataTransfer.items[i].kind === "file") {
            var file = ev.dataTransfer.items[i].getAsFile();
            files.push(file);
          }
        }
        this.startUpload(this.options.allowMultipleUpload ? files : [files[0]]);
      }
    },
    onDragOver: function(ev) {
      ev.preventDefault();
      this.dropZoneActive = true;
    },
    onDragLeave: function(ev) {
      ev.preventDefault();
      this.dropZoneActive = false;
    }
  },
  components: {
    UploadBox,
    UploadProgress
  }
};
</script>