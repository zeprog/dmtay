<template>
  <div id="app">
    <Quiz @quizInProcess="submitQuiz" :key="quizKey"/>
  </div>
</template>

<script>
import Quiz from './components/Quiz.vue'
export default {
  components: {
    Quiz
  },
  data() {
    return {
      quizKey: 0,
      quizScore: {
        allQuestions: 0,
        answeredQuestions: 0,
        correctlyAnsweredQuestions: 0,
      },
    }
  },
  methods: {
    submitQuiz(button) {
      const formData = {
        answers: button
      }
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(console.log('ok'))
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
