<template>
  <button class="btn filterResetBtn" @click="handleRemove">↻ 초기화</button>
</template>
<script>
import eventbus from '@/eventbus/eventbus'
export default {
  emits: ['reset'], // 이벤트 정의
  methods: {
    handleRemove: function() { // 화살표 함수가 아닌 일반 함수로 변경
      eventbus.SearchResultEvent.resetFilter(); // 이벤트 호출
    }
  }
};
</script>
<style scoped>
  .filterResetBtn:active{
    border: none;
  }
</style>