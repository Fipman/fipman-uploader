<template>
<div class="fip-progress-circle">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="23.529411764705884 23.529411764705884 47.05882352941177 47.05882352941177">
        <circle fill="transparent" cx="47.05882352941177" cy="47.05882352941177" r="20" stroke-width="7.058823529411765" stroke-dasharray="125.664" stroke-dashoffset="0" class="fip-circular-underlay"></circle>
        <circle fill="transparent" cx="47.05882352941177" cy="47.05882352941177" r="20" stroke-width="7.058823529411765" stroke-dasharray="125.664" v-bind:stroke-dashoffset="currentProgress" class="fip-circular-overlay"></circle>
    </svg>
    <div class="fip-loading">
        {{value.toFixed(1)}}%
    </div>
</div>
</template>


<script>
    export default {
        props : { value : { default : 0, type : Number}},
        computed : {
            currentProgress(){
                if(this.value === 0) return 125.664;
                const calculatedValue = 125.664 * this.value / 100;
                return 125.664 - calculatedValue;
            }
        }
    }
</script>

<style>
.fip-progress-circle{
    height:75%;
    width:75%;
    color:#2b3d51 !important; 
    position:relative;
}
.fip-progress-circle > .fip-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%); font-size:4rem;
}
.fip-progress-circle > svg{
    transform: rotate(-90deg);width: 100%;
    height: 100%;
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
}
.fip-circular-underlay{
    stroke: rgba(0,0,0,.1);
    z-index: 1;
}
.fip-circular-overlay{
    stroke: currentColor;
    z-index: 2;
    transition: all .6s ease-in-out;
}
</style>