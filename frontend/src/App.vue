===========================================================================
                                 App.vue
===========================================================================
<template id="app">
<main class="grid-container">
  <aside class="grid-item">
    <nav class="nav flex-column">
      <div class="noto-sans-kr-medium">
        <div class="logo">
          <img class="padding__left20 icon__size" src="/icons/KDS로고WHITE.png" alt="KDS Logo">
          <span class="">한국데이타시스템</span>
        </div>
        <div class="nav__menu">
          <img class="padding__left20 icon__size" src="/icons/개발자관리white.png" alt="KDS Logo">
          <span class="nav-link" @click="toggleNav('devmng')">개발자관리</span>
        </div>
        <div v-if="isActive('devmng')" class="nav__submenu__wrap">
          <div class="nav__submenu">
            <img class="padding__left20 icon__size" src="/icons/개발자조회white.png" alt="KDS Logo">
            <router-link class="nav-link" to="/devinq">개발자조회</router-link>
          </div>
          <div class="nav__submenu">
            <img class="padding__left20 icon__size" src="/icons/직원조회white.png" alt="KDS Logo">
            <router-link class="nav-link" to="/empinq">직원조회</router-link>
          </div>
        </div>
        <div class="nav__menu">
          <img class="padding__left20 icon__size" src="/icons/프로젝트관리white.png" alt="KDS Logo">
          <span class="nav-link" @click="toggleNav('pjmng')">프로젝트관리</span>
        </div>
        <div v-if="isActive('pjmng')" class="nav__submenu__wrap">
          <div class="nav__submenu">
            <img class="padding__left20 icon__size" src="/icons/프로젝트조회white.png" alt="KDS Logo">
            <router-link class="nav-link" to="/pjinq">프로젝트조회</router-link>
          </div>
        </div>
        <div class="nav__menu">
          <img class="padding__left20 icon__size" src="/icons/계약회사관리white.png" alt="KDS Logo">
          <span class="nav-link nav__menu" @click="toggleNav('ctrtcomng')">계약회사관리</span>
        </div>
        <div v-if="isActive('ctrtcomng')" class="nav__submenu__wrap">
          <div class="nav__submenu">
            <img class="padding__left20 icon__size" src="/icons/계약회사조회white.png" alt="KDS Logo">
            <router-link class="nav-link" to="/ctrtcoinq">계약회사조회</router-link>
          </div>
          <div class="nav__submenu">
            <img class="padding__left20 icon__size" src="/icons/하청업체조회white.png" alt="KDS Logo">
            <router-link class="nav-link" to="/sbcncoinq">하청업체조회</router-link>
          </div>
        </div>
        <div class="nav__menu">
          <img class="padding__left20 icon__size" src="/icons/개발자관리white.png" alt="KDS Logo">
          <span class="nav-link nav__menu" @click="toggleNav('docmng')">문서관리</span>
        </div>
        <div v-if="isActive('docmng')" class="nav__submenu__wrap">
          <div class="nav__submenu">
            <img class="padding__left20 icon__size" src="/icons/계약회사문서조회white.png" alt="KDS Logo">
            <router-link class="nav-link" to="/ctrtcodocinq">계약회사문서조회</router-link>
          </div>
          <div class="nav__submenu">
            <img class="padding__left20 icon__size" src="/icons/하청업체문서조회white.png" alt="KDS Logo">
            <router-link class="nav-link" to="/sbcncodocinq">하청업체문서조회</router-link>
          </div>
          <div class="nav__submenu">
            <img class="padding__left20 icon__size" src="/icons/개발자문서조회white.png" alt="KDS Logo">
            <router-link class="nav-link" to="/devdocinq">개발자문서조회</router-link>
          </div>
        </div>
        <div class="nav__menu">
          <img class="padding__left20 icon__size" src="/icons/회계관리white.png" alt="KDS Logo">
          <span class="nav-link nav__menu" @click="toggleNav('acntgmng')">회계관리</span>
        </div>
        <div v-if="isActive('acntgmng')" class="nav__submenu__wrap"><!--sls-->
          <div class="nav__submenu">
            <img class="padding__left20 icon__size" src="/icons/세금조회white.png" alt="KDS Logo">
            <router-link class="nav-link" to="/taxbillinq">세금조회</router-link>
          </div>
          <div class="nav__submenu">
            <img class="padding__left20 icon__size" src="/icons/급여및비용조회white.png" alt="KDS Logo">
            <router-link class="nav-link" to="/whtaxinq">급여및비용조회</router-link>
          </div>
        </div>
        <div class="nav__menu">
          <img class="padding__left20 icon__size" src="/icons/기기관리white.png" alt="KDS Logo">
          <span class="nav-link nav__menu" @click="toggleNav('dvcmng')">기기관리</span>
        </div>

        <div v-if="isActive('dvcmng')" class="nav__submenu__wrap">
          <div class="nav__submenu">
            <img class="padding__left20 icon__size" src="/icons/기기조회white.png" alt="기기조회">
            <router-link class="nav-link" to="/dvcinq">기기조회</router-link>
          </div>
        </div>
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
  grid-template-columns: 270px 1fr;
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

