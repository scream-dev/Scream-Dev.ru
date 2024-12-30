function updateCountdown() {
    const now = new Date();
    const nextYear = new Date(now.getFullYear() + 1, 0, 1);
    const totalSeconds = Math.floor((nextYear - now) / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    animateValue('days', days);
    animateValue('hours', hours);
    animateValue('minutes', minutes);
    animateValue('seconds', seconds);
}

function animateValue(id, newValue) {
    const element = document.getElementById(id);
    element.classList.add('bounce');
    setTimeout(() => element.classList.remove('bounce'), 500);
    gsap.to(element, {
        innerText: newValue,
        duration: 1,
        roundProps: 'innerText',
        ease: "power3.out"
    });
}

setInterval(updateCountdown, 1000);
updateCountdown();
