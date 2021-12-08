<template>
  <body class="Wrap">
      
    <header>
      <h1> {{ uiLabels.pollResult }} </h1>
    </header>
    <main>hhhh</main>
    jjj
    <button v-on:click="getPoll">
      <br>
     {{thePoll}}
    </button>

    <Bars v-bind:data="data"/>
    {{data}} <br>
    {{question}}
    <br>

<br>
<div v-for="index in thePoll.poll.questions.length" :key="index">
  <button  class="resultQuestions" type="number" v-bind="index" v-on:click="selectQuestion(index)">{{index}}</button>
</div>

<!-- <input type="number" v-model="questionNumber" />
<button v-on:click="selectQuestion">Which question?</button> -->
  </body>
</template>

<script>
// @ is an alias to /src
import Bars from '@/components/Bars.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Result',
  components: {
    Bars
  },
  data: function () {
    return {
      uiLabels: {},
      lang: "",
      question: "",
      data: {
      },
      questionNumber: 0, //denna styr just nu vad som är datavariabeln, ändrar man questionNumber kan man få ut vilken fråga som ska visas
      thePoll: {},
    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
    this.pollId = this.$route.params.id;
    socket.emit('joinPoll', {pollId: this.pollId, questionNumber: this.questionNumber})//kan man loopa över alla questionnumbers och få hela pollen?
    socket.on("dataUpdate", (update) => {
      this.data = update.a;
      this.question = update.q;
    });
    socket.on("newQuestion", update => {
      this.question = update.q;
      this.data = {};
    });
    //försök att få hela pollen
    socket.emit('emitGetPoll',this.pollId);
    socket.on('getPoll',(thePoll) => (this.thePoll = thePoll));
  },
  methods: {
  selectQuestion: function(questionNumber) {
    socket.emit('joinPoll', {pollId: this.pollId, questionNumber});
  },
  // getPoll: function() {
  //   socket.emit('emitGetPoll',this.pollId);
  //   socket.on('getPoll',(thePoll) => (this.thePoll = thePoll));
  // },
}
}
</script>

<style scoped>

.resultQuestions {
  background-color: #d794e3;
  color: white;
  border: 3px solid blueviolet;
  border-radius: 5px;
  padding: 10px 24px;
  width: 30%; 
  display: block;
  margin: 2px;
  font-size: 20px;
}


.resultQuestions:hover {
  background-color: #c73ee1;
}

.Wrap{
  background: linear-gradient(to left, #0c2c63, #1941b2);

  padding-top: 15px;
  background: linear-gradient(to left, #0c2c63, #1941b2);

  margin: 0;
}

h1{
  font-family: "Monaco", monospace;
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



</style>