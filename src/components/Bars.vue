<template>
<div class="wrapper">
  <div class="bar" v-for="(item, key) in data" v-bind:key="key">
    <div v-bind:style="{height: 50*item + 'px'}">
      <span> {{item}} </span>
    </div>
    <div> 
      {{key}}
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
}

.bar span {
  position: relative;
  top: -1.2em;
}
.bar:nth-child(1) div:nth-child(1) {
  background-color:#EACBD2;
}
.bar:nth-child(2) div:nth-child(1) {
  background-color:#DFAEB4;
}
.bar:nth-child(3) div:nth-child(1) {
  background-color:#DD9AC2;
}
.bar:nth-child(4) div:nth-child(1) {
  background-color:#B486AB;
}
.bar:nth-child(5) div:nth-child(1) {
  background-color:#82667F;
}

.wrapper {
  padding:3em;
}
</style>
