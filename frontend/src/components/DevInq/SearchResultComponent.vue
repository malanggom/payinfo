<template>
  <div class="ag-theme-quartz" style="width: 100%; height: 100%;">
    <dev-add-btn-component ref="devAddBtn" @open-modal="openModal"></dev-add-btn-component>
    <dev-update-btn-component ref="devUpdateBtn" @open-modal="openModalUpdate"></dev-update-btn-component>
    <preview-resume-component ref="previewResumeBtn" @open-modal="openModalPreviewResume"></preview-resume-component>
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
import DevAddBtnComponent from './DevAddBtnComponent.vue';
import DevUpdateBtnComponent from './DevUpdateBtnComponent.vue';
import PreviewResumeComponent from './PreviewResumeComponent.vue';
import {AgGridVue} from "ag-grid-vue3";
import eventbus from '@/eventbus/eventbus'

export default defineComponent({
  components: {
    "ag-grid-vue": AgGridVue,
    DevAddBtnComponent,
    DevUpdateBtnComponent,
    PreviewResumeComponent,
  },
  methods: {
    onRowClick(event) {
      this.selectedDevNo = event.data.DEV_NO;
      console.log("선택된 DEV_NO:", this.selectedDevNo);

      // ✅ DEV_NO를 프로젝트 히스토리 컴포넌트로 전달
      eventbus.SearchPjHistoryResultEvent.devPjSelectDeveloper(this.selectedDevNo);
      // 이벤트버스로 전달
      eventbus.SearchPjHistoryResultEvent.devPjFetchData("devPjSearch", { devNo: this.selectedDevNo });
    }
  },
  data() {
    return {
      selectedDevNo: null // 초기값 null 또는 원하는 기본값
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
      {headerName: '선택', checkboxSelection: true, minWidth: 60, filter: false, sortable: false, cellClass: 'checkboxCentered'},
      {headerName: '이름', field: "NM", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {
        headerName: '이력서', field: 'resumeIcon', minWidth: 80, filter: false, sortable: false,
        cellRenderer: (params) => {
          const resumeId = params.data.NM; // ✅ 이름만 넘김 → "이권도", "김현재" 등

          // resumeId가 없으면 버튼 안 나옴
          if (!resumeId) return '';

          return `
    <img src="${params.data.resumeImage}"
         style="cursor: pointer; margin-bottom: 5px; width: 18.4px; height: 18.4px;"
         onclick="downloadResume('${resumeId}')"/>
    <img src="${params.data.resumePreviewImage}"
         style="cursor: pointer; margin-left: 5px; margin-bottom: 5px; width: 18.4px; height: 18.4px;"
         onclick="previewResume('${resumeId}')"/>
  `;
        },
      },
      {headerName: '휴대전화번호', field: "MBL_TELNO", minWidth: 160, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '생년월일', field: "BRDT", minWidth: 130, filter: "agNumberColumnFilter", filterParams: numberFilterParams},
      {headerName: '나이', field: "AGE", minWidth: 100, filter: "agNumberColumnFilter", filterParams: numberFilterParams},
      {headerName: '등급', field: "GRD", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '자격증', field: "CRTFCT_LIST", minWidth: 160, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '수행업무', field: "FLFMT_TASK", minWidth: 160, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '언어', field: "LANG", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '데이터베이스', field: "DB", minWidth: 160, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '툴', field: "TOOL", minWidth: 90, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '프레임워크', field: "FRMW", minWidth: 140, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '라이브러리', field: "LBRR", minWidth: 140, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '통신', field: "CMNCT", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '기타', field: "ETC", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '기종', field: "MDL", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '운영체제', field: "OS", minWidth: 130, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '프로젝트투입상태', field: "PJ_INP_STTS", minWidth: 180, filter: "agTextColumnFilter", filterParams: {buttons: ["reset", "apply"]},},
      {headerName: '계약횟수', field: "CTRT_NMTM", minWidth: 130, filter: "agNumberColumnFilter", filterParams: numberFilterParams},
      {headerName: '학력', field: "ACBG", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '성별', field: "GNDR", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '직위', field: "JBPS", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '총경력기간', field: "T_CR_PER", minWidth: 140, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '지역', field: "RGN", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '이메일', field: "EML", minWidth: 120, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '컨택방법', field: "CONTT_MTHD", minWidth: 130, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '인터뷰요청일', field: "NTRV_DMND_DT", minWidth: 160, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '투입가능일', field: "INP_PSBLTY_DT", minWidth: 140, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '소속회사', field: "OGDP_CO", minWidth: 130, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '일련번호', field: "SN", minWidth: 130, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '3.3%여부', field: "WHTAX_YN", minWidth: 150, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '사업자여부', field: "BZMN_YN", minWidth: 140, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '자사정규직여부', field: "KDS_EMP_YN", minWidth: 170, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '계약회사정규직여부', field: "CTRT_CO_EMP_YN", minWidth: 190, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '대금수령날짜', field: "CLCT_PICKUP_DT", minWidth: 160, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '지급일자', field: "GIVE_DT", minWidth: 130, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '은행', field: "BANK", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '계좌번호', field: "ACTNO", minWidth: 130, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '부서', field: "DEPT", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '월요청단가', field: "MM_DMND_UNTPRC", minWidth: 140, filter: "agNumberColumnFilter", filterParams: numberFilterParams},
      {headerName: '주소', field: "ADDR", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '직책', field: "JBTTL", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '소개자', field: "BRKR", minWidth: 120, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '카카오톡닉네임', field: "KAKAO_NICK", minWidth: 170, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '계약이력존재여부', field: "CTRT_HSTRY_YN", minWidth: 180, filter: "agTextColumnFilter", filterParams: textFilterParams},
      {headerName: '병역', field: "MS", minWidth: 100, filter: "agTextColumnFilter", filterParams: textFilterParams},
    ]);

    const rowSelection = ref("multiple");
    const rowData = ref([]);

    const fetchData = async (type, filter) => {
      const name = filter || '';

      try {
        const response = await fetch(`http://localhost:8080/api/getDevData?name=${encodeURIComponent(name)}`);
        const data = await response.json();

        const translatedData = data.result.row.map(item => ({
          DEV_NO: item.DEV_NO,
          NM: item.NM,
          resumeImage: '/downloadResume.png',
          resumePreviewImage: '/resumePreview.png',
          PJ_INP_STTS: item.PJ_INP_STTS,
          CTRT_NMTM: item.CTRT_NMTM,
          BRDT: item.BRDT,
          GNDR: item.GNDR,
          JBPS: item.JBPS,
          GRD: item.GRD,
          T_CR_PER: item.T_CR_PER,
          RGN: item.RGN,
          MBL_TELNO: item.MBL_TELNO,
          EML: item.EML,
          CONTT_MTHD: item.CONTT_MTHD,
          NTRV_DMND_DT: item.NTRV_DMND_DT,
          INP_PSBLTY_DT: item.INP_PSBLTY_DT,
          OGDP_CO: item.OGDP_CO,
          SN: item.SN,
          WHTAX_YN: item.WHTAX_YN,
          BZMN_YN: item.BZMN_YN,
          KDS_EMP_YN: item.KDS_EMP_YN,
          CTRT_CO_EMP_YN: item.CTRT_CO_EMP_YN,
          CLCT_PICKUP_DT: item.CLCT_PICKUP_DT,
          GIVE_DT: item.GIVE_DT,
          BANK: item.BANK,
          ACTNO: item.ACTNO,
          DEPT: item.DEPT,
          MM_DMND_UNTPRC: item.MM_DMND_UNTPRC,
          ADDR: item.ADDR,
          JBTTL: item.JBTTL,
          BRKR: item.BRKR,
          KAKAO_NICK: item.KAKAO_NICK,
          CTRT_HSTRY_YN: item.CTRT_HSTRY_YN,
          MS: item.MS,
          MDL: item.MDL,
          OS: item.OS,
          LANG: item.LANG,
          DB: item.DB,
          TOOL: item.TOOL,
          FRMW: item.FRMW,
          LBRR: item.LBRR,
          CMNCT: item.CMNCT,
          ETC: item.ETC,
          AGE: item.AGE,
          ACBG: item.ACBG,
          RESUME: item.RESUME,
          CRTFCT_LIST: item.CRTFCT_LIST,
          FLFMT_TASK: item.FLFMT_TASK,
        }));

        rowData.value = translatedData;

        console.log("서버 응답 결과:", data);           // 전체 응답
        console.log("검색 결과 row:", data.result.row); // 실제 row
      } catch (error) {
        console.error('개발자 데이터 로드 오류:', error);
        rowData.value = [];
      }
    };

    const openModal = () => {
      eventbus.SearchResultEvent.openModal();
    };

    const openModalUpdate = () => {
      eventbus.SearchResultEvent.openModalUpdate();
      console.log("수정모달열기",);
    };

    const openModalPreviewResume = () => {
      eventbus.SearchResultEvent.openModalPreviewResume();
      console.log("이력서 미리보기 열기",);
    }

    //셀 업데이트
    const cellValueUpdate = () => {
      const selectedRows = gridApi.value.getSelectedRows();
      console.log("selectedRows:", selectedRows);
      if (selectedRows.length > 1) {
        return 0;
        //alert 개발자를 한명만 선택해주세요. 발생
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
        addRows.textContent = "개발자추가";
        addRows.style.cursor = "pointer";
        addRows.style.marginLeft = "10px";
        addRows.onclick = () => {
          openModal();
        }
        pagingPanel.insertBefore(addRows, pagingPanel.firstChild);

        const editRows = document.createElement("span");
        editRows.textContent = "수정"; // span의 텍스트 설정
        editRows.style.cursor = "pointer"; // 커서 스타일 설정
        editRows.style.marginLeft = "10px"; // 여백 추가
        editRows.onclick = () => {
          if (searchPerformed.value && cellValueUpdate() === 0) {
            alert("개발자를 한명만 선택해주세요.");
          } else if (searchPerformed.value && cellValueUpdate() === 2) {
            alert("개발자를 선택하지 않았습니다. 개발자를 선택해주세요.");
          } else if (searchPerformed.value && cellValueUpdate() === 1) {
            openModalUpdate();
          }
        }
        pagingPanel.insertBefore(editRows, addRows.nextSibling);

        const deleteRows = document.createElement("span");
        deleteRows.textContent = "삭제";
        deleteRows.style.cursor = "pointer";
        deleteRows.style.marginLeft = "10px";
        deleteRows.onclick = () => {
          eventbus.SearchResultEvent.deleteRowBtnClick();
        }
        pagingPanel.insertBefore(deleteRows, editRows.nextSibling);
      }
      eventbus.SearchResultEvent.add('removeFilter', removeFilter);
      eventbus.SearchResultEvent.add('deleteRow', deleteRowBtnClick);
      params.api.addEventListener('filterChanged', onFilterChanged);
    };

    const previousFilterKeys = ref([]);
    const previousFilters = ref([]);

    const onFilterChanged = async () => {
      const grf = eventbus.SearchResultEvent.getRegisteredFilters();
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
            eventbus.SearchResultEvent.removeFilter(key, currentCondition.type, currentCondition.filter);

          }
          if (grfFiltersConditionCheck === true && duplicateConditionsFilters) {
            alert(currentCondition + ' 와 ' + currentCondition1 + ' 의 필터값이 같습니다2.');
            eventbus.SearchResultEvent.removeFilter(key, currentCondition1.type, currentCondition1.filter);
          }

          if (grfFiltersCondition === true) {
            eventbus.SearchResultEvent.filterUpdate(key, currentCondition1.type, currentCondition1.filter);
          }

          if (!duplicateConditionsFilters && grfFiltersCondition === false) {
            eventbus.SearchResultEvent.filterUpdate(key, currentCondition.type, currentCondition.filter);
            eventbus.SearchResultEvent.filterUpdate(key, currentCondition1.type, currentCondition1.filter);
          }
        } else {
          eventbus.SearchResultEvent.filterUpdate(key, filterModels[key].type, filterModels[key].filter);
        }
      });

      previousFilterKeys.value.forEach((key) => {
        const previousFilter = previousFilters.value[key];
        const currentFilterModel = filterModels[key];

        if (currentFilterModel === undefined) {
          if (previousFilter) {
            if (Array.isArray(previousFilter.conditions)) {
              previousFilter.conditions.forEach(condition => {
                eventbus.SearchResultEvent.removeFilter(key, condition.type, condition.filter);
                eventbus.SearchResultEvent.removeActiveFilter(key, condition.type, condition.filter);
                eventbus.SearchResultEvent.removeButton(previousFilter.KeyName, condition.type, condition.filter);
              });
            } else {
              eventbus.SearchResultEvent.removeFilter(key, previousFilter.type, previousFilter.filter);
              eventbus.SearchResultEvent.removeActiveFilter(key, previousFilter.type, previousFilter.filter);
              eventbus.SearchResultEvent.removeButton(previousFilter.KeyName, previousFilter.type, previousFilter.filter);
            }
          }
        }
        if (currentFilterModel !== undefined) {
          if (!filterModelKeys.includes(key)) {
            eventbus.SearchResultEvent.removeFilter(key, previousFilter.type, previousFilter.filter);
            eventbus.SearchResultEvent.removeActiveFilter(key, previousFilter.type, previousFilter.filter);
            eventbus.SearchResultEvent.removeButton(previousFilter.KeyName, previousFilter.type, previousFilter.filter);
          }

          if (filterModelKeys.includes(key) && previousFilter.type !== currentFilterModel.type && previousFilter.filter === currentFilterModel.filter) {
            eventbus.SearchResultEvent.removeFilter(key, previousFilter.type, previousFilter.filter);
            eventbus.SearchResultEvent.removeActiveFilter(key, previousFilter.type, previousFilter.filter);
            eventbus.SearchResultEvent.removeButton(previousFilter.KeyName, previousFilter.type, previousFilter.filter);
          }
        }
      });
      previousFilterKeys.value = filterModelKeys;
      previousFilters.value = filterModels;
    };

    const onCellValueChanged = async (event) => {
      try {
        const response = await fetch('http://localhost:8080/api/updateDevData', {
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
        console.error('개발자 데이터 수정에러:', error);
      }
    };

    const resetKorButton = () =>{
      gridApi.value.setFilterModel(null);
      console.log("리셋완료");
    };

    eventbus.SearchResultEvent.add('resetKorButton',resetKorButton);

    const resetFilter = () => {
      console.log("아예안나옴??:"); // 로그 추가
      const registeredFilters = eventbus.SearchResultEvent.getRegisteredFilters();
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
          eventbus.SearchResultEvent.removeFilter(filter.KeyName, filter.type, filter.filter);
          eventbus.SearchResultEvent.removeActiveFilter(filter.KeyName, filter.type, filter.filter);
        });
        eventbus.SearchResultEvent.resetKorButton(); // 초기화 이벤트 호출
        console.log("필터 초기화 완료");
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
            eventbus.SearchResultEvent.removeActiveFilter(KeyName, filterType, filterValue);
          }
          if (JSON.stringify(previousConditions) !== JSON.stringify(currentFilter.conditions)) {
            gridApi.value.setFilterModel(filterModel);
            if (previousConditions.length !== currentFilter.conditions.length) {
              eventbus.SearchResultEvent.removeFilter(KeyName, adjustedFilterType, filterValue);
            }
          }
        } else {
          const currentFilterType = filterTypeMap[currentFilter.type] || currentFilter.type;
          const targetFilterType = filterTypeMap[filterType] || filterType;

          if (currentFilterType === targetFilterType && currentFilter.filter === filterValue) {
            delete filterModel[KeyName];
            gridApi.value.setFilterModel(filterModel);
            eventbus.SearchResultEvent.removeActiveFilter(KeyName, filterType, filterValue);
          }
        }
      }
    };

    const deleteRowBtnClick = async () => {
      if (!gridApi.value) {
        alert("그리드가 아직 초기화되지 않았습니다.");
        return;
      }

      const selectedNodes = gridApi.value.getSelectedNodes();

      if (!selectedNodes || selectedNodes.length === 0) {
        alert("삭제할 개발자를 선택해주세요.");
        return;
      }

      const selectedData = selectedNodes.map(node => node.data);
      const devName = selectedData.map(row => row.NM);

      const confirmDelete = confirm(`개발자 ${devName}를 정말 삭제하시겠습니까?`);
      if (!confirmDelete) {
        return; // 사용자가 "아니오"를 선택하면 함수 종료
      }

      const devNoList = selectedData.map(row => row.DEV_NO);

      // 삭제된 개발자의 이름을 저장할 배열
      const deletedNames = selectedData.map(row => row.NM).join(", "); // 예: "개발자 A, 개발자 B"

      try {
        const response = await fetch('http://localhost:8080/api/deleteDevData', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({devNoList}),
        });

        if (!response.ok) {
          throw new Error('Failed to delete data');
        } // 선택된 행을 rowData에서 필터링하여 제거
        rowData.value = rowData.value.filter(row => !devNoList.includes(row.DEV_NO));

        // 삭제 성공 알림
        alert(`개발자 ${deletedNames}가 삭제되었습니다.`);
      } catch (error) {
        alert("삭제할 개발자를 선택해주세요.");
      }
    };
    /* global downloadResume */

    window.downloadResume = (resumeId) => {
      if (!resumeId) {
        console.error('이력서 ID가 없습니다.');
        return;
      } else {
        console.log("resumeId:", resumeId);
        const url = `http://localhost:8080/api/downloadResume/${resumeId}`;
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', resumeId);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };

    window.previewResume = (resumeId) => {
      if (!resumeId) {
        console.error('이력서 ID가 없습니다.');
        return;
      }
      console.log("미리보기 체크 resumeId:", resumeId);
      eventbus.SearchResultEvent.openModalPreviewResume(resumeId); // resumeId 전달
    };

    onMounted(() => {
      eventbus.SearchResultEvent.add('search', fetchData); // 기존 이벤트 등록

      fetchData(); // 🔥 초기 전체 데이터 로드 (name 없이)
    });

    onBeforeUnmount(() => {
      eventbus.SearchResultEvent.remove('search', fetchData);
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
      downloadResume,
      openModal,
      openModalUpdate,
      openModalPreviewResume,
      cellValueUpdate
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