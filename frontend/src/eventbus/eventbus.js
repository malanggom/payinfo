let handlers = {
    deleteRow: [],
    search: [],
    reset: [],
    removeFilter: [],
    filterUpdate: [],
    resetButtons: [],
    registeredFilters: [],
    openModal: []
};

export { handlers }; // handlers를 export

export default {
    SearchResultEvent: {
        add(eventType, handler) {
            if (handlers[eventType]) {
                handlers[eventType].push(handler);
            }
        },
        remove(eventType, handler) {
            if (handlers[eventType]) {
                handlers[eventType] = handlers[eventType].filter(h => h !== handler);
            }
        },
        deleteRowBtnClick() {
            handlers.deleteRow.forEach(handler => handler());
        },
        fetchData(type, filter) {
            handlers.search.forEach(handler => handler(type, filter));
        },
        resetFilter() {
            handlers.reset.forEach(handler => handler());
            handlers.resetButtons.forEach(handler => handler());
        },
        filterUpdate(KeyName, type, filter) {
            handlers.registeredFilters.push({ KeyName, type, filter });
            handlers.filterUpdate.forEach(handler => handler(KeyName, type, filter));
        },
        getRegisteredFilters() {
            return handlers.registeredFilters;
        },
        removeFilter(keyName) {
            handlers.removeFilter.forEach(handler => handler(keyName));
        },
        openModal() {
            handlers.openModal.forEach(handler => handler());
        }
    }
}