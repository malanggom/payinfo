<script setup>
import {ref} from 'vue';

const showModal = ref(false);

// const nm = ref(''); 개발자 이름을 저장할 ref

function openModal() {
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}
</script>

<template>
  <button class="btn btn-primary" @click="openModal">개발자추가</button>
  <div class="modal fade" :class="{ show: showModal }" v-if="showModal" tabindex="-1"
       aria-labelledby="staticBackdropLabel" aria-hidden="true" style="display: block;">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
      <!-- modal-lg 클래스를 사용하여 큰 모달로 설정 --><!-- Vertically centered scrollable modal -->
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-4" id="staticBackdropLabel">개발자 추가</h1>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="row g-3">
            <!--폼 내용 시작-->
            <div class="b_line pb-3">
              <div class="d-flex align-items-start">
                <label class="col-form-label fs-5">개인정보</label>
              </div>
              <!--     이름       -->
              <div class="d-flex row align-items-center">
                <div class="col-auto d-flex align-items-center">
                  <label for="inputPassword6" class="col-form-label">이름</label>
                  <div class="col-auto">
                    <input type="text" id="inputPassword6" class="div_width100 form-control div_flex_center"
                           aria-describedby="passwordHelpInline">
                  </div>
                </div>
                <!--     소개자       -->
                <div class="col-auto d-flex align-items-center">
                  <label for="brkr" class="col-form-label">소개자</label>
                  <div class="col-auto">
                    <input type="text" id="brkr" class="div_width100 form-control"
                           aria-describedby="passwordHelpInline">
                  </div>
                </div>
                <!--     카카오톡닉네임       -->
                <div class="col-auto d-flex align-items-center">
                  <label for="KakaoNick" class="col-form-label">카카오톡닉네임</label>
                  <div class="col-auto">
                    <input type="text" id="KakaoNick" class="div_width100 form-control"
                           aria-describedby="passwordHelpInline">
                  </div>
                </div>
                <!--      성별      -->
                <div class="col-auto d-flex align-items-center">
                  <label for="gndr" class="col-form-label">성별</label>
                  <div class="col-auto">
                    <input class="form-check form-control form-check-input" type="radio" name="flexRadioDefault"
                           id="gndr"
                           aria-describedby="passwordHelpInline">
                  </div>
                  <div class="col-auto">
                    <label class="form-check-label" for="flexRadioDefault1">
                      남
                    </label>
                  </div>
                  <div class="col-auto">
                    <input class="form-check form-control form-check-input" type="radio" name="flexRadioDefault"
                           aria-describedby="passwordHelpInline">
                  </div>
                  <div class="col-auto">
                    <label class="form-check-label" for="flexRadioDefault1">
                      여
                    </label>
                  </div>
                </div>
                <!--      생년월일      -->
                <div class="col-auto d-flex align-items-center">
                  <label for="brdt" class="col-form-label label_nowrap">생년월일</label>
                  <div class="form-floating mb-3 col-auto">
                    <input type="text" id="brdt" class="div_width100 form-control"
                           aria-describedby="passwordHelpInline">
                    <label for="brdt">6자리 숫자 입력</label>
                  </div>
                </div>
                <!--     일련번호       -->
                <div class="col-auto d-flex align-items-center">
                  <label for="sn" class="col-form-label label_nowrap">일련번호</label>
                  <div class="form-floating mb-3 col-auto">
                    <input type="text" id="sn" class="div_width100 form-control" aria-describedby="passwordHelpInline">
                    <label for="sn">7자리 숫자 입력</label>
                  </div>
                </div>
                <!--     휴대전화번호       -->
                <div class="col-auto d-flex align-items-center">
                  <label for="mblTelno" class="col-form-label">휴대전화번호</label>
                  <input type="text" id="mblTelno" class="div_width50 form-control"
                         aria-describedby="passwordHelpInline">
                  <span>-</span>
                  <input type="text" class="div_width50 form-control" aria-describedby="passwordHelpInline">
                  <span>-</span>
                  <input type="text" class="div_width50 form-control" aria-describedby="passwordHelpInline">
                </div>

                <!--     이메일       -->
                <div class="col-auto d-flex align-items-center">
                  <label for="eml" class="col-form-label">이메일</label>
                  <input type="text" id="eml" class="div_width100 form-control" aria-describedby="passwordHelpInline">
                  @
                  <input type="text" class="div_width130 form-control" aria-describedby="passwordHelpInline">
                </div>
              </div>
              <!--     3.3%여부       -->
              <div class="row d-flex align-items-center pt-3">
                <div class="col-auto d-flex align-items-center">
                  <label for="whtaxYn" class="col-form-label">3.3%</label>
                  <div class="col-auto form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="whtaxYn">
                  </div>
                </div>
                <!--     사업자여부       -->
                <div class="col-auto d-flex align-items-center">
                  <label for="bzmnYn" class="col-form-label">사업자</label>
                  <div class="col-auto form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="bzmnYn">
                  </div>
                </div>
                <!--     지역       -->
                <div class="col-auto d-flex align-items-center">
                  <label for="rgn" class="col-form-label">지역</label>
                  <div class="col-auto">
                    <input type="text" id="rgn" class="div_width130 form-control" aria-describedby="passwordHelpInline">
                  </div>
                </div>
                <!--     주소       -->
                <div class="col-auto d-flex align-items-center">
                  <label for="addr" class="col-form-label">주소</label>
                  <div class="col-auto">
                    <input type="text" id="addr" class="div_width130 form-control"
                           aria-describedby="passwordHelpInline">
                  </div>
                </div>
                <!--     인터뷰요청일       -->
                <div class="col-auto">
                  <label for="ntrvDmndDt" class="col-form-label">인터뷰요청일</label>
                </div>
                <div class="col-auto">
                  <input type="text" id="ntrvDmndDt" class="div_width100 form-control"
                         aria-describedby="passwordHelpInline">
                </div>
                <!--     투입가능일       -->
                <div class="col-auto d-flex align-items-center">
                  <label for="inpPsbltyDt" class="col-form-label">투입가능일</label>
                  <div class="col-auto">
                    <input type="text" id="inpPsbltyDt" class="div_width100 form-control"
                           aria-describedby="passwordHelpInline">
                  </div>
                </div>
                <!--     월요청단가       -->
                <div class="col-auto d-flex align-items-center">
                  <label for="mmDmndUntprc" class="col-form-label">월 요청단가</label>
                  <input type="text" id="mmDmndUntprc" class="div_width50 form-control"
                         aria-describedby="passwordHelpInline">만원
                </div>
              </div>
              <!--     총경력기간       -->
              <div class="row align-items-center pt-3">
                <div class="col-auto d-flex align-items-center">
                  <label for="tCrPer" class="col-form-label">총 경력기간</label>
                  <div class="col-auto dropdown">
                    <button id="tCrPer" class="btn btn-outline-primary dropdown-toggle" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                      10
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <button class="dropdown-item" type="button">0</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">1</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">2</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">3</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">4</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">5</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">6</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">7</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">8</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">9</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">10</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">11</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">12</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">13</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">14</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">15</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">16</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">17</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">18</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">19</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">20</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">21</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">22</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">23</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">24</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">25</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">26</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">27</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">28</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">29</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">30</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">31</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">32</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">33</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">34</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">35</button>
                      </li>
                    </ul>
                  </div>
                </div>
                <span class="col-auto">
              년
            </span>
                <div class="col-auto dropdown">
                  <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                          aria-expanded="false">
                    10
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <button class="dropdown-item" type="button">0</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">1</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">2</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">3</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">4</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">5</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">6</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">7</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">8</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">9</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">10</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">11</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">12</button>
                    </li>
                  </ul>
                </div>
                <span class="col-auto">
              개월
            </span>
                <!--      등급      -->
                <div class="col-auto">
                  <label for="grd" class="col-form-label">등급</label>
                </div>
                <div class="col-auto dropdown">
                  <button id="grd" class="btn btn-outline-primary dropdown-toggle" type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false">
                    초상급
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <button class="dropdown-item" type="button">N/A</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">초급</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">초상급</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">중급</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">중상급</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">고급</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">특급</button>
                    </li>
                  </ul>
                </div>
                <!--      직위      -->
                <div class="col-auto">
                  <label for="jbps" class="col-form-label">직위</label>
                </div>
                <div class="col-auto dropdown">
                  <button id="jbps" class="btn btn-outline-primary dropdown-toggle" type="button"
                          data-bs-toggle="dropdown" aria-expanded="false">
                    사원
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <button class="dropdown-item" type="button">N/A</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">사원</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">주임</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">대리</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">과장</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">차장</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">부장</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">이사</button>
                    </li>
                  </ul>
                </div>
                <!--      직책      -->
                <div class="col-auto">
                  <label for="jbttl" class="col-form-label">직책</label>
                </div>
                <div class="col-auto dropdown">
                  <button id="jbttl" class="btn btn-outline-primary dropdown-toggle" type="button"
                          data-bs-toggle="dropdown" aria-expanded="false">
                    PL
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <button class="dropdown-item" type="button">N/A</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">PL</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">PMO</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">PM</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">DBA</button>
                    </li>
                  </ul>
                </div>
                <!--      병역      -->
                <div class="col-auto">
                  <label for="ms" class="col-form-label">병역</label>
                </div>
                <div class="col-auto dropdown">
                  <button id="ms" class="btn btn-outline-primary dropdown-toggle" type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false">
                    N/A
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <button class="dropdown-item" type="button">N/A</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">초상급</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">중급</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">중상급</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">고급</button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">특급</button>
                    </li>
                  </ul>
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
                  <div class="col-auto">
                    <label for="CtrtHstryYn" class="col-form-label">계약이력존재여부</label>
                  </div>
                  <div class="col-auto form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="CtrtHstryYn">
                  </div>
                  <!--      계약횟수      -->
                  <div class="col-auto">
                    <label for="ctrtNmtm" class="col-form-label">계약횟수</label>
                  </div>
                  <div class="col-auto dropdown">
                    <button id="ctrtNmtm" class="btn btn-outline-primary dropdown-toggle" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                      10
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <button class="dropdown-item" type="button">0</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">1</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">2</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">3</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">4</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">5</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">6</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">7</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">8</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">9</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">10</button>
                      </li>
                    </ul>
                  </div>
                  <!--      컨텍방법      -->
                  <div class="col-auto">
                    <label for="conttMthd" class="col-form-label">컨텍방법</label>
                  </div>
                  <div class="col-auto dropdown">
                    <button id="conttMthd" class="btn btn-outline-primary dropdown-toggle" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                      잡코리아지원
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <button class="dropdown-item" type="button">잡코리아지원</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">소개자</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">이메일지원</button>
                      </li>
                    </ul>
                  </div>
                  <!--     프로젝트투입상태       -->
                  <div class="col-auto">
                    <label for="pjInpStts" class="col-form-label">프로젝트투입상태</label>
                  </div>
                  <div class="col-auto dropdown">
                    <button id="pjInpStts" class="btn btn-outline-primary dropdown-toggle" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                      프로젝트만료1달전
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <button class="dropdown-item" type="button">구직중</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">인터뷰대기</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">인터뷰중</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">인터뷰완료</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">인터뷰합격</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">프로젝트투입중</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">프로젝트만료1달전</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">타사프로젝트중</button>
                      </li>
                    </ul>
                  </div>
                  <!--     소속회사       -->
                  <div class="col-auto">
                    <label for="ogdpCo" class="col-form-label">소속회사</label>
                  </div>
                  <div class="col-auto">
                    <input type="text" id="ogdpCo" class="div_width130 form-control"
                           aria-describedby="passwordHelpInline">
                  </div>
                  <!--     부서       -->
                  <div class="col-auto">
                    <label for="dept" class="col-form-label">부서</label>
                  </div>
                  <div class="col-auto">
                    <input type="text" id="dept" class="div_width130 form-control"
                           aria-describedby="passwordHelpInline">
                  </div>
                  <!--     계약회사정규직여부       -->
                  <div class="col-auto">
                    <label for="CrtrCoEmpYn" class="col-form-label">계약회사정규직여부</label>
                  </div>
                  <div class="col-auto form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="CrtrCoEmpYn">
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
                  <div class="col-auto">
                    <label for="ClctPickupDt" class="col-form-label">대금수령날짜</label>
                  </div>
                  <div class="col-auto dropdown">
                    <button id="ClctPickupDt" class="btn btn-outline-primary dropdown-toggle" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                      10
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <button class="dropdown-item" type="button">N/A</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">1</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">5</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">10</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">15</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">21</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">말</button>
                      </li>
                    </ul>
                  </div>
                  <span class="col-auto">
              일
            </span>
                  <!--     지급일자       -->
                  <div class="col-auto">
                    <label for="GiveDt" class="col-form-label">지급일자</label>
                  </div>
                  <div class="col-auto dropdown">
                    <button id="GiveDt" class="btn btn-outline-primary dropdown-toggle" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                      10
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <button class="dropdown-item" type="button">N/A</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">5</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">10</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">15</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">21</button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">말</button>
                      </li>
                    </ul>
                  </div>
                  <span class="col-auto">
              일
            </span>
                  <!--     은행       -->
                  <div class="col-auto">
                    <label for="bank" class="col-form-label">은행</label>
                  </div>
                  <div class="col-auto">
                    <input type="text" id="bank" class="div_width130 form-control"
                           aria-describedby="passwordHelpInline">
                  </div>
                  <!--     계좌번호       -->
                  <div class="col-auto">
                    <label for="actNo" class="col-form-label">계좌번호</label>
                  </div>
                  <div class="col-auto">
                    <input type="text" id="actNo" class="form-control" aria-describedby="passwordHelpInline">
                  </div>
                </div>
              </div>
            </div>
          </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-primary" @click="closeModal">Close</button>
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

.div_width100 {
  width: 105px;
}

.div_width130 {
  width: 130px;
}

.div_width50 {
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
</style>