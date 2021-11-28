<template>
<p>{{question.q}}</p>
<button v-for="a in question.a" v-on:click="answer(a);" v-bind:key="a" class="isClicked">
  {{ a }}
</button>
</template>
<script>
export default {
  name: 'Question',
  props: {
    question: Object,
  },
  methods: {
    answer: function (answer) {
      this.$emit("answer", answer);
    },
    // changeColor: function(a) {
    //   a.backgroundColor = "#C73EE1";
    // } FUNKAR EJ ÄN
  }
}
</script>
<style>
.isClicked:hover {
  background-color:#D794E3;
}
.isClicked:active {
  background-color: #C73EE1;
}
</style>