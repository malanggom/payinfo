<script setup>
import { ref } from 'vue';

const showModal = ref(false);
const nm = ref(''); // 개발자 이름을 저장할 ref
const ctrt_nmtm = ref(''); // 개발자 이름을 저장할 ref

function openModal() {
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}
</script>

<template>
  <button class="btn btn-primary" @click="openModal">개발자추가</button>
  <div class="modal fade" :class="{ show: showModal }" v-if="showModal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style="display: block;">
    <div class="modal-dialog modal-lg"> <!-- modal-lg 클래스를 사용하여 큰 모달로 설정 -->
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">개발자 추가</h1>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3 d-flex align-items-center">
              <label for="nm" class="form-label">이름</label>
              <input type="text" class="form-control nm-input" id="nm" v-model="nm" placeholder="이름을 입력하세요">
            </div>
            <div class="mb-3 d-flex align-items-center">
              <label for="ctrt_nmtm" class="form-label">계약횟수</label>
              <input type="text" class="form-control nm-input" id="ctrt_nmtm" v-model="ctrt_nmtm">
            </div>
            <div class="mb-3 d-flex align-items-center">
              <label for="nm" class="form-label">프로젝트투입상태</label>
                <div class="btn-group">
                  <button type="button" class="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    25개씩
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">구직중</a></li>
                    <li><a class="dropdown-item" href="#">인터뷰대기</a></li>
                    <li><a class="dropdown-item" href="#">인터뷰중</a></li>
                    <li><a class="dropdown-item" href="#">인터뷰완료</a></li>
                    <li><a class="dropdown-item" href="#">인터뷰합격</a></li>
                    <li><a class="dropdown-item" href="#">프로젝트투입중</a></li>
                    <li><a class="dropdown-item" href="#">프로젝트만료1달전</a></li>
                    <li><a class="dropdown-item" href="#">타사프로젝트중</a></li>
                  </ul>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          <button type="button" class="btn btn-primary">Understood</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 모달 배경 -->
  <div v-if="showModal" class="modal-backdrop fade show"></div>
</template>

<style scoped>
.modal {
  display: block; /* 모달을 보이게 하기 위해 설정 */
}

.modal-dialog{
  max-width: 90%; /* 최대 너비를 화면의 90%로 설정 */
  width: 90%; /* 너비를 90%로 설정 */
  height: auto; /* 높이는 자동으로 설정 */
}

.modal-content{
  height: auto; /* 내용에 맞게 자동으로 설정 */
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

.nm-input{
  width:200px;
}

</style>