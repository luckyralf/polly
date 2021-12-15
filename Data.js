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
    poll.answers = []; //tror detta är svaren som ges, ej svarsalternativen
    poll.editQuestion = -1; //frågan som ska visas när man klickar på en
    poll.currentQuestion = 1; //kanske rimligt att denna börjar på 1?
    this.polls[pollId] = poll;
    console.log("poll created", pollId, poll);
  }
  return this.polls[pollId];
};

Data.prototype.deletePoll = function (pollId) {
  this.polls[pollId] = undefined;
};

Data.prototype.addQuestion = function (pollId, q, indexForAddedQuestion) {
  const poll = this.polls[pollId];
  console.log("question added to", pollId, q);
  if (typeof poll !== "undefined") {
    poll.questions.push(q);
  }
  poll.editQuestion = indexForAddedQuestion;
};

Data.prototype.editQuestion = function (pollId, index) {
  const poll = this.polls[pollId];
  console.log("The currently selected question is", index);
  poll.editQuestion = index;
};

Data.prototype.saveEditedQuestion = function (pollId, q) {
  const poll = this.polls[pollId];
  console.log("The question with index", poll.editQuestion, "was edited");
  poll.questions[poll.editQuestion] = q;
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
  //tror att qId blir null endast om man inte ger ett värde mvh adam
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
//Försök att returnera hela pollen till Create-sidan, rad 18 i socket är ändrad
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

module.exports = Data;
