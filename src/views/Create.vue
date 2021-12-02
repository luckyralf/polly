<template>

  <header> 
    <h1> Create Cat Poll </h1>
  </header>


  {{ uiLabels.pollLink }}
  <input type="text" v-model="pollId" />
  <button v-on:click="createPoll">
    {{ uiLabels.createPoll }}
  </button>
  <div class="wrapper">
    <section id="questSection">
        <h4 id="showPollName"></h4>

      <div class="buttonChooseQuestion" v-if="data.poll !== undefined">
        <button v-for="index in data.poll.questions.length" :key="index">
          {{ data.poll.questions[index - 1].q }}
        </button>
      </div>
      <div>
        <button v-on:click="addQuestion">
          {{ uiLabels.addQuestion }}
        </button>
        <br />
      </div>
    </section>
    <section id="formSection">
        
        <fieldset>
          {{ uiLabels.question }}
          <input type="text" v-model="question" />

            {{ uiLabels.answerText }}
            <input  v-for="(_, i) in answers"
                    v-model="answers[i]"
                    v-bind:key="'answer' + i"/>
            <button v-on:click="addAnswer">
              {{ uiLabels.addAnswer }}
            </button>
            <button v-on:click="delAnswer">
              {{ uiLabels.delAnswer }}
            </button>

        </fieldset>
        

        
        <!-- {{ data}} data är poll objektet som returneras via data.js  -->
        
    </section>
  </div>
  <!-- Check Result Knapp -->
  <div class="result">
    <input id="questNrBox" type="number" v-model="questionNumber" />
          <button v-on:click="runQuestion">
            {{ uiLabels.runQuestion }}
          </button>
          <br>
    <router-link v-bind:to="'/result/' + pollId">
    {{uiLabels.checkResultsText}}
    </router-link>
  </div>
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
      questionNumber: 1,
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
      document.getElementById("showPollName").innerHTML =
        this.uiLabels.pollCreated + this.pollId;
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

h1{
  font-family: "Monaco", monospace;
  font-size: 4rem;
}
.wrapper {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 50% 50%;
}

#questSection{
  padding: 1rem 3rem 1rem 3rem ;
}

#formSection{
  margin: 3rem;
  padding: 1rem;
}

#questNrBox{
  width: fit-content;
}


fieldset{
  border-radius: 5px;
  width: 25%;
}

.buttonChooseQuestion {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 100%;
}

.result{
  margin: 2rem;
}
</style>
