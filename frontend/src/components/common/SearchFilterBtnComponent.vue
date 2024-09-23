<script setup>
import { ref, onMounted } from 'vue';
import eventbus from '@/eventbus/eventbus';

const buttons = ref([]);

// 필터 타입에 대한 한글 매핑
const filterTypeMap = {
  contains: '포함',
  notContains: '포함하지 않음',
  equals: '같음',
  notEqual: '같지 않음',
  startsWith: '시작하는',
  endsWith: '끝나는',
};

// 필드 이름에 대한 한글 매핑
const fieldNameMap = {
  NM: '이름',
  AGE: '나이',
  PJ_INP_STTS: '프로젝트투입상태',
  CTRT_NMTM: '계약횟수',
  BRDT: '생년월일',
  GNDR: '성별',
  JBPS: '직위',
  GRD: '등급',
  T_CR_PER: '총경력기간',
  RGN: '지역',
  MBL_TELNO: '휴대전화번호',
  EML: '이메일',
  CONTT_MTHD: '컨택방법',
  NTRV_DMND_DT: '인터뷰요청일',
  INP_PSBLTY_DT: '투입가능일',
  OGDP_CO: '소속회사',
  SN: '일련번호',
  WHTAX_YN: '3.3%여부',
  BZMN_YN: '사업자여부',
  KDS_EMP_YN: '자사정규직여부',
  CTRT_CO_EMP_YN: '계약회사정규직여부',
  CLCT_PICKUP_DT: '대금수령날짜',
  GIVE_DT: '지급일자',
  BANK: '은행',
  ACTNO: '계좌번호',
  DEPT: '부서',
  MM_DMND_UNTPRC: '월요청단가',
  ADDR: '주소',
  JBTTL: '직책',
  BRKR: '소개자',
  KAKAO_NICK: '카카오톡닉네임',
  CTRT_HSTRY_YN: '계약이력존재여부',
  MS: '병역',
  MDL: '모델',
  OS: '운영체제',
  LANG: '언어',
  DB: '데이터베이스',
  TOOL: '툴',
  FRMW: '프레임워크',
  LBRR: '라이브러리',
  CMNCT: '통신',
  ETC: '기타',
};

// 버튼 등록 함수
const updateButtonData = (keyName, type, filter) => {
  const displayType = filterTypeMap[type] || type;
  const displayKeyName = fieldNameMap[keyName] || keyName;

  // 중복 체크
  const isAlreadyRegistered = buttons.value.some(button =>
      button.keyName === displayKeyName && button.filter === filter && button.type === displayType
  );

  if (!isAlreadyRegistered) {
    buttons.value.push({ keyName: displayKeyName, type: displayType, filter });
  }
};

const resetButtons = () => {
  buttons.value.forEach(button => {
    eventbus.SearchResultEvent.removeFilter(button.type, button.filter);
  });
  buttons.value = []; // 모든 버튼 삭제
};

// 버튼 제거 함수
const removeButton = (index) => {
  const button = buttons.value[index];
  if (button) {
    eventbus.SearchResultEvent.removeFilter(button.type, button.filter);
  }
  buttons.value.splice(index, 1);
};

// 이벤트 리스너 등록
onMounted(() => {
  eventbus.SearchResultEvent.add('filterUpdate', updateButtonData);
  eventbus.SearchResultEvent.add('resetButtons', resetButtons); // resetButtons 이벤트 등록
});
</script>

<template>
  <div>
    <button v-for="(button, index) in buttons" :key="index" class="btn filterBtn">
      {{ button.keyName }}: {{ button.filter }} {{ button.type }}
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