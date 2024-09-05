<template>
  <button class="btn devDelBtnStyle" @click="handleRemove">삭제</button>
</template>

<script>

import eventbus from '@/eventbus/eventbus'

export default {
  emits: ['remove'], // 이벤트 정의
  methods: {
    handleRemove: function() { // 화살표 함수가 아닌 일반 함수로 변경
      eventbus.SearchResultEvent.deleteRowBtnClick(); // 이벤트 호출
    }
  }
};
</script>

<style scoped>
/* 스타일 추가 */
.devDelBtnStyle{
  background-color: #57687c;
  color: #c9d6df;
  border-radius: 20px;
  width: 70px;
}
</style>