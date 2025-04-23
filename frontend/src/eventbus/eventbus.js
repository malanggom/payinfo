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

let devPjHandlers = {
    devPjDeleteRow: [],
    devPjSearch: [],
    devPjReset: [],
    devPjRemoveFilter: [],
    devPjFilterUpdate: [],
    devPjResetKorButton: [],
    devPjResetButtons: [],
    devPjRegisteredFilters: [],
    devPjOpenModal: [],
    devPjRemoveButton: [],
    devPjActiveFilters: [],
    devPjSelectDeveloper: [],  // ✅ 여기에 추가
    devPjSelectProject: [],
};

export { resultHandlers, devPjHandlers };  // 각각을 export

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
            if (!devPjHandlers[eventType]) {
                devPjHandlers[eventType] = [];
            }
            devPjHandlers[eventType].push(handler);
            console.log("현재 devPjHandlers[eventType]:", devPjHandlers[eventType]);
        },
        remove(eventType, handler) {
            if (devPjHandlers[eventType]) {
                devPjHandlers[eventType] = devPjHandlers[eventType].filter(h => h !== handler);
            }
        },
        devPjSelectDeveloper(id) {
            devPjHandlers.devPjSelectDeveloper.forEach(handler => handler(id)); // ✅ 이 부분 추가
        },
        devPjSelectProject(id) {
            devPjHandlers.devPjSelectProject.forEach(handler => handler(id)); // ✅ 이 부분 추가
        },
        devPjHistDeleteRowBtnClick() {
            devPjHandlers.devPjDeleteRow.forEach(handler => handler());
        },
        devPjFetchData(type, filter) {
            console.log("📤 devPjfetchData 호출됨:", type, filter);
            devPjHandlers.devPjSearch.forEach(handler => handler(type, filter));
        },
        devPjResetFilter() {
            devPjHandlers.devPjReset.forEach(handler => handler());
            devPjHandlers.devPjRemoveButton.forEach(handler => handler());
        },
        devPjRemoveButton(KeyName, type, filter) {
            devPjHandlers.devPjRemoveButton.forEach(handler => handler(KeyName, type, filter));
        },
        devPjFilterUpdate(KeyName, type, filter) {
            devPjHandlers.devPjRegisteredFilters.push({ KeyName, type, filter });
            devPjHandlers.devPjFilterUpdate.forEach(handler => handler(KeyName, type, filter));
        },
        devPjGetRegisteredFilters() {
            return devPjHandlers.devPjRegisteredFilters;
        },
        devPjRemoveFilter(keyName, type, filter) {
            console.log(`devPjRemoveFilter 호출됨: KeyName=${keyName}, type=${type}, filter=${filter}`);
            devPjHandlers.devPjRegisteredFilters = devPjHandlers.devPjRegisteredFilters.filter(
                handler => !(handler.KeyName === keyName && handler.type === type && handler.filter === filter)
            );
            console.log('등록된 필터 상태:', devPjHandlers.devPjRegisteredFilters);
            devPjHandlers.devPjRemoveFilter.forEach(handler => handler(keyName, type, filter));
        },
        devPjRemoveActiveFilter(keyName, type, filter) {
            devPjHandlers.devPjActiveFilters = devPjHandlers.devPjActiveFilters.filter(
                activeFilter => !(activeFilter.keyName === keyName && activeFilter.type === type && activeFilter.filter === filter)
            );
            console.log(`활성 필터 '${keyName}'이(가) 제거되었습니다.`);
        },
        devPjOpenModal(devNo) {
            devPjHandlers.devPjOpenModal.forEach(handler => handler(devNo)); // ⬅️ devNo 전달
        },
        devPjResetKorButton() { // 초기화 함수 추가
            devPjHandlers.devPjResetKorButton.forEach(handler => handler());
        },
        devPjRemoveRegisteredFilter(keyName, type, filter) {
            devPjHandlers.devPjRegisteredFilters = devPjHandlers.devPjRegisteredFilters.filter(
                handler => !(handler.KeyName === keyName && handler.type === type && handler.filter === filter)
            );
            console.log(`등록된 필터 '${keyName}'이(가) 제거되었습니다.`);
        },
        devPjUpdateRegisteredFilters(updatedFilters) {
            devPjHandlers.devPjRegisteredFilters = updatedFilters;
            console.log('등록된 필터가 업데이트되었습니다:', devPjHandlers.devPjRegisteredFilters);
        },
    }
};