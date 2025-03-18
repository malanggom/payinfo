<template>
  <div class="modal fade" :class="{ show: showModal }" v-if="showModal" tabindex="-1"
       aria-labelledby="resumePreviewLabel" aria-hidden="false">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable custom-modal">
      <div class="modal-content">
        <div class="modal-header d-flex align-items-center">
          <div class="flex-grow-1 text-center">
            <h1 class="modal-title fs-4" id="resumePreviewLabel">기술경력서 미리보기</h1>
          </div>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body d-flex flex-column" ref="modalBody">
          <form class="form d-flex flex-column flex-grow-1" autocomplete='off'>
            <div class="b-line pt-4 pb-4 flex-column d-flex justify-content-center">
              <div class="d-flex justify-content-center">c
                <div class="col-10 d-flex align-items-center form-status-bg">
                  <div class="d-flex justify-content-between form-control form-status toggleTextWrap">
                    <iframe v-if="resumeUrl" :src="resumeUrl"></iframe>
                    <p v-else>미리보기 할 이력서가 없습니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showModal" class="modal-backdrop fade show"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import eventbus from '@/eventbus/eventbus';

const showModal = ref(false);
const resumeUrl = ref(null);

const closeModal = () => {
  showModal.value = false; // 모달 닫기
};

const openModalPreviewResume = (url) => {
  resumeUrl.value = url;
  showModal.value = true; // 모달 열기
};

onMounted(async () => {
  eventbus.SearchResultEvent.add('openModalPreviewResume', openModalPreviewResume);
});
</script>

<style scoped>
.custom-modal {
  max-width: 600px; /* 최대 너비 설정 */
  width: 100%; /* 너비를 100%로 설정 */
  background-color: white; /* 배경 색상 설정 */
}

.modal-content {
  display: flex;
  flex-direction: column; /* 세로 방향으로 요소 배치 */
  height: 100%; /* 모달 높이 설정 */
}

.form {
  height: auto;
}

.b-line {
  border-bottom: lightgray 1px solid;
}

.modal {
  display: block; /* 모달을 보이게 하기 위해 설정 */
}

.modal-dialog {
  max-width: 90%; /* 최대 너비를 화면의 90%로 설정 */
  width: 90%; /* 너비를 90%로 설정 */
  height: 90%; /* 높이는 자동으로 설정 */
}

.modal-content {
  display: flex;
  flex-direction: column; /* 세로 방향으로 요소 배치 */
  height: 100%; /* 모달 높이 설정 */
}

.modal-body {
  flex-grow: 1; /* 몸체가 남은 공간을 차지하도록 설정 */
  overflow-y: auto; /* 내용이 많을 경우 스크롤 가능 */
  overflow-x: hidden; /* 수평 스크롤 숨김 */
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0px;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 배경을 어둡게 */
  z-index: 1040; /* 모달보다 위에 위치하도록 설정 */
}

.modal-header {
  border-bottom: 1px solid dimgray; /* 두께와 색상을 설정 */
}

.custom-modal {
  max-width: 600px;
}

.form-status {
  border-radius: 25px;
  border: 1px solid dimgray;
  height: 50px;
  align-items: center;
}

/* caret 화살표를 오른쪽으로 정렬 */
.dropdown-toggle .caret {
  margin-left: auto; /* 왼쪽 여백 자동으로 설정하여 오른쪽 정렬 */
}

.toggleTextWrap{
  border: 1px solid dimgray;
}

.toggleTextEmptySpace{
  width: 122px;
}
</style>