function sockets(io, socket, data) {
  socket.emit("init", data.getUILabels());

  socket.on("pageLoaded", function (lang) {
    socket.emit("init", data.getUILabels(lang));
  });

  socket.on("getAllPolls", function () {
    socket.emit("getAllPolls", data.getAllPolls());
    console.log("socket getallpolls");
  });

  socket.on("switchLanguage", function (lang) {
    socket.emit("init", data.getUILabels(lang));
  });

  socket.on("createPoll", function (d) {
    socket.emit("pollCreated", data.createPoll(d.pollId, d.lang));
    socket.emit("allQuestions", data.getPoll(d.pollId));
    socket.emit("pollHead", data.createPollHead(d.pollId));
  });

  socket.on("deletePoll", function (d) {
    data.deletePoll(d.pollId);
    socket.emit("allQuestions", data.getPoll(d.pollId));
    socket.emit("pollHead", data.createPollHead(d.pollId));
  });

  socket.on("editQuestion", function (index) {
    data.socket.emit("sendQuestionIndex", index);
  });

  socket.on("deleteQuestion", function (pollId) {
    data.deleteQuestion(pollId);
    socket.emit("allQuestions", data.getPoll(pollId));
  });

  socket.on("moveQuestion", function (pollIdAndDirection) {
    console.log("question was moved", pollIdAndDirection.direction);
    data.moveQuestion(pollIdAndDirection.pollId, pollIdAndDirection.direction);
    socket.emit("allQuestions", data.getPoll(pollIdAndDirection.pollId));
  });

  socket.on("chooseQuestion", function (d) {
    // console.log(d.indexForChosenQuestion);
    // console.log("ChooseQuestion i socket aktiveras");
    data.editQuestion(d.pollId, d.indexForChosenQuestion);
    socket.emit("updateChooseQuestion", d.indexForChosenQuestion);
    socket.emit("allQuestions", data.getPoll(d.pollId));
  });

  socket.on("addQuestion", function (d) {
    data.addQuestion(d.pollId, { q: d.q, a: d.a }, d.indexForAddedQuestion);
    console.log("addquestion socket fungerar");
    socket.emit("allQuestions", data.getPoll(d.pollId));
    // socket.emit('questionObject', data.getAnswers(d.pollId)); //returnera hela pollen istället
  });

  socket.on("saveEditedQuestion", function (questionData) {
    data.saveEditedQuestion(questionData.pollId, {
      q: questionData.q,
      a: questionData.a,
      time: data.saveTime(questionData.t).time,
      timeOn: data.saveTime(questionData.t).timeOn,
    });
    socket.emit("allQuestions", data.getPoll(questionData.pollId));
    // socket.emit('questionObject', data.getAnswers(d.pollId)); //returnera hela pollen istället
  });

  socket.on("joinPoll", function (d) {
    // d är objekt med pollId och questionNumber
    socket.join(d.pollId);
    socket.emit("newQuestion", data.getQuestion(d.pollId, d.questionNumber)); //la till andra inparametern
    socket.emit("dataUpdate", data.getAnswers(d.pollId));
  });

  socket.on("runQuestion", function (d) {
    //d är objekt med pollId och questionNumber
    io.to(d.pollId).emit(
      "newQuestion",
      data.getQuestion(d.pollId, d.questionNumber)
    ); //kanske ta bort io.to pga det skickar till alla?
    io.to(d.pollId).emit("dataUpdate", data.getAnswers(d.pollId)); //kanske ta bort io.to pga det skickar till alla?
  });

  socket.on("runPoll", function (d) {
    io.to(d.pollId).emit("runPoll", data.getQuestion(d.pollId));
  });
  // elsa och johanna run q i create

  socket.on("submitAnswer", function (d) {
    //d = { pollId: this.pollId, answer: answer }
    data.submitAnswer(d.pollId, d.answer);
    io.to(d.pollId).emit("dataUpdate", data.getAnswers(d.pollId));
  });

  socket.on("resetAll", () => {
    data = new Data();
    data.initializeData();
  });

  socket.on("nextQuestion", function (d) {
    //ny test från Adam, d = {{pollId,questionNumber}}
    socket.emit("newQuestion", data.getQuestion(d.pollId, d.questionNumber));
  });

  socket.on("emitGetPoll", function (ID) {
    socket.emit("getPoll", data.getPoll(ID));
  });

  socket.on("editOrSavePoll", function (d) {
    data.editOrSavePoll(d.mode, d.pollId);
    socket.emit("allQuestions", data.getPoll(d.pollId));
  });
}

module.exports = sockets;
