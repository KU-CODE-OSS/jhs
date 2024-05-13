<template>
  <v-app id="inspire">
    <v-app-bar flat>
      <v-container class="mx-auto d-flex align-center justify-center">
        <v-avatar class="me-4" color="grey-darken-1" size="32"></v-avatar>

        <v-btn
          v-for="link in links"
          :key="link"
          :text="link"
          variant="text"
        ></v-btn>

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
                      text="내 정보"
                      value="option-1"
                    ></v-tab>
                    <v-tab
                      prepend-icon="mdi-lock"
                      text="코스"
                      value="option-2"
                    ></v-tab>
                    <v-tab
                      prepend-icon="mdi-access-point"
                      text="전체 통계"
                      value="option-3"
                    ></v-tab>
                    <v-tab
                      prepend-icon="mdi-access-point"
                      text="Option 4"
                      value="option-4"
                    ></v-tab>
                    <v-tab
                      prepend-icon="mdi-access-point"
                      text="Option 5"
                      value="option-5"
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
                <v-tabs-window-item value="option-1">
                  <v-card flat>
                    <v-card-text>
                      <p>
                        Sed aliquam ultrices mauris. Donec posuere vulputate
                        arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed
                        a libero.
                      </p>

                      <p>
                        Nam ipsum risus, rutrum vitae, vestibulum eu, molestie
                        vel, lacus. Aenean tellus metus, bibendum sed, posuere
                        ac, mattis non, nunc. Aliquam lobortis. Aliquam
                        lobortis. Suspendisse non nisl sit amet velit hendrerit
                        rutrum.
                      </p>

                      <p class="mb-0">
                        Phasellus dolor. Fusce neque. Fusce fermentum odio nec
                        arcu. Pellentesque libero tortor, tincidunt et,
                        tincidunt eget, semper nec, quam. Phasellus blandit leo
                        ut odio.
                      </p>
                    </v-card-text>
                  </v-card>
                </v-tabs-window-item>

                <v-tabs-window-item value="option-2">
                  <div>
                    <v-container>
                      <v-row justify="center">
                        <!-- 중앙 정렬 -->
                        <v-col cols="12" md="6">
                          <!-- 중간 크기의 화면에서 6열 사용 -->
                          <v-tabs
                            v-model="tab2"
                            color="primary"
                            direction="vertical"
                          >
                            <v-tab
                              prepend-icon="mdi-account"
                              text="운영체제"
                            ></v-tab>
                            <v-tab
                              prepend-icon="mdi-lock"
                              text="컴퓨터 구조"
                            ></v-tab>
                            <v-tab
                              prepend-icon="mdi-access-point"
                              text="네트워크"
                            ></v-tab>
                            <v-tab
                              prepend-icon="mdi-access-point"
                              text="데이터 베이스"
                            ></v-tab>
                          </v-tabs>
                        </v-col>
                      </v-row>
                    </v-container>
                  </div>
                </v-tabs-window-item>

                <v-tabs-window-item value="option-3">
                  <v-card flat>
                    <v-card-text>
                      <p>
                        Fusce a quam. Phasellus nec sem in justo pellentesque
                        facilisis. Nam eget dui. Proin viverra, ligula sit amet
                        ultrices semper, ligula arcu tristique sapien, a
                        accumsan nisi mauris ac eros. In dui magna, posuere
                        eget, vestibulum et, tempor auctor, justo.
                      </p>

                      <p class="mb-0">
                        Cras sagittis. Phasellus nec sem in justo pellentesque
                        facilisis. Proin sapien ipsum, porta a, auctor quis,
                        euismod ut, mi. Donec quam felis, ultricies nec,
                        pellentesque eu, pretium quis, sem. Nam at tortor in
                        tellus interdum sagittis.
                      </p>
                    </v-card-text>
                  </v-card>
                </v-tabs-window-item>

                <v-tabs-window-item value="option-4">
                  <div>
                    <v-toolbar flat color="white">
                      <v-toolbar-title>Students</v-toolbar-title>
                      <v-divider class="mx-2" inset vertical></v-divider>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        @click="dialog = true"
                        >New Item</v-btn
                      >
                    </v-toolbar>
                    <v-dialog v-model="dialog" max-width="500px">
                      <v-card>
                        <v-card-title>
                          <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container grid-list-md>
                            <v-row wrap>
                              <v-col xs="12" sm="12" md="6">
                                <v-text-field
                                  v-model="editedItem.StudentID"
                                  label="Student ID"
                                ></v-text-field>
                              </v-col>
                              <v-col xs="12" sm="12" md="6">
                                <v-text-field
                                  v-model="editedItem.StudentNM"
                                  label="Student Name"
                                ></v-text-field>
                              </v-col>

                              <v-col xs="12" sm="12" md="6">
                                <v-text-field
                                  v-model="editedItem.Department"
                                  label="Department"
                                ></v-text-field>
                              </v-col>

                              <v-col xs="12" sm="12" md="6">
                                <v-text-field
                                  v-model="editedItem.DoubleMajor"
                                  label="DoubleMajor"
                                ></v-text-field>
                              </v-col>

                              <v-col xs="12" sm="12" md="6">
                                <v-text-field
                                  v-model="editedItem.StudentNumber"
                                  label="StudentNumber"
                                ></v-text-field>
                              </v-col>

                              <v-col xs="12" sm="12" md="6">
                                <v-text-field
                                  v-model="editedItem.College"
                                  label="College"
                                ></v-text-field>
                              </v-col>

                              <v-col xs="12" sm="12" md="6">
                                <v-text-field
                                  v-model="editedItem.Primary_Email"
                                  label="Primary_Email"
                                ></v-text-field>
                              </v-col>

                              <v-col xs="12" sm="12" md="6">
                                <v-text-field
                                  v-model="editedItem.EnrollmentStatus"
                                  label="EnrollmentStatus"
                                ></v-text-field>
                              </v-col>

                              <v-col xs="12" sm="12" md="6">
                                <v-text-field
                                  v-model="editedItem.Follower_cnt"
                                  label="Follower_cnt"
                                ></v-text-field>
                              </v-col>

                              <v-col xs="12" sm="12" md="6">
                                <v-text-field
                                  v-model="editedItem.Following_cnt"
                                  label="Following_cnt"
                                ></v-text-field>
                              </v-col>

                              <v-col xs="12" sm="12" md="6">
                                <v-text-field
                                  v-model="editedItem.Public_repos_cnt"
                                  label="Public_repos_cnt"
                                ></v-text-field>
                              </v-col>

                              <v-col xs="12" sm="12" md="6">
                                <v-text-field
                                  v-model="editedItem.Github_profile_createDate"
                                  label="Github_profile_createDate"
                                ></v-text-field>
                              </v-col>

                              <v-col xs="12" sm="12" md="6">
                                <v-text-field
                                  v-model="editedItem.Github_profile_updateDate"
                                  label="Github_profile_updateDate"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" flat @click="close"
                            >Cancel</v-btn
                          >
                          <v-btn color="blue darken-1" flat @click="save"
                            >Save</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-data-table
                      :headers="headers"
                      :items="items"
                      class="elevation-1"
                    >
                      <template v-slot:items="props">
                        <td>{{ props.item.StudentID }}</td>
                        <td>{{ props.item.StudentNM }}</td>
                        <td>{{ props.item.Department }}</td>
                        <td>{{ props.item.DoubleMajor }}</td>
                        <td>{{ props.item.StudentNumber }}</td>
                        <td>{{ props.item.College }}</td>
                        <td>{{ props.item.Primary_Email }}</td>
                        <td>{{ props.item.EnrollmentStatus }}</td>
                        <td>{{ props.item.Follower_cnt }}</td>
                        <td>{{ props.item.Following_cnt }}</td>
                        <td>{{ props.item.Public_repos_cnt }}</td>
                        <td>{{ props.item.Github_profile_createDate }}</td>
                        <td>{{ props.item.Github_profile_updateDate }}</td>

                        <!-- 나머지 필드도 동일하게 추가 -->
                        <td class="justify-center layout px-0">
                          <v-icon
                            small
                            class="mr-2"
                            @click="editItem(props.item)"
                            >edit</v-icon
                          >
                          <v-icon small @click="deleteItem(props.item)"
                            >delete</v-icon
                          >
                        </td>
                      </template>
                      <template v-slot:no-data>
                        <v-btn color="primary" @click="reset">Reset</v-btn>
                      </template>
                    </v-data-table>
                  </div>
                </v-tabs-window-item>

                <v-tabs-window-item value="option-5">
                  <v-card flat>
                    <v-card-text>
                      <p>
                        Fusce a quam. Phasellus nec sem in justo pellentesque
                        facilisis. Nam eget dui. Proin viverra, ligula sit amet
                        ultrices semper, ligula arcu tristique sapien, a
                        accumsan nisi mauris ac eros. In dui magna, posuere
                        eget, vestibulum et, tempor auctor, justo.
                      </p>

                      <p class="mb-0">
                        Cras sagittis. Phasellus nec sem in justo pellentesque
                        facilisis. Proin sapien ipsum, porta a, auctor quis,
                        euismod ut, mi. Donec quam felis, ultricies nec,
                        pellentesque eu, pretium quis, sem. Nam at tortor in
                        tellus interdum sagittis.
                      </p>
                    </v-card-text>
                  </v-card>
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
  const dialog = ref(false)
  const tab = ref('option-1')
  const links = ref(['정보관리', '통계분석', '커뮤니티', '공지사항'])
</script>

<script>
  export default {
    name: 'DashboardComponent',
    setup() {
      // setup() 내부에서 Composition API 로직을 처리할 수 있습니다.
      return { dialog, tab, links }
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
    },
  }
</script>
