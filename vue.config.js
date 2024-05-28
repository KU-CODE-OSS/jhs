const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      // 필요한 플러그인들을 여기에 추가할 수 있습니다.
    ],
    // define 옵션을 사용하여 컴파일 타임 플래그 설정
    define: {
      '__VUE_OPTIONS_API__': JSON.stringify(true),
      '__VUE_PROD_DEVTOOLS__': JSON.stringify(false),
      '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(false)
    }
  }
})
