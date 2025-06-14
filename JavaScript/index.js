// @ts-nocheck

// ↓產品區塊
let productButtonLeft = document.querySelector(".product-button-left");
let productButtonRight = document.querySelector(".product-button-right");
let productButtonLeftPath = document.querySelector(".product-button-left path");
let productButtonRightPath = document.querySelector(
    ".product-button-right path"
);
let productItem = document.querySelector(".product-item");

// 欲移動的產品區塊
let exhibitArea = document.querySelector(".exhibit-area");

let card = document.querySelector(".card");

let productTranslateX = 0; // 用來記錄 translateX 的位移量（距離）
let productMovefrequency = 0; // 移動的格數
let productAmount = 8; // 目前有8個產品分類（card）

let clickable = true;

const updateProductTransform = (productTranslateX) => {
    exhibitArea.style.transform = `translateX(${productTranslateX}px)`;
};
const productHandleLeftClick = () => {
    if (clickable) {
        clickable = false;
        // 產品左側按鈕可按
        const isMobile = window.innerWidth <= 1024;
        // 如果用的是offsetWidth，回傳的是整數會有誤差
        // 用的是getBoundingClientRect().width回傳的則是浮點數
        let moveWidth = card.getBoundingClientRect().width;
        let lastChild = exhibitArea.lastElementChild;
        if (isMobile <= 1024) {
            // console.log("往右滑");
            // 此時matrix是矩陣
            let matrix = getComputedStyle(exhibitArea).transform;
            // 抓取translateX（初始為負數）and 滑動一次會越過一個gap，所以+10
            let originalTranslateX = new DOMMatrixReadOnly(matrix).m41 + 10;
            // 先取消動畫，把卡片歸位（做一次反向滑動的意思）
            exhibitArea.style.transition = "none";
            // originalTranslateX -= moveWidth;
            updateProductTransform(originalTranslateX - moveWidth);
            // 再插入節點
            exhibitArea.insertBefore(lastChild, exhibitArea.firstElementChild);
            // 然後在極短時間內恢復動畫，移動卡片
            setTimeout(() => {
                exhibitArea.style.transition = "transform 0.3s";
                updateProductTransform(originalTranslateX - 10);
            }, 20);
        } else {
            moveWidth += 10;
            exhibitArea.style.transition = "none";
            updateProductTransform(originalTranslateX - moveWidth);
            exhibitArea.insertBefore(lastChild, exhibitArea.firstElementChild);
            // productTranslateX += moveWidth;
            setTimeout(() => {
                exhibitArea.style.transition = "transform 0.3s";
                updateProductTransform(productTranslateX);
            }, 20);
        }

        productButtonLeft.classList.remove("btn-ok");
        productButtonRight.classList.remove("btn-ok");
        productButtonLeft.classList.add("btn-ok");
        productButtonRight.classList.add("btn-ok");
        productButtonLeft.classList.remove("btn-disabled");
        productButtonRight.classList.remove("btn-disabled");
        // 左邊按鈕不能再按了
        // if (productMovefrequency === 1) {
        //     productButtonLeft.classList.remove("btn-ok");
        //     productButtonLeft.classList.remove("btn-disabled");
        //     productButtonLeft.classList.add("btn-disabled");
        // }
        // productMovefrequency--;
        setTimeout(() => {
            clickable = true;
        }, 350);
    }
};
const productHandleRightClick = () => {
    if (clickable) {
        clickable = false;
        // 產品右側按鈕可按
        const isMobile = window.innerWidth <= 1024;
        let moveWidth = card.getBoundingClientRect().width;
        let firstChild = exhibitArea.firstElementChild;
        if (isMobile <= 1024) {
            // console.log("往左滑");
            // 此時matrix是矩陣
            let matrix = getComputedStyle(exhibitArea).transform;
            // 抓取translateX（初始為負數）and 滑動一次會越過一個gap，所以+10
            let originalTranslateX = new DOMMatrixReadOnly(matrix).m41 - 10;
            // 先取消動畫
            exhibitArea.style.transition = "none";
            // originalTranslateX -= moveWidth;
            updateProductTransform(originalTranslateX + moveWidth);
            // 再插入節點
            exhibitArea.insertBefore(firstChild, null);
            // 然後在極短時間內加回動畫;
            setTimeout(() => {
                exhibitArea.style.transition = "transform 0.3s";
                updateProductTransform(originalTranslateX + 10);
            }, 20);
        } else {
            moveWidth += 10;
            exhibitArea.style.transition = "none";
            updateProductTransform(originalTranslateX - moveWidth);
            exhibitArea.insertBefore(firstChild, null);
            // productTranslateX -= moveWidth;
            setTimeout(() => {
                exhibitArea.style.transition = "transform 0.3s";
                updateProductTransform(productTranslateX);
            }, 20);
        }

        productButtonLeft.classList.remove("btn-ok");
        productButtonRight.classList.remove("btn-ok");
        productButtonLeft.classList.add("btn-ok");
        productButtonRight.classList.add("btn-ok");
        productButtonLeft.classList.remove("btn-disabled");
        productButtonRight.classList.remove("btn-disabled");

        // 右邊按鈕不能再按了
        // if (productMovefrequency === productAmount - 4) {
        //     productButtonRight.classList.remove("btn-ok");
        //     productButtonRight.classList.remove("btn-disabled");
        //     productButtonRight.classList.add("btn-disabled");
        // }
        // productMovefrequency++;
        setTimeout(() => {
            clickable = true;
        }, 350);
    }
};

