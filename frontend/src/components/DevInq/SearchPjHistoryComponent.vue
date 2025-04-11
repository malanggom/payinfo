<template>
  <div class="ag-theme-quartz" style="width: 100%; height: 98%;">
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
import DevPjHistoryAddBtnComponent from './DevPjHistoryAddBtnComponent.vue';
import { AgGridVue } from "ag-grid-vue3";
import eventbus from '@/eventbus/eventbus'

export default defineComponent({
  components: {
    "ag-grid-vue": AgGridVue,
    DevPjHistoryAddBtnComponent,
  },
  setup() {
    const gridApi = shallowRef();
    const searchPerformed = ref(false);

    const defaultColDef = ref({
      editable: true,
      filter: true,
      flex: 1,
      headerClass: "centered",
      headerStyle: "headerColor"
    });

    const textFilterParams ={
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

    const numberFilterParams ={
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
      autoSizeStrategy: {
        type: 'fitCellContents',
      },
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
        const response = await fetch('http://localhost:8080/api/getPjHistData');
        const data = await response.json();

        const translatedData = data.result.row.map(item => ({
          DEV_NO: item.DEV_NO,
          PJ_NO: item.PJ_NO,
          DEV_PJ_PRGRS_STTS: item.DEV_PJ_PRGRS_STTS,
          DEV_PJ_PRGRS_DT: item.DEV_PJ_PRGRS_DT,
          DEV_PJ_BGNG_DT: item.DEV_PJ_BGNG_DT,
          DEV_PJ_END_DT: item.DEV_PJ_END_DT,
          CUST_NM: item.CUST_NM,
          SUBGC_NM: item.SUBGC_NM,
          CTRT_CO_NM: item.CTRT_CO_NM,
          SBCN_NM: item.SBCN_NM,
          PJ_PLC: item.PJ_PLC,
          PJ_INP_GRADE: item.PJ_INP_GRADE,
          JBTTL: item.JBTTL,
          SYST_FEE: item.SYST_FEE,
          CTRT_CO_EMP_PRNC: item.CTRT_CO_EMP_PRNC,
          WHTAX_PRNC: item.WHTAX_PRNC,
          VAT_PRNC: item.VAT_PRNC,
          KDS_EMP_PRNC: item.KDS_EMP_PRNC,
          PJ_MM_DMND_UNTPRC: item.PJ_MM_DMND_UNTPRC,
        }));
        rowData.value = translatedData;
        gridApi.value.refreshCells();
        searchPerformed.value = true;
      } catch (error) {
        console.error('프로젝트 데이터 로드 오류:', error);
        rowData.value = [];
      }
    };

    const pjOpenModal = () => {
      eventbus.SearchPjHistoryResultEvent.pjOpenModal();
    };

    const onGridReady = async (params) => {
      gridApi.value = params.api;
      const panels = document.querySelectorAll('.ag-paging-panel');
      if (panels.length > 1) {
        const secondPanel = panels[1];
        if (secondPanel) {
          const addRows = document.createElement("span");
          addRows.textContent = "프로젝트추가";
          addRows.style.cursor = "pointer";
          addRows.style.marginLeft = "10px";
          addRows.onclick = pjOpenModal;
          secondPanel.insertBefore(addRows, secondPanel.firstChild);

          const editRows = document.createElement("span");
          editRows.textContent = "수정"; // span의 텍스트 설정
          editRows.style.cursor = "pointer"; // 커서 스타일 설정
          editRows.style.marginLeft = "10px"; // 여백 추가
          editRows.onclick = () => {};
          secondPanel.insertBefore(editRows, addRows.nextSibling);

          const deleteRows = document.createElement("span");
          deleteRows.textContent = "삭제";
          deleteRows.style.cursor = "pointer";
          deleteRows.style.marginLeft = "10px";
          deleteRows.onclick = () => {
            eventbus.SearchPjHistoryResultEvent.pjDevHistDeleteRowBtnClick();
          };
          secondPanel.insertBefore(deleteRows, editRows.nextSibling);
        }
      }
      eventbus.SearchPjHistoryResultEvent.add('search', fetchData);
      eventbus.SearchPjHistoryResultEvent.add('removeFilter', removeFilter);
      eventbus.SearchPjHistoryResultEvent.add('reset', resetFilter);
      eventbus.SearchPjHistoryResultEvent.add('pjDeleteRow', deleteRowBtnClick);
      params.api.addEventListener('filterChanged', onFilterChanged);
    };

    const previousFilterKeys = ref([]);
    const previousFilters = ref([]);

    const onFilterChanged = async () => {
      if (!searchPerformed.value) {
        alert("검색을 먼저 수행해 주세요.");
        gridApi.value.setFilterModel(null);
      }else {
        const grf = eventbus.SearchPjHistoryResultEvent.getRegisteredFilters();
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
              eventbus.SearchPjHistoryResultEvent.removeFilter(key, currentCondition.type, currentCondition.filter);

            }
            if (grfFiltersConditionCheck === true && duplicateConditionsFilters) {
              alert(currentCondition + ' 와 ' + currentCondition1 + ' 의 필터값이 같습니다2.');
              eventbus.SearchPjHistoryResultEvent.removeFilter(key, currentCondition1.type, currentCondition1.filter);
            }

            if (grfFiltersCondition === true) {
              eventbus.SearchPjHistoryResultEvent.filterUpdate(key, currentCondition1.type, currentCondition1.filter);
            }

            if (!duplicateConditionsFilters && grfFiltersCondition === false) {
              eventbus.SearchPjHistoryResultEvent.filterUpdate(key, currentCondition.type, currentCondition.filter);
              eventbus.SearchPjHistoryResultEvent.filterUpdate(key, currentCondition1.type, currentCondition1.filter);
            }

          } else {
            eventbus.SearchPjHistoryResultEvent.filterUpdate(key, filterModels[key].type, filterModels[key].filter);
          }
        });
        previousFilterKeys.value.forEach((key) => {
          const previousFilter = previousFilters.value[key];
          const currentFilterModel = filterModels[key];

          if(currentFilterModel === undefined) {
            if (previousFilter) {
              if (Array.isArray(previousFilter.conditions)) {
                previousFilter.conditions.forEach(condition => {
                  eventbus.SearchPjHistoryResultEvent.removeFilter(key, condition.type, condition.filter);
                  eventbus.SearchPjHistoryResultEvent.removeActiveFilter(key, condition.type, condition.filter);
                  eventbus.SearchPjHistoryResultEvent.removeButton(previousFilter.KeyName, condition.type, condition.filter);
                });
              } else {
                eventbus.SearchPjHistoryResultEvent.removeFilter(key, previousFilter.type, previousFilter.filter);
                eventbus.SearchPjHistoryResultEvent.removeActiveFilter(key, previousFilter.type, previousFilter.filter);
                eventbus.SearchPjHistoryResultEvent.removeButton(previousFilter.KeyName, previousFilter.type, previousFilter.filter);
              }
            }
          }
          if (currentFilterModel !== undefined) {
            if (!filterModelKeys.includes(key)) {
              eventbus.SearchPjHistoryResultEvent.removeFilter(key, previousFilter.type, previousFilter.filter);
              eventbus.SearchPjHistoryResultEvent.removeActiveFilter(key, previousFilter.type, previousFilter.filter);
              eventbus.SearchPjHistoryResultEvent.removeButton(previousFilter.KeyName, previousFilter.type, previousFilter.filter); // 버튼 삭제 요청
            }

            if (filterModelKeys.includes(key) && previousFilter.type !== currentFilterModel.type && previousFilter.filter === currentFilterModel.filter) {
              eventbus.SearchPjHistoryResultEvent.removeFilter(key, previousFilter.type, previousFilter.filter);
              eventbus.SearchPjHistoryResultEvent.removeActiveFilter(key, previousFilter.type, previousFilter.filter);
              eventbus.SearchPjHistoryResultEvent.removeButton(previousFilter.KeyName, previousFilter.type, previousFilter.filter);
            }
          }
        });
        previousFilterKeys.value = filterModelKeys;
        previousFilters.value = filterModels;
      }
    };

    const onCellValueChanged = async (event) => {
      try {
        const response = await fetch('http://localhost:8080/api/update/PjDevHistoryData', {
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

    const resetFilter = () => {
      const registeredFilters = eventbus.SearchPjHistoryResultEvent.getRegisteredFilters();
      gridApi.value.setFilterModel(null);
      if(registeredFilters.length === 0){
        if(searchPerformed.value){
          alert('필터가 입력되지 않았습니다. 필터를 입력하세요.');
        }
        if(!searchPerformed.value){
          alert("검색을 먼저 수행해 주세요.");
        }
      }else{
        registeredFilters.forEach(filter => {
          eventbus.SearchPjHistoryResultEvent.removeFilter(filter.KeyName, filter.type, filter.filter);
          eventbus.SearchPjHistoryResultEvent.removeActiveFilter(filter.KeyName, filter.type, filter.filter);
        });
        eventbus.SearchPjHistoryResultEvent.resetKorButton();
      }
    };

    const removeFilter = (KeyName, filterType, filterValue) => {
      const filterModel = gridApi.value.getFilterModel();

      if (filterModel[KeyName]) {
        const currentFilter = filterModel[KeyName];
        let adjustedFilterType;

        if (Array.isArray(currentFilter.conditions)) {
          const previousConditions = currentFilter.conditions.slice();

          currentFilter.conditions = currentFilter.conditions.filter(condition => {

            adjustedFilterType = filterTypeMap[filterType] || filterTypeMap[condition.type] || condition.type;

            const shouldKeep = !(adjustedFilterType === filterTypeMap[condition.type] && condition.filter === filterValue);
            console.log(`조건 유지 여부: ${shouldKeep}`);

            return shouldKeep;
          });

          if (currentFilter.conditions.length === 0) {
            eventbus.SearchPjHistoryResultEvent.removeActiveFilter(KeyName, filterType, filterValue);
          }
          if (JSON.stringify(previousConditions) !== JSON.stringify(currentFilter.conditions)) {
            gridApi.value.setFilterModel(filterModel);
            if (previousConditions.length !== currentFilter.conditions.length) {
              eventbus.SearchPjHistoryResultEvent.removeFilter(KeyName, adjustedFilterType, filterValue);
            }
          }
        } else {
          const currentFilterType = filterTypeMap[currentFilter.type] || currentFilter.type;
          const targetFilterType = filterTypeMap[filterType] || filterType;

          if (currentFilterType === targetFilterType && currentFilter.filter === filterValue) {
            delete filterModel[KeyName];
            gridApi.value.setFilterModel(filterModel);
            eventbus.SearchPjHistoryResultEvent.removeActiveFilter(KeyName, filterType, filterValue);
          }
        }
      }
    };

    const deleteRowBtnClick = async () => {
      const selectedNodes = gridApi.value.getSelectedNodes();
      const selectedData = selectedNodes.map(node => node.data);
      const devNoList = selectedData.map(row => row.DEV_NO);

      try {
        const response = await fetch('http://localhost:8080/api/deletePjDevHistData', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ devNoList }),
        });

        if (!response.ok) {
          throw new Error('Failed to delete data');
        }
        rowData.value = rowData.value.filter(row => !devNoList.includes(row.DEV_NO));
      } catch (error) {
        alert("삭제할 프로젝트를 선택해주세요.");
      }
    };

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