$(document).ready(function () {
    $(".carousel__inner").slick({
        speed: 1200,
        // adaptiveHeight: true,
        prevArrow:
            '<button type="button" class="slick-prev"><img src="icons/arrow_left.svg"></button>',
        nextArrow:
            '<button type="button" class="slick-next"><img src="icons/arrow_right.svg"</button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false,
                },
            },
        ],
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Получаем все кнопки с ролью "tab"
    let buttons = document.querySelectorAll('button[role="tab"]');

    // Проходим по всем кнопкам и удаляем их содержимое
    buttons.forEach(function (button) {
        button.textContent = ""; // Удаляем текст из кнопки
    });
});
