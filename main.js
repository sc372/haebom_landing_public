// 01 히어로
function typingLoop(targetId, text, speed = 120, delay = 2000) {
  const target = document.getElementById(targetId);

  function startTyping() {
    target.textContent = "";

    let index = 0;

    const typing = setInterval(() => {
      target.textContent += text[index];
      index++;

      if (index >= text.length) {
        clearInterval(typing);

        setTimeout(startTyping, delay);
      }
    }, speed);
  }

  startTyping();
}

window.addEventListener("load", () => {
  typingLoop("cooling-word", "안 시원", 120, 2500);

  setTimeout(() => {
    typingLoop("service-word", "수리점검", 120, 2500);
  }, 600);
});

// 03 실시간 접수현황
const names = [
  "김**",
  "이**",
  "박**",
  "최**",
  "정**",
  "강**",
  "조**",
  "윤**",
  "장**",
  "임**",
  "한**",
  "오**",
  "신**",
  "서**",
  "황**",
];

const areas = ["서울특별시", "인천광역시", "경기도", "기타"];

const services = [
  "냉방안됨",
  "누수",
  "난방안됨",
  "센서 불량",
  "가스 누설",
  "인버터 이상",
  "전원 불량",
  "에러코드",
  "소음 문제",
];

const statuses = [
  { text: "접수완료", class: "status-received" },
  { text: "상담중", class: "status-consulting" },
  { text: "방문예정", class: "status-visit" },
  { text: "수리완료", class: "status-done" },
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const liveTrack = document.querySelector(".acrepair-live-track");

const itemHeight = 56;
let currentIndex = 0;
let liveOriginalCount = 15;

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function shuffleItems(items) {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function renderLiveItems(items) {
  if (!liveTrack || items.length === 0) return;

  const html = items
    .map(
      (item) => `
        <div class="acrepair-live-item">
            <span class="acrepair-live-name">${escapeHtml(item.name)}</span>
            <span class="acrepair-live-area">${escapeHtml(item.area)}</span>
            <span class="acrepair-live-service">${escapeHtml(item.service)}</span>
            <span class="acrepair-live-status ${escapeHtml(item.status.class)}">
                ${escapeHtml(item.status.text)}
            </span>
        </div>
    `,
    )
    .join("");

  liveOriginalCount = items.length;
  currentIndex = 0;
  liveTrack.style.transition = "none";
  liveTrack.style.transform = "translateY(0)";
  liveTrack.innerHTML = html + html;
}

function createMockLiveItems(count = 15) {
  return Array.from({ length: count }, () => ({
    name: randomItem(names),
    area: randomItem(areas),
    service: randomItem(services),
    status: randomItem(statuses),
  }));
}

function getTodayInquiryItems(data) {
  const items = Array.isArray(data) ? data : data?.items || data?.data || [];

  if (!Array.isArray(items)) return [];

  return items.map((item) => {
    const firstService = Array.isArray(item.services)
      ? item.services[0]
      : item.services;
    const serviceName =
      typeof firstService === "object" && firstService !== null
        ? firstService.label ||
          firstService.name ||
          firstService.codeName ||
          firstService.code_id ||
          ""
        : firstService;

    return {
      name: item.customer_name || item.customerName || "고객",
      area: item.customer_address || item.customerAddress || "-",
      service: serviceName || "-",
      status: randomItem(statuses),
    };
  });
}

const baseLiveItems = createMockLiveItems();
renderLiveItems(baseLiveItems);

const footerYear = document.getElementById("footer-year");
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

setInterval(() => {
  if (!liveTrack || liveOriginalCount === 0) return;

  currentIndex++;

  liveTrack.style.transition = "transform 800ms ease-in-out";
  liveTrack.style.transform = `translateY(-${currentIndex * itemHeight}px)`;

  if (currentIndex >= liveOriginalCount) {
    setTimeout(() => {
      liveTrack.style.transition = "none";
      liveTrack.style.transform = "translateY(0)";

      currentIndex = 0;
    }, 800);
  }
}, 2600);

// 06 실제사례
document.addEventListener("DOMContentLoaded", function () {
  const caseSwiper = new Swiper(".acrepair-case-swiper", {
    loop: true,
    centeredSlides: true,

    slidesPerView: 3,
    spaceBetween: 5,

    speed: 900,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    observer: true,
    observeParents: true,

    breakpoints: {
      0: {
        slidesPerView: 1.3,
        spaceBetween: 12,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });

  caseSwiper.autoplay.start();
});

// 07 리뷰
const counter = document.querySelector(".count-up");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const target = Number(counter.dataset.target);
      let start = 7900;
      let startTime = null;
      const duration = 1800;

      function countUp(timestamp) {
        if (!startTime) startTime = timestamp;

        const progress = Math.min((timestamp - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        const value = Math.floor(start + (target - start) * ease);

        counter.textContent = value.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(countUp);
        } else {
          counter.textContent = target.toLocaleString();
        }
      }

      requestAnimationFrame(countUp);
      observer.unobserve(counter);
    });
  },
  { threshold: 0.4 },
);

observer.observe(counter);

// 10 FAQ
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (item.classList.contains("is-active")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("is-active");

      faqItems.forEach((el) => {
        el.classList.remove("is-active");
        el.querySelector(".faq-answer").style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add("is-active");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
});

function formatPhoneInput(input) {
  const digits = input.value.replace(/\D/g, "").slice(0, 11);

  let formatted = digits;

  if (digits.length > 3) {
    formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }

  if (digits.length > 7) {
    formatted = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  }

  input.value = formatted;
}

const API_HOST = ["localhost", "127.0.0.1"].includes(window.location.hostname)
  ? "http://127.0.0.1:8000"
  : "https://api.haebompartners.co.kr";
const DEFAULT_MAX_PHOTO_UPLOAD_COUNT = 5;
let selectedFiles = [];
let selectedPhotoUrls = [];

function animateStatusCount(target, endValue, duration = 1200) {
  const end = Number(endValue);

  if (!target || !Number.isFinite(end)) return;

  let startTime = null;
  target.textContent = "0건";

  function update(timestamp) {
    if (!startTime) startTime = timestamp;

    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(end * eased);

    target.textContent = `${value.toLocaleString()}건`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      target.textContent = `${end.toLocaleString()}건`;
    }
  }

  requestAnimationFrame(update);
}

async function loadMockData() {
  const inquiryCountEl = document.getElementById("today-inquiry-count");
  const counselCountEl = document.getElementById("waiting-counsel-count");

  if (!inquiryCountEl || !counselCountEl) return;

  try {
    const res = await fetch(`${API_HOST}/api/v1/public/inquiry/mock-data`, {
      method: "GET",
      headers: {
        "X-Created-By": "landing",
      },
    });

    if (!res.ok) throw new Error("mock-data 조회 실패");

    const data = await res.json();

    if (Number.isFinite(Number(data.inquiryCnt))) {
      animateStatusCount(inquiryCountEl, data.inquiryCnt);
    }

    if (Number.isFinite(Number(data.inquiryCounselCnt))) {
      animateStatusCount(counselCountEl, data.inquiryCounselCnt);
    }
  } catch (err) {
    console.error(err);
  }
}

async function loadTodayInquiries() {
  try {
    const res = await fetch(`${API_HOST}/api/v1/public/inquiry/today`, {
      method: "GET",
      headers: {
        "X-Created-By": "landing",
      },
    });

    if (!res.ok) throw new Error("today inquiry 조회 실패");

    const data = await res.json();
    const todayItems = getTodayInquiryItems(data);

    if (todayItems.length === 0) return;

    renderLiveItems(shuffleItems([...baseLiveItems, ...todayItems]));
  } catch (err) {
    console.error(err);
  }
}

function nowIsoWithOffset() {
  const d = new Date();
  const tz = -d.getTimezoneOffset();
  const sign = tz >= 0 ? "+" : "-";
  const hh = String(Math.floor(Math.abs(tz) / 60)).padStart(2, "0");
  const mm = String(Math.abs(tz) % 60).padStart(2, "0");
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 19);

  return `${local}${sign}${hh}:${mm}`;
}

