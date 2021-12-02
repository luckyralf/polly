<template class="temp">
  <body class="Wrapped">
    <section id="headerText">
      <header>
        <h1 class="CATPOLL">CAT POLL</h1>
      </header>
    </section>

    <div id="nav">
      <div class="languangeButtonContainer">
        <button class="langButtonSV" v-on:click="switchLanguageToSV"></button>
        <button class="langButtonEN" v-on:click="switchLanguageToEN"></button>
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
        <router-link
          style="color: #fff"
          className="link"
          v-bind:to="'/create/' + lang"
          >{{ uiLabels.createPoll }}</router-link
        >
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
    // switchLanguage: function () {
    //   if (this.lang === "en") this.lang = "sv";
    //   else this.lang = "en";
    //   socket.emit("switchLanguage", this.lang);
    // },
    switchLanguageToEN: function () {
      this.lang = "en";
      socket.emit("switchLanguage", this.lang);
    },
    switchLanguageToSV: function () {
      this.lang = "sv";
      socket.emit("switchLanguage", this.lang);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Droid+Serif|Share+Tech+Mono");
@import url("https://fonts.googleapis.com/css2?family=Outfit&display=swap");

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

.langButtonSV:hover {
  cursor: pointer;
  color: black;
  border: none;
}

.langButtonEN:hover {
  cursor: pointer;
  color: black;
  border: none;
}

.langButtonSV {
  padding-top: 20px;
  padding-right: -20px;
  background-image: url(https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Flag_of_Sweden.svg/1200px-Flag_of_Sweden.svg.png);
  background-size: cover;
  background-position: 30%;
  border-radius: 100%;
  font-family: "Monaco", monospace;
  height: 35px;
  width: 35px;
  position: relative;
  left: 45%;
}

.langButtonEN {
  padding-top: 20px;
  padding-right: -20px;
  background-image: url(https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Flag_of_Great_Britain_%281707%E2%80%931800%29.svg/2560px-Flag_of_Great_Britain_%281707%E2%80%931800%29.svg.png);
  background-size: cover;
  background-position: 50%;
  border-radius: 100%;
  font-family: "Monaco", monospace;
  height: 35px;
  width: 35px;
  position: relative;
  left: 45.5%;
}

#headerText {
  height: 175px;
  width: 600px;
  padding-left: 200px;
  padding-right: 200px;
  padding-bottom: 75px;
  text-align: center;
  font-family: "Monaco", monospace;
  overflow: hidden;
  text-shadow: 2px 2px 2px black;
  font-size: 30pt;
  border: 10px solid white;
  box-shadow: 0 0 50px 20px #fff, 0 0 90px 50px #f0f, 0 0 130px 80px #0ff;

  /*box-shadow:
            0 0 .5rem #fff,
            inset 0 0 .5rem #fff,
            0 0 2rem var(#08f),
            inset 0 0 2rem var(#08f),
            0 0 4rem var(#08f),
            inset 0 0 4rem var(#08f);*/

  margin-top: 5px;
  font-size: 44pt;
  font-weight: 200;
  font-style: italic;
  color: #fff;
  text-shadow: 0 0 7px rgb(253, 117, 67), 0 0 10px rgb(247, 82, 22),
    0 0 21px #f40, 0 0 42px #f40, 0 0 82px #f40;

  text-shadow: 0 0 7px rgb(253, 117, 67), 0 0 10px rgb(247, 82, 22),
    0 0 21px #f40, 0 0 42px #f40, 0 0 82px #f40;
  border-radius: 0rem;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 5px;
  border-radius: 30px;
  margin-left: 200px;
  margin-right: 20px;

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

  padding-top: 15px;
  background: linear-gradient(to left, #0c2c63, #1941b2);

  margin: 0;
}

#Finalword {
  font-family: "Monaco", monospace;
  color: white;
  font-size: 12px;
  text-align: left;
  padding-left: 4px;
}

.link {
  color: white;
  background: #20af19;
  border-radius: 4%;
  border: solid #229954;
  text-decoration: none;
}

a {
  color: #fff;
}
</style>
