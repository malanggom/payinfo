<script>

import eventbus from '@/eventbus/eventbus'

export default {
  props: {
    searchName: String, // ✅ props로 searchName을 받음
  },
  emits: ['searchName'], // 이벤트 정의
  methods: {
    handleRemove: function() {
      eventbus.SearchResultEvent.fetchData('searchName', this.searchName);
      console.log("검색:", this.searchName);
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