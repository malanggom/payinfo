<template>
  <div class="modal fade" :class="{ show: showModal }" v-if="showModal" tabindex="-1"
       aria-labelledby="staticBackdropLabel" aria-hidden="false">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-sm custom-modal">
      <div class="modal-content">
        <div class="modal-header d-flex align-items-center">
          <div class="flex-grow-1 text-center">
            <h1 class="modal-title fs-4" id="staticBackdropLabel">개발자 추가</h1>
          </div>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body d-flex flex-column" :class="{ 'padding-right': hasPadding }" ref="modalBody">
          <form @submit.prevent="submitForm" class="form d-flex flex-column flex-grow-1" autocomplete='off'>
            <div class="b-line pt-4 pb-4 flex-column d-flex justify-content-center">
              <div class="d-flex justify-content-center">
                <div class="col-10 d-flex align-items-center form-status-bg">
                  <div class="d-flex justify-content-between form-control form-status toggleTextWrap" @click="indvInfoHandleClick">
                    <div class="d-flex toggleTextEmptySpace"></div>
                    <div class="d-flex text-center">개인정보</div>
                    <div class="d-flex align-items-center">
                      <div class="form-status-button" :class="{completed: indvInfoPaymentInputStatus === '입력완료', default: indvInfoPaymentInputStatus !== '입력완료'}">
                        {{ indvInfoPaymentInputStatus }}
                      </div>
                      <div class="form-status-toggle-button" :class="{visible: indvInfoIsVisible, hidden: !indvInfoIsVisible}" @click.stop="indvInfoToggleState">
                        &#9660;
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 개인정보 내용 -->
              <div v-if="indvInfoIsVisible" class="d-flex row justify-content-center mt20">
                <!-- 이름 레이블 -->
                <div class="label-wrap col-10 mt-2">
                  <div class="label-w100">
                    <label for="name" class="col-form-label">이름</label>
                  </div>
                </div>
                <!-- 이름 입력란 -->
                <div class="input-wrap">
                  <div class="col-10">
                    <input type="text" id="name" class="form-control flex-all-center w-100 input text-center"
                           aria-describedby="passwordHelpInline" v-model="formData.NM" required
                           @input="indvInfoCheckInputs">
                  </div>
                </div>
                <!-- 소개자 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="brkr" class="col-form-label">소개자</label>
                  </div>
                </div>
                <!-- 소개자 입력란 -->
                <div class="input-wrap"> <!-- 입력란을 가운데 정렬 -->
                  <div class="col-10"> <!-- 너비를 col-8로 설정 -->
                    <input type="text" id="brkr" class="form-control flex-all-center w-100 input text-center"
                           aria-describedby="passwordHelpInline" v-model="formData.BRKR" @input="indvInfoCheckInputs">
                  </div>
                </div>
                <!-- 카카오톡 닉네임 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="KakaoNick" class="col-form-label">카카오톡닉네임</label>
                  </div>
                </div>
                <!-- 카카오톡 닉네임 입력란 -->
                <div class="input-wrap"> <!-- 입력란을 가운데 정렬 -->
                  <div class="col-10"> <!-- 너비를 col-8로 설정 -->
                    <input type="text" id="KakaoNick" class="form-control flex-all-center w-100 input text-center"
                           aria-describedby="passwordHelpInline" v-model="formData.KAKAO_NICK"
                           @input="indvInfoCheckInputs">
                  </div>
                </div>
                <!-- 성별 드롭다운 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="genderDropdown" class="col-form-label">성별</label>
                  </div>
                </div>

                <!-- 성별 드롭다운 -->
                <div class="dropdown-wrap">
                  <div class="col-10"> <!-- 너비를 col-8로 설정 -->
                    <div class="dropdown">
                      <button id="genderDropdown" class="btn btn-outline-primary dropdown-toggle" type="button"
                              data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="dropdown-default text-center">{{ selectedGndr || '남' }}</span> <!-- 기본값 설정 -->
                        <span class="caret"></span> <!-- 화살표 -->
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <button class="dropdown-item" type="button" @click="selectGndr('남')">남</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectGndr('여')">여</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- 생년월일 드롭다운 레이블 -->
                <div class="label-date-wrap col-10">
                  <div class="label col-5">
                    <label for="brdt" class="col-form-label">생년월일</label>
                  </div>
                  <div class="col-1">
                  </div>
                  <div class="label col-5">
                    <label for="sn" class="col-form-label">일련번호</label>
                  </div>
                </div>

                <!-- 생년월일 입력란 -->
                <div class="date-wrap col-12">
                  <div class="col-10 date">
                    <div class="form-group col-5 d-flex flex-column align-items-center mb-0">
                      <input
                          type="date"
                          id="brdt"
                          class="form-control input date-default text-center"
                          aria-describedby="passwordHelpInline"
                          v-model="formattedBirthDate"
                          @change="updateBirthDate" required
                          @input="indvInfoCheckInputs"/> <!-- 입력란 -->
                    </div>
                    <!-- 구분 기호 -->
                    <div class="col-1 d-flex justify-content-center align-items-center mb-0">
                      <span class="m0">-</span> <!-- 구분 기호 -->
                    </div>
                    <!-- 일련번호 -->
                    <div class="form-group col-5 d-flex flex-column align-items-center input mb-0">
                      <!-- 일련번호를 col-5로 설정 -->
                      <input
                          placeholder="7자리 입력"
                          type="text"
                          id="sn"
                          class="form-control input-radius text-center"
                          aria-describedby="passwordHelpInline"
                          v-model="formData.SN" required
                          maxlength="7"
                          @input="handleInput"/> <!-- 입력란 -->
                    </div>
                  </div>
                </div>

                <!-- 나이 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="age" class="col-form-label">나이</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 나이 입력란 -->
                <div class="input-wrap"> <!-- 입력란을 가운데 정렬 -->
                  <div class="col-10"> <!-- 너비를 col-10으로 설정 -->
                    <input type="text" id="age" class="form-control flex-all-center w-100 input text-center"
                           aria-describedby="passwordHelpInline" v-model="formData.AGE" @input="indvInfoCheckInputs">
                  </div>
                </div>

                <!-- 학력 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="acbgDropdown" class="col-form-label">학력</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 학력 드롭다운 -->
                <div class="dropdown-wrap"> <!-- 드롭다운을 가운데 정렬 -->
                  <div class="col-10"> <!-- 너비를 col-10으로 설정 -->
                    <div class="dropdown">
                      <button id="acbgDropdown" class="btn btn-outline-primary dropdown-toggle w-100" type="button"
                              data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="dropdown-default text-center">{{ selectedAcbg || '고졸' }}</span> <!-- 기본값 설정 -->
                        <span class="caret"></span> <!-- 화살표 -->
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <button class="dropdown-item" type="button" @click="selectAcbg('고졸')">고졸</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectAcbg('대학교')">대학교</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectAcbg('대학원')">대학원</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectAcbg('기타')">기타</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- 병역 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="msDropdown" class="col-form-label">병역</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 병역 드롭다운 -->
                <div class="dropdown-wrap"> <!-- 드롭다운을 가운데 정렬 -->
                  <div class="col-10"> <!-- 너비를 col-10으로 설정 -->
                    <div class="dropdown">
                      <button id="msDropdown" class="btn btn-outline-primary dropdown-toggle w-100" type="button"
                              data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="dropdown-default text-center">{{ selectedMs || 'N/A' }}</span> <!-- 기본값 설정 -->
                        <span class="caret"></span> <!-- 화살표 -->
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <button class="dropdown-item" type="button" @click="selectMs('N/A')">N/A</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectMs('현역')">현역</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectMs('예비역')">예비역</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectMs('보충역')">보충역</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectMs('병역준비역 및 전시근로역')">병역준비역 및 전시근로역
                          </button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectMs('면제')">면제</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectMs('공익')">공익</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- 휴대폰번호 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="mblTelno" class="col-form-label">휴대폰번호</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 휴대폰번호 입력란들 -->
                <div class="input-wrap">
                  <div class="col-10 d-flex align-items-center justify-content-between"> <!-- col-10으로 설정하고 세로 정렬 -->
                    <div class="form-group col-3 d-flex flex-column align-items-center mb-0"> <!-- 첫 번째 입력란 -->
                      <input type="text" id="mblTelno" class="form-control input text-center"
                             v-model="phoneParts[0]" @input="indvInfoCheckInputs">
                    </div>
                    <!-- 구분 기호 -->
                    <div class="col-1 d-flex justify-content-center align-items-center mb-0">
                      <span class="m0">-</span> <!-- 구분 기호 -->
                    </div>
                    <div class="form-group col-3 d-flex flex-column align-items-center mb-0"> <!-- 두 번째 입력란 -->
                      <input type="text" id="mblTelno2" class="form-control input text-center"
                             v-model="phoneParts[1]" @input="indvInfoCheckInputs">
                    </div>
                    <!-- 구분 기호 -->
                    <div class="col-1 d-flex justify-content-center align-items-center mb-0">
                      <span class="m0">-</span> <!-- 구분 기호 -->
                    </div>
                    <div class="form-group col-3 d-flex flex-column align-items-center mb-0"> <!-- 세 번째 입력란 -->
                      <input type="text" id="mblTelno3" class="form-control input text-center"
                             v-model="phoneParts[2]" @input="indvInfoCheckInputs">
                    </div>
                  </div>
                </div>

                <!-- 이메일 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="eml" class="col-form-label">이메일</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 이메일 입력란들 -->
                <div class="input-wrap"> <!-- 입력란을 가운데 정렬 -->
                  <div class="col-10 d-flex align-items-center justify-content-between"> <!-- col-10으로 설정하고 세로 정렬 -->
                    <div class="form-group col-5 d-flex flex-column align-items-center mb-0"> <!-- 첫 번째 입력란 -->
                      <input type="text" id="eml" class="form-control input text-center"
                             aria-describedby="passwordHelpInline" v-model="emailParts[0]" @input="indvInfoCheckInputs">
                    </div>
                    <!-- 구분 기호 -->
                    <div class="col-1 d-flex justify-content-center align-items-center mb-0">
                      <span class="m0">@</span> <!-- 구분 기호 -->
                    </div>
                    <div class="form-group col-5 d-flex flex-column align-items-center mb-0"> <!-- 두 번째 입력란 -->
                      <input type="text" id="eml2" class="form-control input text-center"
                             aria-describedby="passwordHelpInline" v-model="emailParts[1]" @input="indvInfoCheckInputs">
                    </div>
                  </div>
                </div>

                <!-- 소득구분 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="whtaxbzmnYn" class="col-form-label">소득구분</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 소득구분 드롭다운 -->
                <div class="dropdown-wrap">
                  <div class="col-10">
                    <div class="dropdown">
                      <button id="whtaxbzmnYn" class="btn btn-outline-primary dropdown-toggle" type="button"
                              data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="dropdown-default text-center">{{ selectedWhtaxbzmn || '3.3%' }}</span>
                        <!-- 기본값 설정 -->
                        <span class="caret"></span> <!-- 화살표 -->
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <button class="dropdown-item" type="button" @click="selectWhtax('3.3%')">3.3%</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectBzmn('사업자')">사업자</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- 주소 레이블 -->
                <div class="col-10 label-wrap-between">
                  <div class="col-5 label">
                    <label for="rgn" class="col-form-label">지역</label>
                  </div>
                  <div class="col-5 label">
                    <label for="addr" class="col-form-label">상세주소</label>
                  </div>
                </div>

                <!-- 지역 -->
                <div class="col-12 input-wrap">
                  <div class="col-10 label">
                    <div class="form-group col-5 flex-column flex-all-center mb-0"> <!-- 오른쪽 여백 추가 및 세로 정렬 -->

                      <input type="text" id="rgn" class="form-control input text-center"
                             aria-describedby="passwordHelpInline" v-model="formData.RGN" @input="indvInfoCheckInputs">
                    </div>
                    <div class="col-2 flex-all-center">
                      +
                    </div>
                    <!-- 상세주소 -->
                    <div class="form-group col-5 flex-column flex-all-center mb-0">

                      <input type="text" id="addr" class="form-control input text-center"
                             aria-describedby="passwordHelpInline" v-model="formData.ADDR" @input="indvInfoCheckInputs">
                    </div>
                  </div>
                </div>
                <!-- 인터뷰요청일 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="ntrvDmndDt" class="col-form-label">인터뷰요청일</label>
                  </div>
                </div>
                <!-- 인터뷰요청일 입력란 -->
                <div class="col-12 date-wrap">
                  <div class="col-10 date">
                    <div class="form-group col-12 mb-0 position-relative">
                      <input
                          type="date"
                          id="ntrvDmndDt"
                          class="date-default input form-control text-center"
                          aria-describedby="passwordHelpInline"
                          v-model="formattedInterviewDate"
                          @change="updateInterviewDate"
                          @input="indvInfoCheckInputs"/>
                    </div>
                  </div>
                </div>

                <!-- 투입가능일 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="inpPsbltyDt" class="col-form-label">투입가능일</label>
                  </div>
                </div>

                <!-- 투입가능일 입력란 -->
                <div class="input-wrap"> <!-- 입력란을 가운데 정렬 -->
                  <div class="col-10 d-flex align-items-center"> <!-- 너비를 col-10으로 설정하고 flex 사용 -->
                    <div class="form-group col-12 mb-0 position-relative"> <!-- 입력란 -->
                      <input
                          type="date"
                          id="inpPsbltyDt"
                          class="date-default input form-control text-center pl28 pr8"
                          aria-describedby="passwordHelpInline"
                          v-model="formattedPossibilityDate"
                          @change="updatePossibilityDate"
                          @input="indvInfoCheckInputs"/>
                    </div>
                  </div>
                </div>


                <!-- 월요청단가 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="mmDmndUntprc" class="col-form-label">월 요청단가</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 월요청단가 입력란 -->
                <div class="input-wrap"> <!-- 입력란을 가운데 정렬 -->
                  <div class="col-10 d-flex align-items-center"> <!-- 너비를 col-10으로 설정하고 flex 사용 -->
                    <div class="form-group col-12 mb-0 position-relative"> <!-- 입력란 -->
                      <input type="text" id="mmDmndUntprc"
                             class="form-control flex-all-center w-100 input text-center pl40 pr40"
                             aria-describedby="passwordHelpInline" v-model="formData.MM_DMND_UNTPRC"
                             @input="indvInfoCheckInputs">
                      <span class="position-absolute"
                            style="right: 12px; top: 50%; transform: translateY(-50%);">만원</span>
                    </div>
                  </div>
                </div>

                <!-- 총경력기간 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="tCrPer" class="col-form-label">총 경력기간</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 총경력기간 드롭다운 -->
                <div class="dropdown-wrap">
                  <div class="d-flex col-10">
                    <div class="dropdown d-flex col-5">
                      <button id="tCrPer"
                              class="btn btn-outline-primary dropdown-toggle w-100 input-radius d-flex justify-content-between align-items-center"
                              type="button"
                              data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="flex-grow-1 text-center">{{ selectedYear }}</span> <!-- 기본값 설정 -->
                        <span class="caret"></span> <!-- 화살표 -->
                      </button>
                      <ul class="dropdown-menu">
                        <li v-for="year in years" :key="year">
                          <button class="dropdown-item" type="button" @click="selectYear(year)">{{ year }}</button>
                        </li>
                      </ul>
                    </div>
                    <div class="d-flex col-1 align-items-center ps-2">
                      <span class="col-auto">년</span>
                    </div>
                    <div class="dropdown d-flex col-5">
                      <button id="tCrPer"
                              class="btn btn-outline-primary dropdown-toggle w-100 input-radius d-flex justify-content-between align-items-center"
                              type="button"
                              data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="flex-grow-1 text-center">{{ selectedMonth }}</span> <!-- 기본값 설정 -->
                        <span class="caret"></span> <!-- 화살표 -->
                      </button>
                      <ul class="dropdown-menu">
                        <li v-for="month in months" :key="month">
                          <button class="dropdown-item" type="button" @click="selectMonth(month)">{{ month }}</button>
                        </li>
                      </ul>
                    </div>
                    <div class="d-flex col-1 align-items-center ps-2">
                      <span class="col-auto">개월</span>
                    </div>
                  </div>
                </div>

                <!-- 등급 드롭다운 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="grd" class="col-form-label">등급</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 등급 드롭다운 -->
                <div class="dropdown-wrap">
                  <div class="col-10"> <!-- 너비를 col-10으로 설정 -->
                    <div class="dropdown">
                      <button id="grd" class="btn btn-outline-primary dropdown-toggle" type="button"
                              data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="dropdown-default text-center">{{ selectedGrade || 'N/A' }}</span> <!-- 기본값 설정 -->
                        <span class="caret"></span> <!-- 화살표 -->
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <button class="dropdown-item" type="button" @click="selectGrade('N/A')">N/A</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectGrade('초급')">초급</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectGrade('초상급')">초상급</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectGrade('중급')">중급</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectGrade('중상급')">중상급</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectGrade('고급')">고급</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectGrade('특급')">특급</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- 직위 드롭다운 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="jbps" class="col-form-label">직위</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 직위 드롭다운 -->
                <div class="dropdown-wrap">
                  <div class="col-10"> <!-- 너비를 col-10으로 설정 -->
                    <div class="dropdown">
                      <button id="jbps" class="btn btn-outline-primary dropdown-toggle" type="button"
                              data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="dropdown-default text-center">{{ selectedJbps || 'N/A' }}</span> <!-- 기본값 설정 -->
                        <span class="caret"></span> <!-- 화살표 -->
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <button class="dropdown-item" type="button" @click="selectJbps('N/A')">N/A</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectJbps('사원')">사원</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectJbps('주임')">주임</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectJbps('대리')">대리</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectJbps('과장')">과장</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectJbps('차장')">차장</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectJbps('부장')">부장</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectJbps('이사')">이사</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- 직책 드롭다운 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="jbttl" class="col-form-label">직책</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 직책 드롭다운 -->
                <div class="dropdown-wrap">
                  <div class="col-10"> <!-- 너비를 col-10으로 설정 -->
                    <div class="dropdown">
                      <button id="jbttl" class="btn btn-outline-primary dropdown-toggle" type="button"
                              data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="dropdown-default text-center">{{ selectedJbttl || 'N/A' }}</span> <!-- 기본값 설정 -->
                        <span class="caret"></span> <!-- 화살표 -->
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
                </div>
              </div>
            </div>
            <!-- 개인정보 종료구간 -->

            <!-- 계약상태 시작구간 -->
            <div class="b-line pt-4 pb-4 flex-column d-flex justify-content-center">
              <div class="d-flex justify-content-center">
                <div class="col-10 d-flex align-items-center form-status-bg">
                  <div class="d-flex justify-content-between form-control form-status toggleTextWrap" @click="ctrtSttsHandleClick">
                    <div class="d-flex toggleTextEmptySpace"></div>
                    <div class="d-flex text-center">계약상태</div>
                    <div class="d-flex align-items-center">
                      <div class="form-status-button" :class="{completed: ctrtSttsPaymentInputStatus === '입력완료', default: ctrtSttsPaymentInputStatus !== '입력완료'}">
                        {{ ctrtSttsPaymentInputStatus }}
                      </div>
                      <div class="form-status-toggle-button" :class="{visible: ctrtSttsIsVisible, hidden: !ctrtSttsIsVisible}" @click.stop="ctrtSttsToggleState">
                        &#9660;
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 계약상태 내용 -->
              <div v-if="ctrtSttsIsVisible" class="d-flex row justify-content-center mt20">
                <!-- 계약이력존재여부 드롭다운 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label">
                    <label for="CtrtHstryYn" class="col-form-label">계약이력존재여부</label>
                  </div>
                </div>

                <!-- 계약이력존재여부 드롭다운 -->
                <div class="dropdown-wrap">
                  <div class="col-10"> <!-- 너비를 col-10으로 설정 -->
                    <div class="dropdown">
                      <button id="CtrtHstryYn" class="btn btn-outline-primary dropdown-toggle" type="button"
                              data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="dropdown-default text-center">{{ selectedCtrtHstryYn || 'N' }}</span>
                        <!-- 기본값 설정 -->
                        <span class="caret"></span> <!-- 화살표 -->
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <button class="dropdown-item" type="button" @click="selectCtrtHstryYn('Y')">Y</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectCtrtHstryYn('N')">N</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- 자사정규직여부 드롭다운 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label">
                    <label for="kdsEmpYn" class="col-form-label">자사정규직여부</label>
                  </div>
                </div>

                <!-- 자사정규직여부 드롭다운 -->
                <div class="dropdown-wrap"> <!-- 입력란을 가운데 정렬 -->
                  <div class="col-10"> <!-- 너비를 col-10으로 설정 -->
                    <div class="dropdown">
                      <button id="kdsEmpYn" class="btn btn-outline-primary dropdown-toggle" type="button"
                              data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="dropdown-default text-center">{{ selectedKdsEmpYn || 'N' }}</span> <!-- 기본값 설정 -->
                        <span class="caret"></span> <!-- 화살표 -->
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <button class="dropdown-item" type="button" @click="selectKdsEmpYn('Y')">Y</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectKdsEmpYn('N')">N</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- 계약회사정규직여부 드롭다운 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label">
                    <label for="CrtrCoEmpYn" class="col-form-label">계약회사정규직여부</label>
                  </div>
                </div>

                <!-- 계약회사정규직여부 드롭다운 -->
                <div class="dropdown-wrap"> <!-- 입력란을 가운데 정렬 -->
                  <div class="col-10"> <!-- 너비를 col-10으로 설정 -->
                    <div class="dropdown">
                      <button id="CrtrCoEmpYn" class="btn btn-outline-primary dropdown-toggle" type="button"
                              data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="dropdown-default text-center">{{ selectedCtrtCoEmpYn || 'N' }}</span>
                        <!-- 기본값 설정 -->
                        <span class="caret"></span> <!-- 화살표 -->
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <button class="dropdown-item" type="button" @click="selectCtrtCoEmpYn('Y')">Y</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectCtrtCoEmpYn('N')">N</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <!-- 계약횟수 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label">
                    <label for="ctrtNmtm" class="col-form-label">자사와의 계약횟수</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 계약횟수 입력란 -->
                <div class="input-wrap">
                  <div class="col-10 d-flex align-items-center"> <!-- 너비를 col-10으로 설정하고 flex 사용 -->
                    <div class="form-group col-12 mb-0 position-relative"> <!-- 입력란 -->
                      <input type="text" id="ctrtNmtm" class="form-control flex-all-center w-100 input text-center pl40 pr40"
                             aria-describedby="passwordHelpInline" v-model="formData.CTRT_NMTM" required @input="ctrtSttsCheckInputs">
                      <span class="position-absolute"
                            style="right: 12px; top: 50%; transform: translateY(-50%);">회</span>
                    </div>
                  </div>
                </div>

                <!-- 컨텍방법 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="conttMthd" class="col-form-label">컨텍방법</label>
                  </div>
                </div>

                <!-- 컨텍방법 드롭다운 -->
                <div class="dropdown-wrap"> <!-- 입력란을 가운데 정렬 -->
                  <div class="col-10"> <!-- 너비를 col-10으로 설정 -->
                    <div class="dropdown">
                      <button id="conttMthd"
                              class="btn btn-outline-primary dropdown-toggle w-100 input-radius d-flex justify-content-between align-items-center"
                              type="button"
                              data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="dropdown-default text-center">{{ selectedConttMthd || '잡코리아지원' }}</span>
                        <!-- 기본값 설정 -->
                        <span class="caret"></span> <!-- 화살표 -->
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <button class="dropdown-item d-flex justify-content-center" type="button"
                                  @click="selectConttMthd('잡코리아지원')">잡코리아지원
                          </button>
                        </li>
                        <li>
                          <button class="dropdown-item d-flex justify-content-center" type="button"
                                  @click="selectConttMthd('소개자')">소개자
                          </button>
                        </li>
                        <li>
                          <button class="dropdown-item d-flex justify-content-center" type="button"
                                  @click="selectConttMthd('이메일지원')">이메일지원
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- 프로젝트투입상태 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label">
                    <label for="pjInpStts" class="col-form-label">프로젝트투입상태</label>
                  </div>
                </div>

                <!-- 프로젝트투입상태 드롭다운 -->
                <div class="dropdown-wrap"> <!-- 입력란을 가운데 정렬 -->
                  <div class="col-10"> <!-- 너비를 col-10으로 설정 -->
                    <div class="dropdown">
                      <button id="pjInpStts"
                              class="btn btn-outline-primary dropdown-toggle w-100 input-radius d-flex justify-content-between align-items-center"
                              type="button"
                              data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="dropdown-default text-center">{{ selectedPjInpStts || '구직중' }}</span>
                        <!-- 기본값 설정 -->
                        <span class="caret"></span> <!-- 화살표 -->
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <button class="dropdown-item d-flex justify-content-center" type="button"
                                  @click="selectPjInpStts('구직중')">구직중
                          </button>
                        </li>
                        <li>
                          <button class="dropdown-item d-flex justify-content-center" type="button"
                                  @click="selectPjInpStts('인터뷰대기')">인터뷰대기
                          </button>
                        </li>
                        <li>
                          <button class="dropdown-item d-flex justify-content-center" type="button"
                                  @click="selectPjInpStts('인터뷰중')">인터뷰중
                          </button>
                        </li>
                        <li>
                          <button class="dropdown-item d-flex justify-content-center" type="button"
                                  @click="selectPjInpStts('인터뷰완료')">인터뷰완료
                          </button>
                        </li>
                        <li>
                          <button class="dropdown-item d-flex justify-content-center" type="button"
                                  @click="selectPjInpStts('인터뷰합격')">인터뷰합격
                          </button>
                        </li>
                        <li>
                          <button class="dropdown-item d-flex justify-content-center" type="button"
                                  @click="selectPjInpStts('프로젝트투입중')">프로젝트투입중
                          </button>
                        </li>
                        <li>
                          <button class="dropdown-item d-flex justify-content-center" type="button"
                                  @click="selectPjInpStts('프로젝트만료1달전')">프로젝트만료1달전
                          </button>
                        </li>
                        <li>
                          <button class="dropdown-item d-flex justify-content-center" type="button"
                                  @click="selectPjInpStts('타사프로젝트중')">타사프로젝트중
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- 소속회사 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="ogdpCo" class="col-form-label">소속회사</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 소속회사 입력란 -->
                <div class="input-wrap">
                  <div class="col-10">
                    <input type="text" id="ogdpCo" class="form-control flex-all-center w-100 input text-center"
                           aria-describedby="passwordHelpInline" v-model="formData.OGDP_CO"
                           @input="ctrtSttsCheckInputs">
                  </div>
                </div>

                <!-- 부서 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="dept" class="col-form-label">부서</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 부서 입력란 -->
                <div class="input-wrap">
                  <div class="col-10">
                    <input type="text" id="dept" class="form-control flex-all-center w-100 input text-center"
                           aria-describedby="passwordHelpInline" v-model="formData.DEPT" @input="ctrtSttsCheckInputs">
                  </div>
                </div>
              </div>
            </div>
            <!-- 계약상태 종료구간 -->

            <!-- 보유스킬 시작구간 -->
            <div class="b-line pt-4 pb-4 flex-column d-flex justify-content-center">
              <div class="d-flex justify-content-center">
                <div class="col-10 d-flex align-items-center form-status-bg">
                  <div class="d-flex justify-content-between form-control form-status toggleTextWrap" @click="hldTechHandleClick">
                    <div class="d-flex toggleTextEmptySpace"></div>
                    <div class="d-flex text-center">보유스킬</div>
                    <div class="d-flex align-items-center">
                      <div class="form-status-button" :class="{completed: hldTechPaymentInputStatus === '입력완료', default: hldTechPaymentInputStatus !== '입력완료'}">
                        {{ hldTechPaymentInputStatus }}
                      </div>
                      <div class="form-status-toggle-button" :class="{visible: hldTechIsVisible, hidden: !hldTechIsVisible}" @click.stop="hldTechToggleState">
                        &#9660;
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 보유스킬 내용 -->
              <div v-if="hldTechIsVisible" class="d-flex row justify-content-center mt20">
                <!-- 기종 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="Mdl" class="col-form-label">기종</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 기종 입력란 -->
                <div class="input-wrap">
                  <div class="col-10">
                    <input type="text" id="Mdl" class="form-control flex-all-center w-100 input text-center"
                           aria-describedby="passwordHelpInline" v-model="formData.MDL" @input="hldTechCheckInputs"
                           @blur="updateInputStatus(true)" @focus="updateInputStatus(false)">
                  </div>
                </div>

                <!-- 운영체제 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="Os" class="col-form-label">운영체제</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 운영체제 입력란 -->
                <div class="input-wrap">
                  <div class="col-10">
                    <input type="text" id="Os" class="form-control flex-all-center w-100 input text-center"
                           aria-describedby="passwordHelpInline" v-model="formData.OS" @input="hldTechCheckInputs"
                           @blur="updateInputStatus(true)" @focus="updateInputStatus(false)">
                  </div>
                </div>

                <!-- 언어 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="Lang" class="col-form-label">언어</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 언어 입력란 -->
                <div class="input-wrap">
                  <div class="col-10">
                    <input type="text" id="Lang" class="form-control flex-all-center w-100 input text-center"
                           aria-describedby="passwordHelpInline" v-model="formData.LANG" @input="hldTechCheckInputs"
                           @blur="updateInputStatus(true)" @focus="updateInputStatus(false)">
                  </div>
                </div>

                <!-- 데이터베이스 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="Db" class="col-form-label">데이터베이스</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 데이터베이스 입력란 -->
                <div class="input-wrap">
                  <div class="col-10">
                    <input type="text" id="Db" class="form-control flex-all-center w-100 input text-center"
                           aria-describedby="passwordHelpInline" v-model="formData.DB" @input="hldTechCheckInputs"
                           @blur="updateInputStatus(true)" @focus="updateInputStatus(false)">
                  </div>
                </div>

                <!-- 툴 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="Tool" class="col-form-label">툴</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 툴 입력란 -->
                <div class="input-wrap">
                  <div class="col-10">
                    <input type="text" id="Tool" class="form-control flex-all-center w-100 input text-center"
                           aria-describedby="passwordHelpInline" v-model="formData.TOOL" @input="hldTechCheckInputs"
                           @blur="updateInputStatus(true)" @focus="updateInputStatus(false)">
                  </div>
                </div>

                <!-- 프레임워크 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="Frmw" class="col-form-label">프레임워크</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 프레임워크 입력란 -->
                <div class="input-wrap">
                  <div class="col-10">
                    <input type="text" id="Frmw" class="form-control flex-all-center w-100 input text-center"
                           aria-describedby="passwordHelpInline" v-model="formData.FRMW" @input="hldTechCheckInputs"
                           @blur="updateInputStatus(true)" @focus="updateInputStatus(false)">
                  </div>
                </div>

                <!-- 라이브러리 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="Lbrr" class="col-form-label">라이브러리</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 라이브러리 입력란 -->
                <div class="input-wrap">
                  <div class="col-10">
                    <input type="text" id="Lbrr" class="form-control flex-all-center w-100 input text-center"
                           aria-describedby="passwordHelpInline" v-model="formData.LBRR" @input="hldTechCheckInputs"
                           @blur="updateInputStatus(true)" @focus="updateInputStatus(false)">
                  </div>
                </div>

                <!-- 통신 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="Cmnct" class="col-form-label">통신</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 통신 입력란 -->
                <div class="input-wrap">
                  <div class="col-10">
                    <input type="text" id="Cmnct" class="form-control flex-all-center w-100 input text-center"
                           aria-describedby="passwordHelpInline" v-model="formData.CMNCT" @input="hldTechCheckInputs"
                           @blur="updateInputStatus(true)" @focus="updateInputStatus(false)">
                  </div>
                </div>

                <!-- 기타 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="Etc" class="col-form-label">기타</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 기타 입력란 -->
                <div class="input-wrap">
                  <div class="col-10">
                    <input type="text" id="Etc" class="form-control flex-all-center w-100 input text-center"
                           aria-describedby="passwordHelpInline" v-model="formData.ETC" @input="hldTechCheckInputs"
                           @blur="updateInputStatus(true)" @focus="updateInputStatus(false)">
                  </div>
                </div>
              </div>
            </div>
            <!-- 보유스킬 종료구간 -->

            <!-- 지급정보 시작구간 -->
            <div class="b-line pt-4 pb-4 flex-column d-flex justify-content-start paymentInputWrap">
              <div class="d-flex justify-content-center">
                <div class="col-10 d-flex align-items-center form-status-bg">
                  <div class="d-flex justify-content-between form-control form-status toggleTextWrap" @click="handleClick">
                    <div class="d-flex toggleTextEmptySpace"></div>
                    <div class="d-flex text-center">지급정보</div>
                    <div class="d-flex align-items-center">
                      <div class="form-status-button" :class="{completed: paymentInputStatus === '입력완료', default: paymentInputStatus !== '입력완료'}">
                        {{ paymentInputStatus }}
                      </div>
                      <div class="form-status-toggle-button" :class="{visible: isVisible, hidden: !isVisible}" @click.stop="toggleToggleState">
                        &#9660;
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 지급정보 내용 -->
              <div v-if="isVisible" class="d-flex row justify-content-center mt20">
                <!-- 대금수령날짜 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="clctPickupDt" class="col-form-label">대금수령날짜</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 대금수령날짜 드롭다운 -->
                <div class="input-wrap">
                  <div class="col-10">
                    <div class="d-flex align-items-center">
                      <div class="dropdown flex-grow-1">
                        <button id="clctPickupDt"
                                class="btn btn-outline-primary dropdown-toggle w-100 input-radius d-flex justify-content-between align-items-center"
                                type="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                          <span class="dropdown-default-text text-center">{{ selectedClctPickupDt || 'N/A' }}</span>
                          <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-text">
                          <li>
                            <button class="dropdown-item d-flex justify-content-center" type="button"
                                    @click="selectClctPickupDt('N/A')">N/A
                            </button>
                          </li>
                          <li>
                            <button class="dropdown-item d-flex justify-content-center" type="button"
                                    @click="selectClctPickupDt('1')">1
                            </button>
                          </li>
                          <li>
                            <button class="dropdown-item d-flex justify-content-center" type="button"
                                    @click="selectClctPickupDt('5')">5
                            </button>
                          </li>
                          <li>
                            <button class="dropdown-item d-flex justify-content-center" type="button"
                                    @click="selectClctPickupDt('10')">10
                            </button>
                          </li>
                          <li>
                            <button class="dropdown-item d-flex justify-content-center" type="button"
                                    @click="selectClctPickupDt('15')">15
                            </button>
                          </li>
                          <li>
                            <button class="dropdown-item d-flex justify-content-center" type="button"
                                    @click="selectClctPickupDt('21')">21
                            </button>
                          </li>
                          <li>
                            <button class="dropdown-item d-flex justify-content-center" type="button"
                                    @click="selectClctPickupDt('말')">말
                            </button>
                          </li>
                        </ul>
                      </div>
                      <span class="col-auto ms-2">일</span>
                    </div>
                  </div>
                </div>

                <!-- 지급일자 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="giveDt" class="col-form-label">지급일자</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 지급일자 드롭다운 -->
                <div class="input-wrap">
                  <div class="col-10">
                    <div class="d-flex align-items-center">
                      <div class="dropdown flex-grow-1">
                        <button id="giveDt"
                                class="btn btn-outline-primary dropdown-toggle w-100 input-radius d-flex justify-content-between align-items-center"
                                type="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                          <span class="dropdown-default-text text-center">{{ selectedGiveDt || 'N/A' }}</span>
                          <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-text">
                          <li>
                            <button class="dropdown-item d-flex justify-content-center" type="button"
                                    @click="selectGiveDt('N/A')">N/A
                            </button>
                          </li>
                          <li>
                            <button class="dropdown-item d-flex justify-content-center" type="button"
                                    @click="selectGiveDt('5')">5
                            </button>
                          </li>
                          <li>
                            <button class="dropdown-item d-flex justify-content-center" type="button"
                                    @click="selectGiveDt('10')">10
                            </button>
                          </li>
                          <li>
                            <button class="dropdown-item d-flex justify-content-center" type="button"
                                    @click="selectGiveDt('15')">15
                            </button>
                          </li>
                          <li>
                            <button class="dropdown-item d-flex justify-content-center" type="button"
                                    @click="selectGiveDt('21')">21
                            </button>
                          </li>
                          <li>
                            <button class="dropdown-item d-flex justify-content-center" type="button"
                                    @click="selectGiveDt('말')">말
                            </button>
                          </li>
                        </ul>
                      </div>
                      <span class="col-auto ms-2">일</span>
                    </div>
                  </div>
                </div>

                <!-- 은행 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="bank" class="col-form-label">은행</label>
                  </div>
                </div>

                <!-- 은행 입력란 -->
                <div class="input-wrap">
                  <div class="col-10">
                    <input type="text" id="bank" class="form-control flex-all-center w-100 input text-center"
                           aria-describedby="passwordHelpInline" v-model="formData.BANK" @input="checkInputs">
                  </div>
                </div>

                <!-- 계좌번호 레이블 -->
                <div class="label-wrap col-10">
                  <div class="label-w100">
                    <label for="actNo" class="col-form-label">계좌번호</label>
                  </div>
                </div>

                <!-- 계좌번호 입력란 -->
                <div class="input-wrap">
                  <div class="col-10">
                    <input type="text" id="actNo" class="form-control flex-all-center w-100 input text-center"
                           aria-describedby="passwordHelpInline" v-model="formData.ACTNO" @input="checkInputs">
                  </div>
                </div>
              </div>
            </div>
            <!-- 지급정보 종료구간 -->

            <div class="modal-footer-wrap d-flex align-items-center justify-content-center t_line">
              <div class="modal-footer d-flex">
                <button type="submit" class="btn btn-primary">제출</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- 모달 배경 -->
  <div v-if="showModal" class="modal-backdrop fade show"></div>
