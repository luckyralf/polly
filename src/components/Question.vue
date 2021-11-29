<template>
  <p>{{ question.q }}</p>
  <button
    v-for="(a, index) in question.a"
    v-on:click="changeColor(index)"
    v-bind:key="a"
    class="isClicked"
  >
    {{ a }}
  </button>
  <div>
    <button v-on:click="answer(a)" id="submitAnswerButton">Submit answer</button>
  </div>
</template>
<script>
export default {
  name: "Question",
  props: {
    question: Object,
  },
  data: function () {
    return {
      isChosen: false,
    };
  },
  methods: {
    answer: function (answer) {
      this.isChosen != this.isChosen;
      this.$emit("answer", answer);
    },
    changeColor: function (i) {
      let answerButton = document.getElementsByClassName("isClicked")[i];
      answerButton.classList.toggle("isClickd");
    },
  },
};
</script>
<style>
.isClickd {
  background-color: #c73ee1;
}

.isClicked:hover {
  background-color: #d794e3;
  cursor: pointer;
}
.isClicked:active {
  background-color: #c73ee1;
}
</style>