<script setup>
import SearchBarComponent from "@/components/common/SearchBarComponent.vue";
import SearchBtnComponent from "@/components/common/SearchBtnComponent.vue";
import DevAddBtnComponent from "@/components/DevInq/DevAddBtnComponent.vue";
import SearchFilterDropdownComponent from "@/components/common/SearchFilterDropdownComponent.vue";
</script>

<template>
  <SearchBarComponent class="mgLR10"/>
  <i class="bi bi-filter mgLR10"/>
  <!--  <b-icon icon="filter"/>-->
  <SearchBtnComponent class="mgLR10"/>
  <SearchFilterDropdownComponent class="mgLR10"/>
  <DevAddBtnComponent class="mgLR10"/>
</template>

<style>
.mgLR10{
  margin-left: 10px;
  margin-right: 10px;
}
</style>