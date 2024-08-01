===========================================================================
                        SearchResultComponent.vue
===========================================================================
===========================================================================
                                템플릿 시작
===========================================================================
<template>
  <div class="ag-theme-quartz search__result" style="width: 100%; height: 90%;">
    <ag-grid-vue
        class="search__result__data"
        style="width: 100%; height: 100%;"
        :columnDefs="colDefs"
        :gridOptions="gridOptions"
        @grid-ready="onGridReady"
    />
  </div>
</template>
===========================================================================
                                템플릿 종료
===========================================================================
                                스크립트 시작
===========================================================================
<script>
import { ref } from 'vue';
import { AgGridVue } from "ag-grid-vue3"; // Vue Data Grid Component

export default {
  name: "App",
  components: {
    AgGridVue,
  },
  setup() {
    const gridApi = ref(null); // grid API 선언
    const gridOptions = ref({
      rowModelType: 'infinite',
      datasource: null,
      columnDefs: [
        {
          headerName: "ID",
          maxWidth: 100,
          valueGetter: "node.id",
          cellRenderer: (params) => {
            if (params.value !== undefined) {
              return params.value;
            } else {
              return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
            }
          },
        },
        { field: "athlete", minWidth: 150 },
        { field: "age" },
        { field: "country", minWidth: 150 },
        { field: "year" },
        { field: "date", minWidth: 150 },
        { field: "sport", minWidth: 150 },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        sortable: false,
      },
      rowBuffer: 0,
      rowSelection: "multiple",
      cacheBlockSize: 100,
      maxConcurrentDatasourceRequests: 1,
      infiniteInitialRowCount: 1000,
      maxBlocksInCache: 10,
    });

    // 데이터 소스 설정
    const myDataSource = {
      rowCount: undefined, // behave as infinite scroll

      getRows: (params) => {
        console.log("Requesting rows from " + params.startRow + " to " + params.endRow);

        // 서버에서 데이터를 요청
        fetch(`https://www.ag-grid.com/example-assets/olympic-winners.json`)
            .then(response => response.json())
            .then(data => {
              // 실제 데이터에 맞게 paging 처리
              const rowsThisPage = data.slice(params.startRow, params.endRow);
              let lastRow = -1;
              if (data.length <= params.endRow) {
                lastRow = data.length;
              }
              params.successCallback(rowsThisPage, lastRow);
            })
            .catch(error => {
              console.error('Error fetching data:', error);
              params.failCallback();
            });
      },
    };

    // 그리드가 초기화되기 전에 기본 설정
    gridOptions.value.datasource = myDataSource;

    // 그리드 초기화 후에 데이터 소스를 설정하는 메서드
    const onGridReady = (params) => {
      gridApi.value = params.api; // gridApi 저장
      params.api.setDatasource(myDataSource);
    };

    return {
      gridOptions,
      onGridReady,
    };
  },
};
</script>
===========================================================================
                                스크립트 종료
===========================================================================
                                스타일 시작
===========================================================================
<style>
@import "ag-grid-community/styles/ag-grid.css";
@import "ag-grid-community/styles/ag-theme-quartz.css";
.search__result{
  padding-left: 10px;
  padding-right: 10px;
}
</style>