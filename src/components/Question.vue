<template>
  <p> {{ uiLabels.totalAmountofQuestions}} {{ amountQuestion }} </p> <!--ska denna va me?/Elsa-->
  <div class="questionWrap">
    <p id="question">
      {{ uiLabels.question }} {{ questionNumber }}: {{ question.q }}
    </p>
    <p>{{ uiLabels.totalAmountofQuestions }} {{ amountQuestion }}</p>

    <div class="answerAlternatives" v-if="timer > -1 || question.timeOn == false">

        <button
          v-for="(a, index) in question.a"
          v-bind:class="{ selected: index === selectedAnswer }"
          v-on:click="
            changeColor(index);
            submitAnswer();
          "
          v-bind:key="a"
          class="isClicked catPawCursor"
        >
          <span id="a"> {{ a }}</span>
        </button>

        <div class="timer" v-if="question.timeOn == true">
          {{ timer }}
        </div>

    </div>
    
    <br />
    <!-- <div v-if="timer < 0 && question.timeOn == true" >
      <button id="nextQuestionButton" v-on:click="emptyAnswer">
          {{ uiLabels.nextQuestion }}
        </button>

    </div> -->
    <div v-if="answerSubmitted || (timer < 0 && question.timeOn == true)">
      <div v-if="lastQuestion">
        <button id="nextQuestionButton catPawCursor" v-on:click="answer">
          {{ uiLabels.nextQuestion }}
        </button>
      </div>

      <div v-else id="result">
        <button
          class="finishQuizButton catPawCursor"
          v-on:click="
            finishQuiz();
            confettin();
          "
        >
          {{ uiLabels.finishQuiz }}
        </button>

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
    method: { type: Function }, //HÄR kommer konfettin in från sin parent som en props mvh Elsa
  },

  data: function () {
    return {
      pollId: "inactive poll",
      questionNumber: 1,
      selectedAnswer: null, //index som anger vilket alternativ som är valt
      submittedAnswer: null, //index som anger vilket svarsalternativ som har skickats
      answerSubmitted: false, //boolean som anger om man har skickat ett svar
      lastQuestion: true,
      quizFinished: false,
      timerFunction: null,
      timer: 0,
    };
  },

  computed: {
    thisTimeOn: function () {
      return this.question.timeOn;
    },
  },

  watch: {
    question: {
      handler() {
        this.timer = this.question.time;
        clearInterval(this.timerFunction);
        if (this.thisTimeOn) {
          this.timerFunction = setInterval(() => {
            this.timer--;
          }, 1000);
        }
      },
      immediate: true,
    },
  },
  created: function () {
    this.pollId = this.$route.params.id;
  },
  methods: {
    emptyAnswer: function(){
      this.answerSubmitted = true;
      this.submittedAnswer = '';
      this.answer();
    },

    submitAnswer: function () {
      this.submittedAnswer = this.question.a[this.selectedAnswer];
      console.log(this.submittedAnswer);
      this.answerSubmitted = true;
    },
    answer: function () {
      if (this.answerSubmitted == true && this.submittedAnswer != null) {
        this.$emit("answer", this.submittedAnswer);
        this.selectedAnswer = null;
        this.answerSubmitted = false;
        this.submittedAnswer = null;
      }
      console.log(this.questionNumber);
      console.log(this.amountQuestion);
      this.questionNumber = this.questionNumber + 1;

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
    startTimer: function (t) {
      if (t === "unlimited") {
        this.timerOn = false;
        this.timer = 100;
      } else {
        this.timer = parseInt(t);
      }
    },
    confettin: function () {
      this.method();
    },
  },
};
</script>
<style>

.finishQuizButton {
  background-color: #1313ad;
  color: white;
  border: 3px solid #ffffce;
  padding: 10px;
  font-family: "Outfit", sans-serif;
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
}

#nextQuestionButton {
  background-color: #1313ad;
  color: white;
  border: 3px solid #ffffce;
  padding: 10px;
  margin-top: 30px;
  font-family: "Outfit", sans-serif;
  font-size: 20px;
}

.isClicked {
  background-color: #3ac7ff;
  border: outset 3px white;
  width: 500px;
  height: 60px;
  font-family: "Outfit", sans-serif;
  font-size: 20px;
  border-radius: 5px;
  color: white;
  margin-top: 5px;
}

.isClicked:hover {
  background-color: #d794e3;
  cursor: pointer;
}
.isClicked:active {
  background-color: #c73ee1;
}
.selected,
.selected:hover {
  background-color: #c73ee1;
}

.questionWrap {
  background: linear-gradient(to right, #008fc8, hsl(202, 99%, 49%));
  border: solid 5px;
  border-radius: 20px;
  margin-left: 1px;
  
  margin-left: 200px;
  margin-right: 200px;
  position: center;
  font-size: 20px;
  padding-bottom: 50px;
}

#question {
  color: white;
  font-size: 30px;
  font-family: "Outfit", sans-serif;
}

#routLink {
  color: white;
  text-decoration: none;
  background: #20af19;
  border-radius: 6px;
  border: solid #229954;
  font-size: 2rem;
  padding: 20px;
}

#result {
}
</style>