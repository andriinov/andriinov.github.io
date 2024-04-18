$(document).ready(function () {
    $(".js-header-menu").on("click", function (e) {
        e.preventDefault();
        $(this).toggleClass("active");
        $(".b-header-wrapper").toggleClass("b-header-wrapper--active");
        $("body").toggleClass("is-scroll-disabled");
    });

    $(".js-header-search-button").on("click", function (e) {
        e.preventDefault();
        $(".js-header-search").toggleClass("b-header-search--active");
        $(".b-header-search__item").attr("aria-expanded", true);
        $(".b-header-search__button").prop("disabled", true);
    });

    $(".b-homepage-slider").slick({
        infinite: true,
        dots: true,
        arrows: true,
        autoplay: true,
        nextArrow:
            '<div class="slick-arrow slick-arrow--right icon-angle-right"></div>',
        prevArrow:
            '<div class="slick-arrow slick-arrow--left icon-angle-left"></div>',
    });

    $(".b-article-slider").slick({
        infinite: true,
        dots: true,
        arrows: true,
        mobileFirst: true,
        nextArrow:
            '<div class="slick-arrow slick-arrow--right icon-angle-right"></div>',
        prevArrow:
            '<div class="slick-arrow slick-arrow--left icon-angle-left"></div>',
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
        ],
    });

    const closeSearch = function () {
        $(".js-header-search").removeClass("b-header-search--active");
        $(".b-header-search__item").attr("aria-expanded", false);
    };

    $("body").on("click", function (e) {
        if (e.target && !e.target.closest(".b-header-search")) {
            closeSearch();
        }
    });

    $("body").on("keydown", function (e) {
        if ((e.keyCode || e.which) == 27) {
            closeSearch();
        }
    });

    $(".b-header-search__input").on("input", function () {
        $(".b-header-search__button").prop(
            "disabled",
            $(this).val().length >= 3 ? false : true
        );
    });

    $(".js-button-toggle").on("click", function (e) {
        e.preventDefault();

        $(this)
            .closest(".js-button-toggle-parent")
            .find(".js-button-toggle")
            .removeClass("b-donate-form__button--active");
        $(this).addClass("b-donate-form__button--active");
    });

    $(".b-donate-form .js-support-button").on("click", function (e) {
        e.preventDefault();

        $(this)
            .closest(".b-support-nav")
            .find(".js-support-button")
            .removeClass("b-support-list__button--active");
        $(this).addClass("b-support-list__button--active");
    });

    $(".b-article-report-slider-for").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        draggable: false,
        asNavFor: ".b-article-report-slider-nav",
    });

    $(".b-article-report-slider-nav").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: ".b-article-report-slider-for",
        dots: true,
        mobileFirst: true,
        arrows: true,
        focusOnSelect: true,
        nextArrow:
            '<div class="slick-arrow slick-arrow--right icon-angle-right"></div>',
        prevArrow:
            '<div class="slick-arrow slick-arrow--left icon-angle-left"></div>',
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                },
            },
        ],
    });

    $(".js-copy-link").on("click", function (e) {
        e.preventDefault();
        var getLink = $(this).text();
        copyToClipboard(getLink);
    });

    $(".b-about-block__wrapper--team .b-card").on("click", function (e) {
        e.preventDefault();

        if (
            $(this).find(".b-popup").is(".b-popup--open") &&
            e.target &&
            !e.target.closest(".b-popup__content")
        ) {
            closeModal();
        } else {
            $("body").addClass("is-scroll-disabled");
            $(this).find(".b-popup").addClass("b-popup--open");
        }
    });

    $(".js-close-popup").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
    });

    $(".b-about-nav__link").on("click", function (e) {
        e.preventDefault();

        $("html, body").animate(
            {
                scrollTop: $($(this).attr("href")).offset().top,
            },
            1000
        );
    });
});

function closeModal() {
    $("body").removeClass("is-scroll-disabled");
    $(".b-popup").removeClass("b-popup--open");
}

function copyToClipboard(string) {
    let textarea;
    let result;

    try {
        textarea = document.createElement("textarea");
        textarea.setAttribute("readonly", true);
        textarea.setAttribute("contenteditable", true);
        textarea.style.position = "fixed"; // prevent scroll from jumping to the bottom when focus is set.
        textarea.value = string;

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        const range = document.createRange();
        range.selectNodeContents(textarea);

        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);

        textarea.setSelectionRange(0, textarea.value.length);
        result = document.execCommand("copy");
    } catch (err) {
        console.error(err);
        result = null;
    } finally {
        document.body.removeChild(textarea);
    }

    if (!result) {
        const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
        const copyHotkey = isMac ? "⌘C" : "CTRL+C";
        result = prompt(`Press ${copyHotkey}`, string); // eslint-disable-line no-alert
        if (!result) {
            return false;
        }
    }
    return true;
}