</template>

<script setup>
import {ref, onMounted, onUnmounted, computed, nextTick} from 'vue';
import axios from '../../axios';
import eventbus from '@/eventbus/eventbus';

// 개인정보 토글 초기 값
const indvInfoIsVisible = ref(true);
const indvInfoPaymentInputStatus = ref('입력중'); // 초기 상태
const indvInfoIsToggled = ref(false); // 클릭 상태를 관리하는 변수

// 계약상태 토글 초기 값
const ctrtSttsIsVisible = ref(true);
const ctrtSttsPaymentInputStatus = ref('입력중'); // 초기 상태
const ctrtSttsIsToggled = ref(false); // 클릭 상태를 관리하는 변수

// 보유스킬 토글 초기 값
const hldTechIsVisible = ref(true);
const hldTechPaymentInputStatus = ref('입력중'); // 초기 상태
const hldTechIsToggled = ref(false); // 클릭 상태를 관리하는 변수
const hldTechIsBlur = ref(false); // 초기값 설정

// 지급정보 토글 초기 값
const isVisible = ref(true);
const paymentInputStatus = ref('입력중'); // 초기 상태
const isToggled = ref(false); // 클릭 상태를 관리하는 변수

// 개인정보 입력 기본 값
const selectedGndr = ref('남'); // 성벽
const selectedAcbg = ref('고졸'); // 학력
const selectedMs = ref('현역'); // 병역
const selectedWhtaxbzmn = ref('3.3%'); // 소득구분
const years = Array.from({length: 36}, (_, i) => i); // 총 경력기간 드롭다운
const months = Array.from({length: 13}, (_, i) => i); // 총 경력기간 드롭다운
const selectedYear = ref(0); // 총 경력기간
const selectedMonth = ref(0); // 총 경력기간
const selectedGrade = ref('초급'); // 등급
const selectedJbps = ref('사원'); // 직위
const selectedJbttl = ref('PMO'); // 직책

