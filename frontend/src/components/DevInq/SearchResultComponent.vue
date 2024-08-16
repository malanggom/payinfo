<template>
  <div class="ag-theme-quartz search-result" style="width: 100%; height: 90%;">
    <ag-grid-vue
        style="width: 100%; height: 100%;"
        :columnDefs="columnDefs"
        @grid-ready="onGridReady"
        :defaultColDef="defaultColDef"
        :rowSelection="rowSelection"
        :rowData="rowData"
    />
  </div>
</template>

<script>
import { defineComponent, ref, shallowRef } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export default defineComponent({
  components: {
    "ag-grid-vue": AgGridVue,
  },
  setup() {
    const columnDefs = ref([
      {field: "DEV_NO", minWidth: 170, checkboxSelection: true, headerCheckboxSelection: true},
      {field: "NM"},
      {field: "PJ_INP_STTS"},
      {field: "CTRT_NMTM"},
      {field: "BRDT"},
      {field: "GNDR"},
      {field: "JBPS"},
      {field: "GRD"},
      {field: "T_CR_PER"},
      {field: "RGN"},
      {field: "MBL_TELNO"},
      {field: "EML"},
      {field: "CONTT_MTHD"},
      {field: "NTRV_DMND_DT"},
      {field: "INPUT_PSBLTY_DT"},
      {field: "OGDP_CO"},
      {field: "SN"},
      {field: "WHTAX_YN"},
      {field: "BZMN_YN"},
      {field: "KDS_EMP_YN"},
      {field: "CTRT_CO_EMP_YN"},
      {field: "CLCT_PICKUP_DT"},
      {field: "GIVE_DT"},
      {field: "BANK"},
      {field: "ACTNO"},
      {field: "DEPT"},
      {field: "MM_DMND_UNTPRC"},
      {field: "ADDR"},
      {field: "JBTTL"},
      {field: "BRKR"},
      {field: "KAKAO_NICK"},
      {field: "CTRT_HSTRY_YN"},
      {field: "MS"},
    ]);

    const gridApi = shallowRef();
    const defaultColDef = ref({
      editable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
    });
    const rowSelection = ref("multiple");
    const rowData = ref([]);

    const onGridReady = (params) => {
      gridApi.value = params.api;
      fetch("http://localhost:8080/api/data")
          .then((resp) => resp.json())
          .then((data) => {
            console.log("API 응답:", data); // API 응답 출력
            rowData.value = data.result.row; // 데이터 할당
            console.log("할당된 rowData:", rowData.value); // 할당된 데이터 출력
          })
          .catch((error) => {
            console.error("데이터 로드 오류:", error);
          });
    };

    return {
      columnDefs,
      gridApi,
      defaultColDef,
      rowSelection,
      rowData,
      onGridReady,
    };
  },
});
</script>

<style>
@import "ag-grid-community/styles/ag-grid.css";
@import "ag-grid-community/styles/ag-theme-quartz.css";
</style>