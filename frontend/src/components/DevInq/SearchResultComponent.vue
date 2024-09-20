<template>
  <div class="ag-theme-quartz search-result pl10" style="width: 100%; height: 98%;">
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
import { defineComponent, ref, shallowRef} from "vue";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import eventbus from '@/eventbus/eventbus'

//Vue 3에서 컴포넌트를 정의하는 함수입니다. 이 함수는 컴포넌트의 옵션을 포함하는 객체를 인자로 받습니다.
export default defineComponent({
  //ag-grid-vue3패키지를 가져온 모듈 AgGridVue를 ag-grid-vue라는 이름으로 현재 컴포넌트에서 사용할 때 사용한다.
  components: {
    "ag-grid-vue": AgGridVue,
  },
  //이 함수는 Vue 3 컴포넌트의 생명 주기 중에 초기화되는 함수로, 컴포넌트가 생성될 때 실행됩니다.
  //이 함수는 컴포넌트의 반응형 상태 및 메소드를 정의하고 반환하여, 템플릿에서 사용할 수 있도록 합니다.
  setup() {
    //gridApi라는 변수를 정의하고 shallowRef()를 사용하여 반응형 참조를 생성합니다.
    //shallowRef()는 객체의 내부 값을 추적하지 않고, 기본 값만 반응형으로 만드는 함수입니다. 주로 성능 최적화를 위해 사용됩니다.
    //이 경우, gridApi는 AG Grid API를 참조하기 위해 사용될 것입니다.
    const gridApi = shallowRef();
    //defaultColDef라는 변수를 정의하고 ref()를 사용하여 반응형 객체를 생성합니다.
    //ref()는 기본 타입의 값을 반응형으로 만들어 Vue의 반응형 시스템에서 관리할 수 있게 합니다.
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
      },
    };

    //columnDefs는 Vue의 반응형 객체로, AG Grid에서 사용할 열(column)의 정의 목록입니다. 각 열은 객체로 정의되어 있습니다.
    const columnDefs = ref([
      //headerName: 열의 헤더에 표시될 이름입니다.
      //field: 데이터의 어떤 필드를 이 열과 연결할지를 지정합니다. 이 필드는 데이터 소스에서 가져온 객체의 키입니다.
      //minWidth: 열의 최소 너비를 설정합니다. 이 값보다 작아지지 않도록 보장합니다.
      //checkboxSelection: 이 열에서 체크박스를 표시할지 여부를 결정합니다. 주로 선택 기능이 필요한 경우 사용됩니다.
      //headerCheckboxSelection: 헤더에 체크박스를 추가하여 전체 선택/해제를 가능하게 합니다.
      //filter: 이 열에서 사용할 필터링 방법을 지정합니다. 예를 들어, "agTextColumnFilter"는 텍스트 기반 필터를 사용합니다.
      //filterParams: 필터의 추가 설정을 위한 매개변수입니다.
      // { headerName: '개발자번호', field: "DEV_NO", minWidth: 170, checkboxSelection: true, headerCheckboxSelection: true },
      { headerName: '이름', field: "NM", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams, checkboxSelection: true, headerCheckboxSelection: true },
      { headerName: '프로젝트투입상태', field: "PJ_INP_STTS", minWidth: 200, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '계약횟수', field: "CTRT_NMTM", minWidth: 140 },
      { headerName: '생년월일', field: "BRDT", minWidth: 140 },
      { headerName: '나이', field: "AGE", minWidth: 100 },
      { headerName: '학력', field: "ACBG", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '성별', field: "GNDR", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '직위', field: "JBPS", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '등급', field: "GRD", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '총경력기간', field: "T_CR_PER", minWidth: 170 },
      { headerName: '지역', field: "RGN", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '휴대전화번호', field: "MBL_TELNO", minWidth: 190 },
      { headerName: '이메일', field: "EML", minWidth: 120, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '컨택방법', field: "CONTT_MTHD", minWidth: 140, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '인터뷰요청일', field: "NTRV_DMND_DT", minWidth: 190 },
      { headerName: '투입가능일', field: "INP_PSBLTY_DT", minWidth: 170 },
      { headerName: '소속회사', field: "OGDP_CO", minWidth: 140, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '일련번호', field: "SN", minWidth: 140 },
      { headerName: '3.3%여부', field: "WHTAX_YN", minWidth: 170, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '사업자여부', field: "BZMN_YN", minWidth: 170, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '자사정규직여부', field: "KDS_EMP_YN", minWidth: 190, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '계약회사정규직여부', field: "CTRT_CO_EMP_YN", minWidth: 210, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '대금수령날짜', field: "CLCT_PICKUP_DT", minWidth: 190 },
      { headerName: '지급일자', field: "GIVE_DT", minWidth: 140 },
      { headerName: '은행', field: "BANK", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '계좌번호', field: "ACTNO", minWidth: 140 },
      { headerName: '부서', field: "DEPT", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '월요청단가', field: "MM_DMND_UNTPRC", minWidth: 170 },
      { headerName: '주소', field: "ADDR", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '직책', field: "JBTTL", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '소개자', field: "BRKR", minWidth: 120, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '카카오톡닉네임', field: "KAKAO_NICK", minWidth: 190, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '계약이력존재여부', field: "CTRT_HSTRY_YN", minWidth: 200, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '병역', field: "MS", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '기종', field: "MDL", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '운영체제', field: "OS", minWidth: 140, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '언어', field: "LANG", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '데이터베이스', field: "DB", minWidth: 190, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '툴', field: "TOOL", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '프레임워크', field: "FRMW", minWidth: 170, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '라이브러리', field: "LBRR", minWidth: 170, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '통신', field: "CMNCT", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      { headerName: '기타', field: "ETC", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
    ]);

    const rowSelection = ref("multiple");
    const rowData = ref([]);
    // const currentlyActiveFilterModel = ref([]);
    const filterModel = ref([]);

    const getCurrentFilterModel = () => {
      if (gridApi.value) {
        return gridApi.value.getFilterModel(); // filterModel을 반환
      }
    };

    const onGridReady = async (params) => {
      gridApi.value = params.api;

      eventbus.SearchResultEvent.add('search', fetchData);

      params.api.addEventListener('filterChanged', () => {

        filterModel.value = getCurrentFilterModel();
        console.log(filterModel.value);

        // console.log(Object.keys(filterModel.value));
        // console.log(Object.keys(filterModel.value)[0]);
        // console.log(Object.keys(filterModel.value).length);
        // console.log(Object.keys(currentlyActiveFilterModel.value).length);
        // 필터 키와 값을 출력
        var i;
        Object.keys(filterModel.value).forEach(key => {
          const filterObject = filterModel.value[key];
          console.log(`필터 키: ${key}, 필터 객체:`, filterObject);

          if(filterObject?.conditions) {
            const filtersToRemove = [];

            for (i = 0; i < filterObject?.conditions.length; i++) {
              for (let j = i+1;j<filterObject?.conditions.length;j++){
                if (filterObject?.conditions[i].filter === filterObject?.conditions[j].filter
                    && filterObject?.conditions[i].type === filterObject?.conditions[j].type) {
                  console.log('동일한 필터입니다.');
                  // 동일한 필터를 찾으면 제거할 인덱스 추가
                  filtersToRemove.push(j); // j는 중복된 필터의 인덱스
                }else{
                  console.log('동일한 필터가 아닙니다.');
                }
              }
            }
            // 중복된 필터 제거
            filtersToRemove.reverse().forEach(index => {
              filterObject.conditions.splice(index, 1); // 인덱스에 해당하는 필터 제거
              console.log(`인덱스 ${index}의 필터를 제거했습니다.`);
            });
            console.log(filterObject);
            // AG Grid에 필터 모델 업데이트
            const updatedFilterModel = { ...filterModel.value }; // 깊은 복사
            params.api.setFilterModel(updatedFilterModel);
            console.log('업데이트된 필터 모델:', updatedFilterModel);
          }
        });

        // filterValue를 가져오기
        // if(filterObject){
        //
        // }else{
        //   const filterValue = filterObject?.filter; // 옵셔널 체이닝 사용
        //   console.log(`필터 키: ${key}, 필터 값: ${filterValue}`);
        // }
        // var filterModelKeyLength;
        // var i;
        // filterModelKeyLength=Object.keys(filterModel.value).length;
        // var currentlyActiveFilterModelKeyLength;
        // currentlyActiveFilterModelKeyLength=Object.keys(currentlyActiveFilterModel.value).length;
        // var j;
        // if(currentlyActiveFilterModelKeyLength === 0){
        //   currentlyActiveFilterModel.value = filterModel.value;
        // }else{
        //   for(i=0;i<filterModelKeyLength;i++){
        //     for(j=0;j<currentlyActiveFilterModelKeyLength;j++){
        //       if(Object.keys(filterModel.value)[i] === Object.keys(currentlyActiveFilterModel.value)[j]){
        //         // 필터 키와 값을 출력
        //         // Object.keys(filterModel.value).forEach(key => {
        //         //   const filterValue = filterModel.value[key]?.filter; // 옵셔널 체이닝 사용
        //         //   console.log(`필터 키: ${key}, 필터 값: ${filterValue}`);
        //       // });
        //
        //         console.log('같은필터입니다.');
        //         if(filterModel.value[i].type === currentlyActiveFilterModel.value[j].type){
        //           if(filterModel.value[i].filter === currentlyActiveFilterModel.value[j].filter){
        //
        //             console.log('같은필터입니다.');
        //           }else{
        //             console.log('필터추가입니다..');
        //           }
        //         }
        //       }
        //     }
        //   }
        // }

        // if (
        //     Object.keys(currentlyActiveFilterModel.value).length === Object.keys(filterModel.value).length &&
        //     Object.keys(currentlyActiveFilterModel.value).every(key => {
        //       const activeFilter = currentlyActiveFilterModel.value[key];
        //       const newFilter = filterModel.value[key];
        //       return activeFilter.type === newFilter.type && activeFilter.filter === newFilter.filter;
        //     })
        // ) {
        //   console.log('같은 필터를 입력하였습니다.');
        // }
        // currentlyActiveFilterModel.value = filterModel.value;
        // console.log('활성화필터모델:', currentlyActiveFilterModel.value);
        // // if(filterModelKeys.value)
        //
        // // filterModelKeys.value = Object.keys(filterModel.value);
        // // filterModel.value가 객체일 때 각 필터를 currentlyActiveFilterModel에 추가
        // if (filterModel.value) {
        //   // filterModel의 각 필터를 순회
        //   Object.keys(filterModel.value).forEach(key => {
        //     const newFilter = filterModel.value[key];
        //
        //
        //       if (Object.keys(filterModel.value)[0] === 'NM') {
        //         console.log(Object.keys(filterModel.value)[0]);
        //         // currentlyActiveFilterModel.value.push({ NM: filterModel.value.NM });
        //         eventbus.SearchResultEvent.filterUpdate( Object.keys(filterModel.value)[0], filterModel.value.NM.type, filterModel.value.NM.filter);
        //       }
        //
        //       if (filterModel.value.AGE) {
        //         eventbus.SearchResultEvent.filterUpdate(filterModel.value.AGE.type, filterModel.value.AGE.filter);
        //       }
        //
        //       // 추가적인 필터에 대한 처리
        //       if (!filterModel.value.NM && !filterModel.value.AGE) {
        //         // NM 필터가 없을 경우 빈 값으로 버튼 업데이트
        //         eventbus.SearchResultEvent.filterUpdate('', '');
        //       }
        //       console.log(`추가된 필터: ${key}`, newFilter);
        //   });
        // }
      });
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
          MDL: item.MDL, // 모델
          OS: item.OS, // 운영 체제
          LANG: item.LANG, // 언어
          DB: item.DB, // 데이터베이스
          TOOL: item.TOOL, // 툴
          FRMW: item.FRMW, // 프레임워크
          LBRR: item.LBRR, // 라이브러리
          CMNCT: item.CMNCT, // 통신
          ETC: item.ETC, // 기타
          AGE: item.AGE, // 나이
          ACBG: item.ACBG // 학력
        }));
        rowData.value = translatedData;
        gridApi.value.refreshCells();
      } catch (error) {
        console.error('데이터 로드 오류:', error);
        rowData.value = [];
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

    //--- 필터초기화 시작 ---//
    const resetFilter = () => {
      gridApi.value.setFilterModel(null);
      // eventbus.SearchResultEvent.filterUpdate('', '','');
    };

    // 이벤트 등록
    eventbus.SearchResultEvent.add('reset', resetFilter);
    //--- 필터초기화 끝 ---//
    //--- 선택된 행 삭제 시작 ---//
    const deleteRowBtnClick = async () => {
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
        // gridApi.value.setRowData(rowData.value);
      } catch (error) {
        console.error('Error deleting data:', error);
        alert("삭제할 개발자를 선택해주세요.");
      }
    };
    // 이벤트 등록
    eventbus.SearchResultEvent.add('deleteRow', deleteRowBtnClick);
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
      getCurrentFilterModel,
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
  background-color: #e8e8e8 !important;;
}
.pl10{
  padding-left: 10px;
}
</style>