// 계약상태 입력 기본 값
const selectedCtrtHstryYn = ref('N'); // 계약이력존재여부
const selectedKdsEmpYn = ref('N'); // 자사정규직여부
const selectedCtrtCoEmpYn = ref('N'); // 계약회사정규직여부
const selectedConttMthd = ref('잡코리아지원'); // 컨텍방법
const selectedPjInpStts = ref('구직중'); // 프로젝트투입상태

// 지급정보 입력 기본 값
const selectedClctPickupDt = ref('N/A'); // 대금수령날짜
const selectedGiveDt = ref('N/A'); // 지급일자

// formData에 기본 값 정의
const formData = ref({
  DEV_NO: "",
  NM: "",
  PJ_INP_STTS: selectedPjInpStts.value,
  CTRT_NMTM: "",
  BRDT: "",
  GNDR: selectedGndr.value,
  JBPS: selectedJbps.value,
  GRD: selectedGrade.value,
  T_CR_PER: "",
  RGN: "",
  MBL_TELNO: "",
  EML: "",
  CONTT_MTHD: selectedConttMthd.value,
  NTRV_DMND_DT: "",
  INP_PSBLTY_DT: "",
  OGDP_CO: "",
  SN: "",
  WHTAX_YN: "",
  BZMN_YN: "",
  KDS_EMP_YN: selectedKdsEmpYn.value,
  CTRT_CO_EMP_YN: selectedCtrtCoEmpYn.value,
  CLCT_PICKUP_DT: selectedClctPickupDt.value,
  GIVE_DT: selectedGiveDt.value,
  BANK: "",
  ACTNO: "",
  DEPT: "",
  MM_DMND_UNTPRC: "",
  ADDR: "",
  JBTTL: selectedJbttl.value,
  BRKR: "",
  KAKAO_NICK: "",
  CTRT_HSTRY_YN: selectedCtrtHstryYn.value,
  MS: selectedMs.value,
  MDL: "",
  OS: "",
  LANG: "",
  DB: "",
  TOOL: "",
  FRMW: "",
  LBRR: "",
  CMNCT: "",
  ETC: "",
  AGE: "",
  ACBG: selectedAcbg.value,
});

