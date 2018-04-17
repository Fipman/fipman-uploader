<template>
  <div class="fip-wrapper" >
    <Uploader v-bind:options="options" />
  </div>
</template>

<script>
import Uploader from "./components/Uploader";


export default {
  data() {
    return {
      fixed: false,
      title: "Upload"
    };
  },
  name: "App",
  props: ["options"],
  components: {
    Uploader
  }
};
</script>
<style src="./assets/css/global.css" />
