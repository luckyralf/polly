"use strict";

const languages = ["en", "se"];

// Store data in an object to keep the global namespace clean
function Data() {
  this.polls = {};
}

/***********************************************
For performance reasons, methods are added to the
prototype of the Data object/class
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************************************/

Data.prototype.getUILabels = function (lang = "en") {
  const ui = require("./data/labels-" + lang + ".json");
  return ui;
};

Data.prototype.createPoll = function (pollId, lang = "en") {
  if (typeof this.polls[pollId] === "undefined") {
    let poll = {};
    poll.lang = lang;
    poll.questions = [];
    poll.answers = [];
    poll.editQuestion = -1; //frågan som ska visas när man klickar på en
    poll.currentQuestion = 1;
    this.polls[pollId] = poll;
    poll.saveMode = false;
    poll.amountParticipants = 0;
  }
  console.log("poll created", pollId);
  return this.polls[pollId];
};

Data.prototype.deletePoll = function (pollId) {
  this.polls[pollId] = undefined;
};

Data.prototype.addQuestion = function (pollId, q, indexForAddedQuestion) {
  console.log(indexForAddedQuestion, "indexforaddedQ");
  const poll = this.polls[pollId];
  console.log("question added to", pollId, q);
  if (typeof poll !== "undefined") {
    poll.questions.push(q);
  }
  console.log(poll.editQuestion, "editQ");
  poll.editQuestion = indexForAddedQuestion;
};

Data.prototype.editQuestion = function (pollId, index) {
  const poll = this.polls[pollId];
  if (poll.editQuestion !== undefined) {
    poll.editQuestion = index;
  }
};

Data.prototype.saveEditedQuestion = function (pollId, q) {
  const poll = this.polls[pollId];
  poll.questions[poll.editQuestion] = q;
  console.log("The poll now looks like: ", poll);
};

Data.prototype.deleteQuestion = function (pollId) {
  const poll = this.polls[pollId];
  const newQuestionArray = poll.questions;
  poll.questions = newQuestionArray
    .slice(0, poll.editQuestion)
    .concat(newQuestionArray.slice(poll.editQuestion + 1));
  console.log("The question with index", poll.editQuestion, "was deleted");
};

Data.prototype.moveQuestion = function (pollId, direction) {
  const poll = this.polls[pollId];
  if (direction == "up") {
    [poll.questions[poll.editQuestion - 1], poll.questions[poll.editQuestion]] =
      [
        poll.questions[poll.editQuestion],
        poll.questions[poll.editQuestion - 1],
      ];
    poll.editQuestion -= 1;
  }
  if (direction == "down") {
    [poll.questions[poll.editQuestion + 1], poll.questions[poll.editQuestion]] =
      [
        poll.questions[poll.editQuestion],
        poll.questions[poll.editQuestion + 1],
      ];
    poll.editQuestion += 1;
  }
};

Data.prototype.getQuestion = function (pollId, qId = null) {
  const poll = this.polls[pollId];
  console.log("hejhej", poll, pollId, typeof pollId);
  console.log("question requested for ", pollId, qId);
  if (typeof poll !== "undefined") {
    if (qId !== null) {
      poll.currentQuestion = qId;
    }
    return poll.questions[poll.currentQuestion];
  }
  return [];
};

Data.prototype.submitAnswer = function (pollId, answer) {
  const poll = this.polls[pollId];
  console.log("answer submitted for ", pollId, answer);
  if (typeof poll !== "undefined") {
    let answers = poll.answers[poll.currentQuestion];
    if (typeof answers !== "object") {
      answers = {};
      answers[answer] = 1;
      poll.answers.push(answers);
    } else if (typeof answers[answer] === "undefined") answers[answer] = 1;
    else answers[answer] += 1;
    console.log("answers looks like ", answers, typeof answers);
  }
};

Data.prototype.getAnswers = function (pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== "undefined") {
    const answers = poll.answers[poll.currentQuestion];
    if (typeof poll.questions[poll.currentQuestion] !== "undefined") {
      return { q: poll.questions[poll.currentQuestion].q, a: answers };
    }
  }
  return {};
};
Data.prototype.getPoll = function (pollId) {
  const poll = this.polls[pollId];

  if (typeof poll !== "undefined") {
    return { poll };
  }
  return {};
};

Data.prototype.createPollHead = function (pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== "undefined") {
    return pollId;
  }
};

Data.prototype.saveTime = function (t) {
  console.log("t som kommer in är", t);
  console.log("Tiden ändras till", parseInt(t));
  if (parseInt(t) === 0 || parseInt(t) === 1 || t == undefined) {
    return { timeOn: false, time: 1 };
  } else {
    return { timeOn: true, time: parseInt(t) };
  }
};

Data.prototype.editOrSavePoll = function (mode, pollId) {
  if (mode == "savemode") {
    this.polls[pollId].saveMode = true;
  }
  if (mode == "editmode") {
    this.polls[pollId].saveMode = false;
  }
};

Data.prototype.getAllPolls = function () {
  console.log(this.polls, typeof this.polls);
  return this.polls;
};

Data.prototype.editParticipants = function (addOrRemove, pollId) {
  if (addOrRemove == "add") {
    this.polls[pollId].amountParticipants += 1;
    console.log("data add participant");
  } else if (addOrRemove == "remove") {
    this.polls[pollId].amountParticipants -= 1;
    console.log("data remove participant");
  }
};

Data.prototype.checkPollExists = function (pollId) {
  console.log(
    "checkpollexists data",
    this.polls[pollId],
    typeof this.polls[pollId]
  );
  if (typeof this.polls[pollId] === "undefined") {
    return false;
  } else {
    return true;
  }
};

module.exports = Data;
