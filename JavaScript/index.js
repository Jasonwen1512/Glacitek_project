// @ts-nocheck

// ↓產品區塊
let productButtonLeft = document.querySelector(".product-button-left");
let productButtonRight = document.querySelector(".product-button-right");
let productButtonLeftPath = document.querySelector(".product-button-left path");
let productButtonRightPath = document.querySelector(
    ".product-button-right path"
);
let exhibitArea = document.querySelector(".exhibit-area");
let card = document.querySelector(".card");

let currentLeft = 0; // 目前移動的距離
let Movefrequency = 0; // 移動的格數，目前有8個分類
const handleLeftClick = () => {
    if (exhibitArea && card) {
        // 產品左側按鈕可按
        if (Movefrequency > 0) {
            console.log(1);
            let moveWidth = card.offsetWidth + 10;
            currentLeft += moveWidth;
            exhibitArea.style.left = `${currentLeft}px`;

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
            if (Movefrequency === 1) {
                // productButtonLeftPath.style.fill = "#b8bcbe";
                // productButtonLeft.style.cursor = "default";
                productButtonLeft.classList.remove("btn-ok");
                productButtonLeft.classList.remove("btn-disabled");
                productButtonLeft.classList.add("btn-disabled");
            }
            Movefrequency--;
        }
    }
};
const handleRightClick = () => {
    if (exhibitArea && card) {
        // 產品右側按鈕可按
        if (Movefrequency < 5) {
            let moveWidth = card.offsetWidth + 10;
            currentLeft -= moveWidth;
            exhibitArea.style.left = `${currentLeft}px`;

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
            if (Movefrequency === 4) {
                // productButtonRightPath.style.fill = "#b8bcbe";
                // productButtonRight.style.cursor = "default";
                productButtonRight.classList.remove("btn-ok");
                productButtonRight.classList.remove("btn-disabled");
                productButtonRight.classList.add("btn-disabled");
            }
            Movefrequency++;
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

productButtonLeft?.addEventListener("click", handleLeftClick);
productButtonRight?.addEventListener("click", handleRightClick);

productButtonRight?.removeEventListener("click", handleRightClick);
productButtonRight?.addEventListener("click", handleRightClick);
// ↑產品區塊

// ↓新聞區塊

// ↑新聞區塊

// ↓使用者分享區塊

// ↑使用者分享區塊