let startX = 0;
let startY = 0;
const judgeSlideDirection_start = (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
};
const SLIDE_THRESHOLD = 20;
const judgeSlideDirection_end = (e) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = endX - startX;
    const diffY = endY - startY;
    if (
        Math.abs(diffX) > Math.abs(diffY) &&
        Math.abs(diffX) > SLIDE_THRESHOLD
    ) {
        e.preventDefault();
        const isProductArea = e.target.closest("#product-area");
        const isNewsArea = e.target.closest("#news-area");
        if (diffX > 0) {
            // console.log("向右滑");
            if (isProductArea) {
                productHandleLeftClick();
            } else if (isNewsArea) {
                newstHandleLeftClick();
            }
        } else {
            // console.log("向左滑");
            if (isProductArea) {
                productHandleRightClick();
            } else if (isNewsArea) {
                newstHandleRightClick();
            }
        }
    }
};

exhibitArea?.removeEventListener("touchstart", judgeSlideDirection_start);
exhibitArea?.addEventListener("touchstart", judgeSlideDirection_start);
exhibitArea?.removeEventListener("touchend", judgeSlideDirection_end);
exhibitArea?.addEventListener("touchend", judgeSlideDirection_end);

productItem?.removeEventListener("touchstart", judgeSlideDirection_start);
productItem?.addEventListener("touchstart", judgeSlideDirection_start);
productItem?.removeEventListener("touchend", judgeSlideDirection_end);
productItem?.addEventListener("touchend", judgeSlideDirection_end);
productItem?.addEventListener(
    "touchmove",
    (e) => {
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;
        // 阻止預設的上下滾動
        if (Math.abs(dx) > Math.abs(dy)) {
            e.preventDefault();
        }
    },
    { passive: false }
);

// ?. 代表先判斷前者有沒有存在，存在則繼續，不存在則直接跳過
// 下面程式碼相當於
// if(productButtonLeft){
//     productButtonLeft.addEventListener("click", function () {
//
//     console.log("左側按鈕被點擊");
//   });
// }

productButtonLeft?.removeEventListener("click", productHandleLeftClick);
productButtonLeft?.addEventListener("click", productHandleLeftClick);

productButtonRight?.removeEventListener("click", productHandleRightClick);
productButtonRight?.addEventListener("click", productHandleRightClick);
// ↑產品區塊

// ↓為每張產品卡片加上事件
let exhibitAreaCard = exhibitArea.querySelectorAll(".card");
// console.log(exhibitAreaCard);
exhibitAreaCard.forEach((card) => {
    card.addEventListener("click", function (e) {
        let productName = this.querySelector(".card-img img").alt;
        // console.log(productName);
        sessionStorage.setItem("gotoPage", productName);
        window.location.href = "../HTML/product.html";
    });
});

// ↑為每張產品卡片加上事件，用於跳轉

// ↓新聞區塊
let newsButtonLeft = document.querySelector(".news-button-left");
let newsButtonRight = document.querySelector(".news-button-right");
let newsButtonLeftPath = document.querySelector(".news-button-left path");
let newsButtonRightPath = document.querySelector(".news-button-right path");
// 欲移動的新聞區塊
let newsItemW90 = document.querySelector(".news-item-w90");
let newsItemCard = document.querySelector(".news-item-card");
let newsAreaItem = document.querySelector(".news-area-item");

let newsTranslateX = 0; // 目前移動距離
let newsMovefrequency = 0; // 移動的格數
let newsAmount = 3; //目前有3塊新聞項目（news-area-item）

