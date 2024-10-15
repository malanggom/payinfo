<script setup>
import { ref, onMounted } from 'vue';
import eventbus from '@/eventbus/eventbus';

// 필터 타입에 대한 한글 매핑
const filterTypeMap = {
  contains: '포함',
  notContains: '포함하지 않음',
  equals: '같음',
  notEqual: '같지 않음',
  startsWith: '시작하는',
  endsWith: '끝나는',
  //숫자필터 관련
  greaterThanOrEqual: '이상',
  lessThanOrEqual: '이하',
  inRange: '범위 내',
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

const buttons = ref([]);

const updateButtonData = (keyName, type, filter) => {
  //filterTypeMap은 필터 타입을 한글로 매핑한 객체입니다. || type는 만약 filterTypeMap[type]가 undefined일 경우, 원래의 타입(type)을 그대로 사용하도록 합니다. 즉, 매핑된 값이 없으면 기본 타입을 사용합니다.
  const displayType = filterTypeMap[type] || type;
  const displayKeyName = fieldNameMap[keyName] || keyName;

  //지금 추가하려는 버튼과 buttons의 값들을 비교하여 하나라도 중복된 값이 있는 경우
  const isAlreadyRegistered = buttons.value.some(button =>
      button.keyName === displayKeyName && button.filter === filter && button.type === displayType
  );

  //중복되지 않는 경우 필터를 버튼으로 추가한다. 중복되는 경우는 생략, 이미 필터값 검증 후 필터 중복 시 updateButtonData 실행되지 않음
  if (!isAlreadyRegistered) {
    buttons.value.push({ keyName: displayKeyName, type: displayType, filter });
  }
};

//초기화 버튼
const resetKorButton = (keyName) => {
  //findIndex() 메서드는 배열에서 주어진 조건을 만족하는 첫 번째 요소의 인덱스를 반환, 조건을 만족하는 요소가 없으면 -1을 반환합니다.
  const buttonIndex = buttons.value.findIndex(button => button.keyName === fieldNameMap[keyName]);
  if (buttonIndex !== -1) {
    buttons.value.splice(buttonIndex, 1);
    console.log(`버튼 '${keyName}'이(가) 삭제되었습니다.`);
  } else {
    console.log(`버튼 '${keyName}'을(를) 찾을 수 없습니다.`);
  }
};

//buttons의 생성된 개수만큼 (button, index) index가 생성되고, 버튼의 x버튼을 누르면 실행되는 removeButton으로 index가 전달된다.
//index는 해당하는 버튼의 index이다.
const removeButton = (index) => {
  const button = buttons.value[index];

  // Object.keys()메서드는 객체의 모든 키를 배열로 반환한다.
  // find() 메서드는 배열의 각 요소를 순회하면서 주어진 조건을 만족하는 첫 번째 요소를 반환합니다. 매칭되는 키가 없으면 undefined를 반환한다.
  const actualKeyName = Object.keys(fieldNameMap).find(key => fieldNameMap[key] === button.keyName);

  // 필터 제거
  eventbus.SearchResultEvent.removeFilter(actualKeyName, button.type, button.filter);

  //buttons 배열에서 해당 버튼 제거
  //splice() 메서드는 배열의 특정 위치에서 요소를 추가하거나 제거하는 데 사용됩니다.
  //첫 번째 인자인 index는 배열에서 제거할 요소의 위치를 지정합니다.
  //두 번째 인자인 1은 제거할 요소의 개수를 나타냅니다.
  buttons.value.splice(index, 1);
};

//필터 버튼 삭제 핸들러
//keyName은 removeFilter(key)이벤트가 발생할 때, 해당 키가 handleRemoveFilter 함수에 인자로 전달되어 버튼 삭제 로직이 실행됩니다.
const handleRemoveFilter = (keyName) => {
  //findIndex() 메서드는 배열에서 주어진 조건을 만족하는 첫 번째 요소의 인덱스를 반환, 조건을 만족하는 요소가 없으면 -1을 반환합니다.
  const buttonIndex = buttons.value.findIndex(button => button.keyName === fieldNameMap[keyName]);
  if (buttonIndex !== -1) {
    buttons.value.splice(buttonIndex, 1);
  }
};

// 이벤트 리스너 등록
onMounted(() => {
  eventbus.SearchResultEvent.add('filterUpdate', updateButtonData);
  eventbus.SearchResultEvent.add('resetKorButton', resetKorButton); // resetKorButton 이벤트 등록
  eventbus.SearchResultEvent.add('removeFilter', handleRemoveFilter); // 버튼 삭제 핸들러 등록
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