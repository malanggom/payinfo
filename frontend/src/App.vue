===========================================================================
                                 App.vue
===========================================================================
<template id="app">
  <main class="grid-container">
    <aside>
      <nav class="nav flex-column">
        <div class="noto-sans-kr-medium">
          <div class="logo">
            <img class="icon-img" src="/icons/KDS로고WHITE.png" alt="KDS Logo">
            <span class="">한국데이타시스템</span>
          </div>

          <!-- 개발자관리 -->
          <div class="nav__menu" :class="{'nav__menu--active': isActiveRoute('devmng', ['/devinq', '/empinq'])}">
            <img class="icon-img" src="/icons/개발자관리white.png" alt="개발자관리">
            <span class="nav-link" @click="toggleNav('devmng')">개발자관리</span>
          </div>
          <div :class="{'nav__submenu__wrap': true,'active': isActive('devmng')}" class="nav__submenu__wrap__double">
            <div class="nav__submenu" :class="{'nav__submenu--active': $route.path === '/devinq'}">
              <img class="icon-img-sub" :src="isActiveRoute('devmng', ['/devinq']) ? '/icons/개발자조회.png' : '/icons/개발자조회white.png'" alt="개발자조회">
              <router-link class="nav-link" active-class="active" exact to="/devinq">개발자조회</router-link>
            </div>
            <div class="nav__submenu" :class="{'nav__submenu--active': $route.path === '/empinq'}">
              <img class="icon-img-sub" :src="isActiveRoute('devmng', ['/empinq']) ? '/icons/직원조회.png' : '/icons/직원조회white.png'" alt="직원조회">
              <router-link class="nav-link" active-class="active" exact to="/empinq">직원조회</router-link>
            </div>
          </div>

          <!-- 프로젝트관리 -->
          <div class="nav__menu" :class="{'nav__menu--active': isActiveRoute('pjmng', ['/pjinq'])}">
            <img class="icon-img" src="/icons/프로젝트관리white.png" alt="프로젝트관리">
            <span class="nav-link" @click="toggleNav('pjmng')">프로젝트관리</span>
          </div>
          <div :class="{'nav__submenu__wrap': true, 'active': isActive('pjmng')}" class="nav__submenu__wrap__single">
            <div class="nav__submenu" :class="{'nav__submenu--active': $route.path === '/pjinq'}">
              <img class="icon-img-sub" :src="isActiveRoute('pjmng', ['/pjinq']) ? '/icons/프로젝트조회.png' : '/icons/프로젝트조회white.png'" alt="프로젝트조회">
              <router-link class="nav-link" active-class="active" exact to="/pjinq">프로젝트조회</router-link>
            </div>
          </div>

          <!-- 계약회사관리 -->
          <div class="nav__menu" :class="{'nav__menu--active': isActiveRoute('ctrtcomng', ['/ctrtcoinq', '/sbcncoinq'])}">
            <img class="icon-img" src="/icons/계약회사관리white.png" alt="계약회사관리">
            <span class="nav-link" @click="toggleNav('ctrtcomng')">계약회사관리</span>
          </div>
          <div :class="{'nav__submenu__wrap': true, 'active': isActive('ctrtcomng')}" class="nav__submenu__wrap__double">
            <div class="nav__submenu" :class="{'nav__submenu--active': $route.path === '/ctrtcoinq'}">
              <img class="icon-img-sub" :src="isActiveRoute('ctrtcomng', ['/ctrtcoinq']) ? '/icons/계약회사조회.png' : '/icons/계약회사조회white.png'" alt="계약회사조회">
              <router-link class="nav-link" active-class="active" exact to="/ctrtcoinq">계약회사조회</router-link>
            </div>
            <div class="nav__submenu" :class="{'nav__submenu--active': $route.path === '/sbcncoinq'}">
              <img class="icon-img-sub" :src="isActiveRoute('ctrtcomng', ['/sbcncoinq']) ? '/icons/하청업체조회.png' : '/icons/하청업체조회white.png'" alt="하청업체조회">
              <router-link class="nav-link" active-class="active" exact to="/sbcncoinq">하청업체조회</router-link>
            </div>
          </div>

          <!-- 문서관리 -->
          <div class="nav__menu" :class="{'nav__menu--active': isActiveRoute('docmng', ['/ctrtcodocinq', '/sbcncodocinq', '/devdocinq'])}">
            <img class="icon-img" src="/icons/문서관리white.png" alt="문서관리">
            <span class="nav-link" @click="toggleNav('docmng')">문서관리</span>
          </div>
          <div :class="{'nav__submenu__wrap': true, 'active': isActive('docmng')}" class="nav__submenu__wrap__triple">
            <div class="nav__submenu" :class="{'nav__submenu--active': $route.path === '/ctrtcodocinq'}">
              <img class="icon-img-sub" :src="$route.path === '/ctrtcodocinq' ? '/icons/계약회사문서조회.png' : '/icons/계약회사문서조회white.png'" alt="계약회사문서조회">
              <router-link class="nav-link" active-class="active" exact to="/ctrtcodocinq">계약회사문서조회</router-link>
            </div>
            <div class="nav__submenu" :class="{'nav__submenu--active': $route.path === '/sbcncodocinq'}">
              <img class="icon-img-sub" :src="$route.path === '/sbcncodocinq' ? '/icons/하청업체문서조회.png' : '/icons/하청업체문서조회white.png'" alt="하청업체문서조회">
              <router-link class="nav-link" active-class="active" exact to="/sbcncodocinq">하청업체문서조회</router-link>
            </div>
            <div class="nav__submenu" :class="{'nav__submenu--active': $route.path === '/devdocinq'}">
              <img class="icon-img-sub" :src="$route.path === '/devdocinq' ? '/icons/개발자문서조회.png' : '/icons/개발자문서조회white.png'" alt="개발자문서조회">
              <router-link class="nav-link" active-class="active" exact to="/devdocinq">개발자문서조회</router-link>
            </div>
          </div>


          <!-- 회계관리 -->
          <div class="nav__menu" :class="{'nav__menu--active': isActiveRoute('acntgmng', ['/taxbillinq', '/whtaxinq'])}">
            <img class="icon-img" src="icons/회계관리white.png" alt="회계관리">
            <span class="nav-link" @click="toggleNav('acntgmng')">회계관리</span>
          </div>
          <div :class="{'nav__submenu__wrap': true, 'active': isActive('acntgmng')}" class="nav__submenu__wrap__double">
            <div class="nav__submenu" :class="{'nav__submenu--active': $route.path === '/taxbillinq'}">
              <img class="icon-img-sub" :src="$route.path === '/taxbillinq' ? '/icons/세금조회.png' : '/icons/세금조회white.png'" alt="세금조회">
              <router-link class="nav-link" active-class="active" exact to="/taxbillinq">세금조회</router-link>
            </div>
            <div class="nav__submenu" :class="{'nav__submenu--active': $route.path === '/whtaxinq'}">
              <img class="icon-img-sub" :src="$route.path === '/whtaxinq' ? '/icons/급여및비용조회.png' : '/icons/급여및비용조회white.png'" alt="급여및비용조회">
              <router-link class="nav-link" active-class="active" exact to="/whtaxinq">급여및비용조회</router-link>
            </div>
          </div>

          <!-- 기기관리 -->
          <div class="nav__menu" :class="{'nav__menu--active': isActiveRoute('dvcmng', ['/dvcinq'])}">
            <img class="icon-img" src="/icons/기기관리white.png" alt="기기관리">
            <span class="nav-link" @click="toggleNav('dvcmng')">기기관리</span>
          </div>
          <div :class="{'nav__submenu__wrap': true, 'active': isActive('dvcmng')}" class="nav__submenu__wrap__single">
            <div class="nav__submenu" :class="{'nav__submenu--active': $route.path === '/dvcinq'}">
              <img class="icon-img-sub" :src="$route.path === '/dvcinq' ? '/icons/기기조회.png' : '/icons/기기조회white.png'" alt="기기조회">
              <router-link class="nav-link" active-class="active" exact to="/dvcinq">기기조회</router-link>
            </div>
          </div>
        </div>
      </nav>
    </aside>
    <section>
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
      if (this.activeTab === tab) {
        // 현재 열려 있는 탭을 다시 클릭 → 닫기
        this.activeTab = null;
      } else {
        this.activeTab = tab;
      }
    },
    isActive(tab) {
      return this.activeTab === tab;
    },
    isActiveRoute(tab, routes) {
      // 현재 경로가 routes 중 하나면 true
      return routes.includes(this.$route.path);
    }
  }
}
</script>

