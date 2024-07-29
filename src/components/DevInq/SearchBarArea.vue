<script setup>
import SearchBarComponent from "@/components/common/SearchBarComponent.vue";
import SearchBtnComponent from "@/components/common/SearchBtnComponent.vue";
import DevAddBtnComponent from "@/components/DevInq/DevAddBtnComponent.vue";
import SearchFilterDropdownComponent from "@/components/common/SearchFilterDropdownComponent.vue";
</script>

<template>
  <SearchBarComponent class="paddingLR10"/>
  <i class="bi bi-filter paddingLR10"/>
  <!--  <b-icon icon="filter"/>-->
  <SearchBtnComponent class="paddingLR10"/>
  <DevAddBtnComponent class="paddingLR10"/>
  <SearchFilterDropdownComponent class="paddingLR10"/>
</template>

<style scoped>
.paddingLR10{
  padding-left: 10px;
  padding-right: 10px;
}
</style>