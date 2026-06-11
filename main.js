
// 01 히어로
function typingLoop(targetId, text, speed = 120, delay = 2000) {

    const target = document.getElementById(targetId);

    function startTyping() {

        target.textContent = '';

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

window.addEventListener('load', () => {

    typingLoop('cooling-word', '안 시원', 120, 2500);

    setTimeout(() => {
        typingLoop('service-word', '수리점검', 120, 2500);
    }, 600);

});


// 03 실시간 접수현황
const names = [
    '김**', '이**', '박**', '최**', '정**',
    '강**', '조**', '윤**', '장**', '임**',
    '한**', '오**', '신**', '서**', '황**'
];

const areas = [
    '강남구',
    '송파구',
    '서초구',
    '마포구',
    '영등포구',
    '분당구',
    '수원시',
    '용인시',
    '고양시',
    '성남시'
];

const services = [
    '냉방안됨',
    '누수',
    '난방안됨',
    '센서 불량',
    '가스 누설',
    '인버터 이상',
    '전원 불량',
    '에러코드',
    '소음 문제',
];

const statuses = [
    { text: '접수완료', class: 'status-received' },
    { text: '상담중', class: 'status-consulting' },
    { text: '방문예정', class: 'status-visit' },
    { text: '수리완료', class: 'status-done' }
];

function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const liveTrack = document.querySelector('.acrepair-live-track');

let html = '';

for (let i = 0; i < 15; i++) {

    const name = randomItem(names);
    const area = randomItem(areas);
    const service = randomItem(services);
    const status = randomItem(statuses);

    html += `
        <div class="acrepair-live-item">
            <span class="acrepair-live-name">${name}</span>
            <span class="acrepair-live-area">${area}</span>
            <span class="acrepair-live-service">${service}</span>
            <span class="acrepair-live-status ${status.class}">
                ${status.text}
            </span>
        </div>
    `;
}

liveTrack.innerHTML = html + html;

const itemHeight = 56;
const originalCount = 15;

let currentIndex = 0;

setInterval(() => {

    currentIndex++;

    liveTrack.style.transition = 'transform 800ms ease-in-out';
    liveTrack.style.transform =
        `translateY(-${currentIndex * itemHeight}px)`;

    if (currentIndex >= originalCount) {

        setTimeout(() => {

            liveTrack.style.transition = 'none';
            liveTrack.style.transform = 'translateY(0)';

            currentIndex = 0;

        }, 800);

    }

}, 2600);


// 06 실제사례
document.addEventListener('DOMContentLoaded', function () {
    const caseSwiper = new Swiper('.acrepair-case-swiper', {
        loop: true,
        centeredSlides: true,

        slidesPerView: 3,
        spaceBetween: 5,

        speed: 900,

        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },

        observer: true,
        observeParents: true,

        breakpoints: {
            0: {
                slidesPerView: 1.3,
                spaceBetween: 12
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20
            }
        }
    });

    caseSwiper.autoplay.start();
});



// 07 리뷰
const counter = document.querySelector('.count-up');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
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
}, { threshold: 0.4 });

observer.observe(counter);



// 10 FAQ
document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (item.classList.contains('is-active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('is-active');

            faqItems.forEach((el) => {
                el.classList.remove('is-active');
                el.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('is-active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
});


window.addEventListener('load', function () {
    const btns = document.querySelectorAll('.js-scroll-consult');
    const target = document.querySelector('.acrepair-emergency-section');

    btns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            const top = target.getBoundingClientRect().top + window.pageYOffset - 50;

            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        });
    });
});




// 애니메이션
AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true
});