<template>
  <v-expansion-panels class="filter_box">
    <v-col cols="10">
      <v-combobox
        v-model="yearFilters"
        :items="[2024, 2023, 2022, 2021]"
        label="연도"
        @update:modelValue="applyFilter"
        chips
        multiple
        prepend-icon="mdi-calendar"
      ></v-combobox>
    </v-col>
    <v-col cols="10">
      <v-combobox
        v-model="departmentFilters"
        :items="['건축사회환경공학부', '가정교육과', '서어서문학과', '전기전자공학부', '스마트보안학부', '컴퓨터학과']"
        label="학과"
        @update:modelValue="applyFilter"
        chips
        multiple
        prepend-icon="mdi-school"
      ></v-combobox>
    </v-col>
    <v-col cols="10">
      <v-combobox
        v-model="courseFilters"
        :items="['운영체제', '산학캡스톤디자인', '기타']"
        label="과목"
        @update:modelValue="applyFilter"
        chips
        multiple
        prepend-icon="mdi-book-education-outline"
      ></v-combobox>
    </v-col>
  </v-expansion-panels>
</template>

<script>
export default {
  props: {
    students: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      yearFilters: [],
      departmentFilters: [],
      courseFilters: [],
    }
  },
  methods: {
    applyFilter() {
      let filtered = this.students

      if (this.yearFilters.length > 0) {
        filtered = filtered.filter(student =>
          this.yearFilters.includes(student.year)
        )
      }

      if (this.departmentFilters.length > 0) {
        filtered = filtered.filter(student =>
          this.departmentFilters.includes(student.department)
        )
      }

      if (this.courseFilters.length > 0) {
        filtered = filtered.filter(student =>
          this.courseFilters.includes(student.course_name)
        )
      }

      this.$emit('update:filteredStudents', filtered)
    },
  },
  watch: {
    students: {
      handler(newStudents) {
        this.applyFilter()
      },
      deep: true,
    },
  },
  created() {
    this.applyFilter()
  },
}
</script>

<style scoped>
.filter_box {
  max-width: 400px;
  margin: 0 auto;
}
</style>
