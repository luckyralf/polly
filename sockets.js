function sockets(io, socket, data) {
  socket.emit('init', data.getUILabels());
  
  socket.on('pageLoaded', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('switchLanguage', function(lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('getSound',function() {
    socket.emit('sound',data.getSound());
  });

  socket.on('createPoll', function(d) {
    socket.emit('pollCreated', data.createPoll(d.pollId, d.lang));
  });

  socket.on('addQuestion', function(d) {
    data.addQuestion(d.pollId, {q: d.q, a: d.a});
    socket.emit('allQuestions', data.getPoll(d.pollId));
    // socket.emit('questionObject', data.getAnswers(d.pollId)); //returnera hela pollen istället
  });

  socket.on('joinPoll', function(d) { // d är objekt med pollId och questionNumber
    socket.join(d.pollId);
    socket.emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber)) //la till andra inparametern
    socket.emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('runQuestion', function(d) { //d är objekt med pollId och questionNumber
    io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber)); //kanske ta bort io.to pga det skickar till alla?
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId)); //kanske ta bort io.to pga det skickar till alla?
  });

  socket.on('submitAnswer', function(d) { //d = { pollId: this.pollId, answer: answer }
    data.submitAnswer(d.pollId, d.answer);
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  });

  socket.on('nextQuestion', function(d) { //ny test från Adam, d = {{pollId,questionNumber}}
      socket.emit('newQuestion', data.getQuestion(d.pollId,d.questionNumber)); 
  })
 
}

module.exports = sockets;