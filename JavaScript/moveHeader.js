// @ts-nocheck

let mainHeaderContainer = document.querySelector(".main-header-container");
let menu = document.querySelector(".menu");
let slideTips = document.querySelector(".slide-tips");
let backToTop = document.querySelector(".back-to-top");
let sectionNav = document.querySelector(".section-nav");
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
    // 滾動850像素時header出現、並且導覽列、回到上方按鈕彈出
    if (scrollTop >= 850 && !isOvertake850) {
        // console.log("超過了");
        isOvertake850 = true;
        mainHeaderContainer.classList.add("return-to-position");
        menu.classList.add("return-to-position");
        backToTop.classList.add("back-to-top-display");
        sectionNav.classList.add("section-nav-display");
    } else if (scrollTop < 850 && isOvertake850) {
        // console.log("回到頂部");
        isOvertake850 = false;
        mainHeaderContainer.classList.remove("return-to-position");
        menu.classList.remove("return-to-position");
        backToTop.classList.remove("back-to-top-display");
        sectionNav.classList.remove("section-nav-display");
    }
};
const handleScrollBinding = () => {
    if (window.innerWidth < 1024) {
        window.removeEventListener("scroll", moveHeader);
    } else {
        window.addEventListener("scroll", moveHeader);
    }
};
handleScrollBinding();
window.addEventListener("resize", handleScrollBinding);
// window.removeEventListener("scroll", moveHeader);
// window.addEventListener("scroll", moveHeader);

// ↓左側導覽列區塊
document.querySelectorAll(".section-nav > a").forEach((item) => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        // 直接從 <a> 內找到 <span>，取得 data-id
        const span = item.querySelector("span");
        if (!span) return;
        const sectionId = span.getAttribute("data-id");
        let targetSection = document.getElementById(sectionId);
        if (targetSection) {
            const headerOffset = 59.59; // header 高度
            const elementPosition = targetSection.getBoundingClientRect().top; // 取得目標區塊相對於"目前視窗頂部"的距離
            const offsetPosition =
                elementPosition + window.pageYOffset - headerOffset;
            // window.pageYOffset 是從整個頁面頂部開始計算的距離（也就是目前捲動多少），扣掉header高度後加上elementPosition，就是需要跳轉的距離
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    });
});

// ↑左側導覽列區塊
