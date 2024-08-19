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
      { field: "개발자번호", minWidth: 170, checkboxSelection: true, headerCheckboxSelection: true },
      { field: "이름" },
      { field: "프로젝트투입상태" },
      { field: "계약횟수" },
      { field: "생년월일" },
      { field: "성별" },
      { field: "직위" },
      { field: "등급" },
      { field: "총경력기간" },
      { field: "지역" },
      { field: "휴대전화번호" },
      { field: "이메일" },
      { field: "컨택방법" },
      { field: "인터뷰요청일" },
      { field: "투입가능일" },
      { field: "소속회사" },
      { field: "일련번호" },
      { field: "3.3%여부" },
      { field: "사업자여부" },
      { field: "자사정규직여부" },
      { field: "계약회사정규직여부" },
      { field: "대금수령날짜" },
      { field: "지급일자" },
      { field: "은행" },
      { field: "계좌번호" },
      { field: "부서" },
      { field: "월요청단가" },
      { field: "주소" },
      { field: "직책" },
      { field: "소개자" },
      { field: "카카오톡닉네임" },
      { field: "계약이력존재여부" },
      { field: "병역" },
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

    const onGridReady = async (params) => {
      gridApi.value = params.api;
      await fetchData();
    };

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/data');
        const data = await response.json();

        const translatedData = data.result.row.map(item => ({
          개발자번호: item.DEV_NO,                 // 개발자번호
          이름: item.NM,                           // 이름
          프로젝트투입상태: item.PJ_INP_STTS,    // 프로젝트투입상태
          계약횟수: item.CTRT_NMTM,                 // 계약횟수
          생년월일: item.BRDT,                     // 생년월일
          성별: item.GNDR,                         // 성별
          직위: item.JBPS,                         // 직위
          등급: item.GRD,                          // 등급
          총경력기간: item.T_CR_PER,               // 총경력기간
          지역: item.RGN,                           // 지역
          휴대전화번호: item.MBL_TELNO,                 // 휴대전화번호
          이메일: item.EML,                  // 이메일
          컨택방법: item.CONTT_MTHD,                       // 컨택방법
          인터뷰요청일: item.NTRV_DMND_DT,          // 인터뷰요청일
          투입가능일: item.INPUT_PSBLTY_DT,           // 투입가능일
          소속회사: item.OGDP_CO,                  // 소속회사
          일련번호: item.SN,                       // 일련번호
          '3.3%여부': item.WHTAX_YN,               // 3.3%여부
          사업자여부: item.BZMN_YN,                // 사업자여부
          자사정규직여부: item.KDS_EMP_YN,         // 자사정규직여부
          계약회사정규직여부: item.CTRT_CO_EMP_YN, // 계약회사정규직여부
          대금수령날짜: item.CLCT_PICKUP_DT,       // 대금수령날짜
          지급일자: item.GIVE_DT,                  // 지급일자
          은행: item.BANK,                         // 은행
          계좌번호: item.ACTNO,                    // 계좌번호
          부서: item.DEPT,                         // 부서
          월요청단가: item.MM_DMND_UNTPRC,        // 월요청단가
          주소: item.ADDR,                         // 주소
          직책: item.JBTTL,                        // 직책
          소개자: item.BRKR,                       // 소개자
          카카오톡닉네임: item.KAKAO_NICK,        // 카카오톡닉네임
          계약이력존재여부: item.CTRT_HSTRY_YN,   // 계약이력존재여부
          병역: item.MS,               // 병역
        }));

        rowData.value = translatedData; // 변환된 데이터 할당
        console.log("할당된 rowData:", rowData.value); // 할당된 데이터 출력
      } catch (error) {
        console.error('데이터 로드 오류:', error);
      }
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