<template>
  <body class="Wrap">
    <header>
      <h1>{{ uiLabels.pollResult }}</h1>
    </header>
    <main>
      <div class="questionAndBars">
        <div class="questions">
          <div v-for="index in thePoll.poll.questions.length" :key="index">
            <button
              class="resultQuestions"
              type="number"
              v-bind="index"
              v-on:click="selectQuestion(index - 1)"
            >
              {{ uiLabels.question }} {{ index }}:
              {{ thePoll.poll.questions[index - 1].q }}
            </button>
          </div>
        </div>
        <div class="bars">
          <Bars v-bind:data="data" />
        </div>
        <div>
          <!-- här kommer pie -->
          <Pie v-model:data="data" />
        </div>
      </div>
    </main>

    <!-- <input type="number" v-model="questionNumber" />
<button v-on:click="selectQuestion">Which question?</button> -->
  </body>
</template>

<script>
// @ is an alias to /src
import Bars from "@/components/Bars.vue";
import Pie from "@/components/Pie.vue";
import io from "socket.io-client";
const socket = io();

export default {
  name: "Result",
  components: {
    Bars,
    Pie,
  },
  data: function () {
    return {
      uiLabels: {},
      lang: "",
      question: "",
      data: {},
      questionNumber: 0,
      thePoll: {},
    };
  },
  created: function () {
    this.pollId = this.$route.params.id;
    socket.emit("joinPoll", {
      pollId: this.pollId,
      questionNumber: this.questionNumber,
    }); //kan man loopa över alla questionnumbers och få hela pollen?
    socket.on("dataUpdate", (update) => {
      this.data = update.a;
      this.question = update.q;
    });
    socket.on("newQuestion", (update) => {
      this.question = update.q;
      this.data = {};
    });
    //försök att få hela pollen
    socket.emit("emitGetPoll", this.pollId);
    socket.on("getPoll", (thePoll) => {
      this.thePoll = thePoll;
      socket.emit("pageLoaded", this.thePoll.poll.lang);
    });
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
  },
  methods: {
    selectQuestion: function (questionNumber) {
      socket.emit("joinPoll", { pollId: this.pollId, questionNumber });
    },
    // getPoll: function() {
    //   socket.emit('emitGetPoll',this.pollId);
    //   socket.on('getPoll',(thePoll) => (this.thePoll = thePoll));
    // },
  },
};
</script>

<style scoped>
.questionAndBars {
  display: flex;

  grid-gap: 300px;
  /*grid-template-columns: 50% 50%;*/
}

.questions {
  grid-column: 1;
  margin-left: 50px;
  margin-top: 40px;
}

/*
.bars {
  grid-column: 2;
  background-color:blue;
}*/

.resultQuestions {
  background-color: #d794e3;
  color: white;
  border: 3px solid blueviolet;
  border-radius: 5px;
  padding: 10px 24px;
  width: 100%;
  display: block;
  margin: 2px;
  font-size: 20px;
}

.resultQuestions:hover {
  background-color: #c73ee1;
}

.resultQuestions:focus {
  background-color: #c73ee1;
}

.Wrap {
  background: linear-gradient(to left, #0c2c63, #1941b2);
  padding-top: 15px;
  background: linear-gradient(to left, #0c2c63, #1941b2);
  padding-bottom: 500px;
  border: 0;
  margin: 0;
}

h1 {
  font-family: "Monaco", monospace;
  font-size: 4rem;
  color: white;
  text-align: center;
  margin: 0;
  text-shadow: 0 0 7px rgb(253, 117, 67), 0 0 10px #f0f, 0 0 21px #f0f,
    0 0 42px #f0f, 0 0 82px #f0f;
}
</style>
