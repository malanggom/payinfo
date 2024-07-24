<template class="devinq">
  <div class="flex-item"><MenuNameComponent/></div>
  <div class="flex-item"><SearchFilterComponent/></div>
  <div class="flex-item"><SearchBarComponent/></div>
  <div class="flex-item"><SearchResultComponent/></div>
</template>
<script setup lang="js">
  import MenuNameComponent from '@/components/DevInq/MenuNameComponent.vue'
  import SearchFilterComponent from "@/components/DevInq/SearchFilterComponent.vue";
  import SearchBarComponent from "@/components/DevInq/SearchBarArea.vue";
  import SearchResultComponent from "@/components/DevInq/SearchResultComponent.vue";
</script>
<style>
  .flex-item{
    display: flex;
    align-items: center;

  }
</style>