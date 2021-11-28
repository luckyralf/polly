<template>
<p>{{question.q}}</p>
<button v-for="a in question.a" v-on:click="answer(a)" v-bind:key="a" id="answerButton">
  {{ a }}
</button>
</template>
<script>
export default {
  name: 'Bars',
  props: {
    question: Object
  },
  methods: {
    answer: function (answer) {
      this.$emit("answer", answer);
      document.getElementById("answerButton").style.backgroundColor = "#C73EE1";
    } 
  }
}
</script>