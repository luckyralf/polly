<template>
  <body class="Wrapped">
    <section id="headerText">
      <header>
        <h1>CAT POLL</h1>
      </header>
    </section>

    <div id="nav">
        <button class="langButtonSWE" v-on:click="switchLanguage">
          {{ uiLabels.changeLanguage }}
        </button>

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
#nav {
}


.langButtonSWE {
  padding-top: 40px;
  background-image: url(https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Flag_of_Sweden.svg/1200px-Flag_of_Sweden.svg.png);
  background-size: cover;
  border-radius: 50%;  
  font-family: "Monaco", monospace;
}

#headerText {
  text-align: center;
  text-transform: uppercase;
  font-family: "Monaco", monospace;
  color: ##d3ffce;
  color: #fff;
  overflow: hidden;
  text-shadow: 2px 2px 2px black;
  font-size: 30pt;
  border: 10px dotted #d84141;
  margin-bottom: 100px;

  font-size: 40pt;
  font-weight: 200;
  font-style: italic;
  color: #fff;
  text-shadow: 0 0 7px rgb(253, 117, 67), 0 0 10px rgb(247, 82, 22),
    0 0 21px #f40, 0 0 42px #f40, 0 0 82px #f40;
  /*padding: 0rem 6rem 5.5rem;*/
  border-radius: 2rem;
  text-transform: uppercase;
}

.writeAndParticipate {
  padding-top: 40px;
  font-family: techmono;
}

.createOwn {
  font-family: "Monaco", monospace;
  padding-top: 50px;
}

.Wrapped {
  background-color: #0c2c63;
}

#Finalword {
  font-family: "Monaco", monospace;
  color: green;
}

/*hejhej*/
</style>
