<template>
  <div class="modal fade" :class="{ show: showModal }" v-if="showModal" tabindex="-1"
       aria-labelledby="staticBackdropLabel" aria-hidden="false" style="display: block;">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-sm custom-modal">
      <div class="modal-content">
        <div class="modal-header d-flex align-items-center"> <!-- Flexbox로 구성 -->
          <div class="flex-grow-1 text-center"> <!-- 제목을 중앙에 위치시키고 넓이를 차지하도록 설정 -->
            <h1 class="modal-title fs-4" id="staticBackdropLabel">개발자 추가</h1>
          </div>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button> <!-- 오른쪽 정렬 -->
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm" class="row g-3">
            <!--폼 내용 시작-->
            <div class="b_line pb-3">
              <div class="mb-2 d-flex justify-content-center"> <!-- 입력란을 가운데 정렬 -->
                <div class="col-10 d-flex align-items-center form-status-bg" > <!-- 배경색을 하얀색으로 설정 -->
                  <div class="d-flex justify-content-between form-control form-status" value="개인정보" style="border: 1px solid #ced4da;">
                    <div>개인정보</div>
                    <div class="d-flex align-items-center" style="margin-left: auto;">
                      <div class="form-status-button me-2">입력중</div>
                      <div class="me-1">&#9660;</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex mb-2 row justify-content-center"> <!-- 전체를 중앙 정렬 -->
                <!-- 이름 레이블 -->
                <div class="d-flex col-10 justify-content-center"> <!-- col-8로 설정하고 가운데 정렬 -->
                  <div class="d-flex justify-content-start w-100"> <!-- 내부 요소를 왼쪽 정렬 -->
                    <label for="inputPassword6" class="col-form-label">이름</label>
                  </div>
                </div>
                <!-- 이름 입력란 -->
                <div class="mb-2 d-flex justify-content-center"> <!-- 입력란을 가운데 정렬 -->
                  <div class="col-10"> <!-- 너비를 col-8로 설정 -->
                    <input type="text" id="inputPassword6" class="form-control div_flex_center w-100 input-radius"
                           aria-describedby="passwordHelpInline" v-model="formData.NM">
                  </div>
                </div>
                <!-- 소개자 레이블 -->
                <div class="d-flex col-10 justify-content-center"> <!-- col-8로 설정하고 가운데 정렬 -->
                  <div class="d-flex justify-content-start w-100"> <!-- 내부 요소를 왼쪽 정렬 -->
                    <label for="brkr" class="col-form-label">소개자</label>
                  </div>
                </div>
                <!-- 소개자 입력란 -->
                <div class="mb-2 d-flex justify-content-center"> <!-- 입력란을 가운데 정렬 -->
                  <div class="col-10"> <!-- 너비를 col-8로 설정 -->
                    <input type="text" id="brkr" class="form-control div_flex_center w-100 input-radius"
                           aria-describedby="passwordHelpInline" v-model="formData.BRKR">
                  </div>
                </div>
                <!-- 카카오톡 닉네임 레이블 -->
                <div class="d-flex col-10 justify-content-center"> <!-- col-8로 설정하고 가운데 정렬 -->
                  <div class="d-flex justify-content-start w-100"> <!-- 내부 요소를 왼쪽 정렬 -->
                    <label for="KakaoNick" class="col-form-label">카카오톡닉네임</label>
                  </div>
                </div>
                <!-- 카카오톡 닉네임 입력란 -->
                <div class="mb-2 d-flex justify-content-center"> <!-- 입력란을 가운데 정렬 -->
                  <div class="col-10"> <!-- 너비를 col-8로 설정 -->
                    <input type="text" id="KakaoNick" class="form-control div_flex_center w-100 input-radius"
                           aria-describedby="passwordHelpInline" v-model="formData.KAKAO_NICK">
                  </div>
                </div>
                <!-- 성별 드롭다운 레이블 -->
                <div class="d-flex col-10 justify-content-center"> <!-- col-8로 설정하고 가운데 정렬 -->
                  <div class="d-flex justify-content-start w-100"> <!-- 내부 요소를 왼쪽 정렬 -->
                    <label for="genderDropdown" class="col-form-label">성별</label>
                  </div>
                </div>

                <!-- 성별 드롭다운 -->
                <div class="mb-2 d-flex justify-content-center"> <!-- 입력란을 가운데 정렬 -->
                  <div class="col-10"> <!-- 너비를 col-8로 설정 -->
                    <div class="dropdown">
                      <button id="genderDropdown" class="btn btn-outline-primary dropdown-toggle w-100 input-radius d-flex justify-content-between align-items-center" type="button"
                              data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="flex-grow-1 text-center">{{ selectedGender.GNDR || '남' }}</span> <!-- 기본값 설정 -->
                        <span class="caret"></span> <!-- 화살표 -->
                      </button>
                      <ul class="dropdown-menu" style="width: 100%;">
                        <li>
                          <button class="dropdown-item d-flex justify-content-center" type="button" @click="selectGender('남')">남</button>
                        </li>
                        <li>
                          <button class="dropdown-item d-flex justify-content-center" type="button" @click="selectGender('여')">여</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <!-- 생년월일 및 일련번호 -->
                <div class="mb-2 d-flex justify-content-center"> <!-- 입력란을 가운데 정렬 -->
                  <div class="col-10 d-flex align-items-center"> <!-- col-10으로 설정하고 세로 정렬 -->
                    <!-- 생년월일 -->
                    <div class="form-group col-5 d-flex flex-column align-items-center mb-0"> <!-- 오른쪽 여백 추가 및 세로 정렬 -->
                      <label for="brdt" class="col-form-label mb-1" style="font-size: 0.9rem;">생년월일</label> <!-- 레이블 -->
                      <input type="date" id="brdt" class="form-control input-radius text-center" style="text-align: center;"
                             aria-describedby="passwordHelpInline" v-model="formData.BRDT"> <!-- 입력란 -->
                    </div>
                    <!-- 구분 기호 -->
                    <div class="col-1 d-flex justify-content-center align-items-center mb-0">
                      <span style="margin: 0;">-</span> <!-- 구분 기호 -->
                    </div>
                    <!-- 일련번호 -->
                    <div class="form-group col-6 d-flex flex-column align-items-center mb-0">
                      <label for="sn" class="col-form-label mb-1" style="font-size: 0.9rem;">일련번호</label> <!-- 레이블 -->
                      <input type="text" id="sn" class="form-control input-radius text-center"
                             aria-describedby="passwordHelpInline" v-model="formData.SN"> <!-- 입력란 -->
                    </div>
                  </div>
                </div>
                <!-- 나이 레이블 -->
                <div class="d-flex col-10 justify-content-center"> <!-- col-10으로 설정하고 가운데 정렬 -->
                  <div class="d-flex justify-content-start w-100"> <!-- 내부 요소를 왼쪽 정렬 -->
                    <label for="age" class="col-form-label">나이</label> <!-- 레이블 -->
                  </div>
                </div>
                <!-- 나이 입력란 -->
                <div class="mb-2 d-flex justify-content-center"> <!-- 입력란을 가운데 정렬 -->
                  <div class="col-10"> <!-- 너비를 col-10으로 설정 -->
                    <input type="text" id="age" class="form-control div_flex_center w-100 input-radius"
                           aria-describedby="passwordHelpInline" v-model="formData.AGE"> <!-- 입력란 -->
                  </div>
                </div>
                <!-- 학력 레이블 -->
                <div class="d-flex col-10 justify-content-center"> <!-- col-10으로 설정하고 가운데 정렬 -->
                  <div class="d-flex justify-content-start w-100"> <!-- 내부 요소를 왼쪽 정렬 -->
                    <label for="acbgDropdown" class="col-form-label">학력</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 학력 드롭다운 -->
                <div class="mb-2 d-flex justify-content-center"> <!-- 드롭다운을 가운데 정렬 -->
                  <div class="col-10"> <!-- 너비를 col-10으로 설정 -->
                    <div class="dropdown">
                      <button id="acbgDropdown" class="btn btn-outline-primary dropdown-toggle w-100 input-radius d-flex justify-content-between align-items-center" type="button"
                              data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="flex-grow-1 text-center">{{ selectedAcbg.ACBG || '고졸' }}</span> <!-- 기본값 설정 -->
                        <span class="caret"></span> <!-- 화살표 -->
                      </button>
                      <ul class="dropdown-menu" style="width: 100%;">
                        <li>
                          <button class="dropdown-item d-flex justify-content-center" type="button" @click="selectAcbg('고졸')">고졸</button>
                        </li>
                        <li>
                          <button class="dropdown-item d-flex justify-content-center" type="button" @click="selectAcbg('대학교')">대학교</button>
                        </li>
                        <li>
                          <button class="dropdown-item d-flex justify-content-center" type="button" @click="selectAcbg('대학원')">대학원</button>
                        </li>
                        <li>
                          <button class="dropdown-item d-flex justify-content-center" type="button" @click="selectAcbg('기타')">기타</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <!-- 병역 레이블 -->
                <div class="d-flex col-10 justify-content-center"> <!-- col-10으로 설정하고 가운데 정렬 -->
                  <div class="d-flex justify-content-start w-100"> <!-- 내부 요소를 왼쪽 정렬 -->
                    <label for="msDropdown" class="col-form-label">병역</label> <!-- 레이블 -->
                  </div>
                </div>

                <!-- 병역 드롭다운 -->
                <div class="mb-2 d-flex justify-content-center">
                  <div class="col-10"> <!-- 너비를 col-10으로 설정 -->
                    <div class="dropdown">
                      <button id="msDropdown" class="btn btn-outline-primary dropdown-toggle w-100 input-radius d-flex justify-content-between align-items-center" type="button"
                              data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="flex-grow-1 text-center">{{ selectedMs || 'N/A' }}</span> <!-- 기본값 설정 -->
                        <span class="caret"></span> <!-- 화살표 -->
                      </button>
                      <ul class="dropdown-menu" style="width: 100%;">
                        <li>
                          <button class="dropdown-item d-flex justify-content-center" type="button" @click="selectMs('N/A')">N/A</button>
                        </li>
                        <li>
                          <button class="dropdown-item d-flex justify-content-center" type="button" @click="selectMs('현역')">현역</button>
                        </li>
                        <li>
                          <button class="dropdown-item d-flex justify-content-center" type="button" @click="selectMs('예비역')">예비역</button>
                        </li>
                        <li>
                          <button class="dropdown-item d-flex justify-content-center" type="button" @click="selectMs('보충역')">보충역</button>
                        </li>
                        <li>
                          <button class="dropdown-item d-flex justify-content-center" type="button" @click="selectMs('병역준비역 및 전시근로역')">병역준비역 및 전시근로역</button>
                        </li>
                        <li>
                          <button class="dropdown-item d-flex justify-content-center" type="button" @click="selectMs('면제')">면제</button>
                        </li>
                        <li>
                          <button class="dropdown-item d-flex justify-content-center" type="button" @click="selectMs('공익')">공익</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <!--     휴대전화번호       -->
                <div class="col-auto d-flex align-items-center p-3">
                  <label for="mblTelno" class="pr-1 col-form-label">휴대전화번호</label>
                  <input type="text" id="mblTelno" class="div_width140 form-control"
                         aria-describedby="passwordHelpInline" v-model="formData.MBL_TELNO">
                </div>

                <!--     이메일       -->
                <div class="col-auto d-flex align-items-center p-3">
                  <label for="eml" class="pr-1 col-form-label">이메일</label>
                  <input type="text" class="div_width240 form-control" aria-describedby="passwordHelpInline"
                         v-model="formData.EML">
                </div>
              </div>
              <!--     3.3%여부       -->
              <div class="row d-flex align-items-center">
                <div class="col-auto d-flex align-items-center p-3">
                  <label for="whtaxYn" class="pr-1 col-form-label">3.3%</label>
                  <div class="col-auto form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="whtaxYn" v-model="formData.WHTAX_YN">
                  </div>
                </div>
                <!--     사업자여부       -->
                <div class="col-auto d-flex align-items-center p-3">
                  <label for="bzmnYn" class="pr-1 col-form-label">사업자</label>
                  <div class="col-auto form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="bzmnYn" v-model="formData.BZMN_YN">
                  </div>
                </div>
                <!--     지역       -->
                <div class="col-auto d-flex align-items-center p-3">
                  <label for="rgn" class="pr-1 col-form-label">지역</label>
                  <div class="col-auto">
                    <input type="text" id="rgn" class="div_width130 form-control" aria-describedby="passwordHelpInline"
                           v-model="formData.RGN">
                  </div>
                </div>
                <!--     주소       -->
                <div class="col-auto d-flex align-items-center p-3">
                  <label for="addr" class="pr-1 col-form-label">주소</label>
                  <div class="col-auto">
                    <input type="text" id="addr" class="div_width300 form-control"
                           aria-describedby="passwordHelpInline" v-model="formData.ADDR">
                  </div>
                </div>
                <!--     인터뷰요청일       -->
                <div class="col-auto d-flex align-items-center p-3">
                  <label for="ntrvDmndDt" class="pr-1 col-form-label">인터뷰요청일</label>
                  <div class="col-auto">
                    <input type="text" id="ntrvDmndDt" class="div_width100 form-control"
                           aria-describedby="passwordHelpInline" v-model="formData.NTRV_DMND_DT">
                  </div>
                </div>
                <!--     투입가능일       -->
                <div class="col-auto d-flex align-items-center p-3">
                  <label for="inpPsbltyDt" class="pr-1 col-form-label">투입가능일</label>
                  <div class="col-auto">
                    <input type="text" id="inpPsbltyDt" class="div_width100 form-control"
                           aria-describedby="passwordHelpInline" v-model="formData.INP_PSBLTY_DT">
                  </div>
                </div>
                <!--     월요청단가       -->
                <div class="col-auto d-flex align-items-center p-3">
                  <label for="mmDmndUntprc" class="pr-1 col-form-label">월 요청단가</label>
                  <input type="text" id="mmDmndUntprc" class="div_width65 form-control"
                         aria-describedby="passwordHelpInline" v-model="formData.MM_DMND_UNTPRC">만원
                </div>
              </div>
              <div class="row align-items-center">
                <!--     학력       -->
                <div class="col-auto d-flex align-items-center p-3">
                  <label for="acbg" class="pr-1 col-form-label">학력</label>
                  <div class="col-auto">
                    <input type="text" id="acbg" class="div_width100 form-control div_flex_center"
                           aria-describedby="passwordHelpInline" v-model="formData.ACBG">
                  </div>
                </div>
                <!-- 총경력기간 -->
                <div class="col-auto d-flex align-items-center p-3">
                  <label for="tCrPer" class="pr-1 col-form-label">총 경력기간</label>
                  <div class="col-auto dropdown">
                    <button id="tCrPer" class="btn btn-outline-primary dropdown-toggle" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                      {{ selectedYear }}
                    </button>
                    <ul class="dropdown-menu">
                      <li v-for="year in years" :key="year">
                        <button class="dropdown-item" type="button" @click="selectYear(year)">{{ year }}</button>
                      </li>
                    </ul>
                  </div>
                  <span class="col-auto">년</span>
                </div>
                <div class="col-auto dropdown">
                  <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                          aria-expanded="false">
                    {{ selectedMonth }}
                  </button>
                  <ul class="dropdown-menu">
                    <li v-for="month in months" :key="month">
                      <button class="dropdown-item" type="button" @click="selectMonth(month)">{{ month }}</button>
                    </li>
                  </ul>
                </div>
                <span class="col-auto">개월</span>
                <!--      등급      -->
                <div class="col-auto d-flex align-items-center p-3">
                  <label for="grd" class="pr-1 col-form-label">등급</label>
                  <div class="col-auto dropdown">
                    <button id="grd" class="btn btn-outline-primary dropdown-toggle" type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                      {{ selectedGrade }}
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
                <!--      직위      -->
                <div class="col-auto d-flex align-items-center p-3">
                  <label for="jbps" class="pr-1 col-form-label">직위</label>
                  <div class="col-auto dropdown">
                    <button id="jbps" class="btn btn-outline-primary dropdown-toggle" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                      {{ selectedJbps }}
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
                <!--      병역      -->
                <div class="col-auto d-flex align-items-center p-3">
                  <label for="ms" class="pr-1 col-form-label">병역</label>
                  <div class="col-auto dropdown">
                    <button id="ms" class="btn btn-outline-primary dropdown-toggle" type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                      {{ selectedMs }}
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
                        <button class="dropdown-item" type="button" @click="selectMs('병역준비역 및 전시근로역')">병역준비역 및 전시근로역</button>
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
            </div>
            <div class="b_line pb-3">
              <div class="d-flex align-items-start">
                <label class="col-form-label fs-5">계약상태</label>
              </div>
              <div class="d-flex row align-items-center">
                <!--     계약이력존재여부       -->
                <div class="row align-items-center">
                  <div class="col-auto d-flex align-items-center p-3">
                    <label for="CtrtHstryYn" class="pr-1 col-form-label">계약이력존재여부</label>
                    <div class="col-auto form-check form-switch">
                      <input class="form-check-input" type="checkbox" id="CtrtHstryYn" v-model="formData.CTRT_HSTRY_YN">
                    </div>
                  <!--     자사정규직여부       -->
                  </div>
                  <div class="col-auto d-flex align-items-center p-3">
                    <label for="kdsEmpYn" class="pr-1 col-form-label">자사정규직여부</label>
                    <div class="col-auto form-check form-switch">
                      <input class="form-check-input" type="checkbox" id="kdsEmpYn" v-model="formData.KDS_EMP_YN">
                    </div>
                  </div>
                  <!--      계약횟수      -->
                  <div class="col-auto d-flex align-items-center p-3">
                    <label for="ctrtNmtm" class="pr-1 col-form-label">계약횟수</label>
                    <div class="col-auto dropdown">
                      <button id="ctrtNmtm" class="btn btn-outline-primary dropdown-toggle" type="button"
                              data-bs-toggle="dropdown" aria-expanded="false">
                        {{ selectedCrtrNmtm }}
                      </button>
                      <ul class="dropdown-menu">
                        <li v-for="crtrNmtm in crtrNmtms" :key="crtrNmtm">
                          <button class="dropdown-item" type="button" @click="selectCrtrNmtm(crtrNmtm)">{{ crtrNmtm }}</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!--      컨텍방법      -->
                  <div class="col-auto d-flex align-items-center p-3">
                    <label for="conttMthd" class="pr-1 col-form-label">컨텍방법</label>
                    <div class="col-auto dropdown">
                      <button id="conttMthd" class="btn btn-outline-primary dropdown-toggle" type="button"
                              data-bs-toggle="dropdown" aria-expanded="false">
                        {{ selectedConttMthd }}
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <button class="dropdown-item" type="button" @click="selectConttMthd('잡코리아지원')">잡코리아지원</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectConttMthd('소개자')">소개자</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectConttMthd('이메일지원')">이메일지원</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!--     프로젝트투입상태       -->
                  <div class="col-auto d-flex align-items-center p-3">
                    <label for="pjInpStts" class="pr-1 col-form-label">프로젝트투입상태</label>
                    <div class="col-auto dropdown">
                      <button id="pjInpStts" class="btn btn-outline-primary dropdown-toggle" type="button"
                              data-bs-toggle="dropdown" aria-expanded="false">
                        {{ selectedPjInpStts }}
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <button class="dropdown-item" type="button" @click="selectPjInpStts('구직중')">구직중</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectPjInpStts('인터뷰대기')">인터뷰대기</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectPjInpStts('인터뷰중')">인터뷰중</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectPjInpStts('인터뷰완료')">인터뷰완료</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectPjInpStts('인터뷰합격')">인터뷰합격</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectPjInpStts('프로젝트투입중')">프로젝트투입중</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectPjInpStts('프로젝트만료1달전')">프로젝트만료1달전</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectPjInpStts('타사프로젝트중')">타사프로젝트중</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!--     소속회사       -->
                  <div class="col-auto d-flex align-items-center p-3">
                    <label for="ogdpCo" class="pr-1 col-form-label">소속회사</label>
                    <div class="col-auto">
                      <input type="text" id="ogdpCo" class="div_width130 form-control"
                             aria-describedby="passwordHelpInline" v-model="formData.OGDP_CO">
                    </div>
                  </div>
                  <!--     부서       -->
                  <div class="col-auto d-flex align-items-center p-3">
                    <label for="dept" class="pr-1 col-form-label">부서</label>
                    <div class="col-auto">
                      <input type="text" id="dept" class="div_width130 form-control"
                             aria-describedby="passwordHelpInline" v-model="formData.DEPT">
                    </div>
                  </div>
                  <!--     계약회사정규직여부       -->
                  <div class="col-auto d-flex align-items-center p-3">
                    <label for="CrtrCoEmpYn" class="pr-1 col-form-label">계약회사정규직여부</label>
                    <div class="col-auto form-check form-switch">
                      <input class="form-check-input" type="checkbox" id="CrtrCoEmpYn" v-model="formData.CTRT_CO_EMP_YN">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="b_line pb-3">
              <div class="d-flex align-items-start">
                <label class="col-form-label fs-5">보유스킬</label>
              </div>
              <div class="d-flex row align-items-center">
                <!--     기종       -->
                <div class="row align-items-center">
                  <div class="col-auto d-flex align-items-center p-3">
                    <label for="Mdl" class="pr-1 col-form-label">기종</label>
                    <div class="col-auto">
                      <input type="text" id="Mdl" class="div_width130 form-control"
                             aria-describedby="passwordHelpInline" v-model="formData.MDL">
                    </div>
                  </div>
                  <div class="col-auto d-flex align-items-center p-3">
                    <label for="Os" class="pr-1 col-form-label">운영체제</label>
                    <div class="col-auto">
                      <input type="text" id="Os" class="div_width130 form-control"
                             aria-describedby="passwordHelpInline" v-model="formData.OS">
                    </div>
                  </div>
                  <div class="col-auto d-flex align-items-center p-3">
                    <label for="Lang" class="pr-1 col-form-label">언어</label>
                    <div class="col-auto">
                      <input type="text" id="Lang" class="div_width130 form-control"
                             aria-describedby="passwordHelpInline" v-model="formData.LANG">
                    </div>
                  </div>
                  <div class="col-auto d-flex align-items-center p-3">
                    <label for="Db" class="pr-1 col-form-label">데이터베이스</label>
                    <div class="col-auto">
                      <input type="text" id="Db" class="div_width130 form-control"
                             aria-describedby="passwordHelpInline" v-model="formData.DB">
                    </div>
                  </div>
                  <div class="col-auto d-flex align-items-center p-3">
                    <label for="Tool" class="pr-1 col-form-label">툴</label>
                    <div class="col-auto">
                      <input type="text" id="Tool" class="div_width130 form-control"
                             aria-describedby="passwordHelpInline" v-model="formData.TOOL">
                    </div>
                  </div>
                  <div class="col-auto d-flex align-items-center p-3">
                    <label for="Frmw" class="pr-1 col-form-label">프레임워크</label>
                    <div class="col-auto">
                      <input type="text" id="Frmw" class="div_width130 form-control"
                             aria-describedby="passwordHelpInline" v-model="formData.FRMW">
                    </div>
                  </div>
                  <div class="col-auto d-flex align-items-center p-3">
                    <label for="Lbrr" class="pr-1 col-form-label">라이브러리</label>
                    <div class="col-auto">
                      <input type="text" id="Lbrr" class="div_width130 form-control"
                             aria-describedby="passwordHelpInline" v-model="formData.LBRR">
                    </div>
                  </div>
                  <div class="col-auto d-flex align-items-center p-3">
                    <label for="Cmnct" class="pr-1 col-form-label">통신</label>
                    <div class="col-auto">
                      <input type="text" id="Cmnct" class="div_width130 form-control"
                             aria-describedby="passwordHelpInline" v-model="formData.CMNCT">
                    </div>
                  </div>
                  <div class="col-auto d-flex align-items-center p-3">
                    <label for="Etc" class="pr-1 col-form-label">기타</label>
                    <div class="col-auto">
                      <input type="text" id="Etc" class="div_width130 form-control"
                             aria-describedby="passwordHelpInline" v-model="formData.ETC">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="b_line pb-3">
              <div class="d-flex align-items-start">
              <label class="col-form-label fs-5">지급정보</label>
            </div>
              <div class="d-flex row align-items-center">
                <!--     대금수령날짜       -->
                <div class="row align-items-center">
                  <div class="col-auto d-flex align-items-center p-3">
                    <label for="clctPickupDt" class="pr-1 col-form-label">대금수령날짜</label>
                    <div class="col-auto dropdown">
                      <button id="clctPickupDt" class="btn btn-outline-primary dropdown-toggle" type="button"
                              data-bs-toggle="dropdown" aria-expanded="false">
                        {{ selectedClctPickupDt }}
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <button class="dropdown-item" type="button" @click="selectClctPickupDt('N/A')">N/A</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectClctPickupDt('1')">1</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectClctPickupDt('5')">5</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectClctPickupDt('10')">10</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectClctPickupDt('15')">15</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectClctPickupDt('21')">21</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectClctPickupDt('말')">말</button>
                        </li>
                      </ul>
                    </div>
                    <span class="col-auto">
                      일
                    </span>
                  </div>
                  <!--     지급일자       -->
                  <div class="col-auto d-flex align-items-center p-3">
                    <label for="giveDt" class="pr-1 col-form-label">지급일자</label>
                    <div class="col-auto dropdown">
                      <button id="giveDt" class="btn btn-outline-primary dropdown-toggle" type="button"
                              data-bs-toggle="dropdown" aria-expanded="false">
                        {{ selectedGiveDt }}
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <button class="dropdown-item" type="button" @click="selectGiveDt('N/A')">N/A</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectGiveDt('5')">5</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectGiveDt('10')">10</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectGiveDt('15')">15</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectGiveDt('21')">21</button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button" @click="selectGiveDt('말')">말</button>
                        </li>
                      </ul>
                    </div>
                    <span class="col-auto">
                일
              </span>
                  </div>
                  <!--     은행       -->
                  <div class="col-auto d-flex align-items-center p-3">
                    <label for="bank" class="pr-1 col-form-label">은행</label>
                    <div class="col-auto">
                      <input type="text" id="bank" class="div_width130 form-control"
                             aria-describedby="passwordHelpInline" v-model="formData.BANK">
                    </div>
                  </div>
                  <!--     계좌번호       -->
                  <div class="col-auto d-flex align-items-center p-3">
                    <label for="actNo" class="pr-1 col-form-label">계좌번호</label>
                    <div class="col-auto">
                      <input type="text" id="actNo" class="form-control" aria-describedby="passwordHelpInline" v-model="formData.ACTNO">
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
import { ref , onMounted , onUnmounted} from 'vue';
import axios from '../../axios'; // 생성한 axios 인스턴스 경로
import eventbus from '@/eventbus/eventbus'; // eventbus 가져오기


