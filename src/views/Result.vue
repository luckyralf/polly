<template>
  <body class="Wrap">
      
    <header>
      <h1> {{ uiLabels.pollResult }} </h1>
    </header>
    
    <div>
     {{ questionNumber }} {{pollId}}
    </div>

    <Bars v-bind:data="data"/>
    {{data}} <br>
    {{question}}
    <br>

    <div>
      {{thePoll}} 
    </div>
    

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
    //försök att få hela pollen mvh adam
    socket.emit('emitgetPoll', this.pollId)
    socket.on('getPoll',(incomingPoll) => {this.thePoll = incomingPoll;});
    
  },
  // getThePoll: function() {
  //   this.pollId = this.$route.params.id;
  //   socket.emit('emitgetPoll', this.pollId)
  //   socket.on('getPoll',incomingPoll => {this.thePoll = incomingPoll;});

  // }
}
</script>

<style scoped>

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