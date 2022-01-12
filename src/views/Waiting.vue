<template id="temp">
  <!--<body> -->
  <section class="jjj">
    <header>
      <h1 class="waitingRoom">WAITING ROOM</h1>
    </header>

    <!--<main> -->
    {{ data }}
    <div>
      <p class="waitingForHost">Waiting for host to start poll...</p>

      <div class="loading">
        <span class="loaderPrick"></span>
        <span class="loaderPrick"></span>
        <span class="loaderPrick"></span>
      </div>

      <p class="participants">Participants:</p>

      <div class="amount"></div>
    </div>

    <div>
      <router-link class="startPoll" v-bind:to="'/poll/' + pollId"
        >KÖR POLLJÄVELN
      </router-link>
    </div>

    <div v-if="this.pollActivated">POLL KÖRS</div>

    <div class="animering"></div>
  </section>
  <!--</main>
    </body> -->
</template>

<script>
import io from "socket.io-client";
const socket = io();

export default {
  name: "Poll",
  components: {},
  data: function () {
    return {
      pollId: "inactive poll",
      amountParticipants: 0,
      pollActivated: false,
    };
  },

  created: function () {
    this.pollId = this.$route.params.id;
    socket.emit("joinPoll", { pollId: this.pollId });
    socket.emit("editParticipants", {
      addOrRemove: "add",
      pollId: this.pollId,
    });
    // document.addEventListener("beforeunload", this.unRegister);
    socket.on("pollCreated", (data) => (this.data = data));
    socket.on("allQuestions", (data) => (this.data = data));
    socket.on("pollHead", (pollHead) => (this.pollHeadline = pollHead));
    socket.on("dataUpdate", (data) => (this.data = data));
    socket.on("getAllPolls", (data) => (this.polls = data));
    socket.on("runPolls", () => {
      console.log(this.pollId);
      this.$router.push({ name: "Poll", params: { id: this.pollId } });
    });
  },
  // methods: {
  //   unRegister: function () {
  //     socket.emit("editParticipants", {
  //       addOrRemove: "remove",
  //       pollId: this.pollId,
  //     });
  //     console.log("unmount fungerar");
  //   },
  // },
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
  /* align-content: center;
  justify-content: center; */
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

#temp {
  background: black;
}
body {
  background: yellow;
}

.jjj {
  background: pink;
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

.animering {
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


@media only screen and (max-width:600px){
.loading{

    left:50%;
    top:40%;
    transform:translate (-50% -50%);

}


}
</style>
