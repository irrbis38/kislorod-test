// ========== INIT FILES READ

// check images amount

var checkImagesAmount = () => {
    var container = document.querySelector(".file");

    if (!container) return;

    if (container.children.length > 1) {
        container.classList.add("file-non-empty");
    } else {
        container.classList.remove("file-non-empty");
    }
};

var handleRemoveImage = (e) => {
    var deleting_item = e.target.closest(".file__img");
    deleting_item.remove();
    checkImagesAmount();
};

// init files read

var handleAddFiles = (files, label) => {
    if (!files.length) return;

    var queuedImagesArray = Array.from(files).filter(
        (f) => f.type.startsWith("image/") && f.size < 1 * 1024 * 1024
    );

    queuedImagesArray.forEach((image) => {
        // create image item and add className
        var elem = document.createElement("DIV");
        elem.classList.add("file__img");

        // add innerHTML to image item
        elem.innerHTML = `<img src="${URL.createObjectURL(
            image
        )}" alt="фото отзыва"><button class="file__remove" type="button" aria-label="Удалить фото"></button>`;

        // add image item to the DOM
        label.parentElement.append(elem);

        // add listener to remove_btn
        elem.querySelector(".file__remove").addEventListener(
            "click",
            handleRemoveImage
        );

        checkImagesAmount();
    });
};

// add images by click

var initFileRead = () => {
    var file_label = document.querySelector(".file__label");
    var file_input = document.querySelector(".file__input");

    if (!file_label || !file_input) return;

    file_input.addEventListener("change", () =>
        handleAddFiles(file_input.files, file_label)
    );
};

// add images by drag and drop
var initFileReadByDrop = () => {
    var drop_container = document.querySelector(".file");

    if (!drop_container) return;

    var file_input = document.querySelector(".file__input");
    var label = document.querySelector(".file__label");

    drop_container.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    drop_container.addEventListener("dragenter", (e) => {
        e.preventDefault();
    });

    // when file is inside drag area
    drop_container.addEventListener("dragover", (event) => {
        event.preventDefault();
        drop_container.classList.add("active");
    });
    // when file leave the drag area
    drop_container.addEventListener("dragleave", () => {
        drop_container.classList.remove("active");
    });

    var handleDrop = (e) => {
        e.preventDefault();

        file_input.files = e.dataTransfer.files;

        drop_container.classList.remove("active");

        handleAddFiles(file_input.files, label);
    };

    drop_container.addEventListener("drop", handleDrop);
};

// ========== FORM VALIDATION

var initInputCheck = (formElements) => {
    formElements.forEach((el) => {
        el.addEventListener("input", () => {
            el.classList.remove("error");
        });
    });
};

var doFormValidation = (formElements, emailInputs, phoneInputs) => {
    var requiredElements = formElements.filter((el) => {
        return el.required;
    });

    requiredElements.length > 0 &&
        requiredElements.forEach((el) => {
            if (!el.value) {
                el.classList.add("error");
            } else {
                el.classList.remove("error");
            }
        });

    emailInputs.length > 0 &&
        emailInputs.forEach((el) => {
            // return if empty
            if (!el.value) return;

            var re =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (!re.test(String(el.value).toLowerCase())) {
                el.classList.add("error");
            } else {
                el.classList.remove("error");
            }
        });

    phoneInputs.length > 0 &&
        phoneInputs.forEach((el) => {
            // return if empty
            if (!el.value) return;

            if (el.value.length === 16) {
                el.classList.remove("error");
            } else {
                el.classList.add("error");
            }
        });
};

var checkErorrs = (formElements) => {
    var isErrorConsist = formElements.some((el) =>
        el.classList.contains("error")
    );
    return !isErrorConsist;
};

var initFormValidation = () => {
    var feedback = document.querySelector(".feedback");
    var form = document.querySelector(".feedback__form");

    if (!feedback || !form) return;

    var inputs = form.querySelectorAll(".feedback__input");
    var t_areas = form.querySelectorAll(".feedback__textarea");

    var formElements = [...inputs, ...t_areas];

    formElements.length > 0 && initInputCheck(formElements);

    var emailInputs = formElements.filter((el) => el.type === "email");

    var phoneInputs = formElements.filter((el) => el.name === "user_phone");

    if (phoneInputs.length > 0) {
        // init mask inputs
        const { MaskInput } = Maska;
        const maskIinput = new MaskInput("[data-maska]");
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        doFormValidation(formElements, emailInputs, phoneInputs);

        var checkResult = checkErorrs(formElements);

        if (checkResult) {
            form.reset();

            feedback.classList.add("success");
        }
    });
};

document.addEventListener("DOMContentLoaded", () => {
    initFileRead();
    initFileReadByDrop();
    initFormValidation();
});
