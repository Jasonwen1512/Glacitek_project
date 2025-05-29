// @ts-nocheck

// moveHeader github更改測試
let mainHeaderContainer = document.querySelector(".main-header-container");
let menu = document.querySelector(".menu");
let slideTips = document.querySelector(".slide-tips");
let isOvertake850 = false;
let isOvertake300 = false;
let isOvertake400 = false;
const moveHeader = () => {
    let scrollTop =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop;
    // 滾動300像素時先改變顏色（包括.slide-tips），定位往上自身的100%，不加動畫
    if (scrollTop >= 300 && !isOvertake300) {
        isOvertake300 = true;
        mainHeaderContainer.classList.add("header-position-fixed");
        menu.classList.add("header-position-fixed");
        slideTips.classList.add("change-slide-tips-color");
    } else if (scrollTop < 300 && isOvertake300) {
        isOvertake300 = false;
        mainHeaderContainer.classList.remove("header-position-fixed");
        menu.classList.remove("header-position-fixed");
        slideTips.classList.remove("change-slide-tips-color");
    }
    // 滾動350像素時加入動畫，若直接在300像素時加動畫會看到absolute與fixed互換的瞬間
    if (scrollTop >= 400 && !isOvertake400) {
        isOvertake400 = true;
        mainHeaderContainer.classList.add("add-transition");
        menu.classList.add("add-transition");
    } else if (scrollTop < 400 && isOvertake400) {
        isOvertake400 = false;
        mainHeaderContainer.classList.remove("add-transition");
        menu.classList.remove("add-transition");
    }
    // 滾動900像素時header出現
    if (scrollTop >= 850 && !isOvertake850) {
        // console.log("超過了");
        isOvertake850 = true;
        mainHeaderContainer.classList.add("return-to-position");
        menu.classList.add("return-to-position");
    } else if (scrollTop < 850 && isOvertake850) {
        // console.log("回到頂部");
        isOvertake850 = false;
        mainHeaderContainer.classList.remove("return-to-position");
        menu.classList.remove("return-to-position");
    }
};
window.removeEventListener("scroll", moveHeader);
window.addEventListener("scroll", moveHeader);