// 개인정보 선택 시작
// 성별 선택
const selectGndr = (gndr) => {
  selectedGndr.value = gndr;
  formData.value.GNDR = gndr;
};

// 학력 선택
const selectAcbg = (acbg) => {
  selectedAcbg.value = acbg;
  formData.value.ACBG = acbg;
};

// 병역 선택
const selectMs = (ms) => {
  selectedMs.value = ms;
  formData.value.MS = ms;
};

// 소득구분 선택
const selectWhtax = (whtax) => {
  selectedWhtaxbzmn.value = whtax;
  formData.value.WHTAX_YN = 'y';
  formData.value.BZMN_YN = 'n';
};
const selectBzmn = (bzmn) => {
  selectedWhtaxbzmn.value = bzmn;
  formData.value.WHTAX_YN = 'n';
  formData.value.BZMN_YN = 'y';
};

// 총 경력기간 선택
const selectYear = (year) => {
  selectedYear.value = year;
  updateT_CR_PER(year, selectedMonth.value);
};
const selectMonth = (month) => {
  selectedMonth.value = month;
  updateT_CR_PER(selectedYear.value, month);
};

// 총 경력기간 업데이트
const updateT_CR_PER = (year, month) => {
  formData.value.T_CR_PER = `${year}년 ${month}개월`;
};

