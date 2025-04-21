<template>
  <div class="modal fade" :class="{ show: showModal }" v-if="showModal" tabindex="-1"
       aria-labelledby="staticBackdropLabel" aria-hidden="false">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-sm custom-modal">
      <div class="modal-content">
        <div class="modal-header d-flex align-items-center">
          <div class="flex-grow-1 text-center">
            <h1 class="modal-title fs-4" id="staticBackdropLabel">개발자 프로젝트 히스토리 추가</h1>
          </div>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body d-flex flex-column" :class="{ 'padding-right': hasPadding }" ref="modalBody">
          <form @submit.prevent="submitForm" class="form d-flex flex-column flex-grow-1" autocomplete='off'>
            <div class="b-line pt-4 pb-4 flex-column d-flex justify-content-center">
              <div class="d-flex justify-content-center">
                <div class="col-10 d-flex align-items-center form-status-bg">
                  <div class="d-flex justify-content-between form-control form-status toggleTextWrap" @click="pjInfoHandleClick">
                    <div class="d-flex toggleTextEmptySpace"></div>
                    <div class="d-flex text-center">프로젝트정보</div>
                    <div class="d-flex align-items-center">
                      <div class="form-status-button" :class="{ completed: pjInfoInputStatus === '입력완료', default: pjInfoInputStatus !== '입력완료' }">
                        {{ pjInfoInputStatus }}
                      </div>
                      <div class="form-status-toggle-button" :class="{ visible: pjInfoIsVisible, hidden: !pjInfoIsVisible }" @click.stop="pjInfoToggleState">
                        &#9660;
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 프로젝트 정보 내용 -->
              <div v-if="pjInfoIsVisible" class="d-flex row justify-content-center mt20">
                <!-- 프로젝트지원상태 레이블 -->
                <div class="label-wrap col-10 mt-2">
                  <div class="label">
                    <label for="devPjPrgrsStts" class="col-form-label">프로젝트지원상태</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 프로젝트지원상태 드롭다운 -->
                <div class="dropdown-wrap">
                  <div class="col-10">
                    <div class="dropdown">
                      <button id="devPjPrgrsStts" class="btn btn-outline-primary dropdown-toggle" type="button"
                              data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="dropdown-default text-center">{{ selectedDevPjPrgrsStts || 'N/A' }}</span>
                        <!-- 기본값 설정 -->
                        <span class="caret"></span> <!-- 화살표 -->
                      </button>
                      <ul class="dropdown-menu">
                        <li><button class="dropdown-item" type="button" @click="selectDevPjPrgrsStts('서류접수')">서류접수</button></li>
                        <li><button class="dropdown-item" type="button" @click="selectDevPjPrgrsStts('서류합격')">서류합격</button></li>
                        <li><button class="dropdown-item" type="button" @click="selectDevPjPrgrsStts('인터뷰대기')">인터뷰대기</button></li>
                        <li><button class="dropdown-item" type="button" @click="selectDevPjPrgrsStts('인터뷰중')">인터뷰중</button></li>
                        <li><button class="dropdown-item" type="button" @click="selectDevPjPrgrsStts('인터뷰합격')">인터뷰합격</button></li>
                        <li><button class="dropdown-item" type="button" @click="selectDevPjPrgrsStts('프로젝트투입중')">프로젝트투입중</button></li>
                        <li><button class="dropdown-item" type="button" @click="selectDevPjPrgrsStts('프로젝트만료1달전')">프로젝트만료1달전</button></li>
                        <li><button class="dropdown-item" type="button" @click="selectDevPjPrgrsStts('타사프로젝트중')">타사프로젝트중</button></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- 프로젝트지원날짜 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label">
                    <label for="devPjPrgrsDt" class="col-form-label">프로젝트지원날짜</label>
                  </div>
                </div>

                <!-- 프로젝트지원날짜 입력란 -->
                <div class="col-12 date-wrap">
                  <div class="col-10 date">
                    <div class="form-group col-12 mb-0 position-relative">
                      <input type="date"
                             id="devPjPrgrsDt"
                             class="date-default input form-control text-center pl28 pr8"
                             aria-describedby="passwordHelpInline"
                             v-model="formattedPossibilityDate"
                             @blur="pjInfoCheckCompletion">
                    </div>
                  </div>
                </div>

                <!-- 프로젝트시작일자 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label">
                    <label for="devPjBgngDt" class="col-form-label">프로젝트시작일자</label>
                  </div>
                </div>

                <!-- 프로젝트시작일자 입력란 -->
                <div class="col-12 date-wrap">
                  <div class="col-10 date">
                    <div class="form-group col-12 mb-0 position-relative">
                      <input type="date"
                           id="devPjBgngDt"
                           class="date-default input form-control text-center"
                           aria-describedby="passwordHelpInline"
                           v-model="formattedStartDate"
                           @blur="pjInfoCheckCompletion">
                    </div>
                  </div>
                </div>

                <!-- 프로젝트종료일자 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label">
                    <label for="devPjEndDt" class="col-form-label">프로젝트종료일자</label>
                  </div>
                </div>

                <!-- 프로젝트종료일자 입력란 -->
                <div class="col-12 date-wrap">
                  <div class="col-10 date">
                    <div class="form-group col-12 mb-0 position-relative">
                      <input type="date"
                           id="devPjEndDt"
                             class="date-default input form-control text-center"
                             aria-describedby="passwordHelpInline"
                             v-model="formattedEndDate"
                             @blur="pjInfoCheckCompletion">
                    </div>
                  </div>
                </div>

                <!-- 고객사명 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label">
                    <label for="custNm" class="col-form-label">고객사명</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 고객사명 입력란 -->
                <div class="input-wrap">
                  <div class="col-10">
                    <input type="text"
                           id="custNm"
                           class="form-control flex-all-center w-100 input text-center"
                           aria-describedby="passwordHelpInline"
                           v-model="formData.CUST_NM"
                           @blur="pjInfoCheckCompletion">
                  </div>
                </div>

                <!-- 수행사명 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label">
                    <label for="subgcNm" class="col-form-label">수행사명</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 수행사명 입력란 -->
                <div class="input-wrap">
                  <div class="col-10">
                    <input type="text"
                           id="subgcNm"
                           class="form-control flex-all-center w-100 input text-center"
                           aria-describedby="passwordHelpInline"
                           v-model="formData.SUBGC_NM"
                           @blur="pjInfoCheckCompletion">
                  </div>
                </div>

                <!-- 계약회사명 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label">
                    <label for="ctrtCoNm" class="col-form-label">계약회사명</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 계약회사명 입력란 -->
                <div class="input-wrap">
                  <div class="col-10">
                    <input type="text"
                           id="ctrtCoNm"
                           class="form-control flex-all-center w-100 input text-center"
                           aria-describedby="passwordHelpInline"
                           v-model="formData.CTRT_CO_NM"
                           @blur="pjInfoCheckCompletion">
                  </div>
                </div>

                <!-- 하청업체명 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label">
                    <label for="sbcnNm" class="col-form-label">하청업체명</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 하청업체명 입력란 -->
                <div class="input-wrap">
                  <div class="col-10">
                    <input type="text"
                           id="sbcnNm"
                           class="form-control flex-all-center w-100 input text-center"
                           aria-describedby="passwordHelpInline"
                           v-model="formData.SBCN_NM"
                           @blur="pjInfoCheckCompletion">
                  </div>
                </div>

                <!-- 프로젝트장소 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label">
                    <label for="pjPlc" class="col-form-label">프로젝트장소</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 프로젝트장소 입력란 -->
                <div class="input-wrap">
                  <div class="col-10">
                    <input type="text"
                           id="pjPlc"
                           class="form-control flex-all-center w-100 input text-center"
                           aria-describedby="passwordHelpInline"
                           v-model="formData.PJ_PLC"
                           @blur="pjInfoCheckCompletion">
                  </div>
                </div>
              </div>
              <!-- 프로젝트정보 종료구간 -->
            </div>
            <div>
              <!-- 프로젝트투입정보 시작구간 -->
              <div class="pt-4 pb-4 flex-column d-flex justify-content-center">
                <div class="d-flex justify-content-center">
                  <div class="col-10 d-flex align-items-center form-status-bg">
                    <div class="d-flex justify-content-between form-control form-status toggleTextWrap" @click="pjInputInfoHandleClick">
                      <div class="d-flex toggleTextEmptySpace"></div>
                      <div class="d-flex text-center">프로젝트투입정보</div>
                      <div class="d-flex align-items-center">
                        <div class="form-status-button" :class="{ completed: pjInputInfoInputStatus === '입력완료', default: pjInputInfoInputStatus !== '입력완료' }">
                          {{ pjInputInfoInputStatus }}
                        </div>
                        <div class="form-status-toggle-button" :class="{ visible: pjInputInfoIsVisible, hidden: !pjInputInfoIsVisible }" @click.stop="pjInputInfoToggleState">
                          &#9660;
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 프로젝트투입등급 -->
                <div v-if="pjInputInfoIsVisible" class="d-flex row justify-content-center mt20">
                  <!-- 프로젝트투입등급 레이블 -->
                  <div class="label-wrap col-10">
                    <div class="label">
                      <label for="devPjInpGrd" class="col-form-label">프로젝트투입등급</label> <!-- 레이블 -->
                    </div>
                  </div>
                  <!-- 프로젝트투입등급 드롭다운 -->
                  <div class="dropdown-wrap">
                    <div class="col-10">
                      <div class="dropdown">
                        <button id="devPjInpGrd" class="btn btn-outline-primary dropdown-toggle" type="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                          <span class="dropdown-default text-center">{{ selectedDevPjInpGrd || 'N/A' }}</span>
                        </button>
                        <ul class="dropdown-menu">
                          <li><button class="dropdown-item" type="button" @click="selectDevPjInpGrd('N/A')">N/A</button></li>
                          <li><button class="dropdown-item" type="button" @click="selectDevPjInpGrd('초급')">초급</button></li>
                          <li><button class="dropdown-item" type="button" @click="selectDevPjInpGrd('초상급')">초상급</button></li>
                          <li><button class="dropdown-item" type="button" @click="selectDevPjInpGrd('중급')">중급</button></li>
                          <li><button class="dropdown-item" type="button" @click="selectDevPjInpGrd('중상급')">중상급</button></li>
                          <li><button class="dropdown-item" type="button" @click="selectDevPjInpGrd('고급')">고급</button></li>
                          <li><button class="dropdown-item" type="button" @click="selectDevPjInpGrd('특급')">특급</button></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <!-- 직책 레이블 -->
                  <div class="label-wrap col-10">
                    <div class="label">
                      <label for="jbttl" class="col-form-label">직책</label> <!-- 레이블 -->
                    </div>
                  </div>

                  <!-- 직책 드롭다운 -->
                  <div class="dropdown-wrap">
                    <div class="col-10">
                      <div class="dropdown">
                        <button id="jbttl" class="btn btn-outline-primary dropdown-toggle" type="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                          <span class="dropdown-default text-center">{{ selectedJbttl || 'N/A' }}</span>
                          <!-- 기본값 설정 -->
                          <span class="caret"></span> <!-- 화살표 -->
                        </button>
                        <ul class="dropdown-menu">
                          <li><button class="dropdown-item" type="button" @click="selectJbttl('N/A')">N/A</button></li>
                          <li><button class="dropdown-item" type="button" @click="selectJbttl('PL')">PL</button></li>
                          <li><button class="dropdown-item" type="button" @click="selectJbttl('PMO')">PMO</button></li>
                          <li><button class="dropdown-item" type="button" @click="selectJbttl('PM')">PM</button></li>
                          <li><button class="dropdown-item" type="button" @click="selectJbttl('DBA')">DBA</button></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <!-- 체제비 레이블 -->
                  <div class="label-wrap col-10">
                    <div class="label">
                      <label for="systFee" class="col-form-label">체제비</label> <!-- 레이블 -->
                    </div>
                  </div>

                  <!-- 체제비 입력란 -->
                  <div class="input-wrap"> <!-- 입력란을 가운데 정렬 -->
                    <div class="col-10 d-flex align-items-center"> <!-- 너비를 col-10으로 설정하고 flex 사용 -->
                      <div class="form-group col-12 mb-0 position-relative"> <!-- 입력란 -->
                        <input type="text"
                               id="systFee"
                               class="form-control flex-all-center w-100 input text-center pl40 pr40"
                               aria-describedby="passwordHelpInline"
                               v-model="formData.SYST_FEE"
                               maxlength="3"
                               @blur="pjInputInfoCheckCompletion">
                        <span class="position-absolute"
                              style="right: 12px; top: 50%; transform: translateY(-50%);">만원</span>
                      </div>
                    </div>
                  </div>

                  <!-- 계약회사정규직원금 레이블 -->
                  <div class="label-wrap col-10">
                    <div class="label">
                      <label for="ctrtCoEmpPrnc" class="col-form-label">계약회사정규직원금</label> <!-- 레이블 -->
                    </div>
                  </div>

                  <!-- 계약회사정규직원금 입력란 -->
                  <div class="input-wrap"> <!-- 입력란을 가운데 정렬 -->
                    <div class="col-10 d-flex align-items-center"> <!-- 너비를 col-10으로 설정하고 flex 사용 -->
                      <div class="form-group col-12 mb-0 position-relative"> <!-- 입력란 -->
                      <input type="text"
                             id="ctrtCoEmpPrnc"
                             class="form-control flex-all-center w-100 input text-center pl40 pr40"
                             aria-describedby="passwordHelpInline"
                             v-model="formData.CTRT_CO_EMP_PRNC"
                             maxlength="3"
                             @blur="pjInputInfoCheckCompletion">
                        <span class="position-absolute"
                              style="right: 12px; top: 50%; transform: translateY(-50%);">만원</span>
                      </div>
                    </div>
                  </div>

                  <!-- 3.3%원금 레이블 -->
                  <div class="label-wrap col-10">
                    <div class="label">
                      <label for="whtaxPrnc" class="col-form-label">3.3%원금</label> <!-- 레이블 -->
                    </div>
                  </div>

                  <!-- 3.3%원금 입력란 -->
                  <div class="input-wrap"> <!-- 입력란을 가운데 정렬 -->
                    <div class="col-10 d-flex align-items-center"> <!-- 너비를 col-10으로 설정하고 flex 사용 -->
                      <div class="form-group col-12 mb-0 position-relative"> <!-- 입력란 -->
                      <input type="text"
                             id="whtaxPrnc"
                             class="form-control flex-all-center w-100 input text-center pl40 pr40"
                             aria-describedby="passwordHelpInline"
                             v-model="formData.WHTAX_PRNC"
                             maxlength="3"
                             @blur="pjInputInfoCheckCompletion">
                        <span class="position-absolute"
                              style="right: 12px; top: 50%; transform: translateY(-50%);">만원</span>
                      </div>
                    </div>
                  </div>

                  <!-- 부가세원금 레이블 -->
                  <div class="label-wrap col-10">
                    <div class="label">
                      <label for="vatPrnc" class="col-form-label">부가세원금</label> <!-- 레이블 -->
                    </div>
                  </div>

                  <!-- 부가세원금 입력란 -->
                  <div class="input-wrap"> <!-- 입력란을 가운데 정렬 -->
                    <div class="col-10 d-flex align-items-center"> <!-- 너비를 col-10으로 설정하고 flex 사용 -->
                      <div class="form-group col-12 mb-0 position-relative"> <!-- 입력란 -->
                      <input type="text"
                             id="vatPrnc"
                             class="form-control flex-all-center w-100 input text-center pl40 pr40"
                             aria-describedby="passwordHelpInline"
                             v-model="formData.VAT_PRNC"
                             maxlength="3"
                             @blur="pjInputInfoCheckCompletion">
                        <span class="position-absolute"
                              style="right: 12px; top: 50%; transform: translateY(-50%);">만원</span>
                      </div>
                    </div>
                  </div>

                  <!-- 자사정규직원금 레이블 -->
                  <div class="label-wrap col-10">
                    <div class="label">
                      <label for="kdsEmpPrnc" class="col-form-label">자사정규직원금</label> <!-- 레이블 -->
                    </div>
                  </div>

                  <!-- 자사정규직원금 입력란 -->
                  <div class="input-wrap"> <!-- 입력란을 가운데 정렬 -->
                    <div class="col-10 d-flex align-items-center"> <!-- 너비를 col-10으로 설정하고 flex 사용 -->
                      <div class="form-group col-12 mb-0 position-relative"> <!-- 입력란 -->
                      <input type="text"
                             id="kdsEmpPrnc"
                             class="form-control flex-all-center w-100 input text-center pl40 pr40"
                             aria-describedby="passwordHelpInline"
                             v-model="formData.KDS_EMP_PRNC"
                             maxlength="3"
                             @blur="pjInputInfoCheckCompletion">
                        <span class="position-absolute"
                              style="right: 12px; top: 50%; transform: translateY(-50%);">만원</span>
                      </div>
                    </div>
                  </div>

                  <!-- 월요청단가 레이블 -->
                  <div class="label-wrap col-10">
                    <div class="label">
                      <label for="mmDmndUntprc" class="col-form-label">월요청단가</label> <!-- 레이블 -->
                    </div>
                  </div>

                  <!-- 월요청단가 입력란 -->
                  <div class="input-wrap"> <!-- 입력란을 가운데 정렬 -->
                    <div class="col-10 d-flex align-items-center"> <!-- 너비를 col-10으로 설정하고 flex 사용 -->
                      <div class="form-group col-12 mb-0 position-relative"> <!-- 입력란 -->
                      <input type="text"
                             id="mmDmndUntprc"
                             class="form-control flex-all-center w-100 input text-center pl40 pr40"
                             aria-describedby="passwordHelpInline"
                             v-model="formData.PJ_MM_DMND_UNTPRC"
                             maxlength="4"
                             @blur="pjInputInfoCheckCompletion">
                        <span class="position-absolute"
                              style="right: 12px; top: 50%; transform: translateY(-50%);">만원</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <!-- 제출 버튼 -->
        <div class="modal-footer-wrap d-flex align-items-center justify-content-center t_line">
          <div class="modal-footer d-flex">
            <button type="submit" class="btn btn-primary">제출</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 모달 배경 -->
  <div v-if="showModal" class="modal-backdrop fade show"></div>
