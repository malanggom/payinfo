===========================================================================
PjInqView.vue
===========================================================================
===========================================================================
템플릿 시작
===========================================================================
<template class="pjinq">
  <div class="component"><MenuNameComponent/></div>
  <div class="component"><SearchBarComponent/></div>
  <div class="search__result__component"><SearchResultComponent/></div>
</template>
===========================================================================
템플릿 종료
===========================================================================
스크립트 시작
===========================================================================
<script setup lang="js">
  import MenuNameComponent from '@/components/PjInq/MenuNameComponent.vue'
  import SearchBarComponent from "@/components/PjInq/SearchBarArea.vue";
  import SearchResultComponent from "@/components/PjInq/PjSearchResultComponent.vue";
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