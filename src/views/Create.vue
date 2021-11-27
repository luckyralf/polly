<template>
  <div>
    {{ uiLabels.pollLink }}
    <input type="text" v-model="pollId" />
    <button v-on:click="createPoll">
      {{ uiLabels.createPoll }}
    </button>
    <div>
      {{ uiLabels.question }}:
      <input type="text" v-model="question" />
      <div>
        {{ uiLabels.answerText }}
        <input
          v-for="(_, i) in answers"
          v-model="answers[i]"
          v-bind:key="'answer' + i"
        />
        <button v-on:click="addAnswer">
          {{ uiLabels.addAnswer }}
        </button>
      </div>
    </div>
    <button v-on:click="addQuestion">
      {{ uiLabels.addQuestion }}
    </button>
    <input type="number" v-model="questionNumber" />
    <button v-on:click="runQuestion">
      {{ uiLabels.runQuestion }}
    </button>
    <!-- {{ data}} data är poll objektet som returneras via data.js  -->
    <router-link v-bind:to="'/result/' + pollId">{{
      uiLabels.checkResultsText
    }}</router-link>
    <div><!--vill ha en div med dataobjektens info, typ pollId, fråga etc som visas här -->
      <div id="showPollName"></div>
      <div id="showQuestion"></div>
    </div>
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
        `Poll created: ` + this.pollId;
    },
    addQuestion: function () {
      socket.emit("addQuestion", {
        pollId: this.pollId,
        q: this.question,
        a: this.answers,
      });
      const questionInText = this.question;
      document.getElementById("showQuestion").innerHTML = `Question: ` + questionInText;
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
