<script setup>
import { provide, inject } from 'vue'; // inject 추가
import SearchBarComponent from "@/components/common/SearchBarComponent.vue";
import SearchBtnComponent from "@/components/common/SearchBtnComponent.vue";
import DevAddBtnComponent from "@/components/DevInq/DevAddBtnComponent.vue";
import SearchFilterDropdownComponent from "@/components/common/SearchFilterDropdownComponent.vue";

const removeSelectedRows = inject('removeSelectedRows');

const handleRemove = () => {
  if (removeSelectedRows) {
    removeSelectedRows();
  }
};

provide('removeSelectedRows', handleRemove);
</script>

<template>
  <button @click="handleRemove">Remove Selected</button>
  <SearchBarComponent class="mgLR10"/>
  <SearchBtnComponent class="mgLR10"/>
  <SearchFilterDropdownComponent class="mgLR10"/>
  <DevAddBtnComponent class="mgLR10"/>
</template>

<style>
.mgLR10 {
  margin-left: 10px;
  margin-right: 10px;
}
</style>