function getReferrerId() {
  const url = new URL(window.location.href);

  return (
    url.searchParams.get("referrer_id") || url.searchParams.get("ref") || ""
  );
}

async function compressImage(file, quality = 0.5) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();

      img.onload = function () {
        const canvas = document.createElement("canvas");
        const maxWidth = 1024;
        const scale = Math.min(maxWidth / img.width, 1);

        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            resolve(new File([blob], file.name, { type: "image/jpeg" }));
          },
          "image/jpeg",
          quality,
        );
      };

      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  });
}

function clearSelectedPhotos() {
  selectedPhotoUrls.forEach((url) => URL.revokeObjectURL(url));
  selectedFiles = [];
  selectedPhotoUrls = [];
}

function renderPhotoPreviews() {
  const previewRow = document.getElementById("photo-preview-row");

  if (!previewRow) return;

  previewRow.innerHTML = "";

  selectedPhotoUrls.forEach((url, index) => {
    const item = document.createElement("div");
    item.className = "photo-thumb";

    const previewButton = document.createElement("button");
    previewButton.type = "button";
    previewButton.className = "photo-thumb-button";
    previewButton.setAttribute(
      "aria-label",
      `${selectedFiles[index].name} 크게 보기`,
    );
    previewButton.addEventListener("click", () =>
      openPhotoLightbox(url, selectedFiles[index].name),
    );

    const img = document.createElement("img");
    img.src = url;
    img.alt = selectedFiles[index].name;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "photo-thumb-remove";
    removeButton.setAttribute(
      "aria-label",
      `${selectedFiles[index].name} 삭제`,
    );
    removeButton.textContent = "×";
    removeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      removeSelectedPhoto(index);
    });

    previewButton.appendChild(img);
    item.appendChild(previewButton);
    item.appendChild(removeButton);
    previewRow.appendChild(item);
  });
}