const updateNewsTransform = () => {
    newsItemW90.style.transform = `translateX(${newsTranslateX}px)`;
};
const newstHandleLeftClick = () => {
    if (newsItemW90 && newsItemCard) {
        // 新聞左側按鈕可按
        if (newsMovefrequency > 0) {
            // 抓出元素寬度與 margin-right 的實際數值
            const cardWidth = newsItemCard.getBoundingClientRect().width;
            const style = window.getComputedStyle(newsAreaItem);
            const marginRight = parseFloat(style.marginRight); // 例如 "72px" -> 72
            // console.log(marginRight);

            const moveWidth = cardWidth + marginRight;

            newsTranslateX += moveWidth;
            updateNewsTransform();

            // newsItemW90.style.left = `${newsCurrentLeft}px`;
            newsButtonLeft.classList.remove("btn-ok");
            newsButtonRight.classList.remove("btn-ok");
            newsButtonLeft.classList.add("btn-ok");
            newsButtonRight.classList.add("btn-ok");
            newsButtonLeft.classList.remove("btn-disabled");
            newsButtonRight.classList.remove("btn-disabled");
            // 新聞左邊按鈕不能再按了
            if (newsMovefrequency === 1) {
                newsButtonLeft.classList.remove("btn-ok");
                newsButtonLeft.classList.remove("btn-disabled");
                newsButtonLeft.classList.add("btn-disabled");
            }
            newsMovefrequency--;
        }
    }
};
const newstHandleRightClick = () => {
    if (newsItemW90 && newsItemCard) {
        // 新聞右側按鈕可按
        if (newsMovefrequency < newsAmount - 1) {
            // 抓出元素寬度與 margin-right 的實際數值
            const cardWidth = newsItemCard.getBoundingClientRect().width;
            const style = window.getComputedStyle(newsAreaItem);
            const marginRight = parseFloat(style.marginRight); // 例如 "72px" -> 72
            // console.log(marginRight);

            const moveWidth = cardWidth + marginRight;

            newsTranslateX -= moveWidth;
            updateNewsTransform();

            // newsItemW90.style.left = `${newsCurrentLeft}px`;
            newsButtonLeft.classList.remove("btn-ok");
            newsButtonRight.classList.remove("btn-ok");
            newsButtonLeft.classList.add("btn-ok");
            newsButtonRight.classList.add("btn-ok");
            newsButtonLeft.classList.remove("btn-disabled");
            newsButtonRight.classList.remove("btn-disabled");
            // 新聞右邊按鈕不能再按了
            if (newsMovefrequency === newsAmount - 2) {
                newsButtonRight.classList.remove("btn-ok");
                newsButtonRight.classList.remove("btn-disabled");
                newsButtonRight.classList.add("btn-disabled");
            }
            newsMovefrequency++;
        }
    }
};

newsButtonLeft?.removeEventListener("click", newstHandleLeftClick);
newsButtonLeft?.addEventListener("click", newstHandleLeftClick);
newsButtonRight?.removeEventListener("click", newstHandleRightClick);
newsButtonRight?.addEventListener("click", newstHandleRightClick);

newsItemW90?.removeEventListener("touchstart", judgeSlideDirection_start);
newsItemW90?.addEventListener("touchstart", judgeSlideDirection_start);
newsItemW90?.removeEventListener("touchend", judgeSlideDirection_end);
newsItemW90?.addEventListener("touchend", judgeSlideDirection_end);
newsItemW90?.addEventListener(
    "touchmove",
    (e) => {
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;
        // 阻止預設的上下滾動
        if (Math.abs(dx) > Math.abs(dy)) {
            e.preventDefault();
        }
    },
    { passive: false }
);

// ↑新聞區塊

// ↓使用者分享區塊
let userShareContent = document.querySelector(".user-share-content");
let userShareList = document.querySelector(".user-share-list");
let userShareListA = document.querySelectorAll(".user-share-list a");
let userShareListASvgCircle = document.querySelectorAll(
    ".user-share-list a svg circle"
);
let count = 1; // 計數器，從1開始，因為第一個是預設顯示的
const totalSlides = userShareListA.length; // 總頁數（不包含複製頁）
const scrollUserShareContent = (e, index) => {
    if (e) e.preventDefault();
    // console.log(count);

    count = index; // 重置計數器，把count設置為手動點擊的index
    // 移除 transition 以進行瞬間跳轉（只有在複製頁時使用）
    userShareContent.classList.remove("remove-transition");
    userShareContent.style.transform = `translateX(-${index * 100}%)`;
    // 小圓點更新
    userShareListASvgCircle.forEach((circle, i) => {
        circle.style.fill = i === index % totalSlides ? "#004A7C" : "#D9D9D9";
    });
    if (index === totalSlides) {
        // console.log("這是第一組的copy");
        userShareListASvgCircle[0].style.fill = "#004A7C";
        setTimeout(() => {
            userShareContent.classList.add("remove-transition");
            userShareContent.style.transform = "translateX(0%)"; // 回到第一組
            // console.log(userShareContent.style);
        }, 500); // 短時間（500毫秒）内取消動畫，從"第一組的copy"跳到"真的第一組"達成無縫動畫的效果
    }
};

