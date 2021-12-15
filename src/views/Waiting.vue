<template id = "temp">
    <!--<body> -->
        <header>
            <h1 class="waitingRoom">WATING ROOM</h1>
        </header>
        <!--<main> -->

            <div>
                <p class = "waitingForHost"> Waiting for host to start poll... </p>
                <p class = "participants"> Participants: </p>
            </div>

            <div >
                <router-link
                v-bind:to="'/poll/' + id"
                >Här är en länk till poll, ska egentligen köras automatiskt mha lyssnare
                </router-link>
            </div>
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
}


</script>


<style scoped>
@import url("https://fonts.googleapis.com/css?family=Exo+2:200i");
#temp{
    background:black;
}
body{
    background:yellow;
}

.waitingRoom{

    background-color:green;
    height: 175px;
  width: 600px;
  padding-left: 200px;
  padding-right: 200px;
  padding-bottom: 75px;
  text-align: center;
  /*font-family: "Monaco", monospace;*/
  color:white;
  font-family: "Exo 2", sans-serif;
  overflow: hidden;
  text-shadow: 2px 2px 2px black;
  font-size: 80px;
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
}

.participants{
    font-size:50px;
}
.wrapperAll{
    background-color:green;
}

</style>