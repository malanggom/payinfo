let pjHandlers = {
    pjDeleteRow: [],
    pjSearch: [],
    pjReset: [],
    pjRemoveFilter: [],
    pjFilterUpdate: [],
    pjResetKorButton: [],
    pjResetButtons: [],
    pjRefreshData: [],
    pjRegisteredFilters: [],
    pjOpenModal: [],
    pjOpenModalUpdate: [],
    pjRemoveButton: [],
    pjActiveFilters: [],
    pjSelectDeveloper: [],  // ✅ 여기에 추가
};

export { pjHandlers };  // 각각을 export

export default {
    SearchPjResultEvent: {
        add(eventType, handler) {
            console.log("핸들러 등록 시도:", eventType);
            console.log("handler:", handler);
            if (!pjHandlers[eventType]) {
                pjHandlers[eventType] = [];
            }
            pjHandlers[eventType].push(handler);
            console.log("현재 PjHandlers[eventType]:", pjHandlers[eventType]);
        },
        remove(eventType, handler) {
            if (pjHandlers[eventType]) {
                pjHandlers[eventType] = pjHandlers[eventType].filter(h => h !== handler);
            }
        },
        pjSelectDeveloper(id) {
            pjHandlers.pjSelectDeveloper.forEach(handler => handler(id)); // ✅ 이 부분 추가
        },
        pjDeleteRowBtnClick() {
            pjHandlers.pjDeleteRow.forEach(handler => handler());
        },
        pjFetchData(type, filter) {
            console.log("📤 pjfetchData 호출됨:", type, filter);
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
            console.log(`pjRemoveFilter 호출됨: KeyName=${keyName}, type=${type}, filter=${filter}`);
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
        pjOpenModalUpdate() {
            console.log("pjOpenModalUpdate시작");
            pjHandlers.pjOpenModalUpdate.forEach(handler => handler());
            console.log("pjOpenModalUpdate종료");
        },
        pjResetKorButton() { // 초기화 함수 추가
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
        pjRefreshData() {
            pjHandlers.pjSearch.forEach(handler => handler());
        },
    }
};