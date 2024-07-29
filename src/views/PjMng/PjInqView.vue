<template class="pjinq">
  <div class="flexItem AlignCenter"><MenuNameComponent/></div>
  <div class="flexItem AlignCenter"><SearchFilterComponent/></div>
  <div class="flexItem AlignCenter"><SearchBarComponent/></div>
  <div class="flexItem paddingT"><SearchResultComponent/></div>
</template>
<script setup lang="js">
import MenuNameComponent from '@/components/PjInq/MenuNameComponent.vue'
import SearchFilterComponent from "@/components/PjInq/SearchFilterComponent.vue";
import SearchBarComponent from "@/components/PjInq/SearchBarArea.vue";
import SearchResultComponent from "@/components/PjInq/SearchResultComponent.vue";
</script>
<style>
.flexItem{
  display: flex;
}
.AlignCenter{
  align-items: center;
}
.paddingT{
  padding-top: 10px;
}
</style>