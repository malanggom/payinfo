<script>

import eventbus from '@/eventbus/eventbus'

export default {
  props: {
    searchName: String, // ✅ props로 searchName을 받음
  },
  emits: ['searchName'], // 이벤트 정의
  methods: {
    handleRemove: function() {

      // 2. SearchResultEvent.fetchData() 호출
      eventbus.SearchResultEvent.fetchData('searchName', this.searchName);
      console.log("데이터 가져오기 실행");
// 1. SearchPjHistoryResultEvent.dispatch() 사용
//       eventbus.SearchPjHistoryResultEvent.fetchData("search", { name: this.searchName });
//       console.log("검색 이름 전송:", this.searchName);
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
  height: 40px;
}

</style>