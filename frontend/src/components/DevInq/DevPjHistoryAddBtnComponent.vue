<template>
  <div class="modal fade" :class="{ show: showModal }" v-if="showModal" tabindex="-1"
       aria-labelledby="staticBackdropLabel" aria-hidden="false" style="display: block;">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
      <!-- modal-lg 클래스를 사용하여 큰 모달로 설정 --><!-- Vertically centered scrollable modal -->
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-4" id="staticBackdropLabel">개발자 프로젝트 히스토리 추가</h1>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm" class="row g-3">
            <div class="b_line pb-3">
              <div class="d-flex align-items-start">
                <label class="col-form-label fs-5">프로젝트정보</label>
              </div>
              <div class="d-flex row align-items-center">
                <div class="col-auto d-flex align-items-center p-3">
                  <label for="devPjPrgrsStts" class="pr-1 col-form-label">프로젝트지원상태</label>
                  <div class="col-auto dropdown">
                    <button id="devPjPrgrsStts" class="btn btn-outline-primary dropdown-toggle" type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                      {{ selectedDevPjPrgrsStts }}
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <button class="dropdown-item" type="button" @click="selectDevPjPrgrsStts('서류접수')">서류접수</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button" @click="selectDevPjPrgrsStts('서류합격')">서류합격</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button" @click="selectDevPjPrgrsStts('인터뷰대기')">인터뷰대기
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button" @click="selectDevPjPrgrsStts('인터뷰중')">인터뷰중</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button" @click="selectDevPjPrgrsStts('인터뷰합격')">인터뷰합격
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button" @click="selectDevPjPrgrsStts('프로젝트투입중')">프로젝트투입중
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button" @click="selectDevPjPrgrsStts('프로젝트만료1달전')">
                          프로젝트만료1달전
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button" @click="selectDevPjPrgrsStts('타사프로젝트중')">타사프로젝트중
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-auto d-flex align-items-center p-3">
                  <label for="devPjPrgrsDt" class="pr-1 col-form-label">프로젝트지원날짜</label>
                  <div class="col-auto">
                    <input type="text" id="devPjPrgrsDt" class="div_width100 form-control"
                           aria-describedby="passwordHelpInline" v-model="formData.DEV_PJ_PRGRS_DT">
                  </div>
                </div>
                <div class="col-auto d-flex align-items-center p-3">
                  <label for="devPjBgngDt" class="pr-1 col-form-label">프로젝트시작일자</label>
                  <div class="col-auto">
                    <input type="text" id="devPjBgngDt" class="div_width100 form-control"
                           aria-describedby="passwordHelpInline" v-model="formData.DEV_PJ_BGNG_DT">
                  </div>
                </div>
                <div class="col-auto d-flex align-items-center p-3">
                  <label for="devPjEndDt" class="pr-1 col-form-label">프로젝트종료일자</label>
                  <div class="col-auto">
                    <input type="text" id="devPjEndDt" class="div_width100 form-control"
                           aria-describedby="passwordHelpInline" v-model="formData.DEV_PJ_END_DT">
                  </div>
                </div>
                <div class="col-auto d-flex align-items-center p-3">
                  <label for="custNm" class="pr-1 col-form-label">고객사명</label>
                  <div class="col-auto">
                    <input type="text" id="custNm" class="div_width100 form-control"
                           aria-describedby="passwordHelpInline" v-model="formData.CUST_NM">
                  </div>
                </div>
                <div class="col-auto d-flex align-items-center p-3">
                  <label for="subgcNm" class="pr-1 col-form-label">수행사명</label>
                  <div class="col-auto">
                    <input type="text" id="subgcNm" class="div_width100 form-control"
                           aria-describedby="passwordHelpInline" v-model="formData.SUBGC_NM">
                  </div>
                </div>
                <div class="col-auto d-flex align-items-center p-3">
                  <label for="ctrtCoNm" class="pr-1 col-form-label">계약회사명</label>
                  <div class="col-auto">
                    <input type="text" id="ctrtCoNm" class="div_width100 form-control"
                           aria-describedby="passwordHelpInline" v-model="formData.CTRT_CO_NM">
                  </div>
                </div>
                <div class="col-auto d-flex align-items-center p-3">
                  <label for="sbcnNm" class="pr-1 col-form-label">하청업체명</label>
                  <div class="col-auto">
                    <input type="text" id="sbcnNm" class="div_width100 form-control"
                           aria-describedby="passwordHelpInline" v-model="formData.SBCN_NM">
                  </div>
                </div>
                <div class="col-auto d-flex align-items-center p-3">
                  <label for="pjPlc" class="pr-1 col-form-label">프로젝트장소</label>
                  <div class="col-auto">
                    <input type="text" id="pjPlc" class="div_width100 form-control"
                           aria-describedby="passwordHelpInline" v-model="formData.PJ_PLC">
                  </div>
                </div>
                <div class="b_line pb-3">
                  <div class="d-flex align-items-start">
                    <label class="col-form-label fs-5">프로젝트투입정보</label>
                  </div>
                  <div class="d-flex row align-items-center">
                    <div class="row align-items-center">
                      <div class="col-auto d-flex align-items-center p-3">
                        <label for="devPjInpGrd" class="pr-1 col-form-label">프로젝트투입등급</label>
                        <div class="col-auto dropdown">
                          <button id="devPjInpGrd" class="btn btn-outline-primary dropdown-toggle" type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false">
                            {{ selectedDevPjInpGrd }}
                          </button>
                          <ul class="dropdown-menu">
                            <li>
                              <button class="dropdown-item" type="button" @click="selectDevPjInpGrd('N/A')">N/A</button>
                            </li>
                            <li>
                              <button class="dropdown-item" type="button" @click="selectDevPjInpGrd('초급')">초급</button>
                            </li>
                            <li>
                              <button class="dropdown-item" type="button" @click="selectDevPjInpGrd('초상급')">초상급</button>
                            </li>
                            <li>
                              <button class="dropdown-item" type="button" @click="selectDevPjInpGrd('중급')">중급</button>
                            </li>
                            <li>
                              <button class="dropdown-item" type="button" @click="selectDevPjInpGrd('중상급')">중상급</button>
                            </li>
                            <li>
                              <button class="dropdown-item" type="button" @click="selectDevPjInpGrd('고급')">고급</button>
                            </li>
                            <li>
                              <button class="dropdown-item" type="button" @click="selectDevPjInpGrd('특급')">특급</button>
                            </li>
                          </ul>
                        </div>
                        <!--      직책      -->
                        <div class="col-auto d-flex align-items-center p-3">
                          <label for="jbttl" class="pr-1 col-form-label">직책</label>
                          <div class="col-auto dropdown">
                            <button id="jbttl" class="btn btn-outline-primary dropdown-toggle" type="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                              {{ selectedJbttl }}
                            </button>
                            <ul class="dropdown-menu">
                              <li>
                                <button class="dropdown-item" type="button" @click="selectJbttl('N/A')">N/A</button>
                              </li>
                              <li>
                                <button class="dropdown-item" type="button" @click="selectJbttl('PL')">PL</button>
                              </li>
                              <li>
                                <button class="dropdown-item" type="button" @click="selectJbttl('PMO')">PMO</button>
                              </li>
                              <li>
                                <button class="dropdown-item" type="button" @click="selectJbttl('PM')">PM</button>
                              </li>
                              <li>
                                <button class="dropdown-item" type="button" @click="selectJbttl('DBA')">DBA</button>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <!--     체제비       -->
                        <div class="col-auto d-flex align-items-center p-3">
                          <label for="systFee" class="pr-1 col-form-label">체제비</label>
                          <input type="text" id="systFee" class="div_width65 form-control"
                                 aria-describedby="passwordHelpInline" v-model="formData.SYST_FEE">만원
                        </div>
                        <!--     계약회사정규직원금       -->
                        <div class="col-auto d-flex align-items-center p-3">
                          <label for="ctrtCoEmpPrnc" class="pr-1 col-form-label">계약회사정규직원금</label>
                          <input type="text" id="ctrtCoEmpPrnc" class="div_width65 form-control"
                                 aria-describedby="passwordHelpInline" v-model="formData.CTRT_CO_EMP_PRNC">만원
                        </div>
                        <!--     3.3%원금       -->
                        <div class="col-auto d-flex align-items-center p-3">
                          <label for="whtaxPrnc" class="pr-1 col-form-label">3.3%원금</label>
                          <input type="text" id="whtaxPrnc" class="div_width65 form-control"
                                 aria-describedby="passwordHelpInline" v-model="formData.WHTAX_PRNC">만원
                        </div>
                        <!--     부가세원금       -->
                        <div class="col-auto d-flex align-items-center p-3">
                          <label for="vatPrnc" class="pr-1 col-form-label">부가세원금</label>
                          <input type="text" id="vatPrnc" class="div_width65 form-control"
                                 aria-describedby="passwordHelpInline" v-model="formData.VAT_PRNC">만원
                        </div>
                        <!--     자사정규직원금       -->
                        <div class="col-auto d-flex align-items-center p-3">
                          <label for="kdsEmpPrnc" class="pr-1 col-form-label">자사정규직원금</label>
                          <input type="text" id="kdsEmpPrnc" class="div_width65 form-control"
                                 aria-describedby="passwordHelpInline" v-model="formData.KDS_EMP_PRNC">만원
                        </div>
                        <!--     월요청단가       -->
                        <div class="col-auto d-flex align-items-center p-3">
                          <label for="mmDmndUntprc" class="pr-1 col-form-label">월 요청단가</label>
                          <input type="text" id="mmDmndUntprc" class="div_width65 form-control"
                                 aria-describedby="passwordHelpInline" v-model="formData.MM_DMND_UNTPRC">만원
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="d-flex align-items-center justify-content-center">
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-primary" @click="closeModal">Close</button>
            <button type="submit" class="btn btn-primary" @click="submitForm">추가</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 모달 배경 -->
  <div v-if="showModal" class="modal-backdrop fade show"></div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue';
