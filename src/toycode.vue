<template>
  <v-card title="Nutrition" flat>
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </template>

    <v-data-table
      :headers="headers"
      :items="repo"
      :search="search"
      :loading="loading"
    ></v-data-table>
  </v-card>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        loading: true,
        search: '',
        headers: [
          {
            align: 'start',
            key: 'name',
            sortable: false,
            title: '레포지토리',
          },
          { key: 'star_count', title: '스타 수' },
          { key: 'fork_count', title: '포크 수' },
          { key: 'commit_count', title: '커밋 수' },
          { key: 'pr_count', title: 'PR 수' },
          { key: 'total_issue_count', title: '이슈 수' },
          { key: 'language', title: '언어' },
          { key: 'contributors', title: '기여자 수' },
        ],
        repo: [],
      }
    },
    created() {
      this.fetchRepo()
    },
    methods: {
      async fetchRepo() {
        try {
          this.loading = true
          const response = await axios.get(
            'http://localhost/api/repo/repo_course_read_db'
          )
          this.processTotal(response.data)
          console.log('Total Data:', response.data)
        } catch (error) {
          console.error('Error fetching data:', error)
        } finally {
          this.loading = false
        }
      },
      processTotal(data) {
        const repoInfo = {}

        data.forEach(repoItem => {
          console.log('repo Item:', repoItem.name)
          repoInfo[repoItem.id] = {
            name: repoItem.name,
            star_count: repoItem.star_count,
            fork_count: repoItem.fork_count,
            commit_count: repoItem.commit_count,
            pr_count: repoItem.pr_count,
            total_issue_count: repoItem.total_issue_count,
            language: repoItem.language,
            contributors: repoItem.contributors,
          }
        })

        console.log('repo Info:', repoInfo)
        this.repo = Object.values(repoInfo)
      },
    },
  }
</script>
