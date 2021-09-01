<template>
  <div class="container" v-if="currentQuestion">
    <p>Currently at question {{ index + 1 }} of {{ questions.length }}</p>
    <h1 v-html="loading ? currentQuestion.question : 'Loading'">{{ index + 1 }}. </h1>
    <form >
      <button
        class="btn bg-secondary text-white me-2"
        v-for="answer in currentQuestion.answers"
        :index="currentQuestion.key"
        :key="answer"
        @click.prevent="answerQuestion"
        :disabled="isDisabled"
        v-html="answer"
      ></button>
    </form>
    <hr  />
    <div v-if="showResult === false">
      <h3 >When you completed this quiz or you want to stop, click this button</h3>
      <button class="btn bg-danger text-white" @click="showResults">Stop</button>
    </div>
    <div v-else>
      <p>You have <strong>{{ correctAnswers }} correct {{ pluralizeAnswer }}!</strong></p>
      <button class="btn bg-primary text-white" @click="reloadWindow">Again</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Quiz",
  data() {
    return {
      questions: [],
      index: 0,
      showResult: false,
      disabledButton: false,
      loading: true,
    };
  },
  props: {
    quizScore: {
      type: Object,
      require: true
    }
    
  },
  mounted() {
    this.fetchQuestions();
  },
  computed: {
    isDisabled() {
      return this.disabledButton;
    },
    currentQuestion() {
      if (this.questions !== []) {
        return this.questions[this.index];
      }
      return null;
    },
    correctAnswers() {
      if (this.questions && this.questions.length > 0) {
        let correctAnswersCounter = 0;
        this.questions.forEach((question) => {
          if (!question.rightAnswer) {
            return;
          } else if (question.rightAnswer === true) {
            correctAnswersCounter++;
          }
        });
        return correctAnswersCounter;
      }
    },
    pluralizeAnswer() {
      return this.correctAnswers === 1 ? "Answer" : "Answers";
    },
    quizCompleted() {
      if (this.questions.length === 0) {
        return false;
      }
      let questionsAnswered = 0;
      this.questions.forEach((question) => {
        question.rightAnswer !== null ? questionsAnswered++ : null;
      });
      return questionsAnswered === this.questions.length;
    },
  },
  methods: {
    async fetchQuestions() {
      this.loading = true;
      let response = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );
      let jsonResponse = await response.json();
      let index = 0; 
      let data = jsonResponse.results.map((question) => {
        question.answers = [
          question.correct_answer,
          ...question.incorrect_answers,
        ];

        for (let i = question.answers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [question.answers[i], question.answers[j]] = [
            question.answers[j],
            question.answers[i],
          ];
        }

        question.rightAnswer = null;
        question.key = index;
        index++;
        return question;
      });
      this.questions = data;
    },
    answerQuestion(event) {
      let index = event.target.getAttribute("index");
      let pollutedUserAnswer = event.target.innerHTML;
      let userAnswer = pollutedUserAnswer.replace(/'/, "&#039;");
      this.questions[index].userAnswer = userAnswer;
      let allButtons = this.currentQuestion.answers
      
      for (let i = 0; i < allButtons.length; i++) {
        if (allButtons === event.target) continue;
        this.disabledButton = true
      }
      this.checkAnswer(event, index);
    },
    checkAnswer(event, index) {
      let question = this.questions[index];
      if (question.userAnswer) {
        this.$emit('quizInProcess', this.currentQuestion.userAnswer)
        if (this.index < this.questions.length - 1) {
          setTimeout(
            function() {
              this.index += 1;
              this.disabledButton = false
            }.bind(this),
            1000
          );
        }
        if (question.userAnswer === question.correct_answer) {
          this.questions[index].rightAnswer = true;
        } else {
          this.questions[index].rightAnswer = false;
        }
      }
    },
    showResults() {
      this.showResult = true
    },
    reloadWindow() {
      window.location.reload()
    }
  },
  
};
</script>