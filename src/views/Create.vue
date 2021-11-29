<template>
  <div>
<<<<<<< HEAD
    Poll link:
    <input type="text" v-model="pollId">
    <button v-on:click="createPoll">
      Create poll
=======
    {{ uiLabels.pollLink }}
    <input type="text" v-model="pollId" />
    <button v-on:click="createPoll">
      {{ uiLabels.createPoll }}
>>>>>>> 677892590617e9c77d1995ac7db5f7f6de7aa003
    </button>
    <div>
      {{ uiLabels.question }}
      <input type="text" v-model="question" />
      <div>
<<<<<<< HEAD
        Answers:
        <input v-for="(_, i) in answers" 
               v-model="answers[i]" 
               v-bind:key="'answer'+i">
        <button v-on:click="addAnswer">
          Add answer alternative
=======
        {{ uiLabels.answerText }}
        <input
          v-for="(_, i) in answers"
          v-model="answers[i]"
          v-bind:key="'answer' + i"
        />
        <button v-on:click="addAnswer">
          {{ uiLabels.addAnswer }}
>>>>>>> 677892590617e9c77d1995ac7db5f7f6de7aa003
        </button>
      </div>
    </div>
    <button v-on:click="addQuestion">
<<<<<<< HEAD
      Add question
=======
      {{ uiLabels.addQuestion }}
>>>>>>> 677892590617e9c77d1995ac7db5f7f6de7aa003
    </button>
    <input type="number" v-model="questionNumber" />
    <button v-on:click="runQuestion">
<<<<<<< HEAD
      Run question
    </button>
    {{data}}
    <router-link v-bind:to="'/result/'+pollId">Check result</router-link>
=======
      {{ uiLabels.runQuestion }}
    </button>
    <!-- {{ data}} data är poll objektet som returneras via data.js  -->
    <router-link v-bind:to="'/result/' + pollId">{{
      uiLabels.checkResultsText
    }}</router-link>
    <div><!--vill ha en div med dataobjektens info, typ pollId, fråga etc som visas här -->
      <div id="showPollName"></div>
      <div id="showQuestion"></div>
      <div id="showAnswers"></div>
    </div>
>>>>>>> 677892590617e9c77d1995ac7db5f7f6de7aa003
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
      const questionInText = this.question;
      const answerAlternatives = this.answers;
      document.getElementById("showQuestion").innerHTML = this.uiLabels.question + questionInText;
      document.getElementById("showAnswers").innerHTML = this.uiLabels.answerText + answerAlternatives;
    },
    addAnswer: function () {
      this.answers.push("");
    },
    runQuestion: function () {
      socket.emit("runQuestion", {
        pollId: this.pollId,
        questionNumber: this.questionNumber,
      });
    },
  },
};
</script>
