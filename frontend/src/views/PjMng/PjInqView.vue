===========================================================================
                              PjInqView.vue
===========================================================================
<template class="pjinq">
  <div class="component"><SearchBarComponent/></div>
  <div class="search__result__component"><SearchResultComponent/></div>
</template>
<script setup lang="js">
  import SearchBarComponent from "@/components/PjInq/SearchBarArea.vue";
  import SearchResultComponent from "@/components/PjInq/PjSearchResultComponent.vue";
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