import axios from '../../axios'; // 생성한 axios 인스턴스 경로
import eventbus from '@/eventbus/eventbus'; // eventbus 가져오기

const formData = ref({
  DEV_NO: "",
  PJ_NO: "",
  DEV_PJ_PRGRS_STTS: "",
  DEV_PJ_PRGRS_DT: "",
  DEV_PJ_BGNG_DT: "",
  DEV_PJ_END_DT: "",
  CUST_NM: "",
  SUBGC_NM: "",
  CTRT_CO_NM: "",
  SBCN_NM: "",
  PJ_PLC: "",
  PJ_INP_GRADE: "",
  JBTTL: "",
  SYST_FEE: "",
  CTRT_CO_EMP_PRNC: "",
  WHTAX_PRNC: "",
  VAT_PRNC: "",
  KDS_EMP_PRNC: "",
  PJ_MM_DMND_UNTPRC: "",
});

const selectedDevPjPrgrsStts = ref('서류접수'); // 초기값
const selectedDevPjInpGrd = ref('초급'); // 초기값
const selectedJbttl = ref('PMO'); // 초기값

// 프로젝트지원상태 선택 메서드
const selectDevPjPrgrsStts = (pjInpStts) => {
  selectedDevPjPrgrsStts.value = pjInpStts; // 선택된 프로젝트지원상태로 변경
  formData.value.PJ_INP_STTS = pjInpStts; // 선택된 프로젝트지원상태를 formData에 반영
};

