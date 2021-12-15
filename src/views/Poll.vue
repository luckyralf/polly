
<template>
  <body>
    <header>
      <h1>{{ pollId }}</h1>
    </header>
    
     <div class="bars">
           <div class="answered" v-bind:style="{width: 700/thePoll.poll.questions.length*questionNumber + 'px'}">
            </div>
     </div>

    <main>
      <div>
        <Question v-bind:uiLabels="uiLabels" 
                  v-bind:question="question" 
                  v-bind:amountQuestion="thePoll.poll.questions.length"
                  v-on:answer="submitAnswer" />
      </div>
     
    </main>  
  </body>
</template>




<script>
// @ is an alias to /src
import Question from "@/components/Question.vue";
// import Lodash from "https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js";
// import gsap from "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js";
// import Confetti from "@/confetti-creator.js"
import io from "socket.io-client";
const socket = io();


export default {
  name: "Poll",
  components: {
    Question,
  },
  data: function () {
    return {
      uiLabels: {},
      lang: "",
      question: {
        q: "",
        a: [],
      },
      data: {},
      pollId: "inactive poll",  
      questionNumber: 0,
      thePoll: {},
      amountQuestions: 0,
    };
  },
  created: function () {
    this.pollId = this.$route.params.id;
    socket.emit("joinPoll", {
      pollId: this.pollId,
      questionNumber: this.questionNumber,
    }); //la till andra inparametern mvh adam
    socket.on("newQuestion", (q) => (this.question = q)); //Poll lyssnar på nya frågor
    socket.on("allQuestions", (data) => (this.data = data));
    //försök att få hela pollen
    socket.emit('emitGetPoll',this.pollId);
    socket.on('getPoll',(thePoll) => {
      this.thePoll = thePoll;
      socket.emit("pageLoaded", this.thePoll.poll.lang);
      });
    
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
  },
  methods: {
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", { pollId: this.pollId, answer: answer });
      //under här skickas man till nästa fråga, funkar okej mvh adam
      socket.emit("nextQuestion", {
        pollId: this.pollId,
        questionNumber: this.questionNumber + 1,
      }); //plus ett för att requesta nästa fråga

      //vet ej om det nedan ändrar för nästa iteration
      console.log(
        "before addidng ",
        typeof this.questionNumber,
        this.questionNumber
      );
      this.questionNumber = this.questionNumber + 1;
      console.log(
        "after adding ",
        typeof this.questionNumber,
        this.questionNumber
      );
    },
  
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Droid+Serif|Share+Tech+Mono");
@import url("https://fonts.googleapis.com/css2?family=Outfit&display=swap");
@import url("https://fonts.googleapis.com/css?family=Exo+2:200i");
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');

h1 {
  font-family: "Exo 2", sans-serif;
  font-size: 4rem;
  color: white;
  text-align: center;
  margin: 0;
  text-shadow: 0 0 7px rgb(253, 117, 67), 0 0 10px #f0f, 0 0 21px #f0f,
    0 0 42px #f0f, 0 0 82px #f0f;
}

body {
  /* display: grid;
  grid-template-rows: auto auto  ; */
  color: white;
  background: linear-gradient(to left, #0c2c63, #1941b2);
  min-width: 100%;
  min-height: 100%;
  margin: 0;
  padding: 2rem 0 5rem 0;
  align-content: center;
}

.bars {
  height: 50px;
  width: 700px;
  margin-left: 350px;
  margin-top: 50px;
  background-color: #d794e3;
  border: solid 2px white;
}
.answered {
  background-image: url(https://wallpaperbat.com/img/262866-cute-pink-cat-wallpaper-cute-cat-wallpaper.png);
  background-position: bottom; 
  background-size: 460px;
  height: 100%;
  width: 0%;
  max-width:700px;
}

.container {
  height: 100vh;
}

.wrapper {
  width: 400px;
}

#confettiButton{
  padding: 12px;
  color: #fff;
  background-color: #00d773;
  border: none;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 500;
  min-width: 140px;
  user-select: none;
  outline:none;
}

.flex-row {
  flex-basis: 100%;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>
