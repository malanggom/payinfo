<template>
  <!--  ag-theme-quartz는 AG Grid의 테마 중 하나로, 그리드를 좀 더 세련되고 현대적인 스타일로 꾸며주는 CSS 클래스-->
  <div class="ag-theme-quartz pl10" style="width: 100%; height: 98%;">
    <!-- DevPjHistoryAddBtnComponent 추가 -->
    <dev-pj-history-add-btn-component ref="devPjHistoryAddBtn" @open-modal="pjOpenModal"></dev-pj-history-add-btn-component>
    <ag-grid-vue
        style="width: 100%; height: 100%;"
        :columnDefs="columnDefs"
        @grid-ready="onGridReady"
        :defaultColDef="defaultColDef"
        :rowSelection="rowSelection"
        :rowData="rowData"
        :grid-options="gridOptions"
        :textFilterParams="textFilterParams"
        :pagination="true"
        @cell-value-changed="onCellValueChanged"
    />
  </div>
</template>

<script>
import { defineComponent, ref, shallowRef } from "vue";
import DevPjHistoryAddBtnComponent from './DevPjHistoryAddBtnComponent.vue'; // 경로에 맞게 수정하세요
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import eventbus from '@/eventbus/eventbus'

export default defineComponent({
  components: {
    "ag-grid-vue": AgGridVue,
    DevPjHistoryAddBtnComponent,
  },
  setup() {
    const gridApi = shallowRef();
    const searchPerformed = ref(false); // 검색 수행 여부 플래그 추가
    //AG Grid의 열(column) 정의의 기본 설정을 포함하는 객체
    const defaultColDef = ref({
      editable: true,//열의 셀을 편집 가능하게 설정합니다.
      filter: true,//열에서 필터링 기능을 활성화합니다.
      flex: 1,//이 열이 가용 공간을 어떻게 차지할지를 설정합니다. flex 값이 높을수록 더 많은 공간을 차지합니다.
      headerClass: "centered", //모든 열의 헤더에 "centered"라는 CSS 클래스를 적용하여 중앙 정렬합니다.
      headerStyle: "headerColor" //헤더의 배경색을 설정하는 CSS 클래스입니다.
    });

    //AG Grid에서 사용할 텍스트 필터의 매개변수를 정의하는 객체
    const textFilterParams ={
      filterOptions: ["contains", "notContains"],//필터링 옵션을 정의합니다. 사용자가 선택할 수 있는 필터링 방법으로 "contains" (포함)와 "notContains" (포함되지 않음)를 제공합니다.
      caseSensitive: false,//대소문자를 구분하지 않도록 설정합니다. 이 경우, 필터링 시 대소문자를 무시합니다.
      trimInput: true,//입력값의 앞뒤 공백을 자동으로 제거하도록 설정합니다. 사용자가 입력한 값이 공백을 포함하더라도 이를 제거하여 필터링에 영향을 주지 않게 합니다.
      buttons: ["cancel", "reset", "apply"],//필터 UI에 표시할 버튼을 정의합니다. 여기서는 "취소", "초기화", "적용" 버튼이 표시됩니다.
      localeText: {//버튼에 대한 로컬라이즈된 텍스트를 정의합니다.
        cancel: '취소',
        reset: '초기화',
        apply: '적용',
      },
      closeOnApply: true,//"적용" 버튼을 클릭했을 때 필터 UI를 닫도록 설정합니다. 사용자가 필터를 적용한 후 UI가 자동으로 닫히게 됩니다.
      // onReset: resetFilters, //리셋 버튼 클릭 시 호출될 함수
    };

    const numberFilterParams ={
      filterOptions: ["equals", "greaterThanOrEqual", "lessThanOrEqual", "inRange"],
      trimInput: true,
      buttons: ["cancel", "reset", "apply"],//필터 UI에 표시할 버튼을 정의합니다. 여기서는 "취소", "초기화", "적용" 버튼이 표시됩니다.
      localeText: {//버튼에 대한 로컬라이즈된 텍스트를 정의합니다.
        cancel: '취소',
        reset: '초기화',
        apply: '적용',
      },
      closeOnApply: true,//"적용" 버튼을 클릭했을 때 필터 UI를 닫도록 설정합니다. 사용자가 필터를 적용한 후 UI가 자동으로 닫히게 됩니다.
    };

    //열의 너비 자동 조절 전략을 설정합니다.
    //각 열의 셀 내용에 맞춰 열의 너비를 자동으로 조절하도록 설정합니다. 즉, 셀의 내용이 잘리지 않도록 열 크기를 조정합니다.
    const gridOptions = {
      autoSizeStrategy: {
        type: 'fitCellContents',
      },
      localeText: {// 필터 관련 텍스트를 한글로 변경
        contains: '포함',
        notContains: '포함하지 않음',
        equals: '같음',
        notEqual: '같지 않음',
        startsWith: '시작하는',
        endsWith: '끝나는',
        blank: '비어 있음',
        notBlank: '비어 있지 않음',
        empty: '하나를 선택',
        //숫자필터 관련
        greaterThanOrEqual: '이상',
        lessThanOrEqual: '이하',
        inRange: '범위 내',
      },
    };

    const filterTypeMap = {
      contains: '포함',
      notContains: '포함하지 않음',
      equals: '같음',
      notEqual: '같지 않음',
      startsWith: '시작하는',
      endsWith: '끝나는',
      greaterThanOrEqual: '이상',
      lessThanOrEqual: '이하',
      inRange: '범위 내',
    };

    //columnDefs는 Vue의 반응형 객체로, AG Grid에서 사용할 열(column)의 정의 목록입니다. 각 열은 객체로 정의되어 있습니다.
    const columnDefs = ref([
      // { headerName: '개발자번호', field: "DEV_NO", minWidth: 170, filter: "agTextColumnFilter", filterParams: textFilterParams },
      // { headerName: '프로젝트번호', field: "PJ_NO", minWidth: 190, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '선택', checkboxSelection: true, minWidth: 100, filter: false, cellClass: 'checkboxCentered' },
      { headerName: '프로젝트지원상태', field: "DEV_PJ_PRGRS_STTS", minWidth: 200, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '프로젝트지원날짜', field: "DEV_PJ_PRGRS_DT", minWidth: 200, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '프로젝트시작일자', field: "DEV_PJ_BGNG_DT", minWidth: 200, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '프로젝트종료일자', field: "DEV_PJ_END_DT", minWidth: 200, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '고객사명', field: "CUST_NM", minWidth: 140, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '수행사명', field: "SUBGC_NM", minWidth: 140, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '계약회사명', field: "CTRT_CO_NM", minWidth: 170, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '하청업체명', field: "SBCN_NM", minWidth: 170, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '프로젝트장소', field: "PJ_PLC", minWidth: 190, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '프로젝트투입등급', field: "PJ_INP_GRADE", minWidth: 200, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '직책', field: "JBTTL", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '체제비', field: "SYST_FEE", minWidth: 120, filter: "agNumberColumnFilter", filterParams: numberFilterParams },
      { headerName: '계약회사정규직원금', field: "CTRT_CO_EMP_PRNC", minWidth: 210, filter: "agNumberColumnFilter", filterParams: numberFilterParams },
      { headerName: '3.3%원금', field: "WHTAX_PRNC", minWidth: 140, filter: "agNumberColumnFilter", filterParams: numberFilterParams },
      { headerName: '부가세원금', field: "VAT_PRNC", minWidth: 140, filter: "agNumberColumnFilter", filterParams: numberFilterParams },
      { headerName: '자사정규직원금', field: "KDS_EMP_PRNC", minWidth: 190, filter: "agNumberColumnFilter", filterParams: numberFilterParams },
      { headerName: '프로젝트별월요청단가', field: "PJ_MM_DMND_UNTPRC", minWidth: 220, filter: "agNumberColumnFilter", filterParams: numberFilterParams },
    ]);
    const rowSelection = ref("multiple");
    const rowData = ref([]);

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/pjHistory/data');
        const data = await response.json();

        const translatedData = data.result.row.map(item => ({
          DEV_NO: item.DEV_NO,                          // 개발자번호
          PJ_NO: item.PJ_NO,                            // 프로젝트번호
          DEV_PJ_PRGRS_STTS: item.DEV_PJ_PRGRS_STTS,    // 개발자별프로젝트지원상태
          DEV_PJ_PRGRS_DT: item.DEV_PJ_PRGRS_DT,        // 개발자별프로젝트지원날짜
          DEV_PJ_BGNG_DT: item.DEV_PJ_BGNG_DT,          // 개발자별프로젝트시작일자
          DEV_PJ_END_DT: item.DEV_PJ_END_DT,            // 개발자별프로젝트종료일자
          CUST_NM: item.CUST_NM,                        // 고객사명
          SUBGC_NM: item.SUBGC_NM,                      // 수행사명
          CTRT_CO_NM: item.CTRT_CO_NM,                  // 계약회사명
          SBCN_NM: item.SBCN_NM,                        // 하청업체명
          PJ_PLC: item.PJ_PLC,                          // 프로젝트장소
          PJ_INP_GRADE: item.PJ_INP_GRADE,              // 프로젝트투입등급
          JBTTL: item.JBTTL,                            // 직책
          SYST_FEE: item.SYST_FEE,                      // 체제비
          CTRT_CO_EMP_PRNC: item.CTRT_CO_EMP_PRNC,      // 계약회사정규직원금
          WHTAX_PRNC: item.WHTAX_PRNC,                  // 3.3%원금
          VAT_PRNC: item.VAT_PRNC,                      // 부가세원금
          KDS_EMP_PRNC: item.KDS_EMP_PRNC,              // 자사정규직원금
          PJ_MM_DMND_UNTPRC: item.PJ_MM_DMND_UNTPRC     // 프로젝트별월요청단가
        }));
        rowData.value = translatedData;
        gridApi.value.refreshCells();
        // 검색이 성공적으로 수행되면 플래그를 true로 설정
        searchPerformed.value = true; // 검색 수행 완료
      } catch (error) {
        console.error('데이터 로드 오류:', error);
        rowData.value = [];
      }
    };

    const pjOpenModal = () => {
      eventbus.SearchPjHistoryResultEvent.pjOpenModal(); // 모달 열기 이벤트 호출
    };

    const onGridReady = async (params) => {
      gridApi.value = params.api;
      console.log('프로젝트',gridApi.value);
      // Grid가 준비된 이후에 자식 요소를 추가합니다.
      // ag-paging-panel 클래스를 가진 요소를 찾습니다.
      // 모든 .ag-paging-panel 요소를 선택
      const panels = document.querySelectorAll('.ag-paging-panel');

// 두 번째 요소에 접근
      if (panels.length > 1) {
        const secondPanel = panels[1];
        console.log(secondPanel); // 두 번째 .ag-paging-panel 요소 출력
        if (secondPanel) {
          const addRows = document.createElement("span");
          addRows.textContent = "프로젝트추가"; // span의 텍스트 설정
          addRows.style.cursor = "pointer"; // 커서 스타일 설정
          addRows.style.marginLeft = "10px"; // 여백 추가

          // 클릭 이벤트 추가
          addRows.onclick = () => {
            console.log("프로젝트추가 버튼 클릭됨"); // 로그 추가
            pjOpenModal(); // 모달 열기
          };

          // 추가 버튼을 추가
          secondPanel.insertBefore(addRows, secondPanel.firstChild); // 첫 번째 자식 앞에 삽입

          const editRows = document.createElement("span");
          editRows.textContent = "수정"; // span의 텍스트 설정
          editRows.style.cursor = "pointer"; // 커서 스타일 설정
          editRows.style.marginLeft = "10px"; // 여백 추가

          // 클릭 이벤트 추가
          editRows.onclick = () => {
            console.log("수정 버튼 클릭됨");
            // 수정 작업을 수행할 수 있습니다.
          };

          // 수정 버튼을 추가
          secondPanel.insertBefore(editRows, addRows.nextSibling); // 추가 버튼 뒤에 삽입

          const deleteRows = document.createElement("span");
          deleteRows.textContent = "삭제"; // span의 텍스트 설정
          deleteRows.style.cursor = "pointer"; // 커서 스타일 설정
          deleteRows.style.marginLeft = "10px"; // 여백 추가

          // 클릭 이벤트 추가
          deleteRows.onclick = () => {
            eventbus.SearchPjHistoryResultEvent.pjDevHistDeleteRowBtnClick(); // 이벤트 호출
          };

          // 삭제 버튼을 추가
          secondPanel.insertBefore(deleteRows, editRows.nextSibling); // 수정 버튼 뒤에 삽입
        }

        console.log('pagingPanel',secondPanel);

      } else {
        console.log('두 번째 요소가 없습니다.');
      }
      eventbus.SearchPjHistoryResultEvent.add('search', fetchData);
      eventbus.SearchPjHistoryResultEvent.add('removeFilter', removeFilter);
      eventbus.SearchPjHistoryResultEvent.add('reset', resetFilter);
      eventbus.SearchPjHistoryResultEvent.add('pjDeleteRow', deleteRowBtnClick);
      params.api.addEventListener('filterChanged', onFilterChanged);
    };

    const previousFilterKeys = ref([]); // 이전 필터 모델 키 저장
    const previousFilters = ref([]); // 이전 필터 모델 타입 저장

    const onFilterChanged = async () => {
      // 검색 여부 확인
      if (!searchPerformed.value) {
        alert("검색을 먼저 수행해 주세요.");
        gridApi.value.setFilterModel(null);
      }else {
        const grf = eventbus.SearchPjHistoryResultEvent.getRegisteredFilters(); // 함수 호출
        console.log('grf', grf)

        // 현재 필터 모델들 가져오기
        // AGE : {filterType: 'number', type: 'equals', filter: 52}
        // NM  : {filterType: 'text', type: 'contains', filter: '이'}
        const filterModels = gridApi.value.getFilterModel();
        // 현재 필터 키들 가져오기
        // ['NM', 'AGE']
        const filterModelKeys = Object.keys(filterModels);

        // console.log("filterModels:", filterModels); // 로그 출력
        // console.log("filterModelKeys:", filterModelKeys); // 로그 출력
        // 필터 모델 처리
        Object.keys(filterModels).forEach(key => {
          const filterObject = filterModels[key];
          if (filterObject)
              // grf 배열에서 key가 이미 있는지 확인
            console.log(`${key}의 type, filter`, filterObject);
          // grf 배열에서 key, type, filter가 모두 일치하는지 확인
          // 첫 번째 조건을 가져옵니다.
          const existsInGrf = grf.some(item => {
            return (
                item.KeyName === key &&
                item.type === filterObject.type && // 현재 조건의 type
                item.filter === filterObject.filter // 현재 조건의 filter
            );
          });

          let grfFiltersCondition = false; // let으로 변경
          let grfFiltersConditionCheck = true; // let으로 변경
          // 이미 grf에 존재하는 key인 경우, 다음 키로 넘어감
          if (existsInGrf) {
            console.log(`${key}는 이미 grf에 존재하므로 건너뜁니다.`);
            return; // 현재 반복을 종료하고 다음 반복으로 넘어감
          }
          // grf 배열의 모든 요소를 순회
          for (let i = 0; i < grf.length; i++) {
            for (let j = 0; j < (filterObject.conditions ? filterObject.conditions.length : 0); j++) {
              if (grf[i].KeyName === key &&
                  grf[i].type === filterObject.conditions[j].type &&
                  grf[i].filter === filterObject.conditions[j].filter) {
                grfFiltersCondition = true; // 중복 조건 발견
                break; // 조건이 일치하면 inner loop 종료
              }
            }
          }

          // 필터 객체의 조건이 존재하는지 확인
          if (filterObject?.conditions && filterObject.conditions.length > 0) {
            const currentCondition = filterObject.conditions[0];
            const currentCondition1 = filterObject.conditions.length > 1 ? filterObject.conditions[1] : null;

            // 필터에 여러 조건이 중복되는지 확인
            const duplicateConditionsFilters = currentCondition1 && currentCondition.filter === currentCondition1.filter && currentCondition.type === currentCondition1.type;
            if (grfFiltersConditionCheck === false && duplicateConditionsFilters) {
              alert(currentCondition + ' 와 ' + currentCondition1 + ' 의 필터값이 같습니다.');
              console.log(key, ', 1 필터값: ', currentCondition1.type, ', 1 필터값: ', currentCondition1.filter);
              console.log(key, ', 필터값: ', currentCondition.type, ', 필터값: ', currentCondition.filter);
              eventbus.SearchPjHistoryResultEvent.removeFilter(key, currentCondition.type, currentCondition.filter);

            }
            if (grfFiltersConditionCheck === true && duplicateConditionsFilters) {
              alert(currentCondition + ' 와 ' + currentCondition1 + ' 의 필터값이 같습니다2.');
              console.log(key, ', 1 필터값: ', currentCondition1.type, ', 1 필터값: ', currentCondition1.filter);
              console.log(key, ', 필터값: ', currentCondition.type, ', 필터값: ', currentCondition.filter);

              eventbus.SearchPjHistoryResultEvent.removeFilter(key, currentCondition1.type, currentCondition1.filter);
            }

            // 필터에 여러 조건이 중복이 되지 않으면서 현재 필터에 하나의 값이 등록된 상태
            if (grfFiltersCondition === true) {
              eventbus.SearchPjHistoryResultEvent.filterUpdate(key, currentCondition1.type, currentCondition1.filter);
            }

            // 필터에 여러 조건이 중복이 되지 않으면서 현재 필터에 아무것도 등록되지 않은 상태
            if (!duplicateConditionsFilters && grfFiltersCondition === false) {
              eventbus.SearchPjHistoryResultEvent.filterUpdate(key, currentCondition.type, currentCondition.filter);
              eventbus.SearchPjHistoryResultEvent.filterUpdate(key, currentCondition1.type, currentCondition1.filter);
            }

          } else {
            eventbus.SearchPjHistoryResultEvent.filterUpdate(key, filterModels[key].type, filterModels[key].filter);
          }
        });
        previousFilterKeys.value.forEach((key) => {
          // 현재 필터 모델에서 해당 키가 없고, 이전 필터가 존재하는 경우
          const previousFilter = previousFilters.value[key]; // 이전 필터 가져오기
          const currentFilterModel = filterModels[key]; // 현재 필터 모델 가져오기
          console.log('previousFilter', previousFilter);
          console.log('currentFilterModel', currentFilterModel);
          if(currentFilterModel === undefined) {
            // currentFilterModel이 undefined인 경우
            console.log(`필터 '${key}'이(가) 해제되었습니다.`);

            // 이전 필터가 존재하는 경우에만 처리
            if (previousFilter) {
              // conditions가 배열인지 확인
              if (Array.isArray(previousFilter.conditions)) {
                previousFilter.conditions.forEach(condition => {
                  // 각 조건에 대해 필터 제거
                  eventbus.SearchPjHistoryResultEvent.removeFilter(key, condition.type, condition.filter);
                  eventbus.SearchPjHistoryResultEvent.removeActiveFilter(key, condition.type, condition.filter);
                  eventbus.SearchPjHistoryResultEvent.removeButton(previousFilter.KeyName, condition.type, condition.filter);
                });
              } else {
                // 단일 조건인 경우
                eventbus.SearchPjHistoryResultEvent.removeFilter(key, previousFilter.type, previousFilter.filter);
                eventbus.SearchPjHistoryResultEvent.removeActiveFilter(key, previousFilter.type, previousFilter.filter);
                eventbus.SearchPjHistoryResultEvent.removeButton(previousFilter.KeyName, previousFilter.type, previousFilter.filter);
              }
            }
          }
          if (currentFilterModel !== undefined) {
            if (!filterModelKeys.includes(key)) {
              // 필터 해제 요청
              eventbus.SearchPjHistoryResultEvent.removeFilter(key, previousFilter.type, previousFilter.filter);
              console.log('key, previousFilter.type, previousFilter.filter해제', key, previousFilter.type, previousFilter.filter);
              eventbus.SearchPjHistoryResultEvent.removeActiveFilter(key, previousFilter.type, previousFilter.filter);
              // 버튼 삭제 요청
              eventbus.SearchPjHistoryResultEvent.removeButton(previousFilter.KeyName, previousFilter.type, previousFilter.filter); // 버튼 삭제 요청
            }

            if (filterModelKeys.includes(key) && previousFilter.type !== currentFilterModel.type && previousFilter.filter === currentFilterModel.filter) {
              console.log('토글');
              eventbus.SearchPjHistoryResultEvent.removeFilter(key, previousFilter.type, previousFilter.filter);
              // 활성 필터 목록에서 해당 필터 제거
              eventbus.SearchPjHistoryResultEvent.removeActiveFilter(key, previousFilter.type, previousFilter.filter);

              // 버튼 삭제 요청
              eventbus.SearchPjHistoryResultEvent.removeButton(previousFilter.KeyName, previousFilter.type, previousFilter.filter); // 버튼 삭제 요청
            }
          }
        });

// 현재 필터 모델 키를 이전 필터 모델 키로 업데이트
        previousFilterKeys.value = filterModelKeys;
// 현재 필터 모델을 이전 필터 모델로 업데이트
        previousFilters.value = filterModels;
      }
    };


    // 셀의 값이 변경될 때 호출되는 함수
    const onCellValueChanged = async (event) => {
      console.log("Cell value changed:", event.data); // 이 로그가 출력되어야 함
      try {
        const response = await fetch('http://localhost:8080/api/update/PjDevHistoryData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event.data),
        });
        console.log("Response:", response); // 응답 상태 확인
        if (!response.ok) {
          throw new Error('Failed to update data');
        }
      } catch (error) {
        console.error('Error updating data:', error);
      }
    };

    const resetFilter = () => {
      const registeredFilters = eventbus.SearchPjHistoryResultEvent.getRegisteredFilters();
      gridApi.value.setFilterModel(null);
      console.log('현재필터길이',registeredFilters.length);
      if(registeredFilters.length === 0){
        if(searchPerformed.value){
          alert('필터가 입력되지 않았습니다. 필터를 입력하세요.');
        }
        if(!searchPerformed.value){
          alert("검색을 먼저 수행해 주세요.");
        }
      }else{
        // 등록된 필터의 버튼을 삭제합니다.
        registeredFilters.forEach(filter => {
          eventbus.SearchPjHistoryResultEvent.removeFilter(filter.KeyName, filter.type, filter.filter);
          // 활성 필터 목록에서 해당 필터 제거
          eventbus.SearchPjHistoryResultEvent.removeActiveFilter(filter.KeyName, filter.type, filter.filter);
        });
        // resetKorButton 이벤트 호출
        eventbus.SearchPjHistoryResultEvent.resetKorButton();
      }
    };

    const removeFilter = (KeyName, filterType, filterValue) => {
      console.log(`removeFilter 호출됨: KeyName=${KeyName}, filterType=${filterType}, filterValue=${filterValue}`);

      const filterModel = gridApi.value.getFilterModel(); // 현재 필터 모델 가져오기
      console.log('현재 필터 모델:', filterModel[KeyName]); // 필터 모델 출력

      if (filterModel[KeyName]) {
        const currentFilter = filterModel[KeyName];
        let adjustedFilterType;

        if (Array.isArray(currentFilter.conditions)) {
          const previousConditions = currentFilter.conditions.slice(); // 이전 조건 복사

          // filterType을 매핑하여 조건 필터링
          currentFilter.conditions = currentFilter.conditions.filter(condition => {
            console.log(`현재 조건:`, condition); // 현재 조건 로그

            // filterType을 매핑하여 비교
            adjustedFilterType = filterTypeMap[filterType] || filterTypeMap[condition.type] || condition.type;

            // 조건이 filterType과 filterValue와 일치하지 않는 경우만 유지
            const shouldKeep = !(adjustedFilterType === filterTypeMap[condition.type] && condition.filter === filterValue);
            console.log(`조건 유지 여부: ${shouldKeep}`); // 유지 여부 로그

            return shouldKeep;
          });

          console.log(`'${KeyName}' 필터의 조건이 업데이트되었습니다. 새로운 조건:`, currentFilter.conditions);

          // 조건 배열이 비어 있는 경우
          if (currentFilter.conditions.length === 0) {
            console.log(`필터 '${KeyName}'의 모든 조건이 제거되었습니다.`);
            eventbus.SearchPjHistoryResultEvent.removeActiveFilter(KeyName, filterType, filterValue); // 활성 필터에서 제거
          }

          // 필터 모델 업데이트
          if (JSON.stringify(previousConditions) !== JSON.stringify(currentFilter.conditions)) { // 이전 조건과 비교
            gridApi.value.setFilterModel(filterModel); // 업데이트된 필터 모델 설정
            console.log('업데이트될 필터모델', filterModel);

            // 조건이 삭제된 경우에만 이벤트를 발생시킴
            if (previousConditions.length !== currentFilter.conditions.length) {
              eventbus.SearchPjHistoryResultEvent.removeFilter(KeyName, adjustedFilterType, filterValue);// grf에서 해당 필터 제거// 로그 추가
              console.log('필터 제거 후 grf 상태:', eventbus.SearchPjHistoryResultEvent.getRegisteredFilters()); // 상태 확인
            }
          } else {
            console.log(`조건이 변경되지 않아 필터 모델 업데이트 생략.`);
          }
        } else {
          console.log(`'${KeyName}'의 conditions가 배열이 아닙니다.`);
          console.log('currentFilter', currentFilter);

          // 필터 타입을 매핑하여 비교
          const currentFilterType = filterTypeMap[currentFilter.type] || currentFilter.type;
          const targetFilterType = filterTypeMap[filterType] || filterType;

          console.log('currentFilter.type', currentFilterType);
          console.log('filterType', targetFilterType);
          console.log('currentFilter.filter', currentFilter.filter);
          console.log('filterValue', filterValue);

          if (currentFilterType === targetFilterType && currentFilter.filter === filterValue) {
            console.log(`필터 '${KeyName}'가 해제됩니다.`);
            delete filterModel[KeyName]; // 필터 전체 삭제
            gridApi.value.setFilterModel(filterModel); // 업데이트된 필터 모델 설정
            eventbus.SearchPjHistoryResultEvent.removeActiveFilter(KeyName, filterType, filterValue); // 활성 필터에서 제거
          } else {
            console.log(`필터 '${KeyName}'의 type 또는 filter가 일치하지 않습니다.`);
          }
        }
      } else {
        console.log(`필터 '${KeyName}'이(가) 적용되지 않았습니다.`);
      }
    };


    //--- 필터초기화 끝 ---//
    //--- 선택된 행 삭제 시작 ---//
    const deleteRowBtnClick = async () => {
      const selectedNodes = gridApi.value.getSelectedNodes();
      const selectedData = selectedNodes.map(node => node.data);

      // 삭제할 개발자번호 목록
      const devNoList = selectedData.map(row => row.DEV_NO);

      // 서버에 DELETE 요청 보내기
      try {
        const response = await fetch('http://localhost:8080/api/delete/PjDevHistoryData', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ devNoList }), // 개발자번호 배열 전송
        });

        if (!response.ok) {
          throw new Error('Failed to delete data');
        }

        // 서버에서 삭제가 완료되면 로컬 데이터 갱신
        rowData.value = rowData.value.filter(row => !devNoList.includes(row.DEV_NO));

        // 선택된 행 삭제 후 그리드 업데이트
        // gridApi.value.setRowData(rowData.value);
      } catch (error) {
        console.error('Error deleting data:', error);
        alert("삭제할 프로젝트를 선택해주세요.");
      }
    };
    // 이벤트 등록
    // 이벤트 등록
    //--- 선택된 행 삭제 끝 ---//




    return {
      columnDefs,
      gridApi,
      defaultColDef,
      rowSelection,
      rowData,
      gridOptions,
      onGridReady,
      onCellValueChanged,
      deleteRowBtnClick,
      resetFilter,
      removeFilter,
      textFilterParams,
    };
  },
});
</script>

<style>
@import "ag-grid-community/styles/ag-grid.css";
@import "ag-grid-community/styles/ag-theme-quartz.css";

.centered {
  .ag-header-cell-label {
    justify-content: center !important;
  }
}

.headerColor{
  background-color: #e8e8e8 !important;
}

.checkboxCentered {
  display: flex; /* Flexbox를 사용하여 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
}

.pl10{
  padding-left: 10px;
}
</style>