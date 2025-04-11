<script setup>
import { ref } from 'vue'
import SearchBarNameComponent from "@/components/common/SearchBarNameComponent.vue";
import SearchBarComponent from "@/components/common/SearchBarComponent.vue";
import SearchBtnComponent from "@/components/common/SearchBtnComponent.vue";

const searchName = ref('')
</script>

<template>
  <div class="search__conditions__area" style="width: 100%; height: 100%;">
    <div class="search__conditions__component" style="width: 100%; height: 100%;">
      <div>
        <div class="searchBarName">
          <SearchBarNameComponent class="mgLR10"/>
        </div>
      </div>
      <div>
        <div>
        </div>
      </div>
      <div class="flex">
        <SearchBarComponent v-model:searchName="searchName" class="mgLR10"/>
        <SearchBtnComponent :searchName="searchName" class="mgLR10"/>
      </div>
    </div>
  </div>
</template>

<style>

.searchBarName{
  display:flex;
  flex-direction: row;
}
.flex{
  display:flex;
  flex-direction: row;
}
.mgLR10 {
  margin-left: 10px;
  margin-right: 10px;
}

.search__conditions__area{
  display: flex;
  justify-content: center;
  background: none;
  padding-bottom: 15px;
}

.search__conditions__component{
  border: 1px solid #c9d6df;
  border-radius: 10px;
  background-color: white;
  display: grid;
  grid-template-rows: 25px 1fr 50px;
}
</style>