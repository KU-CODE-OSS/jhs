<template>
  <div>
    <v-row>
      <v-col cols="10"> </v-col>
      <v-col cols="0">
        <filters
          class="filter-container"
          :students="students"
          @update:filteredStudents="updateFilteredStudents"
        ></filters>
      </v-col>
    </v-row>

    <v-toolbar flat color="white">
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
      <v-btn color="primary" dark class="mb-2" @click="importFile" prepend-icon="mdi-import">Import</v-btn>
      <v-btn color="primary" dark class="mb-2" @click="dialog = true" prepend-icon="mdi-plus">New Item</v-btn>
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
                  label="연도"
                ></v-text-field>
              </v-col>
              <v-col xs="12" sm="12" md="6">
                <v-text-field
                  v-model="editedItem.semester"
                  label="학기"
                ></v-text-field>
              </v-col>
              <v-col xs="12" sm="12" md="6">
                <v-text-field
                  v-model="editedItem.name"
                  label="과목명"
                ></v-text-field>
              </v-col>
              <v-col xs="12" sm="12" md="6">
                <v-text-field
                  v-model="editedItem.course_id"
                  label="학수번호"
                ></v-text-field>
              </v-col>
              <v-col xs="12" sm="12" md="6">
                <v-text-field
                  v-model="editedItem.prof"
                  label="교수"
                ></v-text-field>
              </v-col>
              <v-col xs="12" sm="12" md="6">
                <v-text-field
                  v-model="editedItem.ta"
                  label="조교"
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
      :items="filteredStudentsBySearch"
      class="elevation-1"
      :loading="loading"
    >
      <template v-slot:items="props">
        <td>{{ props.item.year }}</td>
        <td>{{ props.item.semester }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.course_id }}</td>
        <td>{{ props.item.prof }}</td>
        <td>{{ props.item.ta }}</td>
        <td>{{ props.item.student_count }}</td>
        <td>{{ props.item.total_commits }}</td>
        <td>{{ props.item.avg_commits }}</td>
        <td>{{ props.item.repository_count }}</td>
        <td>{{ props.item.contributor_count }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="reset">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios';
import Filters from './table_major_filters.vue';

export default {
  components: {
    Filters,
  },
  data() {
    return {
      loading: true,
      search: '',
      dialog: false,
      headers: [
        { align: 'center', title: '연도', key: 'year' },
        { align: 'center', title: '학기', key: 'semester' },
        { align: 'center', title: '과목명', key: 'name' },
        { align: 'center', title: '학수번호', key: 'course_id' },
        { align: 'center', title: '교수', key: 'prof' },
        { align: 'center', title: '조교', key: 'ta' },
        { align: 'center', title: '학생 수', key: 'student_count' },
        { align: 'center', title: '총 Commit 수', key: 'total_commits' },
        { align: 'center', title: '평균 Commit 수', key: 'avg_commits' },
        { align: 'center', title: 'Repo 수', key: 'repository_count' },
        { align: 'center', title: '기여자 수', key: 'contributor_count' },
      ],
      items: [],
      students: [],
      filteredStudents: [],
      editedIndex: -1,
      editedItem: {
        year: null,
        semester: '',
        name: '',
        course_id: '',
        prof: '',
        ta: '',
        student_count: '',
        total_commits: '',
        avg_commits: null,
        repository_count: null,
        contributor_count: null,
      },
      defaultItem: {
        year: null,
        semester: '',
        name: '',
        course_id: '',
        prof: '',
        ta: '',
        student_count: '',
        total_commits: '',
        avg_commits: null,
        repository_count: null,
        contributor_count: null,
      },
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
    filteredStudentsBySearch() {
      const search = this.search.toLowerCase();
      return this.filteredStudents.filter(student => {
        return (
          student.year.toString().includes(search) ||
          student.semester.toLowerCase().includes(search) ||
          student.name.toLowerCase().includes(search) ||
          student.course_id.toLowerCase().includes(search) ||
          student.prof.toLowerCase().includes(search) ||
          student.ta.toLowerCase().includes(search) ||
          student.student_count.toString().includes(search) ||
          student.total_commits.toString().includes(search) ||
          student.avg_commits.toString().includes(search) ||
          student.repository_count.toString().includes(search) ||
          student.contributor_count.toString().includes(search)
        );
      });
    },
  },
  methods: {
    async importFile() {
      try {
        const file = await this.selectFile();
        if (file) {
          console.log("Selected file:", file);
          await this.uploadFile(file);
        }
      } catch (error) {
        console.error('Error importing file:', error);
      }
    },
    selectFile() {
      return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.xlsx, .xls, .csv';
        input.onchange = (e) => {
          const file = e.target.files[0];
          resolve(file);
        };
        input.click();
      });
    },
    async uploadFile(file) {
      const formData = new FormData();
      formData.append('file', file);

      console.log("Uploading file:", file);
      
      try {
        const response = await axios.post('http://localhost/api/account/student_excel_import', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('File imported successfully:', response);
      } catch (error) {
        console.error('Error importing file:', error);
      }
    },
    async fetchData() {
      try {
        this.loading = true;
        const response = await axios.get('http://localhost/api/course/course_read_db');
        console.log('API Response:', response.data); // 응답 데이터 로그 출력
        this.items = response.data; // 응답 데이터를 직접 items에 할당
        this.students = response.data; // students에 할당
        this.filteredStudents = response.data; // 필터링된 students에 할당
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },
    updateFilteredStudents(filtered) {
      this.filteredStudents = filtered;
    },
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.items.indexOf(item);
      if (confirm('Are you sure you want to delete this item?')) {
        this.items.splice(index, 1);
      }
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
      } else {
        this.items.push(this.editedItem);
      }
      this.close();
    },
    reset() {
      this.items = [];
      this.fetchData();
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.filter-container {
  /* Custom styles for the filter container */
}

.search-container > div {
  flex-direction: row-reverse;
  align-items: right;
  width: 200px !important;
}

.search-container .v-text-field {
  max-width: 300px;
}
</style>
