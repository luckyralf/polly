<template id="temp">
  <section class="wrapper">
    <header>
      <h1 class="waitingRoom">{{ uiLabels.waitingRoom}}</h1>
    </header>

    <div>
      <p class="waitingForHost">{{ uiLabels.WaitingForHost }}</p>

   
      <div class="loading">
        <span class="loaderPrick"></span>
        <span class="loaderPrick"></span>
        <span class="loaderPrick"></span>
      </div>

      <p class="participants">
        {{ uiLabels.participants }} {{ this.thePoll.poll.amountParticipants }}
      </p>

      <div class="amount"></div>
    </div>


    

    <div v-if="this.pollActivated">POLL KÖRS</div>

    <div class="wrapperBottom"></div>
  </section>
</template>

<script>
import io from "socket.io-client";
const socket = io();

export default {
  name: "Poll",
  components: {},
  data: function () {
    return {
      uiLabels: {},
      lang: "",
      pollId: "inactive poll",
      amountParticipants: 0,
      pollActivated: false,
      thePoll: {},
      data: {},
    };
  },

  created: function () {

    this.pollId = this.$route.params.id;
    socket.emit("joinPoll", { pollId: this.pollId });
    socket.emit("editParticipants", {
      addOrRemove: "add",
      pollId: this.pollId,
    });
    socket.on("pollCreated", (data) => (this.data = data));
    socket.on("allQuestions", (data) => (this.data = data));
    socket.on("pollHead", (pollHead) => (this.pollHeadline = pollHead));
    socket.on("dataUpdate", (data) => (this.data = data));
    socket.on("getAllPolls", (data) => (this.polls = data));
    socket.on("runPolls", () => {
      console.log(this.pollId);
      this.$router.push({ name: "Poll", params: { id: this.pollId } });
    });
    socket.emit("emitGetPoll", this.pollId);

    socket.on("getPoll", (thePoll) => {
      this.thePoll = thePoll;
    socket.emit("pageLoaded", this.thePoll.poll.lang);

    socket.on("dataUpdate", (data) => (this.data = data));
    });

    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });

    // this.lang = this.thePoll.poll.lang;
    // socket.emit("pageLoaded", this.lang);
    
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Exo+2:200i");

.loading {
  width: 500px;
  height: 100px;
  position: absolute;
  top: 25%;
  left: 40%;
  display: flex;
  align-items: center;
  margin-left: 100px;
  margin-right: 100px;
}

.loaderPrick {
  border-radius: 100%;
  border: 5px solid #ffef78;
  margin: 10px;
}

.loaderPrick:nth-child(1) {
  animation: preloader 0.6s ease-in-out alternate infinite;
}
.loaderPrick:nth-child(2) {
  animation: preloader 0.6s ease-in-out alternate 300ms infinite;
}
.loaderPrick:nth-child(3) {
  animation: preloader 0.6s ease-in-out alternate 400ms infinite;
}

@keyframes preloader {
  100% {
    transform: scale(2.3);
  }
}

body {
  background: yellow;
}

.wrapper {
  background: pink;
  height: 100vh;
}

.waitingRoom {
  background-color: transparent;
  padding-left: 160px;
  padding-right: 200px;
  padding-bottom: 150px;
  padding-top: 40px;
  /* text-align: center; */
  color: white;
  font-family: "Exo 2", sans-serif;
  /* overflow: hidden; */
  text-shadow: 2px 2px 2px black;
  font-size: 80px;
  margin-top: 30px;
  color: #fff;

  text-shadow: 0 0 7px rgb(253, 117, 67), 0 0 10px #f0f, 0 0 21px #f0f,
    0 0 42px #f0f, 0 0 82px #f0f;
  border-radius: 0rem;
  /* margin-left: 20px;
  margin-right: 20px; */
  margin-top: 5px;
  border-radius: 30px;
  /* margin-left: 200px;
  margin-right: 20px; */
  text-transform: uppercase;
}
.waitingForHost {
  background: #ffef78;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: -50px;
  font-family: "Exo 2", sans-serif;
  font-size: 20px;
  font-weight: bold;
  border-bottom: solid 2px yellow;
  border-top: solid 3px yellow;
}

.participants {
  color: #fff;
  font-size: 50px;
  font-family: "Exo 2", sans-serif;
  font-weight: bold;
}

.wrapperBottom {
  background: pink;
  height: 300px;
}
.startPoll {
  font-size: 25px;
  padding: 5px 5px 5px;
  font-family: "Exo 2", sans-serif;
  text-decoration: none;
  color: #fff;
  background: #20af19;
  border-radius: 5px;
  border: solid #229954;
  text-decoration: none;
  font-weight: bold;
}

/* CSS för mobil version*/
@media only screen and (max-width: 600px) {
  .waitingRoom {
    position: relative;
    left: -20%;
    top: 50%;
    transform: translate (-50% -50%);
  }

  .loading {
    position: absolute;
    left: 15%;
    top: 40%;
    transform: translate (-50% -50%);
    max-width: 270px;
    margin-right: 50px;
  }
  .wrapper {
    max-width: 425px;
    min-width: 425px;
  }

  .wrapperBottom {
    background: pink;
    max-height: 120px;
  }
  #temp {
    max-height: 600px;
  }
}
</style>