const selectedGrade = ref('초급'); // 초기값
const selectedJbps = ref('사원'); // 초기값
const selectedJbttl = ref('PMO'); // 초기값
const selectedMs = ref('현역'); // 초기값
const selectedCrtrNmtm = ref(0); // 초기값 설정
const selectedConttMthd = ref('잡코리아지원');
const selectedPjInpStts = ref('구직중');
const selectedClctPickupDt = ref(0);
const selectedGiveDt = ref(0);

// 상태 정의
const selectedGender = ref('남'); // 초기값
const selectedAcbg = ref('고졸'); // 초기값
const selectedYear = ref(0); // 초기값
const selectedMonth = ref(0); // 초기값
const years = Array.from({ length: 36 }, (_, i) => i); // 0부터 35까지
const months = Array.from({ length: 13 }, (_, i) => i); // 0부터 12까지
const crtrNmtms = Array.from({ length: 11 }, (_, i) => i);

const formData = ref({
  DEV_NO: "",
  NM: "",
  PJ_INP_STTS: "",
  CTRT_NMTM: "",
  BRDT: "",
  GNDR: "",
  JBPS: "",
  GRD: "",
  T_CR_PER: "",
  RGN: "",
  MBL_TELNO: "",
  EML: "",
  CONTT_MTHD: "",
  NTRV_DMND_DT: "",
  INP_PSBLTY_DT: "",
  OGDP_CO: "",
  SN: "",
  WHTAX_YN: "",
  BZMN_YN: "",
  KDS_EMP_YN: "",
  CTRT_CO_EMP_YN: "",
  CLCT_PICKUP_DT: "",
  GIVE_DT: "",
  BANK: "",
  ACTNO: "",
  DEPT: "",
  MM_DMND_UNTPRC: "",
  ADDR: "",
  JBTTL: "",
  BRKR: "",
  KAKAO_NICK: "",
  CTRT_HSTRY_YN: "",
  MS: "",
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
  ACBG: "",
});

