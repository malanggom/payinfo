<script setup>
import {ref, onMounted} from 'vue';
import eventbus from '@/eventbus/eventbus';

const buttons = ref([]);

const updateButtonData = (type, filter) => {
  if (type && filter) {
    buttons.value.push({type, filter});
  }
};

const resetButtons = () => {
  buttons.value = []; // 버튼 목록 초기화
};

// 이벤트 리스너 등록
onMounted(() => {
  eventbus.SearchResultEvent.add('filterUpdate', updateButtonData);
  eventbus.SearchResultEvent.add('resetButtons', resetButtons); // resetButtons 이벤트 리스너 등록
});
</script>

<template>
  <div>
    <button v-for="(button, index) in buttons" :key="index" class="btn filterBtn">
      {{ button.type }}: {{ button.filter }}
    </button>
  </div>
</template>

<style scoped>
.filterBtn {
  background-color: white;
  border-radius: 20px;
  margin: 5px; /* 버튼 사이에 간격 추가 */
  border: 1px solid #b4c7dd;
}
</style>