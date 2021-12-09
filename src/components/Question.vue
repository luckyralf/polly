<template>
  <div class="questionWrap">
    <p id="question">{{ uiLabels.question }} {{ question.q }}</p>

    <div class="answerAlt">
      <button
        v-for="(a, index) in question.a"
        v-bind:id="{ selected: index === selectedAnswer }"
        v-on:click="changeColor(index)"
        v-bind:key="a"
        class="isClicked"
      >
        {{ a }}
      </button>
    </div>
    <div class="timer" >
      <span >{{ timer }}</span>
    </div>

    <div>
      <button v-on:click="submitAnswer" id="submitAnswerButton">
        {{ uiLabels.submitAnswer }}
      </button>
      <br />
      <div v-if="showAnswer">
        {{ uiLabels.submittedAnswer }} : {{ this.submittedAnswer }}
      </div>
    </div>
    <br />

    <div>
      <div v-if="lastQuestion">
        <button v-on:click="answer">{{ uiLabels.nextQuestion }}</button>
      </div>

      <div v-else id="result">
        <button v-on:click="finishQuiz">{{ uiLabels.finishQuiz }}</button>

        <div v-if="quizFinished">
          <router-link id="routLink" v-bind:to="'/result/' + this.pollId">
            {{ uiLabels.seeResult }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: "Question",
  props: {
    question: Object,
    uiLabels: Object,
    amountQuestion: Number,
  },
  data: function () {
    return {
      pollId: "inactive poll",
      questionNumber: 1,
      selectedAnswer: null, //index som anger vilket alternativ som är valt
      submittedAnswer: null, //index som anger vilket svarsalternativ som har skickats
      showAnswer: false, //boolean som anger om ett svar har angetts för att visa "selected answer is:"
      answerSubmitted: false, //boolean som anger om man har skickat ett svar
      lastQuestion: true,
      quizFinished: false,
      timer: 30,
      timerOn: true,
    };
  },
  watch: {
    timer: {
      handler() {
        setTimeout(() => {
          this.timer--;
        }, 1000);
      },
      immediate: true,
    },
  },
  created: function () {
    this.pollId = this.$route.params.id;
  },
  methods: {
    submitAnswer: function () {
      //skriv ut vad det valda alternativet är
      this.showAnswer = true;
      this.submittedAnswer = this.question.a[this.selectedAnswer];
      console.log(this.submittedAnswer);
      this.answerSubmitted = true;
      this.questionNumber = this.questionNumber + 1;
    },
    answer: function () {
      if (this.answerSubmitted == true && this.submittedAnswer != null) {
        this.$emit("answer", this.submittedAnswer);
        this.selectedAnswer = null;
        this.showAnswer = false;
        this.answerSubmitted = false;
        this.submittedAnswer = null;
      }
      console.log(this.questionNumber);
      console.log(this.amountQuestion);
      if (this.questionNumber === this.amountQuestion) {
        this.lastQuestion = false;
      }
    },

    finishQuiz: function () {
      if (this.answerSubmitted == true && this.submittedAnswer != null) {
        this.$emit("answer", this.submittedAnswer);
        this.quizFinished = true;
      }
    },

    changeColor: function (i) {
      if (this.selectedAnswer != i) {
        this.selectedAnswer = i;
      } else {
        this.selectedAnswer = null;
      }
    },
    setTimer: function(t){
      if (t === "unlimited"){
        this.timerOn = false;
        this.timer = 100;
      }else{
        this.timer = parseInt(t);
      }
      
    }
  },
};
</script>
<style>
#selected {
  background-color: #c73ee1;
}

#submitAnswerButton {
  padding: 10px;
  margin-top: 10px;
}

.isClicked {
  background-color: #88ddff;
  width: 500px;
  height: 60px;
  font-family: "Outfit", sans-serif;
  font-size: 25px;
  border-radius: 3px;
  color: white;
  display: grid;
  grid-gap: 100px;
  grid-template-rows: 300px 300px;
  margin-left: 220px;
  grid-row: questionNumber;
}
.isClicked:hover {
  background-color: #d794e3;
  cursor: pointer;
}
.isClicked:active {
  background-color: #c73ee1;
}

.questionWrap {
  background: linear-gradient(to right, #88ddff, hsl(202, 79%, 49%));
  border: solid 5px;
  border-radius: 20px;
  padding: 1rem;
  margin-left: 1px;
  margin: 3rem;
  margin-left: 200px;
  margin-right: 200px;
  position: center;
  font-size: 25px;
}

.answerAlt {
  font-size: 50px;
}

#question {
  color: white;
  font-size: 40px;
}

#routLink {
  color: white;
  text-decoration: none;
  background: #20af19;
  border-radius: 6px;
  border: solid #229954;
  margin: 1rem 0;
  margin-top: 40px;
  font-size: 1.5rem;
  padding: 2px;
}

#result {
  margin-left: 38%;
  width: 100px;
  display: grid;
  grid-template-rows: auto auto;
}
</style>