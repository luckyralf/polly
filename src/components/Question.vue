<template>

 <div class = "questionWrap">
  <p id = "question"> {{ uiLabels.question }}  {{ question.q }}</p>

  <div class = "answerAlt">
  <button
    v-for="(a, index) in question.a"
    v-bind:class="{ selected: index === selectedAnswer }"
    v-on:click="changeColor(index)"
    v-bind:key="a"
    class="isClicked"
  >
    {{ a }}
  </button>
  </div>

      {{ thePoll }}

  <div>
    <button v-on:click="submitAnswer" id="submitAnswerButton">{{ uiLabels.submitAnswer }}  </button> <br>
    <div v-if="showAnswer"> {{ uiLabels.submittedAnswer }} : {{this.submittedAnswer}}</div>
  </div>
  <br>

  <div v-if="lastQuestion">
    <button v-on:click="answer"> {{ uiLabels.nextQuestion }}</button>
  </div>

  <div  v-else id="result" >
        <router-link id="routLink" v-bind:to="'/result/' + this.pollId" v-on:click="finishQuiz">
          {{ uiLabels.seeResult }}
        </router-link>
  </div>

</div>
</template>


<script>
import io from "socket.io-client";
const socket = io();

export default {
  name: "Question",
  props: {
    question: Object,
  },
  data: function () {
    return {
      uiLabels: {},
      lang: "",
      thePoll: {},
      amountQuestions: 0,
      pollId: "inactive poll",
      questionNumber: 1,
      selectedAnswer: null, //index som anger vilket alternativ som är valt 
      submittedAnswer: null, //index som anger vilket svarsalternativ som har skickats
      showAnswer: false, //boolean som anger om ett svar har angetts för att visa "selected answer is:"
      answerSubmitted: false, //boolean som anger om man har skickat ett svar
      lastQuestion: true,
    };
  },
  created: function () {
     this.lang = this.$route.params.lang;
     
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
    this.pollId = this.$route.params.id;
    socket.emit('emitGetPoll',this.pollId);
    socket.on('getPoll',(thePoll) => (this.thePoll = thePoll));
  },
  methods: {
    submitAnswer: function () {
        //skriv ut vad det valda alternativet är 
        this.showAnswer = true;
        this.submittedAnswer = this.question.a[this.selectedAnswer];
        console.log(this.submittedAnswer);
        this.answerSubmitted = true;
        this.questionNumber = this.questionNumber+1;
        

    },
    answer: function () {
      if (this.answerSubmitted == true && this.submittedAnswer != null){
        this.$emit("answer", this.submittedAnswer);
        this.selectedAnswer= null;
        this.showAnswer= false;
        this.answerSubmitted= false;
        this.submittedAnswer= null;
        }
        console.log(this.questionNumber)
        console.log(this.thePoll.poll.questions.length)
      if (this.questionNumber === this.thePoll.poll.questions.length){
          this.lastQuestion= false;
        }
    },

    finishQuiz: function(){
      if (this.answerSubmitted == true && this.submittedAnswer != null){
        this.$emit("answer", this.submittedAnswer);
      }
    },

    changeColor: function (i) {
      if(this.selectedAnswer!=i) {
      this.selectedAnswer = i;
      }
      else {
        this.selectedAnswer = null;
      }
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

.isClicked{
  width: 100px;
  height: 100px;
  font-family: "Outfit", sans-serif;
  font-size: 30px;
}
.isClicked:hover {
  background-color: #d794e3;
  cursor: pointer;
}
.isClicked:active {
  background-color: #c73ee1;
}

.answerAlt{
background: linear-gradient(to right, #88ddff, hsl(202, 79%, 49%));
  border: solid 5px;
  border-radius: 20px;
  padding: 1rem;
  width: 500px;
  margin-left: 500px;
  margin: 3rem;
  position: center;
}

#question {
  background: linear-gradient(to right, #88ddff, hsl(202, 79%, 49%));
  border: solid 5px;
  border-radius: 20px;
  padding: 1rem;
  margin-left: 1px;
  margin: 3rem;
  width: 300px;
  margin-left: 40px;
  position: center;
  font-size: 25px;
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