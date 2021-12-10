<template>
  <body>
    <header>
      <h1>{{ uiLabels.createHeader }}</h1>
    </header>
    <main>
      <!-- {{ data }} -->
      <br />
      <!-- {{ data.poll.editQuestion }} -->
      <div id="createPollId">
        <!-- {{ uiLabels.pollLink }} -->
        <input type="text" placeholder= "Write the name of your poll" v-model="pollId" />
        <button class="createPollBtn" v-on:click="createPoll">
          {{ uiLabels.createPoll }}
        </button>

        <button
          v-on:click="infoFunction()"
          class="infoButton2 catPawCursor"
        ></button>
        <div id="infoDIV">
          <div class="infoHeader">
            <div class="infoTitle">{{ uiLabels.createpageInfoHeader }}</div>
            <button
              v-on:click="infoFunction()"
              class="closeButton catPawCursor"
            >
              X
            </button>
          </div>
          <p class="infoText">
            <b> Information:</b> {{uiLabels.createpageInfoContent}}
          </p>
        </div>
      </div>

      <div v-if="data.poll !== undefined" class="wrapper">
        <section id="questSection">
          <h4 v-if="pollHeadline !== ''">
            {{ uiLabels.pollCreated }} <span id="pollHeadLine"> {{ pollHeadline }}</span>
          </h4>
          <!-- Skriver ut frågorna som skapas -->
          <div class="buttonChooseQuestion" v-if="data.poll !== undefined">
            <div v-for="index in data.poll.questions.length" :key="index">
              <button
                class="questionButtons"
                v-on:click="chooseQuestion(index - 1)"
              >
                {{ data.poll.questions[index - 1].q }}
              </button>
            </div>
          </div>
          <div>
            <button
              id="addQuestBtn"
              v-on:click="addQuestion(data.poll.questions.length)"
            >
              {{ uiLabels.addQuestion }}
            </button>
            <!-- {{ datpoll.questions.findIndex(q1) }} -->
            <br />
            <div
              v-if="data.poll !== undefined && data.poll.questions.length > 0"
            >
              <button
                class="moveBtn"
                v-if="data.poll.editQuestion !== 0"
                v-on:click="moveQuestion('up')"
              >
                ↑
              </button>
              <button
                class="moveBtn"
                v-if="data.poll.editQuestion !== data.poll.questions.length - 1"
                v-on:click="moveQuestion('down')"
              >
                ↓
              </button>
            </div>
          </div>
        </section>
        <!-- Här börjar formuläret för högra rutan -->
        <section
          id="formSection"
          v-if="data.poll !== undefined && data.poll.questions.length > 0"
        >
          <!-- {{ data.poll.questions[this.currentlySelectedQuestion - 1].q }} -->
          <br />

          {{ uiLabels.question }}
          <textarea
            v-on:input="saveEditedQuestion"
            type="text"
            v-model="question"
          />
          {{ uiLabels.answerText }} <br />
          <input
            v-for="(_, i) in answers"
            v-model="answers[i]"
            v-bind:key="'answer' + i"
            v-on:input="saveEditedQuestion"
          />
          <button
            v-on:click="
              addAnswer();
              saveEditedQuestion();
            "
          >
            +
          </button>
          <button
            v-on:click="
              delAnswer();
              saveEditedQuestion();
            "
          >
            -
          </button>
          <br />
          <br />
          {{ uiLabels.timePerQuestion }}
          <br />
          {{ uiLabels.timeObject }}
          <select
            name="questTime"
            id="questionTime"
            v-model="time"
            v-on:change="saveEditedQuestion"
          >
            <option value="unlimited" selected>{{ uiLabels.unlimited }}</option>
            <option value="10">10</option>
            <option value="30">30</option>
            <option value="60">60</option>
            <option value="90">90</option>
          </select>

          <!-- <option v-for="(_, i) in uiLabels.timeArray" 
                      v-bind:key="i" 
                      v-model="uiLabels.timeArray[i]"/>

          <option v-for="(_, i) in uiLabels.timeArray" v-bind:key="i" > 
                {{uiLabels.timeArray[i]}}
          </option> -->

          <br />

          <button id="deleteQuestBtn" v-on:click="deleteQuestion">
            {{ uiLabels.deleteQuestion }}
          </button>
        </section>
      </div>
      {{ data }}
      <!-- Check Result Knapp -->
      <div
        v-if="data.poll !== undefined && data.poll.questions.length > 0"
        id="result"
      >
        <!-- <input id="questNrBox" type="number" v-model="questionNumber" />

        <button v-on:click="runQuestion">
          {{ uiLabels.runQuestion }}
        </button> -->

        <router-link id="routerLink" v-bind:to="'/result/' + pollId">
          {{ uiLabels.checkResultsText }}
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
      questionNumber: 1,
      data: {},
      uiLabels: {},
      pollHeadline: "",
      time: "",
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
    socket.on("pollHead", (pollHead) => (this.pollHeadline = pollHead));
    // socket.on("updateChooseQuestion", (data) => (this.data = data));
  },
  methods: {
    saveEditedQuestion: function () {
      socket.emit("saveEditedQuestion", {
        pollId: this.pollId,
        // q: this.question,
        q: this.question,
        // a: this.answers,
        a: this.answers,
        t: this.time,
      });
    },

    infoFunction: function () {
      var x = document.getElementById("infoDIV");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    },

    chooseQuestion: function (indexForChosenQuestion) {
      socket.emit("chooseQuestion", {
        pollId: this.pollId,
        indexForChosenQuestion: indexForChosenQuestion,
      });
      this.question = this.data.poll.questions[indexForChosenQuestion].q;
      this.answers = this.data.poll.questions[indexForChosenQuestion].a;
      this.time = this.data.poll.questions[indexForChosenQuestion].t;
    },
    moveQuestion: function (direction) {
      console.log("moveQuestion fungerar", direction);
      socket.emit("moveQuestion", {
        pollId: this.pollId,
        direction: direction,
      });
      // this.question = this.data.poll.questions[this.data.poll.editQuestion].q;
      // this.answers = this.data.poll.questions[this.data.poll.editQuestion].a;
    },

    deleteQuestion: function () {
      socket.emit("deleteQuestion", this.pollId);
      this.question =
        this.data.poll.questions[this.data.poll.questions.length - 1].q;
      this.answers =
        this.data.poll.questions[this.data.poll.questions.length - 1].a;
    },
    createPoll: function () {
      socket.emit("createPoll", { pollId: this.pollId, lang: this.lang });
    },
    addQuestion: function (indexForAddedQuestion) {
      socket.emit("addQuestion", {
        pollId: this.pollId,
        // q: this.question,
        q: "EDIT ME",
        // a: this.answers,
        a: ["", ""],
        indexForAddedQuestion,
      });
      this.question = "EDIT ME";
      this.answers = ["", ""];
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
      // console.log(typeof this.questionNumber, this.questionNumber); //ger number och siffran som står i fältet
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Droid+Serif|Share+Tech+Mono");
@import url("https://fonts.googleapis.com/css2?family=Outfit&display=swap");
@import url("https://fonts.googleapis.com/css?family=Exo+2:200i");

body {
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

header {
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

h1 {
  font-family: "Exo 2", sans-serif;
  font-size: 4rem;
  color: white;
  text-align: center;
  margin: 0;
  text-shadow: 0 0 7px rgb(253, 117, 67), 0 0 10px #f0f, 0 0 21px #f0f,
    0 0 42px #f0f, 0 0 82px #f0f;
}

main {
  font-family: "Outfit", sans-serif;
}
#createPollId input[type="text"] {
  border: none;
  background-color: transparent;
  border-bottom: 2px solid #f0f;
  color: white;
  margin: 0 0.5rem;
  font-size: 1.5rem;
  text-align: center;
}

.wrapper {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 50% 50%;
}

.createPollBtn {
  color: white;
  background: #20af19;
  border-radius: 3px;
  border: solid #188513;
  cursor: url(data:application/octet-stream;base64,AAACAAEAICAAAAMAAQCoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAABsAAABLAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAATAAAAOwAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAACsAAABfAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAbAAAASwAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAEwAAADsAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAABMAAAAzAAAAZwAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAATAAAAMwAAAGMAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAACsAAABbAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAACHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAsAAAAjAAAAUwAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAF8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALAAAAIwAAAEsAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAB/AAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAABsAAABDAAAAdwAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAnwAAAF8AAAAjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAATAAAAOwAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAB/AAAAQwAAABMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAEwAAADMAAABnAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAF8AAAArAAAACwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsAAAArAAAAWwAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAB3AAAAOwAAABMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAGwAAAEsAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAjwAAAE8AAAAbAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAABMAAAA7AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAABvAAAAMwAAAAsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALAAAAKwAAAF8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAhwAAAEsAAAAbAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABMAAABDAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAABfAAAAKwAAAAsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAIwAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAdwAAADsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsAAAA3AAAA/wAAAP8AAAD/AAAA/6GD//+hg///oYP//wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAIcAAABLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAGwAAAE8AAAD/oYP//wAAAP8AAAD/oYP//6GD//+hg///oYP//wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAWwAAACsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsAAAAzAAAA/6GD//+hg///AAAA/6GD//+hg///oYP//6GD//+hg///oYP//6GD//+hg///AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAGcAAAAzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEwAAAEcAAAD/AAAA/wAAAP8AAAD/oYP//6GD//+hg///oYP//6GD//+hg///oYP//6GD//8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAB/AAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/oYP//6GD//+hg///oYP//6GD//+hg///AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAnwAAAF8AAAAjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8AAAD/AAAA/6GD//+hg///AAAA/wAAAP+hg///oYP//6GD//+hg///AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAB/AAAAQwAAABMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAAAP8AAAD/oYP//6GD//8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAFsAAAArAAAACwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAAAA/wAAAP+hg///oYP//wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/6GD//+hg///AAAA/wAAAP8AAAD/AAAA/wAAAP8AAABbAAAAMwAAABMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABsAAAD/AAAA/6GD//8AAAD/AAAA/6GD//+hg///oYP//wAAAP+hg///oYP//6GD//8AAAD/AAAA/wAAAP8AAAD/AAAASwAAACsAAAATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEwAAAP8AAAD/AAAA/wAAAP+hg///oYP//6GD//8AAAD/AAAA/6GD//8AAAD/AAAA/wAAAP8AAAD/AAAATwAAADMAAAAbAAAACwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAXwAAADsAAAAbAAAACwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAALAAAAGwAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAEMAAAArAAAAEwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAACwAAABMAAAAbAAAAHwAAAB8AAAAfAAAAHwAAAB8AAAAbAAAAEwAAAAsAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAP/+AAD//gAA//wAAP/4AAD/8AAA/+AAAP/gAAD/gAAA/4AAAP8AAAD+AAAA/AAAAPwAAAD4AAAB8AAAA/AAAAPwAAAH4AAAH+AAAD/AAAA/wAAAf8AAAP/AAAD/wAAA/8AAAP/AAAH/wAAD/8AAA//AAA//wAA///AAf/8=),
    auto;
  font-family: "Outfit", sans-serif;
  font-size: 20px;
}

.createPollBtn:hover {
    background-color: #188513;
}

#formSection,
#result,
#questSection {
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
#questSection h4 {
  margin: 0;
  margin-bottom: 0.5em;
}
h4 span {
  font-size: 1.5rem;
}

.buttonChooseQuestion {
  height: fit-content;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 100%;
}

.questionButtons {
  color: white;
  padding: 10px;
  background-color: hsl(202, 92%, 68%);
  border-radius: 5px;
  font-size: 15px;
}

.questionButtons:hover {
  background-color: #d794e3;
}

.questionButtons:active {
  background-color: #c73ee1;
}

.questionButtons:focus {
  background-color: #c73ee1;
}

#infoDIV {
  position: fixed;
  top: 55%;
  left: 82%;
  transform: translate(-50%, -50%) scale(1);
  transition: 200ms ease-in-out;
  border: 1px solid black;
  border-radius: 10px;
  z-index: 10;
  background-color: white;
  width: 450px;
  max-width: 80%;
  max-width: 50%;
  height: 140px;
  max-height: 80%;
  opacity: 85%;
  font-family: "Outfit", sans-serif;
  display: none;
}

.infoTitle {
  font-family: "Outfit", sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.infoButton2 {
  left: 20.5%;
  position: relative;
  padding-top: 20px;
  padding-right: -20px;
  background-size: cover;
  background-position: 50%;
  border-radius: 100%;
  height: 37px;
  width: 37px;
  background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWaoEGFgHlaMnIHZFCstyDyPjCYK4ncplDSpqPIHKdF7lBQy_plhW90Dz7kE1PedYqXG0&usqp=CAU");
}
.infoButton2:hover {
  color: black;
  border: none;
}
.infoText {
  margin-left: 5px;
  margin-right: 5px;
  color: black;
}

.infoHeader {
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  color: black;
}
.infoHeader .closeButton {
  border: none;
  outline: none;
  background: none;
  font-size: 1.24rem;
  font-weight: bold;
}

#formSection {
  text-align: center;
  grid-column: 2;
}

#formSection,
#result {
  width: min-content;
}

#result {
  margin-left: 38%;
  display: grid;
  grid-template-rows: auto auto;
}

#pollHeadLine {
  font-size: 18px;
}

#addQuestBtn {
  margin-top: 1rem;
  color: white;
  background-color: #296ad3;
  border-radius: 5px;
  padding: 5px;
}

#addQuestBtn:hover {
  background-color: #1e51a3;
}

#deleteQuestBtn {
  margin-top: 1rem;
  color: white;
  background-color: #d32929;
  border-radius: 5px;
  padding: 5px;
}

#deleteQuestBtn:hover {
  background-color: #a31e1e;
}

.moveBtn {
  border-radius: 10px;
  margin: 5px;
  font-weight: bold;
}

.moveBtn:hover {
  background-color: #bfc7dd;
}
/* button{
  font-size: 1rem;
  margin-top: 5px;
  width: fit-content;
  align-self: center;
} */

#routerLink {
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
