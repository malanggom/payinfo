===========================================================================
                                 App.vue
===========================================================================
<template id="app">
<main class="grid-container">
  <aside class="grid-item">
    <nav class="nav flex-column">
      <span class="nav-link nav__menu" @click="toggleNav('devmng')">개발자관리</span>
      <div v-if="isActive('devmng')">
        <router-link class="nav-link nav__menu" to="/devinq">개발자조회</router-link>
        <router-link class="nav-link nav__menu" to="/empinq">직원조회</router-link>
      </div>
      <span class="nav-link nav__menu" @click="toggleNav('pjmng')">프로젝트관리</span>
      <div v-if="isActive('pjmng')">
        <router-link class="nav-link nav__menu" to="/pjinq">프로젝트조회</router-link>
      </div>
      <span class="nav-link nav__menu" @click="toggleNav('ctrtcomng')">계약회사관리</span>
      <div v-if="isActive('ctrtcomng')">
        <router-link class="nav-link nav__menu" to="/ctrtcoinq">계약회사조회</router-link>
      </div>
      <span class="nav-link nav__menu" @click="toggleNav('ctrtcoctrtmng')">계약서관리</span>
      <div v-if="isActive('ctrtcoctrtmng')">
        <router-link class="nav-link nav__menu" to="/ctrtcoctrtinq">계약회사계약서조회</router-link>
        <router-link class="nav-link nav__menu" to="/devctrtinq">개발자계약서조회</router-link>
        <router-link class="nav-link nav__menu" to="/etcctrtinq">기타계약서조회</router-link>
      </div>
      <span class="nav-link nav__menu" @click="toggleNav('slsmng')">매출관리</span>
      <div v-if="isActive('slsmng')">
        <router-link class="nav-link nav__menu" to="/taxbillinq">세금계산서조회</router-link>
        <router-link class="nav-link nav__menu" to="/whtaxinq">원천세조회</router-link>
      </div>
      <span class="nav-link nav__menu" @click="toggleNav('amtmng')">비용관리</span>
      <div v-if="isActive('amtmng')">
        <router-link class="nav-link nav__menu" to="/dpstwdrlinq">입출금조회</router-link>
        <router-link class="nav-link nav__menu" to="/ofcexpnssinq">사무비용조회</router-link>
      </div>
      <span class="nav-link nav__menu" @click="toggleNav('dvcmng')">기기관리</span>
      <div v-if="isActive('dvcmng')">
        <router-link class="nav-link nav__menu" to="/dvcinq">기기조회</router-link>
      </div>
    </nav>
  </aside>
  <section class="grid-item2">
    <router-view/>
  </section>
</main>
</template>
<script>
export default {
  data: function () {
    return {
      activeTab: null // 현재 활성화된 탭을 저장
    }
  },
  methods: {
    toggleNav(tab) {
      // 선택된 탭과 현재 활성 탭이 같으면 비활성화, 다르면 활성화
      this.activeTab = this.activeTab === tab ? null : tab;
    },
    isActive(tab) {
      return this.activeTab === tab; // 현재 탭이 활성화되어 있는지 확인
    }
  }
}
</script>
<style>
.grid-container{
  display: grid;
  grid-template-columns: 250px 1fr;
}

.grid-item{
  display: grid;
  background-color:#2c3e50;
}

.grid-item2{
  display: grid;
  grid-template-rows: 0.2fr 50px 0.4fr 0.4fr;
  padding-top: 20px;
  padding-right: 10px;
  background-color:#f6f6f6;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}

nav {
  padding-top: 20px;
}

nav a {
  font-weight: bold;
  color: #ffffff;
}

nav a.router-link-exact-active {
  color: #ffffff;
}

.nav__menu{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  color: #ffffff;
}

html, head, body, main{
  height: 100%;
}
</style>