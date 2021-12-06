<template>
<body>
   <header> 
    <h1> {{ pollId }} </h1>
  </header>

 <main>
  <div>
    <Question v-bind:question="question" v-on:answer="submitAnswer" /> 
  </div>

  <div id="result">
   <router-link id="routLink" v-bind:to="'/result/' + this.pollId" >
      Check result
    </router-link>
  </div>

 </main>


</body>
</template>

<script>
// @ is an alias to /src
import Question from "@/components/Question.vue";
import io from "socket.io-client";
const socket = io();

export default {
  name: "Poll",
  components: {
    Question,
  },
  data: function () {
    return {
      question: {
        q: "",
        a: [],
      },
      pollId: "inactive poll",
      questionNumber: 0,
    };
  },
  created: function () {
    this.pollId = this.$route.params.id;
    socket.emit("joinPoll", {pollId: this.pollId, questionNumber: this.questionNumber}); //la till andra inparametern mvh adam
    socket.on("newQuestion", (q) => (this.question = q)); //Poll lyssnar på nya frågor
  },
  methods: {
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", { pollId: this.pollId, answer: answer });
      //under här skickas man till nästa fråga, funkar okej mvh adam
      socket.emit("nextQuestion", {pollId: this.pollId, questionNumber: this.questionNumber+1}); //plus ett för att requesta nästa fråga

      //vet ej om det nedan ändrar för nästa iteration
      console.log("before addidng ",typeof this.questionNumber,this.questionNumber)
      this.questionNumber = this.questionNumber+1;
      console.log("after adding ",typeof this.questionNumber,this.questionNumber)
    },
  },
};
</script>

<style scoped>

@import url("https://fonts.googleapis.com/css?family=Droid+Serif|Share+Tech+Mono");
@import url("https://fonts.googleapis.com/css2?family=Outfit&display=swap");
@import url("https://fonts.googleapis.com/css?family=Exo+2:200i");


h1{
    font-family: 'Exo 2', sans-serif;
  font-size: 4rem;
  color: white;
  text-align: center;
  margin: 0;
  text-shadow: 0 0 7px rgb(253, 117, 67),
   0 0 10px #f0f,
    0 0 21px #f0f,
     0 0 42px #f0f,
      0 0 82px #f0f;
}


body{
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

#routLink{
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

#result{
  margin-left: 38%;
  width: 100px;
  display: grid;
  grid-template-rows: auto auto;
}

</style>