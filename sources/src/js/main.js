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

    var queuedImagesArray = Array.from(files).filter((f) =>
        f.type.startsWith("image/")
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

document.addEventListener("DOMContentLoaded", () => {
    initFileRead();
    initFileReadByDrop();
});
