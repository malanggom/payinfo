let resultHandlers = {
    deleteRow: [],
    search: [],
    reset: [],
    removeFilter: [],
    filterUpdate: [],
    resetKorButton: [],
    resetButtons: [],
    refreshData: [],
    registeredFilters: [],
    openModal: [],
    openModalUpdate: [],
    openModalPreviewResume: [],
    removeButton: [],
    activeFilters: [],
};

let pjHandlers = {
    pjDeleteRow: [],
    pjSearch: [],
    pjReset: [],
    pjRemoveFilter: [],
    pjFilterUpdate: [],
    pjResetKorButton: [],
    pjResetButtons: [],
    pjRegisteredFilters: [],
    pjOpenModal: [],
    pjRemoveButton: [],
    pjActiveFilters: [],
    selectDeveloper: [],  // ✅ 여기에 추가
};

export { resultHandlers, pjHandlers };  // 각각을 export

export default {
    SearchResultEvent: {
        // eventType에 맞는 핸들러 추가
        add(eventType, handler) {
            if (!resultHandlers[eventType]) {
                resultHandlers[eventType] = [];
            }
            resultHandlers[eventType].push(handler);
        },
        remove(eventType, handler) {
            if (resultHandlers[eventType]) {
                resultHandlers[eventType] = resultHandlers[eventType].filter(h => h !== handler);
            }
        },
        deleteRowBtnClick() {
            resultHandlers.deleteRow.forEach(handler => handler());
        },
        fetchData(type, filter) {
            resultHandlers.search.forEach(handler => handler(type, filter));
        },
        resetFilter() {
            resultHandlers.reset.forEach(handler => handler());
            resultHandlers.removeButton.forEach(handler => handler());
        },
        removeButton(KeyName, type, filter) {
            resultHandlers.removeButton.forEach(handler => handler(KeyName, type, filter));
        },
        filterUpdate(KeyName, type, filter) {
            resultHandlers.registeredFilters.push({ KeyName, type, filter });
            resultHandlers.filterUpdate.forEach(handler => handler(KeyName, type, filter));
        },
        getRegisteredFilters() {
            return resultHandlers.registeredFilters;
        },
        removeFilter(keyName, type, filter) {
            console.log(`removeFilter 호출됨: KeyName=${keyName}, type=${type}, filter=${filter}`);
            resultHandlers.registeredFilters = resultHandlers.registeredFilters.filter(
                handler => !(handler.KeyName === keyName && handler.type === type && handler.filter === filter)
            );
            console.log('등록된 필터 상태:', resultHandlers.registeredFilters);
            resultHandlers.removeFilter.forEach(handler => handler(keyName, type, filter));
        },
        removeActiveFilter(keyName, type, filter) {
            resultHandlers.activeFilters = resultHandlers.activeFilters.filter(
                activeFilter => !(activeFilter.keyName === keyName && activeFilter.type === type && activeFilter.filter === filter)
            );
            console.log(`활성 필터 '${keyName}'이(가) 제거되었습니다.`);
        },
        openModal() {
            console.log("openmodal시작");
            resultHandlers.openModal.forEach(handler => handler());
            console.log("openmodal종료");
        },
        openModalUpdate() {
            console.log("openmodalupdate시작");
            resultHandlers.openModalUpdate.forEach(handler => handler());
            console.log("openmodalupdate종료");
        },
        openModalPreviewResume(resumeId) {
            console.log("openModalPreviewResume 시작", resumeId);
            if (resultHandlers.openModalPreviewResume) {
                resultHandlers.openModalPreviewResume.forEach(handler => handler(resumeId));
            }
            console.log("openModalPreviewResume 종료");
        },
        resetKorButton() { // 초기화 함수 추가
            resultHandlers.resetKorButton.forEach(handler => handler());
        },
        removeRegisteredFilter(keyName, type, filter) {
            resultHandlers.registeredFilters = resultHandlers.registeredFilters.filter(
                handler => !(handler.KeyName === keyName && handler.type === type && handler.filter === filter)
            );
            console.log(`등록된 필터 '${keyName}'이(가) 제거되었습니다.`);
        },
        updateRegisteredFilters(updatedFilters) {
            resultHandlers.registeredFilters = updatedFilters;
            console.log('등록된 필터가 업데이트되었습니다:', resultHandlers.registeredFilters);
        },
        refreshData() {
            resultHandlers.search.forEach(handler => handler());
        },
    },

    SearchPjHistoryResultEvent: {
        add(eventType, handler) {
            console.log("핸들러 등록 시도:", eventType);
            console.log("handler:", handler);
            if (!pjHandlers[eventType]) {
                pjHandlers[eventType] = [];
            }
            pjHandlers[eventType].push(handler);
            console.log("현재 pjHandlers[eventType]:", pjHandlers[eventType]);
        },
        remove(eventType, handler) {
            if (pjHandlers[eventType]) {
                pjHandlers[eventType] = pjHandlers[eventType].filter(h => h !== handler);
            }
        },
        selectDeveloper(id) {
            pjHandlers.selectDeveloper.forEach(handler => handler(id)); // ✅ 이 부분 추가
        },
        pjDevHistDeleteRowBtnClick() {
            pjHandlers.pjDeleteRow.forEach(handler => handler());
        },
        fetchData(type, filter) {
            console.log("📤 fetchData 호출됨:", type, filter);
            pjHandlers.pjSearch.forEach(handler => handler(type, filter));
        },
        pjResetFilter() {
            pjHandlers.pjReset.forEach(handler => handler());
            pjHandlers.pjRemoveButton.forEach(handler => handler());
        },
        pjRemoveButton(KeyName, type, filter) {
            pjHandlers.pjRemoveButton.forEach(handler => handler(KeyName, type, filter));
        },
        pjFilterUpdate(KeyName, type, filter) {
            pjHandlers.pjRegisteredFilters.push({ KeyName, type, filter });
            pjHandlers.pjFilterUpdate.forEach(handler => handler(KeyName, type, filter));
        },
        pjGetRegisteredFilters() {
            return pjHandlers.pjRegisteredFilters;
        },
        pjRemoveFilter(keyName, type, filter) {
            console.log(`removeFilter 호출됨: KeyName=${keyName}, type=${type}, filter=${filter}`);
            pjHandlers.pjRegisteredFilters = pjHandlers.pjRegisteredFilters.filter(
                handler => !(handler.KeyName === keyName && handler.type === type && handler.filter === filter)
            );
            console.log('등록된 필터 상태:', pjHandlers.pjRegisteredFilters);
            pjHandlers.pjRemoveFilter.forEach(handler => handler(keyName, type, filter));
        },
        pjRemoveActiveFilter(keyName, type, filter) {
            pjHandlers.pjActiveFilters = pjHandlers.pjActiveFilters.filter(
                activeFilter => !(activeFilter.keyName === keyName && activeFilter.type === type && activeFilter.filter === filter)
            );
            console.log(`활성 필터 '${keyName}'이(가) 제거되었습니다.`);
        },
        pjOpenModal(devNo) {
            pjHandlers.pjOpenModal.forEach(handler => handler(devNo)); // ⬅️ devNo 전달
        },
        resetKorButton() { // 초기화 함수 추가
            pjHandlers.pjResetKorButton.forEach(handler => handler());
        },
        pjRemoveRegisteredFilter(keyName, type, filter) {
            pjHandlers.pjRegisteredFilters = pjHandlers.pjRegisteredFilters.filter(
                handler => !(handler.KeyName === keyName && handler.type === type && handler.filter === filter)
            );
            console.log(`등록된 필터 '${keyName}'이(가) 제거되었습니다.`);
        },
        pjUpdateRegisteredFilters(updatedFilters) {
            pjHandlers.pjRegisteredFilters = updatedFilters;
            console.log('등록된 필터가 업데이트되었습니다:', pjHandlers.pjRegisteredFilters);
        },
    }
};