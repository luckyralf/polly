<template>
  <div class="questionWrap">
    <p id="question">{{ uiLabels.question }} {{ question.q }}</p>
      <button
        v-for="(a, index) in question.a"
        v-bind:class="{ selected: index === selectedAnswer }"
        v-on:click="changeColor(index)"
        v-bind:key="a"
        class="isClicked"
      >

       <span id= "a" > {{ a }}</span>
      </button>

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
        <button id="nextQuestionButton" v-on:click="answer">{{ uiLabels.nextQuestion }}</button>
      </div>

      <div v-else id="result">
        <button id="finishQuizButton" v-on:click="finishQuiz">{{ uiLabels.finishQuiz }}</button>

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
    startTimer: function(t){
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



#submitAnswerButton {
  padding: 10px;
  margin-top: 10px;
  background-color: #d794e3 ;
  color: white;
  border: 3px solid #ffffce;
  font-family: "Outfit", sans-serif;
  font-size: 20px;
}

#finishQuizButton {
  background-color: #d794e3;
  color: white;
  border: 3px solid #ffffce;
  padding: 10px;
  font-family: "Outfit", sans-serif;
  font-size: 20px;
  margin-bottom: 30px;
}

#nextQuestionButton {
  background-color: #1313ad;
  color: white;
  border: 3px solid #ffffce;
  padding: 10px;
  margin-top: 10px;
  font-family: "Outfit", sans-serif;
  font-size: 20px;
}

.isClicked {
  background-color:#3ac7ff;
  border: outset 3px white;
  width: 500px;
  height: 60px;
  font-family: "Outfit", sans-serif;
  font-size: 20px;
  border-radius: 3px;
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
.selected, .selected:hover {
  background-color: #c73ee1;
}

#a{
  
}

.questionWrap {
  background: linear-gradient(to right, #008fc8, hsl(202, 99%, 49%));
  border: solid 5px;
  border-radius: 20px;
  padding: 1rem;
  margin-left: 1px;
  margin: 3rem;
  margin-left: 200px;
  margin-right: 200px;
  position: center;
  font-size: 20px;
  padding-bottom: 50px
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
  font-size: 2rem;
  padding: 20px;

}

#result {
}
</style>