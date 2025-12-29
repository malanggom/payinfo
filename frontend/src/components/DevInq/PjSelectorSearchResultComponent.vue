<template>
  <div class="ag-theme-quartz p-3" style="width: 100%; height: 100%;">
    <ag-grid-vue
        @rowClicked="onRowClick"
        style="width: 100%; height: 100%;"
        :columnDefs="columnDefs"
        @grid-ready="onGridReady"
        :defaultColDef="defaultColDef"
        :rowSelection="rowSelection"
        :rowData="rowData"
        :pagination="true"
    />
  </div>
</template>

<script>
import {defineComponent, ref, shallowRef, onMounted, onBeforeUnmount} from "vue";
import {AgGridVue} from "ag-grid-vue3";
import eventbus from '@/eventbus/eventbus'
import pjEventbus from '@/eventbus/pjEventbus'

export default defineComponent({
  components: {
    "ag-grid-vue": AgGridVue,
  },
  methods: {
    onRowClick(event) {
      this.selectedPjNo = event.data.PJ_NO;
      console.log("선택된 PJ_NO:", this.selectedPjNo);

      // ✅ PJ_NO를 프로젝트 히스토리 컴포넌트로 전달
      eventbus.SearchPjHistoryResultEvent.devPjSelectProject(this.selectedPjNo);
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

    const defaultColDef = ref({
      editable: true,
      filter: true,
      flex: 1,
      headerClass: "centered"
    });

    const columnDefs = ref([
      { headerName: '선택', checkboxSelection: true, minWidth: 60, filter: false, sortable: false, cellClass: 'checkboxCentered'},
      { headerName: '프로젝트명', field: "PJ_NM", minWidth: 140 },
      { headerName: '프로젝트상태', field: "PJ_STTS", minWidth: 160 },
      { headerName: '시작일자', field: "PJ_BGNG_DT", minWidth: 130 },
      { headerName: '종료일자', field: "PJ_END_DT", minWidth: 130 },
      { headerName: '고객사명', field: "CUST_NM", minWidth: 130 },
      { headerName: '수행사명', field: "SUBGC_NM", minWidth: 130 },
      { headerName: '계약회사명', field: "CTRT_CO_NM", minWidth: 140 },
      { headerName: '등급', field: "PJ_GRADE", minWidth: 100 },
      { headerName: '인원', field: "PERSONNEL", minWidth: 100 },
      { headerName: '단가', field: "UNITPRICE", minWidth: 100 },
      { headerName: '체제비', field: "SYST_FEE", minWidth: 120 },
      { headerName: '자사정규직원금', field: "KDS_EMP_PRNC", minWidth: 170 },
      { headerName: '계약회사정규직원금', field: "CTRT_CO_EMP_PRNC", minWidth: 190 },
      { headerName: '요구스킬', field: "PJ_SKILL", minWidth: 130 },
      { headerName: '업무영역', field: "TASK_AREA", minWidth: 130 },
      { headerName: '상세업무', field: "DTL_TASK", minWidth: 130 },
      { headerName: '직책', field: "PJ_JBTTL", minWidth: 100 },
      { headerName: '지원기간', field: "PJ_SPRT_PER", minWidth: 130 },
      { headerName: '장소', field: "PJ_PLC", minWidth: 100 },
      { headerName: '경력증빙', field: "PRF_CR", minWidth: 130 },
      { headerName: '채용구분', field: "RCRT_CLSF", minWidth: 130 },
      { headerName: '우대사항', field: "PRFR_TRTM", minWidth: 130 },
      { headerName: '기타', field: "PJ_ETC", minWidth: 100 }
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

    const onGridReady = async (params) => {
      gridApi.value = params.api;
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
      onGridReady,
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