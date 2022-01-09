<template>
<div class="wrapper">
  <div class="bar" v-for="(item, key) in data" v-bind:key="key" >
    <div v-if="key != ''">
      <div id="individualBar" v-bind:style="[{height: 50*item.count + 'px'},{'background-color':item.color}]">
        <span> {{item.count}} </span>
      </div>
      <div> 
        {{key}} 
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Bars',
  props: {
    data: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bar {
  display: inline-block;
  width: 60px;
  vertical-align: bottom;
  margin: 7px;
  font-family:"Exo 2", sans-serif;
  color:white;
  text-shadow: 
      0 0 10px #fff,
    0 0 10px #fff,
    0 0 21px #fff,
    0 0 42px #0fa,
    0 0 82px #0fa;
  animation-name: barAni;
  animation-duration: 1s;
  transform-origin: bottom;
}

@keyframes barAni {
  0% {transform:scaleY(0%);}
  100% {transform:scaleY(100%);}
}

.bar span {
  position: relative;
  top: -1.2em;
}

.wrapper {
  padding:3em;
}
</style>
