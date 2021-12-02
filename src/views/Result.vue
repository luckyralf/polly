<template>
 <body class="Wrap">
  <section>
      <header>
        <h1 class="resHeader"> Resultat</h1>
      </header>
  </section>

  <div>
    {{question}}
  </div>
  <Bars v-bind:data="data"/>

 </body>
</template>

<script>
// @ is an alias to /src
import Bars from '@/components/Bars.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Result',
  components: {
    Bars
  },
  data: function () {
    return {
      question: "",
      data: {
      }
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.on("dataUpdate", (update) => {
      this.data = update.a;
      this.question = update.q;
    });
    socket.on("newQuestion", update => {
      this.question = update.q;
      this.data = {};
    })
  }
}
</script>

<style scoped>

.Wrap{
  background: linear-gradient(to left, #0c2c63, #1941b2);

  padding-top: 15px;
  background: linear-gradient(to left, #0c2c63, #1941b2);

  margin: 0;
}

.resHeader{
  
}

</style>