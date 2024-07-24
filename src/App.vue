<template id="app">
<main class="grid-container">
  <aside class="grid-item">
    <nav class="nav flex-column">
      <router-link class="nav-link" to="/devinq">개발자관리</router-link>
      <router-link class="nav-link" to="/devinq">개발자조회</router-link>
      <router-link class="nav-link" to="/empinq">직원조회</router-link>
      <router-link class="nav-link" to="/pjinq">프로젝트관리</router-link>
      <router-link class="nav-link" to="/pjinq">프로젝트조회</router-link>
      <router-link class="nav-link" to="/ctrtcoinq">계약회사관리</router-link>
      <router-link class="nav-link" to="/ctrtcoinq">계약회사조회</router-link>
      <router-link class="nav-link" to="/ctrtcoctrtinq">계약서관리</router-link>
      <router-link class="nav-link" to="/ctrtcoctrtinq">계약회사계약서조회</router-link>
      <router-link class="nav-link" to="/devctrtinq">개발자계약서조회</router-link>
      <router-link class="nav-link" to="/etcctrtinq">기타계약서조회</router-link>
      <router-link class="nav-link" to="/taxbillinq">매출관리</router-link>
      <router-link class="nav-link" to="/taxbillinq">세금계산서조회</router-link>
      <router-link class="nav-link" to="/whtaxinq">원천세조회</router-link>
      <router-link class="nav-link" to="/dpstwdrlinq">비용관리</router-link>
      <router-link class="nav-link" to="/dpstwdrlinq">입출금조회</router-link>
      <router-link class="nav-link" to="/ofcexpnssinq">사무비용조회</router-link>
      <router-link class="nav-link" to="/dvcinq">기기관리</router-link>
      <router-link class="nav-link" to="/dvcinq">기기조회</router-link>
    </nav>
  </aside>
  <section class="grid-item2">
    <router-view/>
  </section>
</main>
</template>

<style>
.grid-container{
  display: grid;
  grid-template-columns: 300px 1fr;
}

.grid-item{

}
.grid-item2{
  display: grid;
  grid-template-rows: 100px 100px 100px 1fr;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script setup lang="ts">

</script>