// 등급 선택
const selectGrade = (grade) => {
  selectedGrade.value = grade;
  formData.value.GRD = grade;
};

// 직위 선택
const selectJbps = (jbps) => {
  selectedJbps.value = jbps;
  formData.value.JBPS = jbps;
};

// 직책 선택
const selectJbttl = (jbttl) => {
  selectedJbttl.value = jbttl;
  formData.value.JBTTL = jbttl;
};
// 개인정보 선택 종료

// 계약상태 선택 시작
// 계약이력존재여부 선택
const selectCtrtHstryYn = (ctrtHstryYn) => {
  selectedCtrtHstryYn.value = ctrtHstryYn;
  formData.value.CTRT_HSTRY_YN = ctrtHstryYn;
};

// 자사정규직여부 선택
const selectKdsEmpYn = (kdsEmpYn) => {
  selectedKdsEmpYn.value = kdsEmpYn;
  formData.value.KDS_EMP_YN = kdsEmpYn;
};

// 계약회사정규직여부 선택
const selectCtrtCoEmpYn = (ctrtCoEmpYn) => {
  selectedCtrtCoEmpYn.value = ctrtCoEmpYn;
  formData.value.CTRT_CO_EMP_YN = ctrtCoEmpYn;
};

// 컨택 방법 선택
const selectConttMthd = (conttMthd) => {
  selectedConttMthd.value = conttMthd;
  formData.value.CONTT_MTHD = conttMthd;
};