</template>

<script>
import {ref, onMounted, onUnmounted, nextTick, computed, defineComponent, defineExpose} from 'vue';
import axios from '../../axios'; // 생성한 axios 인스턴스 경로
import eventbus from '@/eventbus/eventbus'; // eventbus 가져오기

export default defineComponent({
  props: {
    devNo: Number,
  },
  setup(props) {
    // 프로젝트 정보 토글 초기 값
    const pjInfoIsVisible = ref(true);
    const pjInfoInputStatus = ref('입력중'); // 초기 상태
    const pjInfoIsToggled = ref(false); // 클릭 상태를 관리하는 변수

    // 프로젝트 투입정보 토글 초기 값
    const pjInputInfoIsVisible = ref(true);
    const pjInputInfoInputStatus = ref('입력중'); // 초기 상태
    const pjInputInfoIsToggled = ref(false); // 클릭 상태를 관리하는 변수

    const formData = ref({
      DEV_NO: props.devNo || "",
      PJ_NO: "",
      DEV_PJ_PRGRS_STTS: "N/A",
      DEV_PJ_PRGRS_DT: "",
      DEV_PJ_BGNG_DT: "",
      DEV_PJ_END_DT: "",
      CUST_NM: "",
      SUBGC_NM: "",
      CTRT_CO_NM: "",
      SBCN_NM: "",
      PJ_PLC: "",
      PJ_INP_GRADE: "N/A",
      JBTTL: "N/A",
      SYST_FEE: "",
      CTRT_CO_EMP_PRNC: "",
      WHTAX_PRNC: "",
      VAT_PRNC: "",
      KDS_EMP_PRNC: "",
      PJ_MM_DMND_UNTPRC: "",
    });

    const selectedDevPjPrgrsStts = ref('N/A'); // 초기값
    const selectedDevPjInpGrd = ref('N/A'); // 초기값
    const selectedJbttl = ref('N/A'); // 초기값

    // 프로젝트지원상태 선택 메서드
    const selectDevPjPrgrsStts = (devPjPrgrsStts) => {
      selectedDevPjPrgrsStts.value = devPjPrgrsStts; // 선택된 프로젝트지원상태로 변경
      formData.value.PJ_INP_STTS = devPjPrgrsStts; // 선택된 프로젝트지원상태를 formData에 반영
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

    const open = (devNo) => {
      formData.value.DEV_NO = devNo;
    };

// ✅ expose 하기!
    defineExpose({
      open
    }); // 이걸 꼭 해야 부모가 호출 가능함!

    //프로젝트 정보 함수
    const pjInfoTogglePaymentInputStatus = () => {
      // 입력 완료 상태 전환 로직 (필요에 따라 정의)
      if (pjInfoIsVisible.value === true) {
        pjInfoIsVisible.value = false;
      } else {
        pjInfoIsVisible.value = true;
      }
    };

    const pjInfoToggleState = () => {
      pjInfoIsToggled.value = !pjInfoIsToggled.value; // 클릭할 때마다 상태 반전
    };

    const pjInfoHandleClick = () => {
      pjInfoTogglePaymentInputStatus(); // 상태 전환 메서드 호출
      pjInfoToggleState(); // 클릭 상태 전환 메서드 호출
      scrollChecks(); // 상태 변경 후 체크
    };

    //프로젝트 투입정보 함수
    const pjInputInfoTogglePaymentInputStatus = () => {
      // 입력 완료 상태 전환 로직 (필요에 따라 정의)
      if (pjInputInfoIsVisible.value === true) {
        pjInputInfoIsVisible.value = false;
      } else {
        pjInputInfoIsVisible.value = true;
      }
    };

    const pjInputInfoToggleState = () => {
      pjInputInfoIsToggled.value = !pjInputInfoIsToggled.value; // 클릭할 때마다 상태 반전
    };

    const pjInputInfoHandleClick = () => {
      pjInputInfoTogglePaymentInputStatus(); // 상태 전환 메서드 호출
      pjInputInfoToggleState(); // 클릭 상태 전환 메서드 호출
      scrollChecks(); // 상태 변경 후 체크
    };

    const pjInfoCheckCompletion = () => {
      const { DEV_PJ_PRGRS_DT, DEV_PJ_BGNG_DT, DEV_PJ_END_DT,
        CUST_NM, SUBGC_NM, CTRT_CO_NM, SBCN_NM, PJ_PLC
      } = formData.value;

      console.log('프로젝트 정보 현재 입력값:', formData.value); // 전체 입력값 출력

      if ( DEV_PJ_PRGRS_DT && DEV_PJ_BGNG_DT && DEV_PJ_END_DT &&
          CUST_NM && SUBGC_NM && CTRT_CO_NM && SBCN_NM && PJ_PLC) {
        pjInfoInputStatus.value = '입력완료'; // 모든 필드가 채워졌을 때
        pjInfoIsVisible.value = false; // 지급 정보를 숨김
      } else {
        pjInfoInputStatus.value = '입력중'; // 하나라도 비어있으면
      }
    };
    //프로젝트 정보 입력완료, 입력중 동작 종료

    //프로젝트 투입정보 입력완료, 입력중 동작 시작
    const pjInputInfoCheckCompletion = () => {
      const { PJ_INP_GRADE, JBTTL, SYST_FEE,
        CTRT_CO_EMP_PRNC, WHTAX_PRNC, VAT_PRNC,
        KDS_EMP_PRNC, PJ_MM_DMND_UNTPRC
      } = formData.value;

      console.log('프로젝트 투입정보 입력값:', formData.value); // 전체 입력값 출력

      // 모든 입력란이 채워졌는지 확인
      if (PJ_INP_GRADE && JBTTL && SYST_FEE &&
          CTRT_CO_EMP_PRNC && WHTAX_PRNC && VAT_PRNC &&
          KDS_EMP_PRNC && PJ_MM_DMND_UNTPRC) {
        pjInputInfoInputStatus.value = '입력완료'; // 모든 필드가 채워졌을 때
        pjInputInfoIsVisible.value = false; // 지급 정보를 숨김
      } else {
        pjInputInfoInputStatus.value = '입력중'; // 하나라도 비어있으면
      }
    };
    //프로젝트 투입정보 입력완료, 입력중 동작 종료

    const hasPadding = ref(true); // 패딩 상태 관리

    // 스크롤 체크 함수
    const scrollChecks = () => {
      console.log("프로젝트정보 상태:", pjInfoIsVisible.value);
      console.log("프로젝트투입정보 상태:", pjInputInfoIsVisible.value);
      // 모든 섹션이 접혀 있을 때
      if (
          pjInfoIsVisible.value === true ||
          pjInputInfoIsVisible.value === true
      ) {
        hasPadding.value = false; // 패딩 추가
      } else {
        hasPadding.value = true; //
      }
      console.log("현재 패딩 상태:", hasPadding.value);
    };

    const submitForm = async (event) => {
      // 현재 폼 요소를 가져옴
      const form = event.target;

      // 기본 유효성 검사
      if (!form.checkValidity()) {
        // 유효하지 않은 필드에 포커스를 맞춤
        const invalidField = form.querySelector(':invalid');
        if (invalidField) {
          invalidField.focus(); // 첫 번째 유효하지 않은 필드에 포커스
        }
        return; // 유효하지 않으면 실행 중단
      }
      console.log('제출할 프로젝트 formData:', formData.value); // 제출할 때 formData 상태 출력
      try {
        const response = await axios.post('http://localhost:8080/api/addDevPjHistory', formData.value);
        alert(response.data.message); // 성공 메시지 표시

        // 데이터 새로 고침 이벤트 발생
        console.log("refreshData 호출 전"); // 디버깅 로그
        eventbus.SearchResultEvent.refreshData(); // 이벤트 발생
        console.log("refreshData 호출 후"); // 디버깅 로그
        closeModal();
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || '프로젝트 추가에 실패했습니다.';
        alert(`오류: ${errorMessage}`);
        closeModal();
      }
    };

    // YYYYMMDD ↔ YYYY-MM-DD 변환을 위한 computed 팩토리 함수
    const useFormattedDate = (key) => {
      return computed({
        get: () => {
          const raw = formData.value[key];
          if (!raw || raw === 'N/A') return '';

          if (raw === '즉시') {
            const today = new Date();
            return today.toISOString().split('T')[0];
          }

          return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
        },
        set: (value) => {
          if (!value) {
            formData.value[key] = 'N/A';
            return;
          }

          const today = new Date().toISOString().split('T')[0];
          formData.value[key] = (value === today) ? '즉시' : value.replace(/-/g, '');
        }
      });
    };

    const formattedPossibilityDate = useFormattedDate('DEV_PJ_PRGRS_DT');
    const formattedStartDate = useFormattedDate('DEV_PJ_BGNG_DT');
    const formattedEndDate = useFormattedDate('DEV_PJ_END_DT');

    // 모달 열기 핸들러
    const openModalHandler = (devNo) => {
      formData.value = {
        DEV_NO: devNo || props.devNo || '',
        PJ_NO: "",
        DEV_PJ_PRGRS_STTS: "N/A",
        DEV_PJ_PRGRS_DT: "",
        DEV_PJ_BGNG_DT: "",
        DEV_PJ_END_DT: "",
        CUST_NM: "",
        SUBGC_NM: "",
        CTRT_CO_NM: "",
        SBCN_NM: "",
        PJ_PLC: "",
        PJ_INP_GRADE: "N/A",
        JBTTL: "N/A",
        SYST_FEE: "",
        CTRT_CO_EMP_PRNC: "",
        WHTAX_PRNC: "",
        VAT_PRNC: "",
        KDS_EMP_PRNC: "",
        PJ_MM_DMND_UNTPRC: "",
      };
      console.log('openmodalhandler devNo:', devNo);
      // 입력 상태 초기화
      pjInfoInputStatus.value = '입력중'; // 프로젝트정보 상태
      pjInputInfoInputStatus.value = '입력중'; // 프로젝트투입정보 상태

      pjInfoIsVisible.value = true; // 클릭 상태를 관리하는 변수
      pjInputInfoIsVisible.value = true; // 클릭 상태를 관리하는 변수

      showModal.value = true; // 모달 열기
    };


    // 컴포넌트가 마운트될 때 이벤트 핸들러 추가
    onMounted(async() => {
      eventbus.SearchPjHistoryResultEvent.add('devPjOpenModal', (devNo) => openModalHandler(devNo));
      await nextTick(); // DOM 업데이트 후
      scrollChecks(); // 초기 상태 체크
      console.log('컴포넌트 마운트 시 devNo:', props.devNo);
    });

    // 컴포넌트가 언마운트될 때 핸들러 제거
    onUnmounted(() => {
      eventbus.SearchPjHistoryResultEvent.remove('devPjOpenModal', openModalHandler); // 모달 열기 이벤트 제거
    });

    return {
      showModal,
      closeModal,
      hasPadding,
      pjInfoInputStatus,
      pjInfoIsVisible,
      pjInfoToggleState,
      selectedDevPjPrgrsStts,
      formData,
      pjInputInfoInputStatus,
      pjInputInfoIsVisible,
      pjInputInfoToggleState,
      selectDevPjPrgrsStts,
      selectDevPjInpGrd,
      selectJbttl,
      selectedDevPjInpGrd,
      selectedJbttl,
      pjInfoHandleClick,
      pjInputInfoHandleClick,
      pjInfoCheckCompletion,
      pjInputInfoCheckCompletion,
      submitForm,
      formattedPossibilityDate,
      formattedStartDate,
      formattedEndDate,
      open,
    };
  },
});
</script>

<style scoped>

.m0{
  margin: 0px;
}
.mt20{
  margin-top: 20px;
}

.pl28{
  padding-left: 28px;
}

.pr8{
  padding-right: 8px;
}

.pl40{
  padding-left: 40px;
}

.pr40{
  padding-right: 40px;
}

.form {
  height: auto;
}

.form-status-button {
  border: 1px solid dimgray;
  border-radius: 20px;
  width: 100px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
}

.form-status-button.completed {
  background-color: #007bff; /* '입력완료' 상태일 때 배경색 */
  color: white; /* 글자색 */
}

.form-status-button.default {
  background-color: white; /* 기본 배경색 */
  color: black; /* 기본 글자색 */
}

.form-status-toggle-button {
  margin-right: 4px;
  transition: transform 0.3s ease; /* 전환 효과 설정 */
}

.form-status-toggle-button.visible {
  transform: scaleY(-1); /* 상태가 visible일 때의 스타일 */
}

.form-status-toggle-button.hidden {
  transform: none; /* 기본 상태 (숨김) */
}

.flex-all-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.date {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date-wrap {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.date-default {
  border-radius: 20px;
  padding-left: 28px;
  padding-right: 8px;
}

.date-default-wrap {
  width: 100%;
  margin-bottom: 0px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.label-wrap-between {
  display: flex;
  justify-content: space-between;
}

.label-wrap {
  display: flex;
  justify-content: center;
}

.label-date-wrap {
  display: flex;
  justify-content: space-between;
}

.label {
  display: flex;
  justify-content: center;
}

.dropdown-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.input-with-image {
  padding: 4px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.input-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.input {
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid dimgray;
}

.b-line {
  border-bottom: lightgray 1px solid;
}

.btn {
  height: 45px;
  width: 70px;
  border-radius: 25px;
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

.padding-right {
  padding-right: 17px; /* 스크롤바 생기기 전의 패딩 */
}

.modal-footer-wrap {
  position: sticky; /* 하단에 고정 */
  bottom: 0; /* 하단에 위치 */
  left: 0; /* 왼쪽 정렬 */
  right: 0; /* 오른쪽 정렬 */
  background-color: white; /* 필요시 배경색 설정 */
  border-top: 1px solid #dee2e6; /* 필요시 경계선 설정 */
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
  overflow-y: scroll;
  padding-left: 18px;
  width:100%;
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

.dropdown-menu-text {
  overflow-y: scroll;
  padding-left: 34px;
}

.dropdown-item {
  padding-left: 0px;
  padding-right: 0px;
  display: flex;
  justify-content: center;
}

.modal-header {
  border-bottom: 1px solid dimgray; /* 두께와 색상을 설정 */
}

.modal-footer {
  border: none;
}

.t_line {
  border-top: 1px solid dimgray; /* 두께와 색상을 설정 */
}

.b_line {
  border-bottom: 1px solid dimgray; /* 두께와 색상을 설정 */
}

.devAddBtnStyle {
  background-color: #57687c;
  border-radius: 20px;
  color: #c9d6df;
  width: 120px;
}

.custom-modal {
  max-width: 600px;
}

.input-radius {
  border-radius: 20px;
}

.form-status {
  border-radius: 25px;
  border: 1px solid dimgray;
  height: 50px;
  align-items: center;
}


.dropdown-toggle {
  width: 100%;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dropdown-default {
  flex-grow: 1;
  padding-left: 14px;
}

.dropdown-default-text {
  flex-grow: 1;
  padding-left: 34px;
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

.paymentInputWrap{
  margin-bottom: auto;
}
</style>