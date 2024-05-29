<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>전공과목</v-toolbar-title>
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
                  label="Course Name"
                ></v-text-field>
              </v-col>
              <v-col xs="12" sm="12" md="6">
                <v-text-field
                  v-model="editedItem.course_id"
                  label="Course ID"
                ></v-text-field>
              </v-col>
              <v-col xs="12" sm="12" md="6">
                <v-text-field
                  v-model="editedItem.prof"
                  label="Professor"
                ></v-text-field>
              </v-col>
              <v-col xs="12" sm="12" md="6">
                <v-text-field
                  v-model="editedItem.ta"
                  label="TA"
                ></v-text-field>
              </v-col>
              <v-col xs="12" sm="12" md="6">
                <v-text-field
                  v-model="editedItem.student_count"
                  label="Student Count"
                ></v-text-field>
              </v-col>
              <v-col xs="12" sm="12" md="6">
                <v-text-field
                  v-model="editedItem.total_commits"
                  label="Total Commits"
                ></v-text-field>
              </v-col>
              <v-col xs="12" sm="12" md="6">
                <v-text-field
                  v-model="editedItem.avg_commits"
                  label="Avg Commits"
                ></v-text-field>
              </v-col>
              <v-col xs="12" sm="12" md="6">
                <v-text-field
                  v-model="editedItem.repository_count"
                  label="Repository Count"
                ></v-text-field>
              </v-col>
              <v-col xs="12" sm="12" md="6">
                <v-text-field
                  v-model="editedItem.contributor_count"
                  label="Contributor Count"
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

export default {
  data() {
    return {
      search: '',
      dialog: false,
      headers: [
        { title: 'Year', key: 'year' },
        { title: 'Semester', key: 'semester' },
        { title: 'Course Name', key: 'name' },
        { title: 'Course ID', key: 'course_id' },
        { title: 'Professor', key: 'prof' },
        { title: 'TA', key: 'ta' },
        { title: 'Student Count', key: 'student_count' },
        { title: 'Total Commits', key: 'total_commits' },
        { title: 'Avg Commits', key: 'avg_commits' },
        { title: 'Repository Count', key: 'repository_count' },
        { title: 'Contributor Count', key: 'contributor_count' },
      ],
      items: [],
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
        const response = await axios.get('http://localhost/api/course/course_read_db', {
          params: {
            course_id: 'COSE341-01',
            year: 2024,
            semester: 1,
          },
        });
        this.items = [response.data];
      } catch (error) {
        console.error('Error fetching data:', error);
      }
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
}
</script>
