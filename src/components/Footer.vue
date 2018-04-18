<template>
  <div class="fip-footer">
    <div id="fip-footer-max-info" class="fip-footer-info" v-if="maxSize && maxSize > 0">{{$t('footer.maximumUpload', {size : `${this.maxSize / 1000}MB`})}}</div>
    <div id="fip-footer-file-type-info" class="fip-footer-info" v-if="allowFiles && allowFiles !== '*'">{{$t('footer.allowFiles', {types : `${this.allowFiles}`})}}</div>
    <img src="../assets/images/logo.png" srcset="../assets/images/logo@2x.png 2x, ../assets/images/logo@3x.png 3x" class="fip-logo-single">
  </div>
</template>

<script>
  export default {
    props : { maxSize : { default : 0, type : Number}, allowFiles :{ default : "*", type : String}}
  }
</script>

<style>
.fip-footer {
  min-height:12rem;
  height:15%;
  display:flex;
  flex-direction:column;
  align-items:center;
  padding-top:2rem;
}

.fip-footer-info {
  font-size: 1.4rem;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #838383;
}
.fip-logo-single {
  margin-top: 2rem;
  width: 16.2rem;
  object-fit: contain;
  display: block;
}
</style>