// 프로젝트 투입상태 선택
const selectPjInpStts = (pjInpStts) => {
  selectedPjInpStts.value = pjInpStts;
  formData.value.PJ_INP_STTS = pjInpStts;
};
// 계약상태 선택 종료

// 지급정보 선택 시작
// 대금수령날짜 선택
const selectClctPickupDt = (clctPickupDt) => {
  selectedClctPickupDt.value = clctPickupDt;
  formData.value.CLCT_PICKUP_DT = clctPickupDt;
  checkInputs(); // 입력 확인
};

// 지급일자 선택
const selectGiveDt = (giveDt) => {
  selectedGiveDt.value = giveDt;
  formData.value.GIVE_DT = giveDt;
  checkInputs(); // 입력 확인
};
// 지급정보 선택 종료

const togglePaymentInputStatus = () => {
  // 입력 완료 상태 전환 로직 (필요에 따라 정의)
  if (isVisible.value === true) {
    isVisible.value = false;
  } else {
    isVisible.value = true;
  }
};

const toggleToggleState = () => {
  isToggled.value = !isToggled.value; // 클릭할 때마다 상태 반전
};

const handleClick = () => {
  togglePaymentInputStatus(); // 상태 전환 메서드 호출
  toggleToggleState(); // 클릭 상태 전환 메서드 호출
  scrollChecks(); // 상태 변경 후 체크
};

