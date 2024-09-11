<script setup>
import { ref, onMounted } from 'vue';
import eventbus from '@/eventbus/eventbus';

const buttons = ref([]);

const updateButtonData = (type, filter) => {
  buttons.value.push({ type, filter });
};

const resetButtons = () => {
  buttons.value = [];
};

const removeButton = (index) => {
  const button = buttons.value[index];
  if (button) {
    eventbus.SearchResultEvent.removeFilter(button.type, button.filter); // 필터 제거 이벤트 발생
  }
  buttons.value.splice(index, 1); // 특정 인덱스의 버튼 삭제
};

// 이벤트 리스너 등록
onMounted(() => {
  eventbus.SearchResultEvent.add('filterUpdate', updateButtonData);
  eventbus.SearchResultEvent.add('resetButtons', resetButtons);
});
</script>

<template>
  <div>
    <button v-for="(button, index) in buttons" :key="index" class="btn filterBtn">
      {{ button.type }}: {{ button.filter }}
      <span class="remove-btn" @click.stop="removeButton(index)">X</span>
    </button>
  </div>
</template>

<style scoped>
.filterBtn {
  background-color: white;
  border-radius: 20px;
  margin: 5px;
  border: 1px solid #b4c7dd;
  position: relative; /* 상대 위치로 설정 */
  padding-right: 20px; /* X 버튼 공간 확보 */
}

.remove-btn {
  position: absolute; /* 절대 위치로 설정 */
  right: 5px; /* 오른쪽 여백 */
  top: 50%; /* 수직 중앙 정렬 */
  transform: translateY(-50%); /* 중앙 정렬 보정 */
  cursor: pointer; /* 커서 모양 변경 */
  color: red; /* X 버튼 색상 */
}
</style>