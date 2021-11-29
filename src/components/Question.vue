<template>
  <p>{{ question.q }}</p>
  <button
    v-for="(a, index) in question.a"
    v-bind:class="{ selected: index === selectedAnswer }"
    v-on:click="changeColor(index)"
    v-bind:key="a"
    class="isClicked"
  >
    {{ a }}
  </button>
  <div>
    <button v-on:click="answer" id="submitAnswerButton">Submit answer</button>
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
      selectedAnswer: null,
    };
  },
  methods: {
    answer: function () {
      this.$emit("answer", this.question.a[this.selectedAnswer]);
    },
    changeColor: function (i) {
      this.selectedAnswer = i;
    },
  },
};
</script>
<style>
.selected {
  background-color: #c73ee1;
}

#submitAnswerButton {
    padding: 10px;
    margin-top: 10px;
}

.isClicked:hover {
  background-color: #d794e3;
  cursor: pointer;
}
.isClicked:active {
  background-color: #c73ee1;
}
</style>