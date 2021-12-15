<template id = "temp">
    <!--<body> -->
    <section class = "jjj">
        <header>

            <h1 class="waitingRoom">WATING ROOM</h1>
        </header>
        
        <!--<main> -->
                
            <div>
                <p class = "waitingForHost"> Waiting for host to start poll... </p>

                    <div class="loading">
                        <span class="loader__prick"></span>
                        <span class="loader__prick"></span>
                        <span class="loader__prick"></span>
                    </div>


                <p class = "participants"> Participants:</p> <div class="participants amount"> </div>
                
            </div>

            <div >
                <router-link class = "startPoll"
                v-bind:to="'/poll/' + pollId"
                >KÖR POLLJÄVELN
                </router-link>
            </div>

            <div class= "animering"></div>

        </section>
        <!--</main>
    </body> -->
</template>


<script>
//  import io from "socket.io-client";
// import io from "socket.io-client";
// const socket = io();

export default {
  name: "Poll",
  components: {
    
  },
data: function () {
    return {
    pollId: "inactive poll",
    };
},

created: function () {
this.pollId = this.$route.params.id;
}
}


</script>


<style scoped>
@import url("https://fonts.googleapis.com/css?family=Exo+2:200i");





.loading {

  background-color: transparent;
  overflow:hidden;
  width: 500px;
  height: 100px;
  position: absolute;
  top: 25%; left: 40%;
  display: flex;
  align-items: center;
  align-content: center; 
  justify-content: center;  
  z-index: 100000;

}

.loader__prick {
  border-radius: 100%;
  border: 5px solid yellow;
  margin: 10px;
}

.loader__prick:nth-child(1) {
  animation: preloader .6s ease-in-out alternate infinite;
}
.loader__prick:nth-child(2) {
  animation: preloader .6s ease-in-out alternate .2s infinite;
}

.loader__prick:nth-child(3) {
  animation: preloader .6s ease-in-out alternate .4s infinite;
}

@keyframes preloader {
  100% { transform: scale(2); }
}


#temp{
    background:black;
}
body{
    background:yellow;
}

.jjj{
    background:pink;
}

.waitingRoom{

    background-color:green;
    height: 175px;
  width: 600px;
  padding-left: 200px;
  padding-right: 200px;
  padding-bottom: 75px;
  padding-top:40px;
  text-align: center;
  /*font-family: "Monaco", monospace;*/
  color:white;
  font-family: "Exo 2", sans-serif;
  overflow: hidden;
  text-shadow: 2px 2px 2px black;
  font-size: 80px;
  margin-top: 30px;
  color: #fff;

  text-shadow: 0 0 7px rgb(253, 117, 67), 0 0 10px #f0f, 0 0 21px #f0f,
    0 0 42px #f0f, 0 0 82px #f0f;
  border-radius: 0rem;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 5px;
  border-radius: 30px;
  margin-left: 200px;
  margin-right: 20px;
  text-transform: uppercase;

}
.waitingForHost{
    background:yellow;
    font-family: "Exo 2", sans-serif;
    font-weight:bold;
}

.participants{
    font-size:50px;
    font-family: "Exo 2", sans-serif;
    font-weight:bold;
}

.animering{
    background:pink;
    height:300px;
}
.startPoll{
    font-size:25px;
    background:yellow;
    padding:5px 5px 5px;
    border-radius:4px;

}

</style>