let autoScrollUserShareContent = setInterval(() => {
    scrollUserShareContent(null, count);
    count++;
    // +1 是為了讓圖片輪播到最後一組（第一組的copy）
    if (count > totalSlides) {
        count = 1; // 重置計數器，回到第一組
    }
}, 2500); // 每2.5秒輪播一次
// clearInterval(autoScrollUserShareContent);
// 在頁面跳轉時清掉 autoScrollUserShareContent
window.addEventListener("beforeunload", () => {
    clearInterval(autoScrollUserShareContent);
});
// ↑使用者分享區塊

// ↓滑動螢幕讓header、垂直導覽列、back-to-top按鈕顯現
let sectionNavTipArea = document.querySelectorAll(".section-nav .tip-area");
let sectionNavSpan = document.querySelectorAll(".section-nav span");

const pageScroll = () => {
    // console.log("screenwidth:", window.innerWidth);
    let breakpoint1 = 850; // 產品專區
    let breakpoint2 = 1600; // 最新資訊
    let breakpoint3 = 2435; // 使用者心得分享
    // 這是1100px之下的標準
    if (window.innerWidth <= 1100) {
        breakpoint1 = 630;
        breakpoint2 = 1102;
        breakpoint3 = 1616;
        // 這是1280px之下的標準
    } else if (window.innerWidth <= 1280) {
        breakpoint1 = 750;
        breakpoint2 = 1266;
        breakpoint3 = 1866;
        // 這是1540px之下的標準
    } else if (window.innerWidth <= 1540) {
        breakpoint1 = 850;
        breakpoint2 = 1420;
        breakpoint3 = 2140;
    }
    let scrollTop =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop;
    let totalHeight = document.documentElement.scrollHeight;
    // 用百分比計算，判斷頁面大致滾動到哪裡
    // 850px 1600px 2435px <= 這是1920px之下的標準
    let triggerPoints = {
        section1: (breakpoint1 / totalHeight) * 100, // 產品專區
        section2: (breakpoint2 / totalHeight) * 100, // 最新資訊
        section3: (breakpoint3 / totalHeight) * 100, // 使用者心得分享
    };
    let scrollPrecent = (scrollTop / totalHeight) * 100;
    // console.log(scrollTop, window.innerHeight, totalHeight, scrollPrecent);
    // console.log(triggerPoints);
    // console.log("scrollTop:", scrollTop, "scrollPrecent:", scrollPrecent);

    // 滑動超過2500時，當成到達"使用者心得分享"區塊
    if (scrollPrecent >= triggerPoints.section3) {
        sectionNavTipArea[0].classList.remove("display-bgc");
        sectionNavSpan[0].classList.remove("op1");
        sectionNavTipArea[1].classList.remove("display-bgc");
        sectionNavSpan[1].classList.remove("op1");
        sectionNavTipArea[2].classList.add("display-bgc");
        sectionNavSpan[2].classList.add("op1");
        // 滑動超過1600時，當成到達"最新資訊"區塊
    } else if (scrollPrecent >= triggerPoints.section2) {
        sectionNavTipArea[0].classList.remove("display-bgc");
        sectionNavSpan[0].classList.remove("op1");
        sectionNavTipArea[1].classList.add("display-bgc");
        sectionNavSpan[1].classList.add("op1");
        sectionNavTipArea[2].classList.remove("display-bgc");
        sectionNavSpan[2].classList.remove("op1");
        // 滑動超過850時，當成到達"產品專區"區塊
    } else if (scrollPrecent >= triggerPoints.section1) {
        sectionNavTipArea[0].classList.add("display-bgc");
        sectionNavSpan[0].classList.add("op1");
        sectionNavTipArea[1].classList.remove("display-bgc");
        sectionNavSpan[1].classList.remove("op1");
        sectionNavTipArea[2].classList.remove("display-bgc");
        sectionNavSpan[2].classList.remove("op1");
        // 滑動未超過850時，當成在頂部
        // 皆不顯示，理論上此時導覽列會收回去會用不到這部分
    } else {
        sectionNavTipArea[0].classList.remove("display-bgc");
        sectionNavSpan[0].classList.remove("op1");
        sectionNavTipArea[1].classList.remove("display-bgc");
        sectionNavSpan[1].classList.remove("op1");
        sectionNavTipArea[2].classList.remove("display-bgc");
        sectionNavSpan[2].classList.remove("op1");
    }
    // console.log(sectionNavTipArea, sectionNavSpan);
};
// 850 1600 2500
window.removeEventListener("scroll", pageScroll);
window.addEventListener("scroll", pageScroll);
// ↑滑動螢幕讓header、垂直導覽列、back-to-top按鈕顯現

let sloganContent = document.querySelector(".slogan-content");
let tipTriangle = document.querySelector(".tip-triangle");
window.onload = () => {
    console.log("加載完成");
    sloganContent.classList.add("slogan-content-display");
    tipTriangle.classList.add("tip-triangle-display");
};
