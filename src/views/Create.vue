<template>
<body>
  
  <header> 
    <h1> Create Cat Poll </h1>
  </header>

  <main>
    <div id="createPollId">
      <!-- {{ uiLabels.pollLink }} -->
      <input type="text" placeholder="create poll link.." v-model="pollId"/>
      <button v-on:click="createPoll">
        {{ uiLabels.createPoll }}
      </button>
    </div>
    <div class="wrapper">
      <section id="questSection">

          <h4>{{this.pollId}}</h4>
        <!-- Skriver ut frågorna som skapas -->
        <div class="buttonChooseQuestion" v-if="data.poll !== undefined">
          <button v-for="index in data.poll.questions.length" :key="index">
            {{ data.poll.questions[index - 1].q }}
          </button>
        </div>
        <div>
          <button id="addQuestBtn" v-on:click="addQuestion">
            {{ uiLabels.addQuestion }}
          </button>
          <br>
        </div>
      </section>

      <section id="formSection">
            {{ uiLabels.question }}
            <textarea type="text" v-model="question" />

              {{ uiLabels.answerText }} <br>
              <input  v-for="(_, i) in answers"
                      v-model="answers[i]"
                      v-bind:key="'answer' + i"/>
              <br>
              <button v-on:click="addAnswer"> + </button>
              <button v-on:click="delAnswer"> - </button>
      </section>

    </div>
    <!-- Check Result Knapp -->
    <div id="result">
      <input id="questNrBox" type="number" v-model="questionNumber" />

      <button v-on:click="runQuestion">
      {{ uiLabels.runQuestion }}
      </button>

      <router-link id="routerLink" v-bind:to="'/result/' + pollId">
      {{uiLabels.checkResultsText}}
      </router-link>
    </div>
  </main>
</body>
</template>

<script>
import io from "socket.io-client";
const socket = io();

export default {
  name: "Create",
  data: function () {
    return {
      lang: "",
      pollId: "",
      question: "",
      answers: ["", ""],
      questionNumber: 0,
      data: {},
      uiLabels: {},
    };
  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
    socket.on("dataUpdate", (data) => (this.data = data));
    socket.on("pollCreated", (data) => (this.data = data));
    socket.on("allQuestions", (data) => (this.data = data));
  },
  methods: {
    createPoll: function () {
      socket.emit("createPoll", { pollId: this.pollId, lang: this.lang });
      
    },
    addQuestion: function () {
      socket.emit("addQuestion", {
        pollId: this.pollId,
        q: this.question,
        a: this.answers,
      });

      
    },
    addAnswer: function () {
      this.answers.push("");
    },

    delAnswer: function () {
      this.answers.pop();
    },

    runQuestion: function () {
      socket.emit("runQuestion", {
        pollId: this.pollId,
        questionNumber: this.questionNumber,
      });
      console.log(typeof this.questionNumber, this.questionNumber); //ger number och siffran som står i fältet
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Droid+Serif|Share+Tech+Mono");
@import url("https://fonts.googleapis.com/css2?family=Outfit&display=swap");
@import url("https://fonts.googleapis.com/css?family=Exo+2:200i");



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


header{
  margin-bottom: 1rem;
  /* text-align: center;
  border: 7px solid white;
  border-radius: 30px;

  box-shadow:
    0 0 20px 7px #fff,  
    0 0 37px 15px #f0f, 
    0 0 40px 27px #0ff,
    inset 0 0 20px 8px #fff,
    inset 0 0 37px 18px #f0f,
    inset 0 0 30px 27px #0ff;
  margin: 0 4rem;
  padding: 1rem 0; */
}

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

main{
  font-family: "Outfit", sans-serif;
  
}
#createPollId input[type=text]{
  border: none;
  background-color: transparent;
  border-bottom: 2px solid #f0f ;
  color: white;
  margin: 0 0.5rem;
  font-size: 1.5rem;
}

.wrapper {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 50% 50%;
}

#formSection, #result, #questSection{
  background: linear-gradient(to right, #88ddff, hsl(202, 79%, 49%));
  border: solid 5px;
  border-radius: 20px;
  padding: 1rem;
  margin: 3rem;
}

#questSection {
  grid-column: 1;
  /* padding: 1rem 3rem 1rem 3rem ; */

}
#questSection h4{
  margin: 0;
  margin-bottom: 0.5em;

}

.buttonChooseQuestion {
  height: fit-content;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 100%;
}

#formSection{
  text-align: center;
  grid-column: 2;
}

#formSection, #result{
  width: min-content;
}


#result{
  margin-left: 38%;
  display: grid;
  grid-template-rows: auto auto;
}

#addQuestBtn{
  margin-top: 1rem;
}

/* button{
  font-size: 1rem;
  margin-top: 5px;
  width: fit-content;
  align-self: center;
} */

#routerLink{
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




</style>
