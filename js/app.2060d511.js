(function(t){function e(e){for(var r,o,u=e[0],c=e[1],a=e[2],h=0,d=[];h<u.length;h++)o=u[h],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&d.push(s[o][0]),s[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);l&&l(e);while(d.length)d.shift()();return i.push.apply(i,a||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,u=1;u<n.length;u++){var c=n[u];0!==s[c]&&(r=!1)}r&&(i.splice(e--,1),t=o(o.s=n[0]))}return t}var r={},s={app:0},i=[];function o(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=r,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],c=u.push.bind(u);u.push=e,u=u.slice();for(var a=0;a<u.length;a++)e(u[a]);var l=c;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("Quiz",{key:t.quizKey,on:{quizInProcess:t.submitQuiz}})],1)},i=[],o=(n("d3b7"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.currentQuestion?n("div",{staticClass:"container"},[n("p",[t._v("Currently at question "+t._s(t.index+1)+" of "+t._s(t.questions.length))]),n("h1",{domProps:{innerHTML:t._s(t.loading?t.currentQuestion.question:"Loading")}},[t._v(t._s(t.index+1)+". ")]),n("form",t._l(t.currentQuestion.answers,(function(e){return n("button",{key:e,staticClass:"btn bg-secondary text-white me-2",attrs:{index:t.currentQuestion.key,disabled:t.isDisabled},domProps:{innerHTML:t._s(e)},on:{click:function(e){return e.preventDefault(),t.answerQuestion(e)}}})})),0),n("hr"),!1===t.showResult?n("div",[n("h3",[t._v("When you completed this quiz or you want to stop, click this button")]),n("button",{staticClass:"btn bg-danger text-white",on:{click:t.showResults}},[t._v("Stop")])]):n("div",[n("p",[t._v("You have "),n("strong",[t._v(t._s(t.correctAnswers)+" correct "+t._s(t.pluralizeAnswer)+"!")])]),n("button",{staticClass:"btn bg-primary text-white",on:{click:t.reloadWindow}},[t._v("Again")])])]):t._e()}),u=[],c=n("2909"),a=n("1da1"),l=(n("96cf"),n("159b"),n("d81d"),n("99af"),n("ac1f"),n("5319"),{name:"Quiz",data:function(){return{questions:[],index:0,showResult:!1,disabledButton:!1,loading:!0}},props:{quizScore:{type:Object,require:!0}},mounted:function(){this.fetchQuestions()},computed:{isDisabled:function(){return this.disabledButton},currentQuestion:function(){return this.questions!==[]?this.questions[this.index]:null},correctAnswers:function(){if(this.questions&&this.questions.length>0){var t=0;return this.questions.forEach((function(e){e.rightAnswer&&!0===e.rightAnswer&&t++})),t}},pluralizeAnswer:function(){return 1===this.correctAnswers?"Answer":"Answers"},quizCompleted:function(){if(0===this.questions.length)return!1;var t=0;return this.questions.forEach((function(e){null!==e.rightAnswer&&t++})),t===this.questions.length}},methods:{fetchQuestions:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var n,r,s,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.loading=!0,e.next=3,fetch("https://opentdb.com/api.php?amount=5&type=multiple");case 3:return n=e.sent,e.next=6,n.json();case 6:r=e.sent,s=0,i=r.results.map((function(t){t.answers=[t.correct_answer].concat(Object(c["a"])(t.incorrect_answers));for(var e=t.answers.length-1;e>0;e--){var n=Math.floor(Math.random()*(e+1)),r=[t.answers[n],t.answers[e]];t.answers[e]=r[0],t.answers[n]=r[1]}return t.rightAnswer=null,t.key=s,s++,t})),t.questions=i;case 10:case"end":return e.stop()}}),e)})))()},answerQuestion:function(t){var e=t.target.getAttribute("index"),n=t.target.innerHTML,r=n.replace(/'/,"&#039;");this.questions[e].userAnswer=r;for(var s=this.currentQuestion.answers,i=0;i<s.length;i++)s!==t.target&&(this.disabledButton=!0);this.checkAnswer(t,e)},checkAnswer:function(t,e){var n=this.questions[e];n.userAnswer&&(this.$emit("quizInProcess",this.currentQuestion.userAnswer),this.index<this.questions.length-1&&setTimeout(function(){this.index+=1,this.disabledButton=!1}.bind(this),1e3),n.userAnswer===n.correct_answer?this.questions[e].rightAnswer=!0:this.questions[e].rightAnswer=!1)},showResults:function(){this.showResult=!0},reloadWindow:function(){window.location.reload()}}}),h=l,d=n("2877"),f=Object(d["a"])(h,o,u,!1,null,null,null),p=f.exports,w={components:{Quiz:p},data:function(){return{quizKey:0,quizScore:{allQuestions:0,answeredQuestions:0,correctlyAnsweredQuestions:0}}},methods:{submitQuiz:function(t){var e={answers:t};fetch("https://jsonplaceholder.typicode.com/posts",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json;charset=UTF-8"}}).then(console.log("ok"))}}},b=w,g=(n("5c0b"),Object(d["a"])(b,s,i,!1,null,null,null)),v=g.exports;n("ab8b");r["a"].config.productionTip=!1,new r["a"]({render:function(t){return t(v)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";n("9c0c")},"9c0c":function(t,e,n){}});
//# sourceMappingURL=app.2060d511.js.map