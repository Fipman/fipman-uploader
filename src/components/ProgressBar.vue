<template>
<div class="fip-progress-bar">
    <div v-bind:style="{ width: value + '%'}">
    </div>
</div>
</template>

<script>
export default {
    props : { value : { default : 0, type : Number}}
}
</script>
<style>
.fip-progress-bar{
    width:100%; 
    height:0.78rem;
    background-color:#d8d8d8;
    border-radius:0.5rem;
}

.fip-progress-bar > div {
    width:0%; 
    background-color:#4ab7b1; 
    border-radius:0.5rem;
    height:100%;
    transition: width 100ms;
}

</style>