//보유스킬 함수
const hldTechTogglePaymentInputStatus = () => {
  // 입력 완료 상태 전환 로직 (필요에 따라 정의)
  if (hldTechIsVisible.value === true) {
    hldTechIsVisible.value = false;
  } else {
    hldTechIsVisible.value = true;
  }
};

const hldTechToggleState = () => {
  hldTechIsToggled.value = !hldTechIsToggled.value; // 클릭할 때마다 상태 반전
};

const hldTechHandleClick = () => {
  hldTechTogglePaymentInputStatus(); // 상태 전환 메서드 호출
  hldTechToggleState(); // 클릭 상태 전환 메서드 호출
  scrollChecks(); // 상태 변경 후 체크
};

//개인정보 함수
const indvInfoTogglePaymentInputStatus = () => {
  // 입력 완료 상태 전환 로직 (필요에 따라 정의)
  if (indvInfoIsVisible.value === true) {
    indvInfoIsVisible.value = false;
  } else {
    indvInfoIsVisible.value = true;
  }
};

const indvInfoToggleState = () => {
  indvInfoIsToggled.value = !indvInfoIsToggled.value; // 클릭할 때마다 상태 반전
};

const indvInfoHandleClick = () => {
  indvInfoTogglePaymentInputStatus(); // 상태 전환 메서드 호출
  indvInfoToggleState(); // 클릭 상태 전환 메서드 호출
  console.log("개인정보 상태:", indvInfoIsVisible.value);
  scrollChecks(); // 상태 변경 후 체크
};

//계약상태 함수
const ctrtSttsTogglePaymentInputStatus = () => {
  // 입력 완료 상태 전환 로직 (필요에 따라 정의)
  if (ctrtSttsIsVisible.value === true) {
    ctrtSttsIsVisible.value = false;
  } else {
    ctrtSttsIsVisible.value = true;
  }
};

const ctrtSttsToggleState = () => {
  ctrtSttsIsToggled.value = !ctrtSttsIsToggled.value; // 클릭할 때마다 상태 반전
};

const ctrtSttsHandleClick = () => {
  ctrtSttsTogglePaymentInputStatus(); // 상태 전환 메서드 호출
  ctrtSttsToggleState(); // 클릭 상태 전환 메서드 호출
  scrollChecks(); // 상태 변경 후 체크
};

// 생년월일 업데이트
const updateBirthDate = () => {
  if (formData.value.BRDT && formData.value.BRDT.length === 6) {
    const year = `20${formData.value.BRDT.slice(0, 2)}`; // YY를 YYYY로 변환
    const month = formData.value.BRDT.slice(2, 4);
    const day = formData.value.BRDT.slice(4, 6);
    // 입력란에 YYYY-MM-DD 형식으로 저장
    formData.value.displayBRDT = `${year}-${month}-${day}`;
    console.log('변환된 생년월일:', formData.value.BRDT);
  } else {
    console.error('잘못된 날짜 형식:', formData.value.BRDT);
  }
  console.log('현재 formData:', formData.value); // formData의 현재 상태 출력
};

// 생년월일을 YYYY-MM-DD 형식으로 유지하기 위해 computed 속성 사용
const formattedBirthDate = computed({
  get: () => {
    return formData.value.displayBRDT || ''; // displayBRDT에서 가져옴
  },
  set: (value) => {
    const dateParts = value.split('-');
    if (dateParts.length === 3) {
      const year = dateParts[0].slice(2); // 연도의 뒤 두 자리
      const month = dateParts[1];
      const day = dateParts[2];
      formData.value.BRDT = `${year}${month}${day}`; // YYMMDD 형식으로 저장
      updateBirthDate(); // 생년월일 업데이트
    } else {
      console.error('잘못된 날짜 형식:', value);
    }
  }
});

// 인터뷰 요청일을 YYYY-MM-DD 형식으로 유지하기 위해 computed 속성 사용
const formattedInterviewDate = computed({
  get: () => {
    if (formData.value.NTRV_DMND_DT) {
      return `${formData.value.NTRV_DMND_DT.slice(0, 4)}-${formData.value.NTRV_DMND_DT.slice(4, 6)}-${formData.value.NTRV_DMND_DT.slice(6, 8)}`;
    }
    return '';
  },
  set: (value) => {
    formData.value.NTRV_DMND_DT = value.replace(/-/g, ''); // YYYY-MM-DD에서 YYYYMMDD로 변환
    updateInterviewDate(); // 인터뷰 요청일 업데이트
  }
});

// 투입 가능일을 YYYY-MM-DD 형식으로 유지하기 위해 computed 속성 사용
const formattedPossibilityDate = computed({
  get: () => {
    if (formData.value.INP_PSBLTY_DT) {
      return `${formData.value.INP_PSBLTY_DT.slice(0, 4)}-${formData.value.INP_PSBLTY_DT.slice(4, 6)}-${formData.value.INP_PSBLTY_DT.slice(6, 8)}`;
    }
    return '';
  },
  set: (value) => {
    formData.value.INP_PSBLTY_DT = value.replace(/-/g, ''); // YYYY-MM-DD에서 YYYYMMDD로 변환
    updatePossibilityDate(); // 투입 가능일 업데이트
  }
});

// 인터뷰 요청일 업데이트
const updateInterviewDate = () => {
  console.log('변환된 인터뷰 요청일:', formData.value.NTRV_DMND_DT);
};

// 투입 가능일 업데이트
const updatePossibilityDate = () => {
  console.log('변환된 투입 가능일:', formData.value.INP_PSBLTY_DT);
};

// 모달 상태 관리
const showModal = ref(false);

const closeModal = () => {
  showModal.value = false; // 모달 닫기
};
// 전화번호 부분을 저장할 배열
const phoneParts = ref(['', '', '']); // 첫 번째, 두 번째, 세 번째 번호를 저장
// 이메일 부분을 저장할 배열
const emailParts = ref(['', '']); // 이메일 앞부분과 도메인을 저장

const checkInputs = () => {
  const {CLCT_PICKUP_DT, GIVE_DT, BANK, ACTNO} = formData.value; // 대문자로 수정
  console.log('현재 입력값:', formData.value); // 전체 입력값 출력
  console.log('CLCT_PICKUP_DT:', CLCT_PICKUP_DT);
  console.log('GIVE_DT:', GIVE_DT);
  console.log('BANK:', BANK);
  console.log('ACTNO:', ACTNO);

  if (CLCT_PICKUP_DT && GIVE_DT && BANK && ACTNO) {
    paymentInputStatus.value = '입력완료'; // 모든 필드가 채워졌을 때
    isVisible.value = false; // 지급 정보를 숨김
    console.log("paymentInputStatus.value", paymentInputStatus.value);
  } else {
    paymentInputStatus.value = '입력중'; // 하나라도 비어있으면
  }
};

