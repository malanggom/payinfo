<template>
  <div class="ag-theme-quartz" style="width: 100%; height: 100%;">
    <pj-add-btn-component ref="pjAddBtn" @open-modal="pjOpenModal"></pj-add-btn-component>
    <pj-update-btn-component ref="pjUpdateBtn" @open-modal="pjOpenModalUpdate"></pj-update-btn-component>
    <ag-grid-vue
        @rowClicked="onRowClick"
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
        @row-selected="cellValueUpdate"
    />
  </div>
</template>

<script>
import {defineComponent, ref, shallowRef, onMounted, onBeforeUnmount} from "vue";
import PjAddBtnComponent from '../PjInq/PjAddBtnComponent.vue';
import PjUpdateBtnComponent from '../PjInq/PjUpdateBtnComponent.vue';
import {AgGridVue} from "ag-grid-vue3";
import eventbus from '@/eventbus/eventbus'
import pjEventbus from '@/eventbus/pjEventbus'

export default defineComponent({
  components: {
    "ag-grid-vue": AgGridVue,
    PjAddBtnComponent,
    PjUpdateBtnComponent,
  },
  methods: {
    onRowClick(event) {
      this.selectedPjNo = event.data.PJ_NO;
      console.log("선택된 DEV_NO:", this.selectedPjNo);

      // ✅ DEV_NO를 프로젝트 히스토리 컴포넌트로 전달
      eventbus.SearchPjHistoryResultEvent.devPjSelectDeveloper(this.selectedPjNo);
      // 이벤트버스로 전달
      eventbus.SearchPjHistoryResultEvent.devPjFetchData("pjSearch", { pjNo: this.selectedPjNo });
    }
  },
  data() {
    return {
      selectedPjNo: null // 초기값 null 또는 원하는 기본값
    };
  },
  setup() {
    const gridApi = shallowRef();
    const searchPerformed = ref(true);

    const defaultColDef = ref({
      editable: true,
      filter: true,
      flex: 1,
      headerClass: "centered"
    });

    const textFilterParams = {
      filterOptions: ["contains", "notContains"],
      caseSensitive: false,
      trimInput: true,
      buttons: ["cancel", "reset", "apply"],
      localeText: {
        cancel: '취소',
        reset: '초기화',
        apply: '적용',
      },
      closeOnApply: true,
    };

    const numberFilterParams = {
      filterOptions: ["equals", "greaterThanOrEqual", "lessThanOrEqual", "inRange"],
      trimInput: true,
      buttons: ["cancel", "reset", "apply"],
      localeText: {
        cancel: '취소',
        reset: '초기화',
        apply: '적용',
      },
      closeOnApply: true,
    };

    const gridOptions = {
      localeText: {
        contains: '포함',
        notContains: '포함하지 않음',
        equals: '같음',
        notEqual: '같지 않음',
        startsWith: '시작하는',
        endsWith: '끝나는',
        blank: '비어 있음',
        notBlank: '비어 있지 않음',
        empty: '하나를 선택',

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

    const columnDefs = ref([
      { headerName: '선택', checkboxSelection: true, minWidth: 60, filter: false, sortable: false, cellClass: 'checkboxCentered'},
      { headerName: '프로젝트명', field: "PJ_NM", minWidth: 140, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '프로젝트상태', field: "PJ_STTS", minWidth: 160, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '시작일자', field: "PJ_BGNG_DT", minWidth: 130, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '종료일자', field: "PJ_END_DT", minWidth: 130, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '고객사명', field: "CUST_NM", minWidth: 130, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '수행사명', field: "SUBGC_NM", minWidth: 130, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '계약회사명', field: "CTRT_CO_NM", minWidth: 140, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '등급', field: "PJ_GRADE", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '인원', field: "PERSONNEL", minWidth: 100, filter: "agNumberColumnFilter", filterParams: numberFilterParams },
      { headerName: '단가', field: "UNITPRICE", minWidth: 100, filter: "agNumberColumnFilter", filterParams: numberFilterParams },
      { headerName: '체제비', field: "SYST_FEE", minWidth: 120, filter: "agNumberColumnFilter", filterParams: numberFilterParams },
      { headerName: '자사정규직원금', field: "KDS_EMP_PRNC", minWidth: 170, filter: "agNumberColumnFilter", filterParams: numberFilterParams },
      { headerName: '계약회사정규직원금', field: "CTRT_CO_EMP_PRNC", minWidth: 190, filter: "agNumberColumnFilter", filterParams: numberFilterParams },
      { headerName: '요구스킬', field: "PJ_SKILL", minWidth: 130, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '업무영역', field: "TASK_AREA", minWidth: 130, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '상세업무', field: "DTL_TASK", minWidth: 130, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '직책', field: "PJ_JBTTL", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '지원기간', field: "PJ_SPRT_PER", minWidth: 130, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '장소', field: "PJ_PLC", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '경력증빙', field: "PRF_CR", minWidth: 130, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '채용구분', field: "RCRT_CLSF", minWidth: 130, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '우대사항', field: "PRFR_TRTM", minWidth: 130, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '기타', field: "PJ_ETC", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams }
    ]);

    const rowSelection = ref("multiple");
    const rowData = ref([]);

    const pjFetchData = async (type, filter) => {
      const name = filter || '';

      try {
        const response = await fetch(`/api/getPJData?name=${encodeURIComponent(name)}`);
        const data = await response.json();

        const translatedData = data.result.row.map(item => ({
          PJ_NO: item.PJ_NO,
          PJ_NM: item.PJ_NM,
          PJ_STTS: item.PJ_STTS,
          PJ_BGNG_DT: item.PJ_BGNG_DT,
          PJ_END_DT: item.PJ_END_DT,
          CUST_NM: item.CUST_NM,
          SUBGC_NM: item.SUBGC_NM,
          CTRT_CO_NM: item.CTRT_CO_NM,
          PJ_GRADE: item.PJ_GRADE,
          PERSONNEL: item.PERSONNEL,
          UNITPRICE: item.UNITPRICE,
          SYST_FEE: item.SYST_FEE,
          KDS_EMP_PRNC: item.KDS_EMP_PRNC,
          CTRT_CO_EMP_PRNC: item.CTRT_CO_EMP_PRNC,
          PJ_SKILL: item.PJ_SKILL,
          TASK_AREA: item.TASK_AREA,
          DTL_TASK: item.DTL_TASK,
          PJ_JBTTL: item.PJ_JBTTL,
          PJ_SPRT_PER: item.PJ_SPRT_PER,
          PJ_PLC: item.PJ_PLC,
          PRF_CR: item.PRF_CR,
          RCRT_CLSF: item.RCRT_CLSF,
          PRFR_TRTM: item.PRFR_TRTM,
          PJ_ETC: item.PJ_ETC,
        }));

        rowData.value = translatedData;

        console.log("서버 응답 결과:", data);           // 전체 응답
        console.log("검색 결과 row:", data.result.row); // 실제 row
      } catch (error) {
        console.error('프로젝트 데이터 로드 오류:', error);
        rowData.value = [];
      }
    };

    const pjOpenModal = () => {
      pjEventbus.SearchPjResultEvent.pjOpenModal();
    };

    const pjOpenModalUpdate = () => {
      pjEventbus.SearchPjResultEvent.pjOpenModalUpdate();
      console.log("프로젝트 수정모달열기",);
    };

    //셀 업데이트
    const cellValueUpdate = () => {
      const selectedRows = gridApi.value.getSelectedRows();
      console.log("selectedRows:", selectedRows);
      if (selectedRows.length > 1) {
        return 0;
        //alert 프로젝트를 한개만 선택해주세요. 발생
      } else if (selectedRows.length < 1) {
        return 2;
      } else {
        //openModalUpdate();실행
        return 1;
      }
    };

    const onGridReady = async (params) => {
      gridApi.value = params.api;
      const pagingPanel = document.querySelector('.ag-paging-panel');
      if (pagingPanel) {
        const addRows = document.createElement("span");
        addRows.textContent = "프로젝트추가";
        addRows.style.cursor = "pointer";
        addRows.style.marginLeft = "10px";
        addRows.onclick = () => {
          pjOpenModal();
        }
        pagingPanel.insertBefore(addRows, pagingPanel.firstChild);

        const editRows = document.createElement("span");
        editRows.textContent = "수정"; // span의 텍스트 설정
        editRows.style.cursor = "pointer"; // 커서 스타일 설정
        editRows.style.marginLeft = "10px"; // 여백 추가
        editRows.onclick = () => {
          if (searchPerformed.value && cellValueUpdate() === 0) {
            alert("프로젝트를 한명만 선택해주세요.");
          } else if (searchPerformed.value && cellValueUpdate() === 2) {
            alert("프로젝트를 선택하지 않았습니다. 프로젝트를 선택해주세요.");
          } else if (searchPerformed.value && cellValueUpdate() === 1) {
            pjOpenModalUpdate();
          }
        }
        pagingPanel.insertBefore(editRows, addRows.nextSibling);

        const deleteRows = document.createElement("span");
        deleteRows.textContent = "삭제";
        deleteRows.style.cursor = "pointer";
        deleteRows.style.marginLeft = "10px";
        deleteRows.onclick = () => {
          pjEventbus.SearchPjResultEvent.pjDeleteRowBtnClick();
        }
        pagingPanel.insertBefore(deleteRows, editRows.nextSibling);
      }
      pjEventbus.SearchPjResultEvent.add('pjRemoveFilter', pjRemoveFilter);
      pjEventbus.SearchPjResultEvent.add('pjDeleteRow', pjDeleteRowBtnClick);
      params.api.addEventListener('filterChanged', onFilterChanged);
    };

    const previousFilterKeys = ref([]);
    const previousFilters = ref([]);

    const onFilterChanged = async () => {
      const grf = pjEventbus.SearchPjResultEvent.pjGetRegisteredFilters();
      const filterModels = gridApi.value.getFilterModel();
      const filterModelKeys = Object.keys(filterModels);

      Object.keys(filterModels).forEach(key => {
        const filterObject = filterModels[key];
        const existsInGrf = grf.some(item => {
          return (
              item.KeyName === key &&
              item.type === filterObject.type &&
              item.filter === filterObject.filter
          );
        });

        let grfFiltersCondition = false;
        let grfFiltersConditionCheck = true;
        if (existsInGrf) {
          return;
        }
        for (let i = 0; i < grf.length; i++) {
          for (let j = 0; j < (filterObject.conditions ? filterObject.conditions.length : 0); j++) {
            if (grf[i].KeyName === key &&
                grf[i].type === filterObject.conditions[j].type &&
                grf[i].filter === filterObject.conditions[j].filter) {
              grfFiltersCondition = true;
              break;
            }
          }
        }

        if (filterObject?.conditions && filterObject.conditions.length > 0) {
          const currentCondition = filterObject.conditions[0];
          const currentCondition1 = filterObject.conditions.length > 1 ? filterObject.conditions[1] : null;
          const duplicateConditionsFilters = currentCondition1 && currentCondition.filter === currentCondition1.filter && currentCondition.type === currentCondition1.type;

          if (grfFiltersConditionCheck === false && duplicateConditionsFilters) {
            alert(currentCondition + ' 와 ' + currentCondition1 + ' 의 필터값이 같습니다.');
            pjEventbus.SearchPjResultEvent.pjRemoveFilter(key, currentCondition.type, currentCondition.filter);

          }
          if (grfFiltersConditionCheck === true && duplicateConditionsFilters) {
            alert(currentCondition + ' 와 ' + currentCondition1 + ' 의 필터값이 같습니다2.');
            pjEventbus.SearchPjResultEvent.pjRemoveFilter(key, currentCondition1.type, currentCondition1.filter);
          }

          if (grfFiltersCondition === true) {
            pjEventbus.SearchPjResultEvent.pjFilterUpdate(key, currentCondition1.type, currentCondition1.filter);
          }

          if (!duplicateConditionsFilters && grfFiltersCondition === false) {
            pjEventbus.SearchPjResultEvent.pjFilterUpdate(key, currentCondition.type, currentCondition.filter);
            pjEventbus.SearchPjResultEvent.pjFilterUpdate(key, currentCondition1.type, currentCondition1.filter);
          }
        } else {
          pjEventbus.SearchPjResultEvent.pjFilterUpdate(key, filterModels[key].type, filterModels[key].filter);
        }
      });

      previousFilterKeys.value.forEach((key) => {
        const previousFilter = previousFilters.value[key];
        const currentFilterModel = filterModels[key];

        if (currentFilterModel === undefined) {
          if (previousFilter) {
            if (Array.isArray(previousFilter.conditions)) {
              previousFilter.conditions.forEach(condition => {
                pjEventbus.SearchPjResultEvent.pjRemoveFilter(key, condition.type, condition.filter);
                pjEventbus.SearchPjResultEvent.pjRemoveActiveFilter(key, condition.type, condition.filter);
                pjEventbus.SearchPjResultEvent.pjRemoveButton(previousFilter.KeyName, condition.type, condition.filter);
              });
            } else {
              pjEventbus.SearchPjResultEvent.pjRemoveFilter(key, previousFilter.type, previousFilter.filter);
              pjEventbus.SearchPjResultEvent.pjRemoveActiveFilter(key, previousFilter.type, previousFilter.filter);
              pjEventbus.SearchPjResultEvent.pjRemoveButton(previousFilter.KeyName, previousFilter.type, previousFilter.filter);
            }
          }
        }
        if (currentFilterModel !== undefined) {
          if (!filterModelKeys.includes(key)) {
            pjEventbus.SearchPjResultEvent.pjRemoveFilter(key, previousFilter.type, previousFilter.filter);
            pjEventbus.SearchPjResultEvent.pjRemoveActiveFilter(key, previousFilter.type, previousFilter.filter);
            pjEventbus.SearchPjResultEvent.pjRemoveButton(previousFilter.KeyName, previousFilter.type, previousFilter.filter);
          }

          if (filterModelKeys.includes(key) && previousFilter.type !== currentFilterModel.type && previousFilter.filter === currentFilterModel.filter) {
            pjEventbus.SearchPjResultEvent.pjRemoveFilter(key, previousFilter.type, previousFilter.filter);
            pjEventbus.SearchPjResultEvent.pjRemoveActiveFilter(key, previousFilter.type, previousFilter.filter);
            pjEventbus.SearchPjResultEvent.pjRemoveButton(previousFilter.KeyName, previousFilter.type, previousFilter.filter);
          }
        }
      });
      previousFilterKeys.value = filterModelKeys;
      previousFilters.value = filterModels;
    };

    const onCellValueChanged = async (event) => {
      try {
        const response = await fetch('/api/updatePjData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event.data),
        });
        if (!response.ok) {
          throw new Error('Failed to update data');
        }
      } catch (error) {
        console.error('프로젝트 데이터 수정에러:', error);
      }
    };

    const pjResetKorButton = () =>{
      gridApi.value.setFilterModel(null);
      console.log("리셋완료");
    };

    pjEventbus.SearchPjResultEvent.add('pjResetKorButton',pjResetKorButton);

    const resetFilter = () => {
      console.log("아예안나옴??:"); // 로그 추가
      const registeredFilters = pjEventbus.SearchPjResultEvent.pjGetRegisteredFilters();
      console.log("아예안나옴:"); // 로그 추가
      console.log("현재 등록된 필터:", registeredFilters); // 로그 추가

      // 필터가 없을 경우
      if (registeredFilters.length === 0) {
        if (searchPerformed.value) {
          alert('필터가 입력되지 않았습니다. 필터를 입력하세요.');
        }
      } else {
        // 필터가 있을 경우 초기화
        registeredFilters.forEach(filter => {
          pjEventbus.SearchPjResultEvent.pjRemoveFilter(filter.KeyName, filter.type, filter.filter);
          pjEventbus.SearchPjResultEvent.pjRemoveActiveFilter(filter.KeyName, filter.type, filter.filter);
        });
        pjEventbus.SearchPjResultEvent.pjResetKorButton(); // 초기화 이벤트 호출
        console.log("필터 초기화 완료");
      }
    };

    const pjRemoveFilter = (KeyName, filterType, filterValue) => {
      const filterModel = gridApi.value.getFilterModel();

      if (filterModel[KeyName]) {
        const currentFilter = filterModel[KeyName];
        let adjustedFilterType;

        if (Array.isArray(currentFilter.conditions)) {
          const previousConditions = currentFilter.conditions.slice();

          currentFilter.conditions = currentFilter.conditions.filter(condition => {
            if (!condition) {
              // condition이 undefined인 경우 필터에서 제거
              console.warn("유효하지 않은 조건:", condition);
              return false;
            }

            adjustedFilterType = filterTypeMap[filterType] || filterTypeMap[condition.type] || condition.type;

            const shouldKeep = !(adjustedFilterType === filterTypeMap[condition.type] && condition.filter === filterValue);
            console.log(`조건 유지 여부: ${shouldKeep}`);

            return shouldKeep;
          });

          if (currentFilter.conditions.length === 0) {
            pjEventbus.SearchPjResultEvent.pjRemoveActiveFilter(KeyName, filterType, filterValue);
          }
          if (JSON.stringify(previousConditions) !== JSON.stringify(currentFilter.conditions)) {
            gridApi.value.setFilterModel(filterModel);
            if (previousConditions.length !== currentFilter.conditions.length) {
              pjEventbus.SearchPjResultEvent.pjRemoveFilter(KeyName, adjustedFilterType, filterValue);
            }
          }
        } else {
          const currentFilterType = filterTypeMap[currentFilter.type] || currentFilter.type;
          const targetFilterType = filterTypeMap[filterType] || filterType;

          if (currentFilterType === targetFilterType && currentFilter.filter === filterValue) {
            delete filterModel[KeyName];
            gridApi.value.setFilterModel(filterModel);
            pjEventbus.SearchPjResultEvent.pjRemoveActiveFilter(KeyName, filterType, filterValue);
          }
        }
      }
    };

    const pjDeleteRowBtnClick = async () => {
      if (!gridApi.value) {
        alert("그리드가 아직 초기화되지 않았습니다.");
        return;
      }

      const selectedNodes = gridApi.value.getSelectedNodes();

      if (!selectedNodes || selectedNodes.length === 0) {
        alert("삭제할 프로젝트를 선택해주세요.");
        return;
      }

      // 삭제 확인
      const confirmDelete = confirm("정말 삭제하시겠습니까?");
      if (!confirmDelete) {
        return; // 사용자가 "아니오"를 선택하면 함수 종료
      }

      const selectedData = selectedNodes.map(node => node.data);
      const pjNoList = selectedData.map(row => row.PJ_NO);

      // 삭제된 프로젝트의 이름을 저장할 배열
      const deletedNames = selectedData.map(row => row.NM).join(", "); // 예: "개발자 A, 개발자 B"

      try {
        const response = await fetch('/api/deletePjData', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({pjNoList}),
        });

        if (!response.ok) {
          throw new Error('Failed to delete data');
        } // 선택된 행을 rowData에서 필터링하여 제거
        rowData.value = rowData.value.filter(row => !pjNoList.includes(row.PJ_NO));

        // 삭제 성공 알림
        alert(`프로젝트 ${deletedNames}가 삭제되었습니다.`);
      } catch (error) {
        alert("프로젝트 삭제 error:", error);
      }
    };

    onMounted(() => {
      pjEventbus.SearchPjResultEvent.add('pjSearch', pjFetchData); // 기존 이벤트 등록

      pjFetchData(); // 🔥 초기 전체 데이터 로드 (name 없이)
    });

    onBeforeUnmount(() => {
      pjEventbus.SearchPjResultEvent.remove('pjSearch', pjFetchData);
    });

    return {
      columnDefs,
      gridApi,
      defaultColDef,
      rowSelection,
      rowData,
      gridOptions,
      onGridReady,
      onCellValueChanged,
      pjDeleteRowBtnClick,
      resetFilter,
      pjRemoveFilter,
      textFilterParams,
      pjOpenModal,
      pjOpenModalUpdate,
      cellValueUpdate,
      pjResetKorButton,
    };
  },
})
;
</script>

<style>
@import "ag-grid-community/styles/ag-grid.css";
@import "ag-grid-community/styles/ag-theme-quartz.css";

/* Aggrid의 선택 컬럼 행들의 체크박스를 가로 가운데 정렬*/
.centered {
  .ag-header-cell-label {
    justify-content: center !important;
    align-items: center !important;
  }
}

.checkboxCentered {
  display: flex; /* Flexbox를 사용하여 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
}

.checkboxCentered .ag-selection-checkbox {
  margin: 0 auto;
}
/* 가로 가운데 정렬 종료*/

.pl10 {
  padding-left: 10px;
}

.fas {
  font-size: 16px; /* 아이콘 크기 조정 */
  color: blue; /* 아이콘 색상 조정 */
}

.fa-download {
  font-size: 16px; /* 아이콘 크기 조정 */
  color: blue; /* 아이콘 색상 조정 */
}
</style>