<style>
.grid-container{
  display: grid;
  grid-template-columns: 295px 1fr;
}

aside{
  display: grid;
  background-color:#2c3e50;
}

section{
  display: grid;
  grid-template-rows: 0.2fr 50px 0.4fr 0.4fr;
  padding: 10px;
  background-color:#f6f6f6;
}

nav {
  padding-top: 10px;
  overflow: visible;
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

/* nav__menu 기본 hover 스타일 (active 아닐 때만 흰색 유지) */
.nav__menu:not(.nav__menu--active):hover .nav-link {
  color: #ffffff;
}

/* nav__menu가 active일 때 hover해도 컬러 유지 */
.nav__menu--active .nav-link {
  color: #ffffff;
}

.nav__menu--active:hover .nav-link {
  color: #ffffff;
}

.nav__menu--active::after {
  background-color: #ffffff; /* 하늘색 (SkyBlue) */
  opacity: 1;
  width: 100%;
}

.nav__menu::after {
  z-index: 10;
  content: "";
  display: block;
  background-color: #ffffff; /* 하늘색 (SkyBlue) */
  height: 3px; /* 줄의 두께 */
  width: 0%; /* 줄의 너비 */
  position: absolute;
  left: 50%; /* 가운데 정렬을 위한 위치 */
  bottom: 0px; /* 줄을 div 아래에 위치시키기 */
  transform: translateX(-50%); /* 가운데 정렬을 위한 변환 */
  transition: width 0.4s ease-in-out, opacity 0.4s ease-in-out; /* 트랜지션 효과 */
  opacity: 0; /* 초기 상태에서 숨김 */
}

.nav__menu:hover::after {
  background-color: #ffffff; /* 하늘색 (SkyBlue) */
  opacity: 1; /* 마우스 오버 시 줄 표시 */
  width: 100%;
}

/* 기본 nav-link에만 hover 색상 적용 */
.nav__menu:not(.nav__submenu--active) .nav-link:hover {
  color: #ffffff;
}

.nav__submenu{
  padding-left: 25px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 80px;
  color: #ffffff;
  position: relative; /* ::after를 위한 상대 위치 설정 */
  background-color: transparent;
  transition: background-color 0.3s ease;
}

.nav__submenu .nav-link {
  opacity: 0.75; /* 텍스트의 불투명도 설정 */
}

.nav__submenu .nav-link:hover {
  opacity: 1; /* 텍스트의 불투명도 설정 */
}

.nav__submenu .nav-link.active {
  opacity: 1; /* 현재 활성화된 메뉴는 항상 opacity 1 */
}

/* 강조된 서브 메뉴 */
.nav__submenu--active {
  background-color: #f6f6f6 !important;
}

.nav__submenu--active .nav-link {
  color: #2c3e50;
  opacity: 1;
}

/* active 상태인 메뉴는 hover해도 유지 */
.nav__submenu--active .nav-link:hover {
  color: #2c3e50;
}

/* 기본 nav-link에만 hover 색상 적용 */
.nav__submenu:not(.nav__submenu--active) .nav-link:hover {
  color: #ffffff;
}

.nav__submenu__wrap {
  overflow: hidden; /* 내용이 넘치는 것을 숨김 */
  max-height: 0; /* 기본적으로 높이를 0으로 설정 */
  transition: max-height linear;
}

.nav__submenu__wrap__single.active {
  max-height: 100px; /* 최대 높이를 설정하여 애니메이션을 적용 */
}

.nav__submenu__wrap__double.active {
  max-height: 200px; /* 최대 높이를 설정하여 애니메이션을 적용 */
}

.nav__submenu__wrap__triple.active {
  max-height: 300px; /* 최대 높이를 설정하여 애니메이션을 적용 */
}

.nav-link{
  padding: 0px;
  color: #ffffff;
}

.nav-link:hover {
  color: #ffffff; /* 마우스 오버 시 텍스트 색상 */
}

.icon-img{
  height: 35px;
  margin-right: 20px;
  padding-left: 20px;
}

.icon-img-sub{
  border-left: 5px solid #3c6eaf; /* 연한 회색 세로선 */
  margin-left: 8px; /* 전체 메뉴와 약간 떨어지도록 */
  height: 35px;
  margin-right: 20px;
  padding-left: 20px;
}

html, head, body, main{
  height: 100%;
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