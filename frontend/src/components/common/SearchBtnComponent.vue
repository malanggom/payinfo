<script>

import eventbus from '@/eventbus/eventbus'

export default {
  emits: ['search'], // 이벤트 정의
  methods: {
    handleRemove: function() { // 화살표 함수가 아닌 일반 함수로 변경
      eventbus.SearchResultEvent.fetchData(); // 이벤트 호출
      console.log("검색");
    }
  }
};
</script>

<template>
<button class="btn searchBtnStyle" @click="handleRemove">검색</button>
</template>

<style scoped>
.searchBtnStyle{
  background-color: #b4c7dd;
  border-radius: 20px;
  width: 70px;
}

</style>