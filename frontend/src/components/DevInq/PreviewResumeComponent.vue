<template>
  <div class="modal fade" :class="{ show: showModal }" v-show="showModal" tabindex="-1"
       aria-labelledby="resumePreviewLabel" aria-hidden="false">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable custom-modal">
      <div class="modal-content">
        <!-- 모달 헤더 -->
        <div class="modal-header d-flex align-items-center">
          <div class="flex-grow-1 text-center">
            <h1 class="modal-title fs-4" id="resumePreviewLabel">기술경력서 미리보기</h1>
          </div>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>

        <!-- 모달 바디 -->
        <div class="modal-body d-flex flex-column" ref="modalBody">
          <form class="modal-height-fix100 form d-flex flex-column flex-grow-1" autocomplete="off">
            <div class="modal-height-fix100 b-line pt-4 pb-4 flex-column d-flex justify-content-center">
              <div class="modal-height-fix100 d-flex justify-content-center w-100">
                <div class="modal-height-fix100 col-10 d-flex align-items-center form-status-bg w-100">
                  <div class="modal-height-fix100 d-flex justify-content-between form-control form-status toggleTextWrap w-100">
                    <!-- 미리보기 컨테이너 -->
                    <div id="docx-container">
                      <p v-if="!resumeUrl">미리보기 할 이력서가 없습니다.</p>
                      <p v-else>이력서 미리보기가 여기에 표시됩니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showModal" class="modal-backdrop fade show"></div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';
import eventbus from '@/eventbus/eventbus';

// docx-preview.js 라이브러리 불러오기
import * as docx from 'docx-preview'; // docx-preview.js가 제대로 로드되었는지 확인

const showModal = ref(false);
const resumeUrl = ref("");

const closeModal = () => {
  showModal.value = false; // 모달 닫기
};

