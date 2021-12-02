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
    <button v-on:click="submitAnswer" id="submitAnswerButton">Submit answer</button> <br>
    <div v-if="showAnswer">Selected answer is: {{this.submittedAnswer}}</div>
  </div>
  <br>
  <div>
    <button v-on:click="answer"> Next question </button>
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
      showAnswer: false,
      answerSubmitted: false,
      submittedAnswer: null,
    };
  },
  methods: {
    submitAnswer: function () {
        //skriv ut vad det valda alternativet är 
        this.showAnswer = true;
        this.submittedAnswer = this.question.a[this.selectedAnswer];
        console.log(this.submittedAnswer);
    },
    answer: function () {
      if (this.answerSubmitted == false && this.submittedAnswer != null){
        this.$emit("answer", this.submittedAnswer);
        this.answerSubmitted = true;
        }
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