// 성별 선택 메서드
const selectGender = (gender) => {
  selectedGender.value = gender;
  formData.value.GNDR = gender;
}

// 학력 선택 메서드
const selectAcbg = (acbg) => {
  selectedAcbg.value = acbg;
  formData.value.ACBG = acbg;
}

// 년도 선택 메서드
const selectYear = (year) => {
  selectedYear.value = year; // 선택된 연도로 변경
  updateT_CR_PER(year, selectedMonth.value); // 선택된 연도와 현재 선택된 월로 업데이트
};

// 개월 선택 메서드
const selectMonth = (month) => {
  selectedMonth.value = month; // 선택된 개월로 변경
  updateT_CR_PER(selectedYear.value, month); // 선택된 연도와 선택된 월로 업데이트
};

// 년도와 개월을 결합하여 T_CR_PER에 설정하는 메서드
const updateT_CR_PER = (year, month) => {
  // 년도와 개월을 결합하여 문자열로 설정
  formData.value.T_CR_PER = `${year}년 ${month}개월`; // 예: "2024년 8개월"
};

// 등급 선택 메서드
const selectGrade = (grade) => {
  selectedGrade.value = grade; // 선택된 등급으로 변경
  formData.value.GRD = grade; // 선택된 등급을 formData에 반영
};

