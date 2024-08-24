<template>
  <div class="ag-theme-quartz search-result" style="width: 100%; height: 90%;">
    <ag-grid-vue
        style="width: 100%; height: 100%;"
        :columnDefs="columnDefs"
        @grid-ready="onGridReady"
        :defaultColDef="defaultColDef"
        :rowSelection="rowSelection"
        :rowData="rowData"
        :grid-options="gridOptions"
        :pagination="true"
        @cell-value-changed="onCellValueChanged"
    />
    <DeleteRowDataBtnComponent @remove="removeSelectedRows" />
  </div>
</template>

<script>
import { defineComponent, ref, shallowRef } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import DeleteRowDataBtnComponent from '@/components/common/DeleteRowDataBtnComponent.vue';

export default defineComponent({
  components: {
    "ag-grid-vue": AgGridVue,
    DeleteRowDataBtnComponent,
  },
  setup() {
    const columnDefs = ref([
      { headerName: '개발자번호', field: "DEV_NO", minWidth: 170, checkboxSelection: true, headerCheckboxSelection: true },
      { headerName: '이름', field: "NM" },
      { headerName: '프로젝트투입상태', field: "PJ_INP_STTS" },
      { headerName: '계약횟수', field: "CTRT_NMTM" },
      { headerName: '생년월일', field: "BRDT" },
      { headerName: '성별', field: "GNDR" },
      { headerName: '직위', field: "JBPS" },
      { headerName: '등급', field: "GRD" },
      { headerName: '총경력기간', field: "T_CR_PER" },
      { headerName: '지역', field: "RGN" },
      { headerName: '휴대전화번호', field: "MBL_TELNO" },
      { headerName: '이메일', field: "EML" },
      { headerName: '컨택방법', field: "CONTT_MTHD" },
      { headerName: '인터뷰요청일', field: "NTRV_DMND_DT" },
      { headerName: '투입가능일', field: "INP_PSBLTY_DT" },
      { headerName: '소속회사', field: "OGDP_CO" },
      { headerName: '일련번호', field: "SN" },
      { headerName: '3.3%여부', field: "WHTAX_YN" },
      { headerName: '사업자여부', field: "BZMN_YN" },
      { headerName: '자사정규직여부', field: "KDS_EMP_YN" },
      { headerName: '계약회사정규직여부', field: "CTRT_CO_EMP_YN" },
      { headerName: '대금수령날짜', field: "CLCT_PICKUP_DT" },
      { headerName: '지급일자', field: "GIVE_DT" },
      { headerName: '은행', field: "BANK" },
      { headerName: '계좌번호', field: "ACTNO" },
      { headerName: '부서', field: "DEPT" },
      { headerName: '월요청단가', field: "MM_DMND_UNTPRC" },
      { headerName: '주소', field: "ADDR" },
      { headerName: '직책', field: "JBTTL" },
      { headerName: '소개자', field: "BRKR" },
      { headerName: '카카오톡닉네임', field: "KAKAO_NICK" },
      { headerName: '계약이력존재여부', field: "CTRT_HSTRY_YN" },
      { headerName: '병역', field: "MS" },
    ]);

    const gridApi = shallowRef();
    const defaultColDef = ref({
      editable: true,
      filter: true,
      flex: 1,
    });
    const rowSelection = ref("multiple");
    const rowData = ref([]);

    const gridOptions = {
      autoSizeStrategy: {
        type: 'fitCellContents',
      },
      // 다른 그리드 옵션들...
    };

    const onGridReady = async (params) => {
      gridApi.value = params.api; // api를 gridApi에 저장
      rowData.value = await fetchData(); // fetchData의 반환 값을 rowData에 할당
      gridApi.value.refreshCells(); // 셀 업데이트
    };

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/data');
        const data = await response.json();

        const translatedData = data.result.row.map(item => ({
          DEV_NO: item.DEV_NO, // 개발자번호
          NM: item.NM, // 이름
          PJ_INP_STTS: item.PJ_INP_STTS, // 프로젝트투입상태
          CTRT_NMTM: item.CTRT_NMTM, // 계약횟수
          BRDT: item.BRDT, // 생년월일
          GNDR: item.GNDR, // 성별
          JBPS: item.JBPS, // 직위
          GRD: item.GRD, // 등급
          T_CR_PER: item.T_CR_PER, // 총경력기간
          RGN: item.RGN, // 지역
          MBL_TELNO: item.MBL_TELNO, // 휴대전화번호
          EML: item.EML, // 이메일
          CONTT_MTHD: item.CONTT_MTHD, // 컨택방법
          NTRV_DMND_DT: item.NTRV_DMND_DT, // 인터뷰요청일
          INP_PSBLTY_DT: item.INP_PSBLTY_DT, // 투입가능일
          OGDP_CO: item.OGDP_CO, // 소속회사
          SN: item.SN, // 일련번호
          WHTAX_YN: item.WHTAX_YN, // 3.3%여부
          BZMN_YN: item.BZMN_YN, // 사업자여부
          KDS_EMP_YN: item.KDS_EMP_YN, // 자사정규직여부
          CTRT_CO_EMP_YN: item.CTRT_CO_EMP_YN, // 계약회사정규직여부
          CLCT_PICKUP_DT: item.CLCT_PICKUP_DT, // 대금수령날짜
          GIVE_DT: item.GIVE_DT, // 지급일자
          BANK: item.BANK, // 은행
          ACTNO: item.ACTNO, // 계좌번호
          DEPT: item.DEPT, // 부서
          MM_DMND_UNTPRC: item.MM_DMND_UNTPRC, // 월요청단가
          ADDR: item.ADDR, // 주소
          JBTTL: item.JBTTL, // 직책
          BRKR: item.BRKR, // 소개자
          KAKAO_NICK: item.KAKAO_NICK, // 카카오톡닉네임
          CTRT_HSTRY_YN: item.CTRT_HSTRY_YN, // 계약이력존재여부
          MS: item.MS, // 병역
        }));

        return translatedData; // 변환된 데이터를 반환
      } catch (error) {
        console.error('데이터 로드 오류:', error);
        return []; // 오류 발생 시 빈 배열 반환
      }
    };

    // 셀의 값이 변경될 때 호출되는 함수
    const onCellValueChanged = async (event) => {
      console.log(event.data)

      try {
        const response = await fetch('http://localhost:8080/api/updateData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event.data),
        });

        if (!response.ok) {
          throw new Error('Failed to update data');
        }

        const result = await response.json();
        console.log(result.message);
      } catch (error) {
        console.error('Error updating data:', error);
      }
    };

    const removeSelectedRows = async () => {
      const selectedNodes = gridApi.value.getSelectedNodes();
      const selectedData = selectedNodes.map(node => node.data);

      // 삭제할 개발자번호 목록
      const devNoList = selectedData.map(row => row.DEV_NO);

      // 서버에 DELETE 요청 보내기
      try {
        const response = await fetch('http://localhost:8080/api/deleteData', {
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
        gridApi.value.setRowData(rowData.value);
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    };

    return {
      // 기존 반환값에 removeSelectedRows 추가
      columnDefs,
      gridApi,
      defaultColDef,
      rowSelection,
      rowData,
      gridOptions,
      onGridReady,
      onCellValueChanged,
      removeSelectedRows, // 추가
    };
  },
});
</script>

<style>
@import "ag-grid-community/styles/ag-grid.css";
@import "ag-grid-community/styles/ag-theme-quartz.css";
</style>