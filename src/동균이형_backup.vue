<template>
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
        :items="studentList"
        :item-value="id"
        :key="id"
      >
        <template 
          v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
          <tr :key="item.id">
            <td :colspan="columns.length">
              {{ columns.length }}
              <VBtn
                :icon="isGroupOpen(item) ? '$expand' : '$next'"
                size="small"
                variant="plane"
                @click="toggleGroup(item)"
              ></VBtn>
              {{ item.id ? item.id : 'Unknwon' }}
            </td>
          </tr>
        </template>
      </v-data-table>
    </template>
    
    <script>
    import axios from 'axios'
    
    export default {
      data() {
        return {
          map: null,
          search: '',
          groupBy: [
            {
              key: 'id',
              order: 'asc',
            },
    
          ],
          headers: [
            { title: '학번', 
            align: 'start',
            key: 'id' },
            { title: '이름', key: 'name' },
            { title: '학과', key: 'department' },
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
          studentList: [],
        }
      },
      mounted() {
        this.fetchData()
      },
      methods: {
        getId(id) {
          return this.map.get(id)
        },
        async fetchData() {
          try {
            const response = await axios.get(
              'http://119.28.232.108:8000/api/account/student_read_db',
              {
                params: {
                  github_id: 'kyne0127',
                },
              }
            ).then((res) => {
              this.processData(res.data)
          })
            
          } catch (error) {
            console.error('Error fetching data:', error)
          }
        },
        processData(data) {
          let studentList = []
          let map = new Map();
          data.forEach(group => {
            studentList.push({
              key: group.id,
              name: group.name,
              department: group.department,
              id: group.id,
              enrollment: group.enrollment,
              github_id: group.github_id,
              year: group.year,
              semester: group.semester,
              course_name: group.course_name,
              commit: group.total_commit,
              pr: group.total_pr,
              issue: group.total_issue,
              num_repos: group.total_repos 
            })
            map.set(group.id,group.id)
          })
          this.map = map
          this.studentList = studentList
        },
      },
      computed: {
        filteredStudents() {
          const search = this.search.toLowerCase()
          return this.students.filter(student => {
            const group = this.groupInfo[student.id]
            return (
              // 그룹 정보에서 검색 (year, pr 등의 그룹 검색에서 필요없는 것도 일단 남겨둠)
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
              group.num_repos.toString().includes(search) ||
              // 학생 정보에서 검색
              student.name.toLowerCase().includes(search) ||
              student.course_name.toLowerCase().includes(search) ||
              student.year.toString().includes(search) ||
              student.semester.toString().includes(search) ||
              student.commit.toString().includes(search) ||
              student.pr.toString().includes(search) ||
              student.issue.toString().includes(search)
            )
          })
        },
      },
    }
    </script>
    
    <style scoped>
    .search-container {
      display: flex;
      justify-content: flex-end; /* 오른쪽으로 정렬 */
      margin-bottom: 10px;
    }
    
    .search-container .v-text-field {
      max-width: 300px; /* 원하는 크기로 조정 */
    }
    </style>
    