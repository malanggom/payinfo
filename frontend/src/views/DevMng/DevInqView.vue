===========================================================================
DevInqView.vue
===========================================================================
===========================================================================
템플릿 시작
===========================================================================
<template class="devinq">
  <div class="component"><SearchBarComponent/></div>
  <div class="component"><SearchFilterComponent/></div>
  <div class="search__result__component"><SearchResultComponent/></div>
  <div class="search__result__component"><SearchPjHistoryComponent/></div>
</template>
===========================================================================
템플릿 종료
===========================================================================
스크립트 시작
===========================================================================
<script setup lang="js">
  import SearchFilterComponent from "@/components/DevInq/SearchFilterArea.vue";
  import SearchBarComponent from "@/components/DevInq/SearchBarArea.vue";
  import SearchResultComponent from "@/components/DevInq/SearchResultComponent.vue";
  import SearchPjHistoryComponent from "@/components/DevInq/SearchPjHistoryArea.vue";
</script>
===========================================================================
스크립트 종료
===========================================================================
스타일 시작
===========================================================================
<style>
  .component{
    display: flex;
    align-items: center;
  }
  .search__result__component{
    display: flex;
    justify-content: center;
    padding-top: 10px;
  }
</style>
===========================================================================
스타일 종료
===========================================================================