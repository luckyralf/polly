<template>
  <div>
    {{ pollId }}
    <Question v-bind:question="question" v-on:answer="submitAnswer" /> 
  </div>
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
      questionNumber: 1,
    };
  },
  created: function () {
    this.pollId = this.$route.params.id;
    socket.emit("joinPoll", this.pollId);
    socket.on("newQuestion", (q) => (this.question = q)); //Poll lyssnar på nya frågor
  },
  methods: {
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", { pollId: this.pollId, answer: answer });
      //under här skickas man till nästa fråga, funkar okej mvh adam
      socket.emit("nextQuestion", {pollId: this.pollId, questionNumber: this.questionNumber});
      console.log("before addidng ",typeof this.questionNumber,this.questionNumber)
      this.questionNumber = this.questionNumber+1;
      console.log("after adding ",typeof this.questionNumber,this.questionNumber)
      
    },
    // goToNext: function () {
    //   let currentQuestion = this.currentQuestion+1;
    //   socket.emit("nextQuestion", {pollId: this.pollId, currentQuestion: currentQuestion});
    // },
  },
};
</script>
