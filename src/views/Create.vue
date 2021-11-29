<template>
  <div>
    {{ uiLabels.pollLink }}
    <input type="text" v-model="pollId" />
    <button v-on:click="createPoll">
      {{ uiLabels.createPoll }}
    </button>
    <div>
      {{ uiLabels.question }}
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
        <button v-on:click="delAnswer">
         {{ uiLabels.delAnswer }}
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
     <h4 id="showPollName"></h4>
    <section id="QandA"> <!--vill ha en div med dataobjektens info, typ pollId, fråga etc som visas här -->
      <div id="showQandA"></div>
    </section> 
    <br>
    <br>

    <div v-if="data.poll !== undefined">
      <!-- <div  v-for="question in data.poll.questions" 
            v-bind:key="question.q"
            v-bind:question="question"> 
      
      </div> -->
      {{data.poll.questions}}
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
      document.getElementById("showQandA").innerHTML =
        this.uiLabels.question + questionInText+ "<br />" +this.uiLabels.answerText + answerAlternatives;
    },
    addAnswer: function () {
      this.answers.push("");
    },

    delAnswer: function (){
      this.answers.pop();
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
