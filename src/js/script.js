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

    $("ul.catalog__tabs").on(
        "click",
        "li:not(.catalog__tab_active)",
        function () {
            $(this)
                .addClass("catalog__tab_active")
                .siblings()
                .removeClass("catalog__tab_active")
                .closest("div.container")
                .find("div.catalog__content")
                .removeClass("catalog__content_active")
                .eq($(this).index())
                .addClass("catalog__content_active");
        }
    );

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on("click", function (e) {
                e.preventDefault();
                $(".catalog-item__content")
                    .eq(i)
                    .toggleClass("catalog-item__content_active");
                $(".catalog-item__list")
                    .eq(i)
                    .toggleClass("catalog-item__list_active");
            });
        });
    }

    toggleSlide(".catalog-item__link");
    toggleSlide(".catalog-item__link-back");
});

document.addEventListener("DOMContentLoaded", function () {
    // Получаем все кнопки с ролью "tab"
    let buttons = document.querySelectorAll('button[role="tab"]');

    // Проходим по всем кнопкам и удаляем их содержимое
    buttons.forEach(function (button) {
        button.textContent = ""; // Удаляем текст из кнопки
    });
});
