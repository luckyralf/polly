<template>
<p>{{question.q}}</p>
<button v-for="(a, index) in question.a" v-on:click="changeColor(index);" v-bind:key="a" class="isClicked">
  {{ a }}
</button>
<div>
<button id="submitAnswerButton" v-on:click="answer();">Submit answer</button>
</div>
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
    changeColor: function(i) {
      let answerButton = document.getElementsByClassName("isClicked")[i];
      answerButton.classList.toggle("isClickd");
    }   
  }
}
</script>
<style>
.isClickd {
  background-color: #C73EE1;
}

.isClicked:hover {
  background-color:#D794E3;
  cursor:pointer;
}
.isClicked:active {
  background-color: #C73EE1;
}
</style>