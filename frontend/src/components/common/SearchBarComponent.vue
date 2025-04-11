<script setup>
import { defineEmits, watch } from 'vue'
import eventbus from '@/eventbus/eventbus'

const emit = defineEmits(['update:searchName'])
const searchName = defineModel('searchName')

watch(searchName, (val) => {
  emit('update:searchName', val)
  eventbus.SearchResultEvent.fetchData('search', val)
})
</script>

<template>
  <form class="d-flex" role="search">
    <input v-model="searchName" class="form-control searchBox" type="search" placeholder="Search" aria-label="Search">
  </form>
</template>

<style scoped>
  .searchBox{
    border-radius: 20px;
    border: 1px solid #b4c7dd;
    height: 40px;
  }
</style>