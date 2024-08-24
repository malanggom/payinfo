<template>
  <button @click="handleRemove">Remove Selected</button>
</template>

<script>
export default {
  emits: ['remove'], // 이벤트 정의
  methods: {
    handleRemove() {
      this.$emit('remove'); // 이벤트 발생
    }
  }
};
</script>

<style scoped>
/* 스타일 추가 */
</style>