nav {
  padding-top: 10px;
}

nav a {
  font-weight: bold;
  color: #ffffff;
}

nav a.router-link-exact-active {
  color: #ffffff;
}

.logo{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 80px;
  color: #ffffff;
  position: relative; /* ::after를 위한 상대 위치 설정 */
}

.nav__menu{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 80px;
  color: #ffffff;
  position: relative; /* ::after를 위한 상대 위치 설정 */
  cursor: pointer; /* 커서를 손 모양으로 변경 */
}

.nav__menu::after {
  content: "";
  display: block;
  background-color: #ffffff; /* 흰색 줄 */
  height: 2px; /* 줄의 두께 */
  width: 0%; /* 줄의 너비 */
  position: absolute;
  left: 50%; /* 가운데 정렬을 위한 위치 */
  bottom: -4px; /* 줄을 div 아래에 위치시키기 */
  transform: translateX(-50%); /* 가운데 정렬을 위한 변환 */
  transition: width 0.4s ease-in-out, opacity 0.4s ease-in-out; /* 트랜지션 효과 */
  opacity: 0; /* 초기 상태에서 숨김 */
}

.nav__menu:hover::after {
  opacity: 1; /* 마우스 오버 시 줄 표시 */
  width: 100%;
}

.nav__submenu{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 80px;
  color: #ffffff;
  position: relative; /* ::after를 위한 상대 위치 설정 */
}

.nav__submenu .nav-link {
  opacity: 0.75; /* 텍스트의 불투명도 설정 */
}

.nav__submenu .nav-link:hover {
  opacity: 1; /* 텍스트의 불투명도 설정 */
}

.nav-link{
  padding: 0px;
  color: #ffffff;
}

.nav-link:hover {
  color: #ffffff; /* 마우스 오버 시 텍스트 색상 */
}

.icon__size{
  height: 35px;
  margin-right: 20px;
}

html, head, body, main{
  height: 100%;
}

.padding__left20{
  padding-left: 20px;
}

#app {
  font-family: 'Noto Sans KR', Avenir, Helvetica, Arial, sans-serif;
  font-size: 21px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}

.noto-sans-kr-thin {
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 100; /* 제일 얇은 글씨 */
}

.noto-sans-kr-extralight {
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 200; /* 일반 */
}

.noto-sans-kr-light {
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 300; /* 일반 */
}

.noto-sans-kr-regular {
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400; /* 일반 */
}

.noto-sans-kr-medium {
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500; /* 굵은 글씨 */
}

.noto-sans-kr-semibold {
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 600; /* 굵은 글씨 */
}

.noto-sans-kr-bold {
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700; /* 굵은 글씨 */
}

.noto-sans-kr-extrabold {
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 800; /* 굵은 글씨 */
}

.noto-sans-kr-black {
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 900; /* 굵은 글씨 */
}
</style>