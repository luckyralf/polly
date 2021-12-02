<template class="temp">
  <body class="Wrapped">
    <section id="headerText">
      <header>
        <h1 class="CATPOLL">CAT POLL</h1>
      </header>
    </section>

    <div id="nav">
      <div class="languangeButtonContainer">
        <button class="langButtonSWE" v-on:click="switchLanguage">
          {{ uiLabels.changeLanguage }}
        </button>
      </div>

      <div class="writeAndParticipate">
        <label
          >{{ uiLabels.writePollId }}
          <input type="text" v-model="id" />
        </label>
        <router-link v-bind:to="'/poll/' + id" tag="button">{{
          uiLabels.participatePoll
        }}</router-link>
      </div>

      <div class="createOwn">
        <p>{{ uiLabels.orMakeOwn }}</p>
        <router-link v-bind:to="'/create/' + lang">{{
          uiLabels.createPoll
        }}</router-link>
      </div>
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

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Droid+Serif|Share+Tech+Mono");
@import url("https://fonts.googleapis.com/css2?family=Outfit&display=swap");

.languageButton {
  font-family: "Courier New", Courier, monospace;
  height: 40px;
  width: 60px;
  transition: 200ms;
  border-radius: 5px;
}

.languageButton:hover {
  cursor: pointer;
  color: black;
  border: none;
}
.languangeButtonContainer {
}
.createPoll {
  margin-top: 30px;
  margin-bottom: 20px;
}

#nav {
}

.langButtonSWE {
  padding-top: 20px;
  padding-right: -20px;
  background-image: url(https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Flag_of_Sweden.svg/1200px-Flag_of_Sweden.svg.png);
  background-size: cover;
  background-position: 30%;
  border-radius: 100%;
  font-family: "Monaco", monospace;
  position: relative;
  left: 45%;
}

#headerText {
  text-align: center;
  text-transform: uppercase;
  font-family: "Monaco", monospace;
  color: #d3ffce;
  color: #fff;
  overflow: hidden;
  text-shadow: 2px 2px 2px black;
  font-size: 30pt;
  border: 10px dotted #d84141;
  margin-bottom: 30px;

  font-size: 44pt;
  font-weight: 200;
  font-style: italic;
  color: #fff;
  text-shadow: 0 0 7px rgb(253, 117, 67), 0 0 10px rgb(247, 82, 22),
    0 0 21px #f40, 0 0 42px #f40, 0 0 82px #f40;
  border-radius: 0rem;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 5px;
  text-transform: uppercase;
}
.CATPOLL:hover {
  color: #fff;
  text-shadow: 0 0 7px rgb(65, 253, 65), 0 0 10px rgb(130, 252, 16),
    0 0 21px rgb(130, 252, 16), 0 0 42px rgb(130, 252, 16),
    0 0 82px rgb(130, 252, 16);
}

.writeAndParticipate {
  padding-top: 40px;
  padding-bottom: 40px;
  font-size: 20px;
  color: white;
  font-family: "Outfit", sans-serif;
  font-style: bold;
  border: solid 5px;
  border-radius: 20px;
  /*background-color:#88ddff;*/
  background: linear-gradient(to right, #88ddff, hsl(202, 79%, 49%));
  margin-left: 200px;
  margin-right: 200px;
  margin-top: 20px;
}

.createOwn {
  font-family: "Outfit", sans-serif;
  font-size: 20px;
  padding-top: 10px;
  padding-bottom: 50px;
  color: white;
  border: solid 5px;
  border-radius: 20px;
  background: linear-gradient(to right, #88ddff, hsl(202, 79%, 49%));
  margin-left: 200px;
  margin-right: 200px;
  margin-top: 20px;
}

.Wrapped {
  /*background-color: #0c2c63;*/
  background: linear-gradient(to left, #0c2c63, #1941b2);
}

#Finalword {
  font-family: "Monaco", monospace;
  color: white;
  font-size: 12px;
  text-align: left;
  padding-left: 4px;
}

/*hejhej*/
</style>
