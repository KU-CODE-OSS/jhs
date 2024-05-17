<template>
  <img v-if="showImage" alt="KU logo" src="./assets/logo.png">
  <div><button class="login_button" @click="redirectToLogin">로그인</button></div>
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
      <RouterView />
    </div>
  </div>
  <li><router-link to="/">메인페이지</router-link></li>
  <li><router-link to="/table">테이블(구)</router-link></li>
  <li><router-link to="/new_table">테이블(신)</router-link></li>
  <li><button @click="redirectToDashboard">대시보드</button></li>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  computed: {
    // 현재 라우트를 기반으로 이미지 표시 여부 결정
    showImage() {
      // 이미지를 표시하고 싶은 라우트 목록
      const imageRoutes = ['/', '/table', '/new_table'];
      // 현재 경로가 이미지를 표시하는 경로 목록에 포함되어 있는지 확인
      return imageRoutes.includes(this.$route.path);
    }
  },
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
    },
    redirectToDashboard() {
      // 여기에 대시보드로 이동할 때 필요한 로직을 추가
      // 예: Vue Router를 사용하지 않고 JavaScript의 window.location을 사용하는 경우
      window.location.href = '/dashboard'; // 이 부분을 실제 이동하고자 하는 URL로 변경하세요.
      },
    redirectToLogin() {
      window.location.href = '/login'; // 이 부분을 실제 이동하고자 하는 URL로 변경하세요.
      },
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

.login_button {
  background-color: #78002f; 
  border: none;
  color: white;
  padding: 80px 320px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 32px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>