function removeSelectedPhoto(index) {
  URL.revokeObjectURL(selectedPhotoUrls[index]);
  selectedFiles.splice(index, 1);
  selectedPhotoUrls.splice(index, 1);
  renderPhotoPreviews();
}

function openPhotoLightbox(url, altText) {
  const lightbox = document.createElement("div");
  lightbox.className = "photo-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");

  const image = document.createElement("img");
  image.src = url;
  image.alt = altText;

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "photo-lightbox-close";
  closeButton.setAttribute("aria-label", "확대 사진 닫기");
  closeButton.textContent = "×";

  function closeLightbox() {
    document.removeEventListener("keydown", handleKeydown);
    lightbox.remove();
  }

  function handleKeydown(e) {
    if (e.key === "Escape") closeLightbox();
  }

  closeButton.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", closeLightbox);
  image.addEventListener("click", (e) => e.stopPropagation());
  document.addEventListener("keydown", handleKeydown);

  lightbox.appendChild(image);
  lightbox.appendChild(closeButton);
  document.body.appendChild(lightbox);
  closeButton.focus();
}

function setupPhotoUpload() {
  const photoInput = document.getElementById("emergency-photo");

  if (!photoInput) return;

  photoInput.addEventListener("change", async function () {
    const maxFileCount =
      Number(this.dataset.maxFiles) || DEFAULT_MAX_PHOTO_UPLOAD_COUNT;
    const newFiles = Array.from(this.files || []);
    const totalFiles = [...selectedFiles, ...newFiles];

    if (totalFiles.length > maxFileCount) {
      alert(`사진은 최대 ${maxFileCount}개까지만 업로드 가능합니다.`);
      this.value = "";
      return;
    }

    for (const file of newFiles) {
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 첨부 가능합니다.");
        continue;
      }

      if (file.size > 50 * 1024 * 1024) {
        alert(`"${file.name}" 파일은 50MB를 초과하여 업로드할 수 없습니다.`);
        continue;
      }

      const compressedFile = await compressImage(file, 0.5);
      selectedFiles.push(compressedFile);
      selectedPhotoUrls.push(URL.createObjectURL(compressedFile));
    }

    this.value = "";
    renderPhotoPreviews();
  });
}

function getSelectedServiceCode() {
  const symptomSelect = document.getElementById("symptomSelect");
  const selectedOption = symptomSelect?.selectedOptions?.[0];

  return selectedOption?.dataset.serviceCode || "COOLING_NOT_WORKING";
}

function setupInquiryForm() {
  const form = document.getElementById("inquiryForm");

  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const name = document.getElementById("userName").value.trim();
    const phoneDigits = document
      .getElementById("userPhone")
      .value.replace(/\D/g, "");
    const address = document.getElementById("userAddress").value.trim();
    const agreeTerms = document.getElementById("agreeTerms");

    if (!agreeTerms.checked) {
      alert("개인정보 수집 및 이용에 동의해 주세요.");
      agreeTerms.focus();
      return;
    }

    if (phoneDigits.startsWith("010") && phoneDigits.length !== 11) {
      alert("휴대폰 번호는 11자리로 입력해 주세요.");
      return;
    }

    if (phoneDigits.length < 10) {
      alert("연락처를 정확히 입력해 주세요.");
      return;
    }

    const formData = new FormData();
    formData.append(
      "inquiry_data",
      JSON.stringify({
        inquiryType: "SERVICE",
        inquiryDatetime: nowIsoWithOffset(),
        referrerId: getReferrerId(),
        customerName: name,
        customerPhoneNumber: phoneDigits,
        customerAddress: address,
        callableCodeId: "CALLABLE_AM",
        inquiryMemo: "",
        serviceCodeIds: [getSelectedServiceCode()],
      }),
    );

    selectedFiles.forEach((file) => formData.append("files", file));

    try {
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "접수 중...";
      }

      const res = await fetch(`${API_HOST}/api/v1/public/inquiry`, {
        method: "POST",
        headers: {
          "X-Created-By": "landing",
        },
        body: formData,
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "네트워크 오류");
      }

      alert("접수가 완료되었습니다! 감사합니다.");
      form.reset();
      clearSelectedPhotos();
      renderPhotoPreviews();
    } catch (err) {
      console.error(err);
      alert("접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "무료 상담신청하기";
      }
    }
  });
}

window.addEventListener("load", function () {
  loadMockData();
  loadTodayInquiries();
  setupPhotoUpload();
  setupInquiryForm();
  const phoneInput = document.getElementById("userPhone");

  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      formatPhoneInput(this);
    });
  }

  const btns = document.querySelectorAll(".js-scroll-consult");
  const target = document.querySelector(".acrepair-emergency-section");

  btns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      const top = target.getBoundingClientRect().top + window.pageYOffset - 50;

      window.scrollTo({
        top: top,
        behavior: "smooth",
      });
    });
  });
});

// 애니메이션
AOS.init({
  duration: 800,
  easing: "ease-out",
  once: true,
});