const updateInputStatus = (isBlur) => {
  if(check.value === true){
    hldTechIsVisible.value = false;
  }
  hldTechIsBlur.value = isBlur;
  console.log('hldTechIsBlur 상태:', hldTechIsBlur.value);
};
const check = ref(false);
const hldTechCheckInputs = () => {
  const { MDL, OS, LANG, DB, TOOL, FRMW, LBRR, CMNCT, ETC } = formData.value;

  console.log('현재 입력값:', formData.value);
  console.log('hldTechIsBlur:', hldTechIsBlur.value);
  console.log('hldTechPaymentInputStatus:', hldTechPaymentInputStatus.value);

  if (MDL && OS && LANG && DB && TOOL && FRMW && LBRR && CMNCT && ETC) {
    hldTechPaymentInputStatus.value = '입력완료'; // 모든 필드가 채워졌을 때
    console.log("hldTechIsBlur.value",hldTechIsBlur.value);
    // hldTechIsBlur가 true일 때만 지급 정보를 숨김
    if (hldTechIsBlur.value) {
      console.log('블러 true.');
      hldTechIsVisible.value = true;
    } else {
      console.log('입력 완료 상태이지만 focus 상태입니다.');
      check.value = true;
    }

  } else {
    hldTechPaymentInputStatus.value = '입력중'; // 하나라도 비어있으면
    hldTechIsVisible.value = true; // 지급 정보를 보이게 함
  }
};

//개인정보 체크
const indvInfoCheckInputs = () => {
  const {
    NM, BRKR, KAKAO_NICK, formattedBirthDate, SN, AGE,
    MBL_TELNO, EML,
    RGN, ADDR, formattedInterviewDate, formattedPossibilityDate, MM_DMND_UNTPRC
  } = formData.value; // 대문자로 수정
  console.log('현재 입력값:', formData.value); // 전체 입력값 출력

  if (NM && BRKR && KAKAO_NICK && formattedBirthDate && SN && AGE &&
      MBL_TELNO && EML && RGN && ADDR && formattedInterviewDate && formattedPossibilityDate && MM_DMND_UNTPRC) {
    indvInfoPaymentInputStatus.value = '입력완료'; // 모든 필드가 채워졌을 때
    // indvInfoIsVisible.value = false; // 지급 정보를 숨김
  } else {
    indvInfoPaymentInputStatus.value = '입력중'; // 하나라도 비어있으면
  }
};

// 입력값 검증 및 개인 정보 체크 함수
const handleInput = (event) => {
  const input = event.target.value;
  // 숫자만 남기고 나머지 지우기
  const numericInput = input.replace(/[^\d]/g, ''); // 숫자가 아닌 문자 제거

  // 7자리까지만 허용
  formData.value.SN = numericInput.slice(0, 7);

  // 개인 정보 체크 함수 호출
  indvInfoCheckInputs();
};

const ctrtSttsCheckInputs = () => {
  const {CTRT_NMTM, OGDP_CO, DEPT} = formData.value; // 대문자로 수정
  console.log('현재 입력값:', formData.value); // 전체 입력값 출력

  if (CTRT_NMTM && OGDP_CO && DEPT) {
    ctrtSttsPaymentInputStatus.value = '입력완료'; // 모든 필드가 채워졌을 때
    ctrtSttsIsVisible.value = false; // 지급 정보를 숨김
  } else {
    ctrtSttsPaymentInputStatus.value = '입력중'; // 하나라도 비어있으면
  }
};

const hasPadding = ref(true); // 패딩 상태 관리

// 스크롤 체크 함수
const scrollChecks = () => {
  console.log("개인정보 상태:", indvInfoIsVisible.value);
  console.log("계약상태 상태:", ctrtSttsIsVisible.value);
  console.log("보유스킬 상태:", hldTechIsVisible.value);
  console.log("지급정보 상태:", isVisible.value);
  // 모든 섹션이 접혀 있을 때
  if (
      indvInfoIsVisible.value === true ||
      ctrtSttsIsVisible.value === true ||
      hldTechIsVisible.value === true ||
      isVisible.value === true
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

  // MBL_TELNO에 번호를 결합하여 저장
  formData.value.MBL_TELNO = phoneParts.value.join('-'); // '-'로 결합
  // EML에 이메일을 결합하여 저장
  formData.value.EML = emailParts.value.join('@');

  console.log('제출할 formData:', formData.value); // 제출할 때 formData 상태 출력
  try {
    const response = await axios.post('http://localhost:8080/api/addDeveloper', formData.value);
    alert(response.data.message); // 성공 메시지 표시

    // 데이터 새로 고침 이벤트 발생
    console.log("refreshData 호출 전"); // 디버깅 로그
    eventbus.SearchResultEvent.refreshData(); // 이벤트 발생
    console.log("refreshData 호출 후"); // 디버깅 로그
    closeModal();
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || '개발자 추가에 실패했습니다.';
    alert(`오류: ${errorMessage}`);
    closeModal();
  }
};

// 모달 열기 핸들러
const openModalHandler = () => {
  formData.value = {
    DEV_NO: "",
    NM: "",
    PJ_INP_STTS: selectedPjInpStts.value, // 초기화
    CTRT_NMTM: "",
    BRDT: "",
    GNDR: selectedGndr.value, // 기본값으로 '남' 설정
    JBPS: selectedJbps.value, // 초기화
    GRD: selectedGrade.value, // 초기화
    T_CR_PER: "",
    RGN: "",
    MBL_TELNO: "",
    EML: "",
    CONTT_MTHD: selectedConttMthd.value, // 초기화
    NTRV_DMND_DT: "",
    INP_PSBLTY_DT: "",
    OGDP_CO: "",
    SN: "",
    WHTAX_YN: "",
    BZMN_YN: "",
    KDS_EMP_YN: selectedKdsEmpYn.value,
    CTRT_CO_EMP_YN: selectedCtrtCoEmpYn.value,
    CLCT_PICKUP_DT: selectedClctPickupDt.value, // 초기화
    GIVE_DT: selectedGiveDt.value, // 초기화
    BANK: "",
    ACTNO: "",
    DEPT: "",
    MM_DMND_UNTPRC: "",
    ADDR: "",
    JBTTL: selectedJbttl.value, // 초기화
    BRKR: "",
    KAKAO_NICK: "",
    CTRT_HSTRY_YN: selectedCtrtHstryYn.value,
    MS: selectedMs.value, // 초기화
    MDL: "",
    OS: "",
    LANG: "",
    DB: "",
    TOOL: "",
    FRMW: "",
    LBRR: "",
    CMNCT: "",
    ETC: "",
    AGE: "",
    ACBG: selectedAcbg.value
  }; // 초기화
  showModal.value = true; // 모달 열기
};

// 컴포넌트가 마운트될 때 이벤트 핸들러 추가
onMounted(async () => {
  eventbus.SearchResultEvent.add('openModal', openModalHandler); // 모달 열기 이벤트 등록
  await nextTick(); // DOM 업데이트 후
  scrollChecks(); // 초기 상태 체크
});

// 컴포넌트가 언마운트될 때 핸들러 제거
onUnmounted(() => {
  eventbus.SearchResultEvent.remove('openModal', openModalHandler); // 모달 열기 이벤트 제거
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

.label-w100 {
  display: flex;
  justify-content: center;
  width: 100px;
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

.dropdown-menu {
  overflow-y: scroll;
  padding-left: 18px;
  width:100%;
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