<template class="devinq">
  <div class="flexItem AlignCenter"><MenuNameComponent/></div>
  <div class="flexItem AlignCenter"><SearchFilterComponent/></div>
  <div class="flexItem AlignCenter"><SearchBarComponent/></div>
  <div class="flexItem paddingT justifyCenter"><SearchResultComponent/></div>
</template>
<script setup lang="js">
  import MenuNameComponent from '@/components/DevInq/MenuNameComponent.vue'
  import SearchFilterComponent from "@/components/DevInq/SearchFilterComponent.vue";
  import SearchBarComponent from "@/components/DevInq/SearchBarArea.vue";
  import SearchResultComponent from "@/components/DevInq/SearchResultComponent.vue";
</script>
<style>
  .flexItem{
    display: flex;
  }
  .AlignCenter{
    align-items: center;
  }
  .justifyCenter {
    justify-content: center;
  }
  .paddingT{
    padding-top: 10px;
  }
</style>