// 직위 선택 메서드
const selectJbps = (jbps) => {
  selectedJbps.value = jbps; // 선택된 직위로 변경
  formData.value.JBPS = jbps; // 선택된 직위를 formData에 반영
};

// 직책 선택 메서드
const selectJbttl = (jbttl) => {
  selectedJbttl.value = jbttl; // 선택된 직책으로 변경
  formData.value.JBTTL = jbttl; // 선택된 직책을 formData에 반영
};

// 병역 선택 메서드
const selectMs = (ms) => {
  selectedMs.value = ms;
  formData.value.MS = ms; // 대소문자 수정
};

// 계약횟수 선택 메서드
const selectCrtrNmtm = (crtrNmtm) => {
  selectedCrtrNmtm.value = crtrNmtm; // 버튼 클릭 시 선택된 계약횟수로 변경
  formData.value.CTRT_NMTM = crtrNmtm; // 선택된 계약횟수를 formData에 반영
};

// 컨텍방법 선택 메서드
const selectConttMthd = (conttMthd) => {
  selectedConttMthd.value = conttMthd;
  formData.value.CONTT_MTHD = conttMthd;
};

// 프로젝트 투입상태 선택 메서드
const selectPjInpStts = (pjInpStts) => {
  selectedPjInpStts.value = pjInpStts;
  formData.value.PJ_INP_STTS = pjInpStts;
};

