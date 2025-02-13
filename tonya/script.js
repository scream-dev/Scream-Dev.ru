document.addEventListener("DOMContentLoaded", function () {
    const btnYes = document.querySelector(".yes-button");
    const btnNo = document.querySelector(".no-button");

    const prompts = [
        "Ты уверена?",
        "Точно??",
        "Точно хочешь?",
        "Ну пожалуйста...",
        "Просто подумай!",
        "Но я же расстроюсь...",
        "Я расстроен...",
        "Я очень расстроен...",
        "Ну, давай ещё один вопрос...",
        "Шутка! Нажми уже да!❤️"
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
