<template>
  <div>
    <div class="filter-container">
      <filters
        :students="students"
        @update:filteredStudents="updateFilteredStudents"
      ></filters>
    </div>
    
    <div class="search-container">
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </div>

    <v-data-table
      :group-by="groupBy"
      :headers="headers"
      :items="filteredStudentsBySearch"
      item-value="uniqueKey"
      :loading="loading"
    >
      <template v-slot:group-header="{ item, toggleGroup, isGroupOpen }">
        <tr>
          <td>
            <v-btn
              :icon="isGroupOpen(item) ? '$expand' : '$next'"
              size="small"
              variant="text"
              @click="toggleGroup(item)"
            ></v-btn>
          </td>
          <td>{{ groupInfo[item.value]?.name }}</td>
          <td>{{ groupInfo[item.value]?.department }}</td>
          <td>{{ groupInfo[item.value]?.id }}</td>
          <td>{{ groupInfo[item.value]?.enrollment }}</td>
          <td>{{ groupInfo[item.value]?.github_id }}</td>
          <td>{{ groupInfo[item.value]?.year }}</td>
          <td>{{ groupInfo[item.value]?.semester }}</td>
          <td>{{ groupInfo[item.value]?.course_name }}</td>
          <td>{{ groupInfo[item.value]?.commit }}</td>
          <td>{{ groupInfo[item.value]?.pr }}</td>
          <td>{{ groupInfo[item.value]?.issue }}</td>
          <td>{{ groupInfo[item.value]?.num_repos }}</td>
        </tr>
      </template>
      <template v-slot:item="{ item }">
        <tr>
          <td></td> <!-- 그룹 -->
          <td></td> <!-- 이름 -->
          <td></td> <!-- 학과 -->
          <td></td> <!-- 학번 -->
          <td></td> <!-- 재학상태 -->
          <td></td> <!-- GitHub ID -->
          <td>{{ item.year }}</td>
          <td>{{ item.semester }}</td>
          <td>{{ item.course_name }}</td>
          <td>{{ item.commit }}</td>
          <td>{{ item.pr }}</td>
          <td>{{ item.issue }}</td>
          <td>{{ item.num_repos }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios';
import Filters from './Filters.vue';

export default {
  components: {
    Filters,
  },
  data() {
    return {
      loading: true,
      search: '',
      groupBy: [
        {
          key: 'id',
          order: 'asc',
        },
      ],
      headers: [
        { title: '이름', key: 'name' },
        { title: '학과', key: 'department' },
        { title: '학번', key: 'id' },
        { title: '재학상태', key: 'enrollment' },
        { title: 'GitHub ID', key: 'github_id' },
        { title: '연도', key: 'year' },
        { title: '학기', key: 'semester' },
        { title: '과목명', key: 'course_name' },
        { title: 'Commit 수', key: 'commit' },
        { title: 'PR 수', key: 'pr' },
        { title: 'Issue 수', key: 'issue' },
        { title: 'Repo 수', key: 'num_repos' },
      ],
      students: [],
      groupInfo: {},
      uniqueKeyCounter: 0,
      filteredStudents: [],
    };
  },
  created() {
    this.fetchTotal();
    this.fetchCourse();
  },
  methods: {
    async fetchTotal() {
      try {
        this.loading = true;
        const response = await axios.get('http://localhost/api/account/student_read_total');
        this.processTotal(response.data);
        console.log('Total Data:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },
    processTotal(data) {
      const groupInfo = {};

      data.forEach(groupItem => {
        console.log('Group Item:', groupItem.name);
        groupInfo[groupItem.id] = {
          name: groupItem.name,
          department: groupItem.department,
          id: groupItem.id,
          enrollment: groupItem.enrollment,
          github_id: groupItem.github_id,
          year: groupItem.year,
          semester: groupItem.semester,
          course_name: groupItem.course_name,
          commit: groupItem.total_commit,
          pr: groupItem.total_pr,
          issue: groupItem.total_issue,
          num_repos: groupItem.total_repos,
          students: [],
        };
      });

      console.log('Group Info:', groupInfo);
      this.groupInfo = groupInfo;
    },
    async fetchCourse() {
      try {
        const response = await axios.get('http://localhost/api/account/student_read_course_info');
        this.processCourse(response.data);
        console.log('Course Data:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    processCourse(data) {
      const students = [];

      data.forEach(student => {
        const uniqueKey = `item_${student.id}_${this.uniqueKeyCounter++}`;
        if (this.groupInfo[student.id]) {
          this.groupInfo[student.id].students.push({
            uniqueKey,
            ...student,
          });
        }
        students.push({
          uniqueKey,
          ...student,
        });
      });

      console.log('Updated Group Info:', this.groupInfo);
      console.log('Students:', students);
      this.students = students;
      this.filteredStudents = students; // Apply initial filter state
    },
    updateFilteredStudents(filtered) {
      this.filteredStudents = filtered;
    },
  },
  computed: {
    filteredStudentsBySearch() {
      const search = this.search.toLowerCase();
      return this.filteredStudents.filter(student => {
        const group = this.groupInfo[student.id] || {};
        return (
          (group.year && group.year.toString().includes(search)) ||
          (group.semester && group.semester.toString().includes(search)) ||
          (group.name && group.name.toLowerCase().includes(search)) ||
          (group.department && group.department.toLowerCase().includes(search)) ||
          (group.id && group.id.toLowerCase().includes(search)) ||
          (group.enrollment && group.enrollment.toLowerCase().includes(search)) ||
          (group.github_id && group.github_id.toLowerCase().includes(search)) ||
          (group.course_name && group.course_name.toLowerCase().includes(search)) ||
          (group.commit && group.commit.toString().includes(search)) ||
          (group.pr && group.pr.toString().includes(search)) ||
          (group.issue && group.issue.toString().includes(search)) ||
          (group.num_repos && group.num_repos.toString().includes(search)) ||
          student.name.toLowerCase().includes(search) ||
          student.course_name.toLowerCase().includes(search) ||
          student.year.toString().includes(search) ||
          student.semester.toString().includes(search) ||
          student.commit.toString().includes(search) ||
          student.pr.toString().includes(search) ||
          student.issue.toString().includes(search)
        );
      });
    },
  },
};
</script>

<style scoped>
.filter-container {
  margin-bottom: 10px;
}

.search-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.search-container .v-text-field {
  max-width: 300px;
}
</style>
  