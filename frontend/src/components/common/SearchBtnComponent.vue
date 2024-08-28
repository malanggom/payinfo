<script>

import eventbus from '@/eventbus/eventbus'

export default {
  emits: ['search'], // 이벤트 정의
  methods: {
    handleRemove: function() { // 화살표 함수가 아닌 일반 함수로 변경
      eventbus.SearchResultEvent.searchDevData(); // 이벤트 호출
    }
  }
};
</script>

<template>
<button class="btn btn-outline-primary" @click="handleRemove">검색</button>
</template>

<style scoped>

</style>