const openModalPreviewResume = async (resumeId) => {
  console.log("📌 docx 객체 확인:", docx);
  console.log("📌 미리보기 요청 resumeId (원본):", resumeId);

  if (!resumeId) {
    console.error("🚨 resumeId가 없습니다.");
    return;
  }

  const encodedResumeId = encodeURIComponent(resumeId);
  console.log("📌 URL 인코딩된 resumeId:", encodedResumeId);

  try {
    console.log("📤 요청 보냄: ", `/api/previewResume/${encodedResumeId}`);
    const response = await fetch(`http://localhost:8080/api/previewResume/${encodedResumeId}`);

    if (!response.ok) {
      throw new Error(`이력서를 불러올 수 없습니다. 상태 코드: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    console.log("🔍 응답 Content-Type:", contentType);

    if (!contentType || !contentType.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      const errorText = await response.text();
      console.error("🚨 예상치 못한 응답:", errorText);
      throw new Error("올바른 파일 형식이 아닙니다.");
    }

    const blob = await response.blob();
    console.log("📂 Blob 데이터 확인:", blob);

    // FileReader를 이용하여 Blob 내용 확인 (디버깅용)
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log("📄 Blob 내용 (Base64로 변환됨):", reader.result);
    };
    reader.readAsDataURL(blob);

    // 모달을 먼저 열고, DOM이 렌더링될 때까지 기다림
    showModal.value = true;
    await nextTick(); // DOM 업데이트 후 실행

    setTimeout(() => {
      const container = document.getElementById("docx-container");
      if (!container) {
        console.error("🚨 'docx-container' 요소가 여전히 존재하지 않습니다.");
        return;
      }

      // 강제로 표시 (CSS에서 덮어씌우지 못하게)
      container.style.removeProperty("display"); // 기존 display 속성 제거
      container.style.setProperty("display", "block", "important"); // 강제 적용

      // 기존 내용 초기화 후 DOCX 렌더링
      container.innerHTML = "";
      docx.renderAsync(blob, container).then(() => {
        console.log("✅ DOCX 문서가 렌더링되었습니다.");

        // 📌 패딩 제거 (300ms 후)
        setTimeout(() => {
          const wrapper = document.querySelector(".docx-wrapper");
          const section = document.querySelector(".docx");

          if (wrapper) wrapper.style.padding = "0";
          if (section) section.style.padding = "0";
        }, 300);

        setTimeout(() => {
          const sections = document.querySelectorAll(".docx-section");

          sections.forEach(section => {
            const width = parseFloat(section.style.width);
            const height = parseFloat(section.style.height);

            if (!width || !height) return;

            if (width > height) {
              // 가로 페이지 감지 시 회전 처리
              const wrapper = document.createElement('div');
              wrapper.classList.add('docx-section-wrapper', 'landscape-wrapper');
              section.classList.add('landscape');

              section.parentNode.insertBefore(wrapper, section);
              wrapper.appendChild(section);
            }
          });
        }, 500);
      }).catch(err => {
        console.error("🚨 DOCX 렌더링 중 오류 발생:", err);
      });
    }, 300); // 300ms 정도 지연

  } catch (error) {
    console.error("🚨 오류 발생:", error);
  }
};

// 모달의 display 상태를 동적으로 변경
watch(showModal, (newValue) => {
  const modalElement = document.querySelector(".modal");
  if (!modalElement) return;

  if (newValue) {
    modalElement.style.display = "block";
    setTimeout(() => {
      modalElement.classList.add("show");
    }, 10);
  } else {
    modalElement.classList.remove("show");
    setTimeout(() => {
      modalElement.style.display = "none";
    }, 300);
  }
});


onMounted(() => {
  eventbus.SearchResultEvent.add('openModalPreviewResume', (resumeId) => {
    console.log("이력서 미리보기 열기", resumeId);
    openModalPreviewResume(resumeId); // resumeId를 전달하여 미리보기 함수 호출
  });
});
</script>

<style scoped>
.modal {
  display: block; /* 모달을 보이게 하기 위해 설정 */
}

.modal-content {
  display: flex;
  flex-direction: column; /* 세로 방향으로 요소 배치 */
  height: 100%; /* 모달 높이 설정 */
}

.modal-body {
  flex-grow: 1; /* 몸체가 남은 공간을 차지하도록 설정 */
  overflow-y: auto; /* 내용이 많을 경우 스크롤 가능 */
  overflow-x: auto !important; /* 수평 스크롤 숨김 */
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0px;
}

.form-control.form-status {
  overflow-x: auto !important;
}

.modal-height-fix100{
  height: 100%;
}

#docx-container {
  display: block;
  height: 100%; /* 고정 높이로 설정 */
  width: 100%; /* 부모 너비를 가득 채우도록 설정 */
  min-width: 1200px; /* landscape가 문제 없도록 */
  overflow-x: auto;
  white-space: nowrap; /* 회전된 섹션이 옆으로 밀려도 줄바꿈 X */
  overflow-y: auto; /* 세로 스크롤 활성화 */
  background: white; /* 흰 배경 */
  padding: 15px;
  text-align: center;
}
/* 모달 배경 */
.modal-backdrop {
  z-index: 1050;
}

/* 모달 스타일 */
.custom-modal {
  max-width: 95vw;
  width: 95vw;
}

.docx-wrapper, .docx {
  padding: 0 !important;
}

/* 기본 페이지 스타일 */
.docx-section {
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
}

/* 가로 방향 페이지일 때 */
.docx-section.landscape {
  transform: rotate(90deg);
  transform-origin: left top;
  width: auto !important;
  height: auto !important;
  margin: 30px auto;
}

.docx-section-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
}

.landscape-wrapper {
  min-width: 1200px; /* 회전된 A4 기준 너비 정도 */
  overflow-x: auto;
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.landscape {
  transform: rotate(90deg);
  transform-origin: left top;
  /* 회전한 상태에 맞게 크기 조정 */
  width: auto !important;
  height: auto !important;
  display: inline-block;
}

</style>