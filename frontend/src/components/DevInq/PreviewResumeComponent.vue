<template>
  <div class="modal fade" :class="{ show: showModal }" v-if="showModal" tabindex="-1"
       aria-labelledby="resumePreviewLabel" aria-hidden="false">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-sm custom-modal">
      <div class="modal-content">
        <div class="modal-header d-flex align-items-center">
          <div class="flex-grow-1 text-center">
            <h1 class="modal-title fs-4" id="resumePreviewLabel">기술경력서 미리보기</h1>
          </div>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body d-flex flex-column">
          <iframe v-if="resumeUrl" :src="resumeUrl" style="width: 100%; height: 400px;" frameborder="0"></iframe>
          <p v-else>미리보기 할 이력서가 없습니다.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- 모달 배경 -->
  <div v-if="showModal" class="modal-backdrop fade show"></div>
</template>

<script setup>
import { ref } from 'vue';

// 모달 상태 관리
const showModal = ref(false);

const closeModal = () => {
  showModal.value = false; // 모달 닫기
};
</script>

<style scoped>
/* 필요에 따라 스타일 추가 */
</style>