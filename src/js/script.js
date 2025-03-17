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

    document.addEventListener("DOMContentLoaded", function () {
        // Получаем все кнопки с ролью "tab"
        let buttons = document.querySelectorAll('button[role="tab"]');

        // Проходим по всем кнопкам и удаляем их содержимое
        buttons.forEach(function (button) {
            button.textContent = ""; // Удаляем текст из кнопки
        });
    });

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

    // modal

    $("[data-modal=consultation]").on("click", function () {
        $(".overlay, #consultation").fadeIn("slow");
    });
    $(".modal__close").on("click", function (e) {
        $(".overlay, #consultation, #order, #thanks").fadeOut("slow");
    });

    $(".button__mini").each(function (i) {
        $(this).on("click", function () {
            $("#order .modal__descr").text(
                $(".catalog-item__subtitle").eq(i).text()
            );
            $(".overlay, #order").fadeIn("slow");
        });
    });

    // closing the modal window when clicking anywhere on the screen except for the button

    $(window).on("click", function (e) {
        if (e.target.classList.contains("overlay")) {
            $(".overlay, #consultation, #thanks, #order").fadeOut("slow");
        }
    });

    // closing the modal window when pressing Escape

    $(document).keydown(function (e) {
        if (e.key === "Escape") {
            $(".overlay, #consultation, #thanks, #order").fadeOut("slow");
        }
    });

    // form validation

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                },
                phone: "required",
                email: {
                    required: true,
                    email: true,
                },
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!"),
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты",
                },
            },
        });
    }

    validateForms("#consultation-form");
    validateForms("#consultation form");
    validateForms("#order form");

    // input mask

    $("input[name=phone]").mask("+38 (999) 999-99-99");

    // sending letters from the site

    $("form").submit(function (e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        })
            .done(function () {
                $(this).find("input").val("");

                $("#consultation, #order").fadeOut();
                $(".overlay, #thanks").fadeIn("slow");

                $("form").trigger("reset");
            });
        return false;
    });
});
