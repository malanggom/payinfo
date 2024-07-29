<template id="app">
<main class="grid-container">
  <aside class="grid-item">
    <nav class="nav flex-column">
      <span class="nav-link flexItem alignCenter justifyCenter height50" @click="devmngNavToggle">개발자관리</span>
      <div v-if="devmngShow">
        <router-link class="nav-link flexItem alignCenter justifyCenter height50" to="/devinq">개발자조회</router-link>
        <router-link class="nav-link flexItem alignCenter justifyCenter height50" to="/empinq">직원조회</router-link>
      </div>
      <span class="nav-link flexItem alignCenter justifyCenter height50" @click="pjmngNavToggle">프로젝트관리</span>
      <div v-if="pjmngShow">
        <router-link class="nav-link flexItem alignCenter justifyCenter height50" to="/pjinq">프로젝트조회</router-link>
      </div>
      <span class="nav-link flexItem alignCenter justifyCenter height50" @click="ctrtcomngNavToggle">계약회사관리</span>
      <div v-if="ctrtcomngShow">
        <router-link class="nav-link flexItem alignCenter justifyCenter height50" to="/ctrtcoinq">계약회사조회</router-link>
      </div>
      <span class="nav-link flexItem alignCenter justifyCenter height50" @click="ctrtcoctrtmngNavToggle">계약서관리</span>
      <div v-if="ctrtcoctrtmngShow">
        <router-link class="nav-link flexItem alignCenter justifyCenter height50" to="/ctrtcoctrtinq">계약회사계약서조회</router-link>
        <router-link class="nav-link flexItem alignCenter justifyCenter height50" to="/devctrtinq">개발자계약서조회</router-link>
        <router-link class="nav-link flexItem alignCenter justifyCenter height50" to="/etcctrtinq">기타계약서조회</router-link>
      </div>
      <span class="nav-link flexItem alignCenter justifyCenter height50" @click="slsmngNavToggle">매출관리</span>
      <div v-if="slsmngShow">
        <router-link class="nav-link flexItem alignCenter justifyCenter height50" to="/taxbillinq">세금계산서조회</router-link>
        <router-link class="nav-link flexItem alignCenter justifyCenter height50" to="/whtaxinq">원천세조회</router-link>
      </div>
      <span class="nav-link flexItem alignCenter justifyCenter height50" @click="amtmngNavToggle">비용관리</span>
      <div v-if="amtmngShow">
        <router-link class="nav-link flexItem alignCenter justifyCenter height50" to="/dpstwdrlinq">입출금조회</router-link>
        <router-link class="nav-link flexItem alignCenter justifyCenter height50" to="/ofcexpnssinq">사무비용조회</router-link>
      </div>
      <span class="nav-link flexItem alignCenter justifyCenter height50" @click="dvcmngNavToggle">기기관리</span>
      <div v-if="dvcmngShow">
        <router-link class="nav-link flexItem alignCenter justifyCenter height50" to="/dvcinq">기기조회</router-link>
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
  data : function(){
    return {
      devmngShow : false,
      pjmngShow : false,
      ctrtcomngShow : false,
      ctrtcoctrtmngShow : false,
      slsmngShow : false,
      amtmngShow : false,
      dvcmngShow : false
    }
  },
  methods : {
    devmngNavToggle : function(){
      if(this.devmngShow === false){
        this.devmngShow = true
        this.pjmngShow = false
        this.ctrtcomngShow = false
        this.ctrtcoctrtmngShow = false
        this.slsmngShow = false
        this.amtmngShow = false
        this.dvcmngShow = false
      }else{
        this.devmngShow = false
      }
    },
    pjmngNavToggle : function(){
      if(this.pjmngShow === false){
        this.devmngShow = false
        this.pjmngShow = true
        this.ctrtcomngShow = false
        this.ctrtcoctrtmngShow = false
        this.slsmngShow = false
        this.amtmngShow = false
        this.dvcmngShow = false
      }else{
      this.pjmngShow = false
      }
    },
    ctrtcomngNavToggle :  function(){
      if(this.ctrtcomngShow === false){
        this.pjmngShow = false
        this.devmngShow = false
        this.ctrtcomngShow = true
        this.ctrtcoctrtmngShow = false
        this.slsmngShow = false
        this.amtmngShow = false
        this.dvcmngShow = false
      }else{
        this.ctrtcomngShow = false
      }
    },
    ctrtcoctrtmngNavToggle :  function(){
      if(this.ctrtcoctrtmngShow === false){
        this.pjmngShow = false
        this.devmngShow = false
        this.ctrtcomngShow = false
        this.ctrtcoctrtmngShow = true
        this.slsmngShow = false
        this.amtmngShow = false
        this.dvcmngShow = false
      }else{
        this.ctrtcoctrtmngShow = false
      }
    },
    slsmngNavToggle :  function(){
      if(this.slsmngShow === false){
        this.pjmngShow = false
        this.devmngShow = false
        this.ctrtcomngShow = false
        this.ctrtcoctrtmngShow = false
        this.slsmngShow = true
        this.amtmngShow = false
        this.dvcmngShow = false
      }else{
        this.slsmngShow = false
      }
    },
    amtmngNavToggle :  function(){
      if(this.amtmngShow === false){
        this.pjmngShow = false
        this.devmngShow = false
        this.ctrtcomngShow = false
        this.ctrtcoctrtmngShow = false
        this.slsmngShow = false
        this.amtmngShow = true
        this.dvcmngShow = false
      }else{
        this.amtmngShow = false
      }
    },
    dvcmngNavToggle :  function(){
      if(this.dvcmngShow === false){
        this.pjmngShow = false
        this.devmngShow = false
        this.ctrtcomngShow = false
        this.ctrtcoctrtmngShow = false
        this.slsmngShow = false
        this.amtmngShow = false
        this.dvcmngShow = true
      }else{
        this.dvcmngShow = false
      }
    }
  }
}
</script>

<style>
.grid-container{
  display: grid;
  grid-template-columns: 300px 1fr;
}

.grid-item{

}
.grid-item2{
  display: grid;
  grid-template-rows: 50px 50px 50px 1fr;
  padding-top: 30px;
  padding-right: 10px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
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

.height50{
  height: 50px;
}

.flexItem{
  display: flex;
}

.alignCenter{
  align-items: center;
}

.justifyCenter {
  justify-content: center;
}

html, head, body, main{
  height: 100%;
}
</style>