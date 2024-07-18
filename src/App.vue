<template>
  <main class="grid-container">
    <aside class="grid-item">
      <nav class="nav flex-column">
        <router-link class="nav-link active" aria-current="page" to="/dev_inq">개발자관리</router-link>
          <a class="nav-link" href="/dev_inq">개발자조회</a>
          <a class="nav-link" href="/emp_ing">직원조회</a>
          <a class="nav-link" href="#">프로젝트관리</a>
          <a class="nav-link" href="#">프로젝트조회</a>
          <a class="nav-link" href="#">고객사관리</a>
          <a class="nav-link" href="#">고객사조회</a>
          <a class="nav-link" href="#">계약서관리</a>
          <a class="nav-link" href="#">계약회사계약서조회</a>
          <a class="nav-link" href="#">개발자계약서조회</a>
          <a class="nav-link" href="#">기타계약서조회</a>
          <a class="nav-link" href="#">매출관리</a>
          <a class="nav-link" href="#">세금계산서조회</a>
          <a class="nav-link" href="#">원천세조회</a>
          <a class="nav-link" href="#">비용관리</a>
          <a class="nav-link" href="#">입출금조회</a>
          <a class="nav-link" href="#">사무비용조회</a>
          <a class="nav-link" href="#">기기관리</a>
        <router-link class="nav-link" to="#">기기조회</router-link>
      </nav>
    </aside>
    <section class="grid-item">
      <article>
        <p>개발자관리 > 개발자조회</p>
      </article>
      <article>
        <button>프로젝트지원중</button>
        <button>80년생 이후</button>
      </article>
      <article>
        <input type="search" name="" id="">
        <img src="" alt="">
        <button>검색</button>
        <button>개발자추가</button>
        <select name="" id="">
          <option value="">25개</option>
          <option value="">50개</option>
          <option value="">75개</option>
          <option value="">100개</option>
        </select>
      </article>
      <article>
        <table>
          <tr>
            <th>이름</th>
            <th>프로젝트투입상태</th>
            <th>계약횟수</th>
            <th>출생년도</th>
            <th>나이</th>
            <th>성별</th>
            <th>직위</th>
            <th>등급</th>
            <th>경력</th>
            <th>지역</th>
            <th>휴대폰번호</th>
            <th>컨택방법</th>
            <th>인터뷰요청일</th>
            <th>투입가능일</th>
            <th>기종</th>
            <th>os</th>
            <th>언어</th>
            <th>데이터베이스</th>
            <th>툴</th>
            <th>프레임워크</th>
            <th>라이브러리</th>
            <th>통신</th>
            <th>기타</th>
          </tr>
          <tr>
            <td>홍길동</td>
            <td>투입중</td>
            <td>1</td>
            <td>1994</td>
            <td>30</td>
            <td>남</td>
            <td>과장</td>
            <td>중급</td>
            <td>6년3개월</td>
            <td>경기도 수원시</td>
            <td>010-0000-0000</td>
            <td>잡코리아공고지원</td>
            <td>즉시</td>
            <td>즉시</td>
            <td>lenovo</td>
            <td>windows</td>
            <td>java</td>
            <td>oracle</td>
            <td>vscode</td>
            <td>spring framework</td>
            <td>spring</td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </article>
      <article>
        <p>1 2 3 4 5 > >></p>
      </article>
    </section>
  </main>
<!--  <router-view/>-->
</template>

<style>
.grid-container {
  display: grid;
  grid-template-columns: 300px 1fr;
}

.grid-item {

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