// 대금수령날짜 선택 메서드
const selectClctPickupDt = (clctPickupDt) => {
  selectedClctPickupDt.value = clctPickupDt;
  formData.value.CLCT_PICKUP_DT = clctPickupDt;
};

// 지급일자 선택 메서드
const selectGiveDt = (giveDt) => {
  selectedGiveDt.value = giveDt;
  formData.value.GIVE_DT = giveDt;
};

// 모달 상태 관리
const showModal = ref(false);

const closeModal = () => {
  showModal.value = false; // 모달 닫기
};

const submitForm = async () => {
  console.log(formData.value);
  try {
    const response = await axios.post('http://localhost:8080/api/addDeveloper', formData.value);
    alert(response.data.message); // 성공 메시지 표시
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || '개발자 추가에 실패했습니다.';
    alert(`오류: ${errorMessage}`);
  }
};

// 컴포넌트가 마운트될 때 이벤트 핸들러 추가
const openModalHandler = () => {
  showModal.value = true; // 모달 열기
};

onMounted(() => {
  eventbus.SearchResultEvent.add('openModal', openModalHandler); // 모달 열기 이벤트 등록
});

// 컴포넌트가 언마운트될 때 핸들러 제거
onUnmounted(() => {
  eventbus.SearchResultEvent.remove('openModal', openModalHandler); // 모달 열기 이벤트 제거
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

.devAddBtnStyle{
  background-color: #57687c;
  border-radius: 20px;
  color: #c9d6df;
  width: 120px;
}

.custom-modal{
  max-width:600px;
}

.input-radius{
  border-radius: 20px;
}

.form-status-bg{
  background-color: white;
}

.form-status{
  border-radius: 25px;
  border: 1px solid lightgray;
  height: 50px;
  align-items: center;
}

.form-status-button{
  border: 1px solid lightgray;
  border-radius: 20px;
  width : 100px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dropdown-toggle {
  display: flex;
  justify-content: space-between;
  width: 100%; /* 버튼 전체 너비 */
}

/* caret 화살표를 오른쪽으로 정렬 */
.dropdown-toggle .caret {
  margin-left: auto; /* 왼쪽 여백 자동으로 설정하여 오른쪽 정렬 */
}
</style>