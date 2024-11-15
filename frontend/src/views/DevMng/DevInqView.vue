===========================================================================
                              DevInqView.vue
===========================================================================
<template class="devinq">
  <div class="component"><SearchBarComponent/></div>
  <div class="component"><SearchFilterComponent/></div>
  <div class="search__result__component"><SearchResultComponent/></div>
  <div class="search__result__component"><SearchPjHistoryComponent/></div>
</template>
<script setup lang="js">
  import SearchFilterComponent from "@/components/DevInq/SearchFilterArea.vue";
  import SearchBarComponent from "@/components/DevInq/SearchBarArea.vue";
  import SearchResultComponent from "@/components/DevInq/SearchResultComponent.vue";
  import SearchPjHistoryComponent from "@/components/DevInq/SearchPjHistoryArea.vue";
</script>
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