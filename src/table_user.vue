<template>
    <div>
      <v-toolbar flat color="white">
        <v-toolbar-title>사용자</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
        class="ma-2"
      ></v-text-field>
        <v-btn color="primary" dark class="mb-2" @click="dialog = true">New Item</v-btn>
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
                    v-model="editedItem.year"
                    label="Year"
                  ></v-text-field>
                </v-col>
                <v-col xs="12" sm="12" md="6">
                  <v-text-field
                    v-model="editedItem.semester"
                    label="Semester"
                  ></v-text-field>
                </v-col>
                <v-col xs="12" sm="12" md="6">
                  <v-text-field
                    v-model="editedItem.name"
                    label="Name"
                  ></v-text-field>
                </v-col>
                <v-col xs="12" sm="12" md="6">
                  <v-text-field
                    v-model="editedItem.department"
                    label="department"
                  ></v-text-field>
                </v-col>
                <v-col xs="12" sm="12" md="6">
                  <v-text-field
                    v-model="editedItem.id"
                    label="id"
                  ></v-text-field>
                </v-col>
                <v-col xs="12" sm="12" md="6">
                  <v-text-field
                    v-model="editedItem.enrollment"
                    label="enrollment"
                  ></v-text-field>
                </v-col>
                <v-col xs="12" sm="12" md="6">
                  <v-text-field
                    v-model="editedItem.github_id"
                    label="github_id"
                  ></v-text-field>
                </v-col>
                <v-col xs="12" sm="12" md="6">
                  <v-text-field
                    v-model="editedItem.course_name"
                    label="course_name"
                  ></v-text-field>
                </v-col>
                <v-col xs="12" sm="12" md="6">
                  <v-text-field
                    v-model="editedItem.commit"
                    label="commit"
                  ></v-text-field>
                </v-col>
                <v-col xs="12" sm="12" md="6">
                  <v-text-field
                    v-model="editedItem.pr"
                    label="PR"
                  ></v-text-field>
                </v-col>
                <v-col xs="12" sm="12" md="6">
                  <v-text-field
                    v-model="editedItem.issue"
                    label="issue"
                  ></v-text-field>
                </v-col>
                <v-col xs="12" sm="12" md="6">
                  <v-text-field
                    v-model="editedItem.num_repos"
                    label="num_repos"
                  ></v-text-field>
                </v-col>
              </v-row>  
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-data-table 
      :headers="headers" 
      :items="items" 
      :search="search" 
      class="elevation-1"
      >
        <template v-slot:item="props">
          <tr>
            <td>{{ props.item.year }}</td>
            <td>{{ props.item.semester }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.department }}</td>
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.enrollment }}</td>
            <td>{{ props.item.github_id }}</td>
            <td>{{ props.item.course_name }}</td>
            <td>{{ props.item.commit }}</td>
            <td>{{ props.item.pr }}</td>
            <td>{{ props.item.issue }}</td>
            <td>{{ props.item.num_repos }}</td>
            <td class="justify-center layout px-0">
              <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
              <v-icon small @click="deleteItem(props.item)">delete</v-icon>
            </td>
          </tr>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="reset">Reset</v-btn>
        </template>
      </v-data-table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        search: '',
        dialog: false,
        headers: [
          { title: 'Year', key: 'year' },
          { title: 'Semester', key: 'semester' },
          { title: 'Name', key: 'name' },
          { title: 'Department', key: 'department' },
          { title: 'ID', key: 'id' },
          { title: 'Enrollment', key: 'enrollment' },
          { title: 'Github_id', key: 'github_id' },
          { title: 'Course_name', key: 'course_name' },
          { title: 'Commit', key: 'commit' },
          { title: 'PR', key: 'pr' },
          { title: 'Issue', key: 'issue' },
          { title: 'Num_repos', key: 'num_repos' },
          { title: 'Actions', key: 'actions', sortable: false },
        ],
        items: [],
        editedIndex: -1,
        editedItem: {
          year: null,
          semester: '',
          name: '',
          department: '',
          id: '',
          enrollment: '',
          github_id: '',
          course_name: '',
          commit: null,
          pr: null,
          issue: null,
          num_repos: null,
        },
        defaultItem: {
          year: null,
          semester: '',
          name: '',
          department: '',
          id: '',
          enrollment: '',
          github_id: '',
          course_name: '',
          commit: null,
          pr: null,
          issue: null,
          num_repos: null,
        },
      }
    },
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
    methods: {
      async fetchData() {
        try {
          const response = await axios.get('http://localhost/api/account/student_read_db', {
            params: {
              github_id: 'kyne0127'
            }
          });
          this.items = response.data; // 데이터가 객체 배열로 할당되도록 수정
          console.log(response.data); // response.data를 콘솔에 출력
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },
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
        this.fetchData()
      },
    },
    mounted() {
      this.fetchData();
    }
  }
  </script>
  