<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div>
    <div v-if="isAuthenticated">
      로그인 성공!
      {{ username }}님 환영합니다.
      {{ githubId }}가 님의 깃허브 아이디입니다.
      <form @submit.prevent="logout">
        <button type="submit">로그아웃</button>
      </form>
      <a href="/onsession">세션 유지 중인지 확인!</a>
    </div>
    <div v-else>
      <form @submit.prevent="login">
        <input name="username" type="text" v-model="username">
        <input name="password" type="password" v-model="password">
        <input type="submit" value="로그인">
      </form>
      <a href="/signup">회원가입</a>
    </div>
  </div>
    <li><router-link to="/">메인페이지</router-link></li>
    <li><router-link to="/table">테이블</router-link></li>
  <RouterView />

</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  data() {
    return {
      isAuthenticated: false,
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      const userData = {
        username: this.username,
        password: this.password
      };

      // 로그인 요청 보내기
      this.$axios.post('/auth/login', userData)
        .then(response => {
          // 로그인 성공 시 처리
          if (response.status === 200) {
            this.isAuthenticated = true;
            // 추가적인 로그인 성공 시 처리 코드
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    logout() {
      // 로그아웃 요청 보내기
      this.$axios.post('/logout')
        .then(response => {
          // 로그아웃 성공 시 처리
          if (response.status === 200) {
            this.isAuthenticated = false;
            // 추가적인 로그아웃 성공 시 처리 코드
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
