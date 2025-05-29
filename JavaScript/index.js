// @ts-nocheck

// ↓產品區塊
let productButtonLeft = document.querySelector(".product-button-left");
let productButtonRight = document.querySelector(".product-button-right");
let productButtonLeftPath = document.querySelector(".product-button-left path");
let productButtonRightPath = document.querySelector(
    ".product-button-right path"
);
// 欲移動的產品區塊
let exhibitArea = document.querySelector(".exhibit-area");
let card = document.querySelector(".card");

let productCurrentLeft = 0; // 目前移動的距離
let productMovefrequency = 0; // 移動的格數
let productAmount = 8; // 目前有8個產品分類（card）
const productHandleLeftClick = () => {
    if (exhibitArea && card) {
        // 產品左側按鈕可按
        if (productMovefrequency > 0) {
            // console.log(1);
            let moveWidth = card.offsetWidth + 10;
            productCurrentLeft += moveWidth;
            exhibitArea.style.left = `${productCurrentLeft}px`;

            // productButtonLeftPath.style.fill = "#3388BB";
            // productButtonRightPath.style.fill = "#3388BB";
            // productButtonLeft.style.cursor = "pointer";
            // productButtonRight.style.cursor = "pointer";

            productButtonLeft.classList.remove("btn-ok");
            productButtonRight.classList.remove("btn-ok");
            productButtonLeft.classList.add("btn-ok");
            productButtonRight.classList.add("btn-ok");
            productButtonLeft.classList.remove("btn-disabled");
            productButtonRight.classList.remove("btn-disabled");
            // 左邊按鈕不能再按了
            if (productMovefrequency === 1) {
                // productButtonLeftPath.style.fill = "#b8bcbe";
                // productButtonLeft.style.cursor = "default";
                productButtonLeft.classList.remove("btn-ok");
                productButtonLeft.classList.remove("btn-disabled");
                productButtonLeft.classList.add("btn-disabled");
            }
            productMovefrequency--;
        }
    }
};
const productHandleRightClick = () => {
    if (exhibitArea && card) {
        // 產品右側按鈕可按
        if (productMovefrequency < productAmount - 3) {
            let moveWidth = card.offsetWidth + 10;
            productCurrentLeft -= moveWidth;
            exhibitArea.style.left = `${productCurrentLeft}px`;

            // productButtonLeftPath.style.fill = "#3388BB";
            // productButtonRightPath.style.fill = "#3388BB";
            // productButtonLeft.style.cursor = "pointer";
            // productButtonRight.style.cursor = "pointer";

            productButtonLeft.classList.remove("btn-ok");
            productButtonRight.classList.remove("btn-ok");
            productButtonLeft.classList.add("btn-ok");
            productButtonRight.classList.add("btn-ok");
            productButtonLeft.classList.remove("btn-disabled");
            productButtonRight.classList.remove("btn-disabled");

            // 右邊按鈕不能再按了
            if (productMovefrequency === productAmount - 4) {
                // productButtonRightPath.style.fill = "#b8bcbe";
                // productButtonRight.style.cursor = "default";
                productButtonRight.classList.remove("btn-ok");
                productButtonRight.classList.remove("btn-disabled");
                productButtonRight.classList.add("btn-disabled");
            }
            productMovefrequency++;
        }
    }
};

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

// ↓新聞區塊
let newsButtonLeft = document.querySelector(".news-button-left");
let newsButtonRight = document.querySelector(".news-button-right");
let newsButtonLeftPath = document.querySelector(".news-button-left path");
let newsButtonRightPath = document.querySelector(".news-button-right path");
// 欲移動的新聞區塊
let newsItemW90 = document.querySelector(".news-item-w90");
let newsItemCard = document.querySelector(".news-item-card");

let newsCurrentLeft = 0; // 目前移動的距離
let newsMovefrequency = 0; // 移動的格數
let newsAmount = 3; //目前有3塊新聞項目（news-area-item）

const newstHandleLeftClick = () => {
    if (newsItemW90 && newsItemCard) {
        // 新聞左側按鈕可按
        if (newsMovefrequency > 0) {
            let moveWidth = newsItemCard.offsetWidth + 120;
            newsCurrentLeft += moveWidth;
            newsItemW90.style.left = `${newsCurrentLeft}px`;
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
            console.log(newsMovefrequency);

            let moveWidth = newsItemCard.offsetWidth + 120;
            newsCurrentLeft -= moveWidth;
            newsItemW90.style.left = `${newsCurrentLeft}px`;
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
// ↑新聞區塊

// ↓使用者分享區塊

// ↑使用者分享區塊
