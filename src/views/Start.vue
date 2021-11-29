<template>
  <body class="Wrapped">
    <section id="Header">
      <header>
        <h1>CAT POLL</h1>
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
  border: 10px dotted #d84141;
}

.Wrapped {
  background-color: #1b1bb1;
}

#Finalword {
  font-family: "Monaco", monospace;
  color: green;
}
</style>
