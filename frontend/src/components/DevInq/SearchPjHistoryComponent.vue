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
import { defineComponent, ref, shallowRef, onMounted, onBeforeUnmount } from "vue";
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
      { headerName: '이력서', field: 'resumeIcon', minWidth: 80, filter: false, sortable: false },
      { headerName: '프로젝트지원상태', field: "DEV_PJ_PRGRS_STTS", minWidth: 180, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '프로젝트지원날짜', field: "DEV_PJ_PRGRS_DT", minWidth: 180, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '프로젝트시작일자', field: "DEV_PJ_BGNG_DT", minWidth: 180, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '프로젝트종료일자', field: "DEV_PJ_END_DT", minWidth: 180, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '고객사명', field: "CUST_NM", minWidth: 130, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '수행사명', field: "SUBGC_NM", minWidth: 130, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '계약회사명', field: "CTRT_CO_NM", minWidth: 140, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '하청업체명', field: "SBCN_NM", minWidth: 140, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '프로젝트장소', field: "PJ_PLC", minWidth: 160, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '프로젝트투입등급', field: "PJ_INP_GRADE", minWidth: 180, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '직책', field: "JBTTL", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams },
      { headerName: '체제비', field: "SYST_FEE", minWidth: 120, filter: "agNumberColumnFilter", filterParams: numberFilterParams },
      { headerName: '계약회사정규직원금', field: "CTRT_CO_EMP_PRNC", minWidth: 190, filter: "agNumberColumnFilter", filterParams: numberFilterParams },
      { headerName: '3.3%원금', field: "WHTAX_PRNC", minWidth: 140, filter: "agNumberColumnFilter", filterParams: numberFilterParams },
      { headerName: '부가세원금', field: "VAT_PRNC", minWidth: 140, filter: "agNumberColumnFilter", filterParams: numberFilterParams },
      { headerName: '자사정규직원금', field: "KDS_EMP_PRNC", minWidth: 170, filter: "agNumberColumnFilter", filterParams: numberFilterParams },
      { headerName: '프로젝트별월요청단가', field: "PJ_MM_DMND_UNTPRC", minWidth: 210, filter: "agNumberColumnFilter", filterParams: numberFilterParams },
    ]);
    const rowSelection = ref("multiple");
    const rowData = ref([]);

    const fetchData = async (_type, _filter) => {
      console.log("🔍 fetchData 실행됨 with", _type, _filter);
      try {
        const response = await fetch(`http://localhost:8080/api/getPjHistData?devNo=${_filter.devNo}`);
        const data = await response.json();
        console.log("📦 받아온 데이터:", data);

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
          editRows.textContent = "수정";
          editRows.style.cursor = "pointer";
          editRows.style.marginLeft = "10px";
          editRows.onclick = () => {};
          secondPanel.insertBefore(editRows, addRows.nextSibling);

          const deleteRows = document.createElement("span");
          deleteRows.textContent = "삭제";
          deleteRows.style.cursor = "pointer";
          deleteRows.style.marginLeft = "10px";
          deleteRows.onclick = deleteRowBtnClick;
          secondPanel.insertBefore(deleteRows, editRows.nextSibling);
        }
      }

      // 이벤트 등록
      eventbus.SearchPjHistoryResultEvent.add("pjSearch", fetchData);
      eventbus.SearchPjHistoryResultEvent.add('pjRemoveFilter', removeFilter);
      eventbus.SearchPjHistoryResultEvent.add('pjReset', resetFilter);
      eventbus.SearchPjHistoryResultEvent.add('pjDeleteRow', deleteRowBtnClick);

      params.api.addEventListener('filterChanged', onFilterChanged);
    };

    const previousFilterKeys = ref([]);
    const previousFilters = ref([]);

    const onFilterChanged = async () => {
      const grf = eventbus.SearchPjHistoryResultEvent.pjGetRegisteredFilters();
      const filterModels = gridApi.value.getFilterModel();
      const filterModelKeys = Object.keys(filterModels);

      // 필터 조건이 등록된 필터와 동일한지 비교
      Object.keys(filterModels).forEach(key => {
        const filterObject = filterModels[key];
        const existsInGrf = grf.some(item => item.KeyName === key && item.type === filterObject.type && item.filter === filterObject.filter);

        if (existsInGrf) return;

        grf.forEach(grfItem => {
          if (filterObject?.conditions) {
            filterObject.conditions.forEach(condition => {
              if (grfItem.KeyName === key && grfItem.type === condition.type && grfItem.filter === condition.filter) {
                eventbus.SearchPjHistoryResultEvent.pjFilterUpdate(key, condition.type, condition.filter);
              }
            });
          }
        });

        // 필터 추가
        if (!existsInGrf) {
          const currentCondition = filterObject?.conditions ? filterObject.conditions[0] : null;
          eventbus.SearchPjHistoryResultEvent.pjFilterUpdate(key, currentCondition.type, currentCondition.filter);
        }
      });

      // 이전 필터와 비교하여 필터 모델 업데이트
      previousFilterKeys.value.forEach((key) => {
        const previousFilter = previousFilters.value[key];
        const currentFilterModel = filterModels[key];

        // 필터가 변경되었을 경우 처리
        if (!currentFilterModel) {
          if (previousFilter) {
            if (Array.isArray(previousFilter.conditions)) {
              previousFilter.conditions.forEach(condition => {
                eventbus.SearchPjHistoryResultEvent.pjRemoveFilter(key, condition.type, condition.filter);
              });
            }
          }
        } else {
          if (!filterModelKeys.includes(key)) {
            eventbus.SearchPjHistoryResultEvent.pjRemoveFilter(key, previousFilter.type, previousFilter.filter);
          }

          // 필터 타입이 달라졌을 경우 처리
          if (filterModelKeys.includes(key) && previousFilter.type !== currentFilterModel.type && previousFilter.filter === currentFilterModel.filter) {
            eventbus.SearchPjHistoryResultEvent.pjRemoveFilter(key, previousFilter.type, previousFilter.filter);
          }
        }
      });

      previousFilterKeys.value = filterModelKeys;
      previousFilters.value = filterModels;
    };

    const onCellValueChanged = async (event) => {
      try {
        const response = await fetch('http://localhost:8080/api/update/PjDevHistoryData', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(event.data),
        });
        if (!response.ok) throw new Error('Failed to update data');
      } catch (error) {
        console.error('프로젝트 데이터 수정에러:', error);
      }
    };

    const resetFilter = () => {
      const registeredFilters = eventbus.SearchPjHistoryResultEvent.pjGetRegisteredFilters();
      gridApi.value.setFilterModel(null);

      if (registeredFilters.length === 0 && searchPerformed.value) {
        alert('필터가 입력되지 않았습니다. 필터를 입력하세요.');
      } else {
        registeredFilters.forEach(filter => {
          eventbus.SearchPjHistoryResultEvent.pjRemoveFilter(filter.KeyName, filter.type, filter.filter);
        });
        eventbus.SearchPjHistoryResultEvent.pjResetKorButton();
      }
    };

    const removeFilter = (KeyName, filterType, filterValue) => {
      const filterModel = gridApi.value.getFilterModel();

      if (filterModel[KeyName]) {
        const currentFilter = filterModel[KeyName];
        let adjustedFilterType = filterTypeMap[filterType] || filterTypeMap[currentFilter.type] || currentFilter.type;

        if (Array.isArray(currentFilter.conditions)) {
          currentFilter.conditions = currentFilter.conditions.filter(condition => {
            const shouldKeep = !(adjustedFilterType === filterTypeMap[condition.type] && condition.filter === filterValue);
            return shouldKeep;
          });

          if (currentFilter.conditions.length === 0) {
            eventbus.SearchPjHistoryResultEvent.pjRemoveActiveFilter(KeyName, filterType, filterValue);
          }

          gridApi.value.setFilterModel(filterModel);
        } else {
          const currentFilterType = filterTypeMap[currentFilter.type] || currentFilter.type;
          const targetFilterType = filterTypeMap[filterType] || filterType;

          if (currentFilterType === targetFilterType && currentFilter.filter === filterValue) {
            delete filterModel[KeyName];
            gridApi.value.setFilterModel(filterModel);
            eventbus.SearchPjHistoryResultEvent.pjRemoveActiveFilter(KeyName, filterType, filterValue);
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
          headers: { 'Content-Type': 'application/json' },
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

    const selectedDeveloperId = ref(null);

    const fetchProjectHistoryFromServer = async (filter) => {
      try {
        const query = filter?.devNo ? `?devNo=${filter.devNo}` : '';
        const response = await fetch(`http://localhost:8080/api/getPjHistData${query}`);
        const data = await response.json();

        console.log("📦 받아온 데이터:", data);

        return data.result.row.map(item => ({
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
      } catch (error) {
        console.error("❌ 프로젝트 이력 데이터 로드 실패:", error);
        return [];
      }
    };

    const handleSearch = async (type, filter) => {
      try {
        console.log("🔍 프로젝트 이력 검색 요청:", filter);

        const allHistoryData = await fetchProjectHistoryFromServer();

        const filteredData = allHistoryData.filter(item => {
          return String(item.DEV_NO) === String(filter.devNo);
        });

        console.log("✅ 필터링 결과 수:", filteredData.length);

        rowData.value = filteredData;
        gridApi.value.refreshCells();
        searchPerformed.value = true;
      } catch (err) {
        console.error("❗ 검색 처리 중 오류:", err);
        rowData.value = [];
      }
    };


    onMounted(() => {
      eventbus.SearchPjHistoryResultEvent.add('pjSearch', handleSearch);
    });

    onBeforeUnmount(() => {
      eventbus.SearchPjHistoryResultEvent.remove('pjSearch', handleSearch);
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
      deleteRowBtnClick,
      resetFilter,
      removeFilter,
      textFilterParams,
      selectedDeveloperId,
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