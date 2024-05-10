<template>
  <div id="app">
    <!-- 헤더 -->
    <header>
      <nav>
        <ul>
          <button class="upper_tab">정보관리</button>
          <button class="upper_tab">통계분석</button>
          <button class="upper_tab">커뮤니티</button>
          <button class="upper_tab">공지사항</button>
        </ul>
        <div class="search-bar">
          <input type="text" placeholder="검색">
          <button>검색</button>
        </div>
      </nav>
    </header>
    
    <!-- <router-view :블로그글="블로그글"></router-view> -->



<table class="left_tab" style="width:11%">
  <tr>
    <td><button class="left_tab_button">교과정보</button></td>
  </tr>
  <tr>
    <td><button class="left_tab_button">학생 정보</button></td>
  </tr>
  <tr>
    <td><button class="left_tab_button">오픈소스 정보</button></td>
  </tr>
</table>

    <!-- 본문 -->
    <main>
      <!-- <RouterView /> -->
      <section class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>StudentID</th>
              <th>StudentNM</th>
              <th>Department</th>
              <th>DoubleMajor</th>
              <th>StudentNumber</th>
              <th>College</th>
              <th>Primary_Email</th>
              <th>EnrollmentStatus</th>
              <th>Follower_cnt</th>
              <th>Following_cnt</th>
              <th>Public_repos_cnt</th>
              <th>Github_profile_createDate</th>
              <th>Github_profile_updateDate</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td><button @click="item.StudentID = 'a'">tmp</button>{{ item.StudentID }}</td>
              <td>{{ item.StudentNM }}</td>
              <td>{{ item.Department }}</td>
              <td>{{ item.DoubleMajor }}</td>
              <td>{{ item.StudentNumber }}</td>
              <td>{{ item.College }}</td>
              <td>{{ item.Primary_Email }}</td>
              <td>{{ item.EnrollmentStatus }}</td>
              <td>{{ item.Follower_cnt }}</td>
              <td>{{ item.Following_cnt }}</td>
              <td>{{ item.Public_repos_cnt }}</td>
              <td>{{ item.Github_profile_createDate }}</td>
              <td>{{ item.Github_profile_updateDate }}</td>
              <td><button @click="editItem(item)">수정</button></td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
/*
import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(vuetify).mount('#app')  */

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      items: [
        { 
          StudentID: 101, 
          StudentNM: '홍길동', 
          Department: '컴퓨터공학과', 
          DoubleMajor: '경영학과', 
          StudentNumber: '20240001', 
          College: '공과대학', 
          Primary_Email: 'hong101@university.ac.kr', 
          EnrollmentStatus: '재학', 
          Follower_cnt: 120, 
          Following_cnt: 75, 
          Public_repos_cnt: 30, 
          Github_profile_createDate: '2019-02-15', 
          Github_profile_updateDate: '2024-03-22'
        },
        { 
          StudentID: 102, 
          StudentNM: '이순신', 
          Department: '기계공학과', 
          DoubleMajor: '없음', 
          StudentNumber: '20240002', 
          College: '공과대학', 
          Primary_Email: 'lee102@university.ac.kr', 
          EnrollmentStatus: '휴학', 
          Follower_cnt: 150, 
          Following_cnt: 80, 
          Public_repos_cnt: 12, 
          Github_profile_createDate: '2018-06-10', 
          Github_profile_updateDate: '2024-01-18'
        },
        { 
          StudentID: 103, 
          StudentNM: '장보고', 
          Department: '전자공학과', 
          DoubleMajor: '물리학과', 
          StudentNumber: '20240003', 
          College: '자연과학대학', 
          Primary_Email: 'jang103@university.ac.kr', 
          EnrollmentStatus: '졸업', 
          Follower_cnt: 200, 
          Following_cnt: 100, 
          Public_repos_cnt: 42, 
          Github_profile_createDate: '2017-11-30', 
          Github_profile_updateDate: '2024-03-20'
        }
      ]
    }
  },
    methods: {
      editItem(item) {
        // 여기서는 예시로 콘솔에 아이템 ID를 출력하겠습니다.
        console.log(`Editing item with ID: ${item.id}`);

        
        // 실제 구현에서는 편집 로직을 추가하게 됩니다.
        // 예를 들어, 편집 폼으로 사용자를 리디렉션하거나
        // 폼을 표시하는 모달을 여는 등의 동작을 할 수 있습니다.
      }
    }
  }
</script>

<style>
/* 테이블 기본 스타일 */
table {
  width: 100%;
  border-collapse: separate; /* 각 셀을 분리 */
  border-spacing: 0; /* 셀 사이의 간격 */
}

/* 테이블 헤더와 셀 스타일 */
th, td {
  border: 1px solid #000; /* 검은색 테두리 */
  padding: 8px; /* 안쪽 여백 */
  text-align: left; /* 텍스트 왼쪽 정렬 */
}

/* 헤더 특별 스타일 */
th {
  background-color: #f2f2f2; /* 배경색 */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.upper_tab{
  background-color: hotpink;
  border: none;
  color: black;
  
  padding: 15px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 10px;
  cursor: pointer;
}

.left_tab {
    border-collapse: collapse; /* 테두리 겹침 없앰 */
    margin: 0; /* 상단 및 왼쪽 여백 없앰 */
  }
  .left_tab, .left_tab th, .left_tab td {
    border: 1px solid black; /* 테두리 설정 */
  }
  .left_tab th, .left_tab td {
    text-align: center; /* 텍스트 가운데 정렬 */
    padding: 0px; /* 셀 안쪽 여백 */
    
  }
.left_tab_button{
  background-color: gray;
  padding: 10px 10px;
  cursor: pointer;


}
</style>
