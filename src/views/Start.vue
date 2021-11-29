<template>
  <body class="Wrapped">
    <section id="Header">
      <header>
<<<<<<< HEAD
         <h1 class = "headerText">CAT POLL</h1>
=======
        <h1>CAT POLL</h1>
>>>>>>> dcf138e2a9477b281369b95caaef00421520a427
      </header>
    </section>

    <div id="nav">
      <button class="langButton" v-on:click="switchLanguage">
        {{ uiLabels.changeLanguage }}
      </button>
      <router-link v-bind:to="'/create/' + lang">{{
        uiLabels.createPoll
      }}</router-link>
      <label
        >{{ uiLabels.writePollId }}
        <input type="text" v-model="id" />
      </label>
      <router-link v-bind:to="'/poll/' + id" tag="button">{{
        uiLabels.participatePoll
      }}</router-link>
    </div>

    <div id="Finalword">
      <hr />
      <footer>
        <h3>&copy; Cat Poll Corp.</h3>
      </footer>
    </div>
  </body>
</template>

<script>
import io from "socket.io-client";
const socket = io();

export default {
  name: "Start",
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "en",
    };
  },
  created: function () {
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
  },
  methods: {
    switchLanguage: function () {
      if (this.lang === "en") this.lang = "sv";
      else this.lang = "en";
      socket.emit("switchLanguage", this.lang);
    },
  },
};
</script>

@import
url("https://fonts.googleapis.com/css?family=Droid+Serif|Share+Tech+Mono");
<style scoped>
<<<<<<< HEAD

.headerText{
border:dotted orange;
margin-left: 400px;
margin-right:400px;
}

=======
.languageButton {
  font-family: "Courier New", Courier, monospace;
  height: 50px;
  width: 70px;
  transition: 200ms;
  border-radius: 5px;
}

.languageButton:hover {
  cursor: pointer;
  color: black;
  border: none;
}
.languangeButtonContainer {
  padding-top: -10px;
  margin-top: -20px;
  background-image: url(https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_the_United_States_%281795-1818%29.jpg)
    no-repeat;
}
.createPoll {
  margin-top: 30px;
  margin-bottom: 20px;
}
>>>>>>> dcf138e2a9477b281369b95caaef00421520a427

#nav {
}

.langButton {
  border-radius: 50%;
  background-color: red;
  font-family: "Monaco", monospace;
}

#Header {
  text-align: center;
  text-transform: uppercase;
  font-family: "Monaco", monospace;
  color: ##d3ffce;
  color: #fff;
  overflow: hidden;
  text-shadow: 2px 2px 2px black;
  font-size: 30pt;
<<<<<<< HEAD
  border: 10px dotted #D84141;
  margin-left:

=======
  border: 10px dotted #d84141;
>>>>>>> dcf138e2a9477b281369b95caaef00421520a427
}

.Wrapped {
  background-color: #1b1bb1;
}

#Finalword {
  font-family: "Monaco", monospace;
  color: green;
}
<<<<<<< HEAD


template{
  background-color:black;
}

=======
>>>>>>> dcf138e2a9477b281369b95caaef00421520a427
</style>
