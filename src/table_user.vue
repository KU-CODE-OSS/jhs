<template>
  <v-text-field
    v-model="search"
    label="Search"
    prepend-inner-icon="mdi-magnify"
    variant="outlined"
    hide-details
    single-line
  ></v-text-field>
  <v-data-table
    :group-by="groupBy"
    :headers="headers"
    :items="filteredStudents"
    item-value="name"
  >
    <template v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
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
        <td></td>
        <td></td>
        <td>{{ item.department }}</td>
        <td>{{ item.id }}</td>
        <td>{{ item.enrollment }}</td>
        <td>{{ item.github_id }}</td>
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
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        search: '',
        groupBy: [
          {
            key: 'name',
            order: 'asc',
          },
        ],
        headers: [
          { title: 'Name', key: 'name' },
          { title: 'Department', key: 'department' },
          { title: 'ID', key: 'id' },
          { title: 'Enrollment', key: 'enrollment' },
          { title: 'Github_id', key: 'github_id' },
          { title: 'Year', key: 'year' },
          { title: 'Semester', key: 'semester' },
          { title: 'Course_name', key: 'course_name' },
          { title: 'Commit', key: 'commit' },
          { title: 'PR', key: 'pr' },
          { title: 'Issue', key: 'issue' },
          { title: 'Num_repos', key: 'num_repos' },
        ],
        students: [],
        groupInfo: {},
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        try {
          const response = await axios.get(
            'http://localhost/api/account/student_read_db',
            {
              params: {
                github_id: 'kyne0127',
              },
            }
          )
          this.processData(response.data) // 데이터를 처리하도록 수정
          console.log(response.data) // response.data를 콘솔에 출력
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      },
      processData(data) {
        const groupInfo = {}
        const students = []

        data.forEach(group => {
          const [groupItem, ...studentItems] = group

          groupInfo[groupItem.name] = {
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
            num_repos: groupItem.total_repo,
          }

          studentItems.forEach(student => {
            students.push({
              name: student.name,
              year: student.year,
              semester: student.semester,
              department: student.department,
              id: student.id,
              enrollment: student.enrollment,
              github_id: student.github_id,
              course_name: student.course_name,
              commit: student.commit,
              pr: student.pr,
              issue: student.issue,
              num_repos: student.num_repos,
            })
          })
        })

        this.groupInfo = groupInfo
        this.students = students
      },
    },
    computed: {
      filteredStudents() {
        const search = this.search.toLowerCase()
        return this.students.filter(student => {
          const group = this.groupInfo[student.name]
          return (
            student.name.toLowerCase().includes(search) ||
            (group.year && group.year.toString().includes(search)) ||
            (group.semester && group.semester.toString().includes(search)) ||
            group.name.toLowerCase().includes(search) ||
            group.department.toLowerCase().includes(search) ||
            group.id.toLowerCase().includes(search) ||
            group.enrollment.toLowerCase().includes(search) ||
            group.github_id.toLowerCase().includes(search) ||
            (group.course_name &&
              group.course_name.toLowerCase().includes(search)) ||
            group.commit.toString().includes(search) ||
            group.pr.toString().includes(search) ||
            group.issue.toString().includes(search) ||
            group.num_repos.toString().includes(search)
          )
        })
      },
    },
  }
</script>
