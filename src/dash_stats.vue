<template>
  <v-app id="inspire">
    <v-app-bar flat>
      <v-container class="mx-auto d-flex align-center justify-center">
        <v-avatar>
          <v-img
            alt="John"
            src="https://cdn.vuetifyjs.com/images/john.jpg"
          ></v-img>
        </v-avatar>

        <v-btn @click="goToDashboard">이름미정</v-btn>
        <v-btn>정보관리</v-btn> 
        <v-btn @click="goToStatistic">통계분석</v-btn>
        <v-btn>커뮤니티</v-btn>
        <v-btn>공지사항</v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="160">
          <v-text-field
            density="compact"
            label="Search"
            rounded="lg"
            variant="solo-filled"
            flat
            hide-details
            single-line
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list rounded="lg">
                <div class="d-flex flex-row">
                  <v-tabs v-model="tab" color="primary" direction="vertical">
                    <v-tab
                      prepend-icon="mdi-account"
                      text="표"
                      value="option-1"
                    ></v-tab>
                    <v-tab
                      prepend-icon="mdi-lock"
                      text="그래프"
                      value="option-2"
                    ></v-tab>
                  </v-tabs>
                </div>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  color="grey-lighten-4"
                  title="Refresh"
                  link
                ></v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <v-tabs-window v-model="tab">
                    <!-- 절대 위치로 v-tab 추가 -->
    <v-tabs v-model="tab" class="absolute-tab">
      <v-tab>전공과목</v-tab>
      <v-tab>사용자</v-tab>
      <!-- 필요에 따라 더 많은 탭 추가. 왠진 모르겠는데 option이랑 겹치지만 작동함...-->
    </v-tabs>
                <v-tabs-window-item value="option-1">
                  <table-major-component/>
                </v-tabs-window-item>

                <v-tabs-window-item value="option-2">
                  <table-user-component/>
                </v-tabs-window-item>
              </v-tabs-window>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import TableMajorComponent from './table_major.vue'
import TableUserComponent from './table_user.vue'

const dialog = ref(false)
const tab = ref('option-1')
</script>

<script>
export default {
  name: 'DashboardComponent',
  components: {
    TableMajorComponent,
    TableUserComponent,
  },
  data() {
    return {
      tab1: null, // 첫 번째 탭 그룹의 v-model,
      tab2: null, // 두 번째 탭 그룹의 v-model,
      headers: [
        { text: 'StudentID', value: 'StudentID' },
        { text: 'StudentNM', value: 'StudentNM' },
        { text: 'Department', value: 'Department' },
        { text: 'DoubleMajor', value: 'DoubleMajor' },
        { text: 'StudentNumber', value: 'StudentNumber' },
        { text: 'College', value: 'College' },
        { text: 'Primary_Email', value: 'Primary_Email' },
        { text: 'EnrollmentStatus', value: 'EnrollmentStatus' },
        { text: 'Follower_cnt', value: 'Follower_cnt' },
        { text: 'Following_cnt', value: 'Following_cnt' },
        { text: 'Public_repos_cnt', value: 'Public_repos_cnt' },
        {
          text: 'Github_profile_createDate',
          value: 'Github_profile_createDate',
        },
        {
          text: 'Github_profile_updateDate',
          value: 'Github_profile_updateDate',
        },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      items: [
        // 예제 데이터
      ],
      editedIndex: -1,
      editedItem: {
        // 초기화된 항목 데이터
      },
      defaultItem: {
        // 기본 항목 데이터
      },
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item) {
      const index = this.items.indexOf(item)
      if (confirm('Are you sure you want to delete this item?')) {
        this.items.splice(index, 1)
      }
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()
    },
    reset() {
      this.items = []
      this.initialize()
    },
    initialize() {
      // 초기 데이터를 추가하는 부분입니다.
    },
    goToStatistic() {
    this.$router.push('/dashboard/stats');
    },
    goToDashboard() {
    this.$router.push('/dashboard');
    },
  },
}
</script>

<style>
/* 절대 위치 스타일 */
.absolute-tab {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000; /* 필요에 따라 z-index 조정 */
  background-color: white; /* 필요에 따라 배경색 조정 */
}
</style>