// 프로젝트투입등급 선택 메서드
const selectDevPjInpGrd = (grade) => {
  selectedDevPjInpGrd.value = grade; // 선택된 등급으로 변경
  formData.value.GRD = grade; // 선택된 등급을 formData에 반영
};

// 직책 선택 메서드
const selectJbttl = (jbttl) => {
  selectedJbttl.value = jbttl; // 선택된 직책으로 변경
  formData.value.JBTTL = jbttl; // 선택된 직책을 formData에 반영
};

// 모달 상태 관리
const showModal = ref(false);

const closeModal = () => {
  showModal.value = false; // 모달 닫기
};

const submitForm = async () => {
  console.log(formData.value);
  try {
    const response = await axios.post('http://localhost:8080/api/addDevPjHistory', formData.value);
    alert(`성공: ${response.data.message}`);
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || '프로젝트 추가에 실패했습니다.';
    alert(`오류: ${errorMessage}`);
  }
};

// 컴포넌트가 마운트될 때 이벤트 핸들러 추가
const pjOpenModal = () => {
  showModal.value = true; // 모달 열기
  console.log("모달 열림 상태:", showModal.value); // 상태 확인 로그
};

onMounted(() => {
  eventbus.SearchPjHistoryResultEvent.add('pjOpenModal', pjOpenModal); // 모달 열기 이벤트 등록
});

// 컴포넌트가 언마운트될 때 핸들러 제거
onUnmounted(() => {
  eventbus.SearchPjHistoryResultEvent.remove('pjOpenModal', pjOpenModal); // 모달 열기 이벤트 제거
});
</script>

<style scoped>

.modal {
  display: block; /* 모달을 보이게 하기 위해 설정 */
}

.modal-dialog {
  max-width: 90%; /* 최대 너비를 화면의 90%로 설정 */
  width: 90%; /* 너비를 90%로 설정 */
  height: 90%; /* 높이는 자동으로 설정 */
}

.modal-content {
  height: auto; /* 내용에 맞게 자동으로 설정 */
}

.modal-body {
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

.nm-input {
  width: 200px;
}

.dropdown-menu {
  max-height: 114px;
  overflow-y: scroll;
}

.label_nowrap {
  white-space: nowrap;
}

.div_width80 {
  width: 80px;
}

.div_width90 {
  width: 90px;
}

.div_width100 {
  width: 105px;
}

.div_width130 {
  width: 130px;
}

.div_width140 {
  width: 140px;
}

.div_width240 {
  width: 240px;
}

.div_width300 {
  width: 300px;
}

.div_width55 {
  width: 55px;
}

.div_width65 {
  width: 65px;
}

.div_flex_center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.b_line {
  border-bottom: 1px solid #D3D3D3; /* 두께와 색상을 설정 */
}

.pr-1 {
  padding-right: 10px;
}

.pr-2 {
  padding-right: 20px;
}

.plr-1 {
  padding-left: 10px;
  padding-right: 10px;
}

.devAddBtnStyle {
  background-color: #57687c;
  border-radius: 20px;
  color: #c9d6df;
  width: 120px;
}
</style>