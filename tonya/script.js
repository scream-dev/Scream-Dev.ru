document.addEventListener("DOMContentLoaded", function () {
    const btnYes = document.querySelector(".yes-button");
    const btnNo = document.querySelector(".no-button");

    const prompts = [
        "Are you sure?",
        "Really sure??",
        "Are you positive?",
        "Pookie please...",
        "Just think about it!",
        "If you say no, I will be really sad...",
        "I will be very sad...",
        "I will be very very very sad...",
        "Ok fine, I will stop asking...",
        "Just kidding, say yes please! ❤️"
    ];

    let promptIndex = 0;

    function handleNoClick() {
        btnNo.textContent = prompts[promptIndex];
        promptIndex = (promptIndex + 1) % prompts.length;

        // Увеличиваем кнопку "Да"
        const currentSize = parseFloat(window.getComputedStyle(btnYes).fontSize);
        btnYes.style.fontSize = `${currentSize * 1.2}px`;
    }

    function handleYesClick() {
        window.location.href = "yes_page.html";
    }

    // Привязываем обработчики событий
    btnNo.addEventListener("click", handleNoClick);
    btnYes.addEventListener("click", handleYesClick);
});
