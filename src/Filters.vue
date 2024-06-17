<template>
  <v-expansion-panels class="filter_box">
    <v-expansion-panel  title="연도" prepend-icon="mdi-calendar">
      <!-- <v-expansion-panel-header>
        <v-icon left>mdi-calendar</v-icon>
        연도
      </v-expansion-panel-header> -->
      <v-expansion-panel-text>
        <v-checkbox
          v-model="yearFilters"
          :value="2024"
          label="2024"
          @change="applyFilter"
        ></v-checkbox>
        <v-checkbox
          v-model="yearFilters"
          :value="2023"
          label="2023"
          @change="applyFilter"
        ></v-checkbox>
        <v-checkbox
          v-model="yearFilters"
          :value="2022"
          label="2022"
          @change="applyFilter"
        ></v-checkbox>
        <v-checkbox
          v-model="yearFilters"
          :value="2021"
          label="2021"
          @change="applyFilter"
        ></v-checkbox>
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel title="학과" prepend-icon="mdi-school">
      <!-- <v-expansion-panel-header>
        <v-icon left>mdi-school</v-icon>
        학과
      </v-expansion-panel-header> -->
      <v-expansion-panel-text>
        <v-checkbox
          v-model="departmentFilters"
          :value="'건축사회환경공학부'"
          label="건축사회환경공학부"
          @change="applyFilter"
        ></v-checkbox>
        <v-checkbox
          v-model="departmentFilters"
          :value="'가정교육과'"
          label="가정교육과"
          @change="applyFilter"
        ></v-checkbox>
        <v-checkbox
          v-model="departmentFilters"
          :value="'서어서문학과'"
          label="서어서문학과"
          @change="applyFilter"
        ></v-checkbox>
        <v-checkbox
          v-model="departmentFilters"
          :value="'전기,전자공학부'"
          label="전기,전자공학부"
          @change="applyFilter"
        ></v-checkbox>
        <v-checkbox
          v-model="departmentFilters"
          :value="'스마트보안학부'"
          label="스마트보안학부"
          @change="applyFilter"
        ></v-checkbox>
        <v-checkbox
          v-model="departmentFilters"
          :value="'컴퓨터학과'"
          label="컴퓨터학과"
          @change="applyFilter"
        ></v-checkbox>
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel title="과목" prepend-icon="mdi-school">
      <v-expansion-panel-text>
        <v-checkbox
          v-model="courseFilters"
          :value="'운영체제'"
          label="운영체제"
          @change="applyFilter"
        ></v-checkbox>
        <v-checkbox
          v-model="courseFilters"
          :value="'산학캡스톤디자인'"
          label="산학캡스톤디자인"
          @change="applyFilter"
        ></v-checkbox>
        <v-checkbox
          v-model="courseFilters"
          :value="'기타'"
          label="기타"
          @change="applyFilter"
        ></v-checkbox>
      </v-expansion-panel-text>
    </v-expansion-panel>
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
    };
  },
  methods: {
    applyFilter() {
      let filtered = this.students;

      if (this.yearFilters.length > 0) {
        filtered = filtered.filter(student => this.yearFilters.includes(student.year));
      }

      if (this.departmentFilters.length > 0) {
        filtered = filtered.filter(student => this.departmentFilters.includes(student.department));
      }

      if (this.courseFilters.length > 0) {
        filtered = filtered.filter(student => this.courseFilters.includes(student.course_name));
      }

      this.$emit('update:filteredStudents', filtered);
    },
  },
  watch: {
    students: {
      handler(newStudents) {
        this.applyFilter();
      },
      deep: true,
    },
  },
  created() {
    this.applyFilter();
  },
};
</script>


<style scoped>
.filter_box {
  max-width: 400px;
  margin: 0 auto;
}
</style>
