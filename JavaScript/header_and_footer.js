// @ts-nocheck

// 負責在載入頁面時讀取購物車內容
{
    const cartContents = JSON.parse(
        sessionStorage.getItem("cartContents") || "[]"
    );
    let totalAmount = 0;

    cartContents.forEach((element) => {
        totalAmount += element.amount;
    });
    console.log(`購物車商品數量：${totalAmount}`);
    const cardNode = document.querySelector(".cart");

    if (totalAmount > 0) {
        cardNode.insertAdjacentHTML(
            "beforeend",
            `<div class="cart-content-amount">
            ${totalAmount}
        </div>`
        );
    } else {
        cardNode.insertAdjacentHTML(
            "beforeend",
            `<div class="cart-content-amount hide">
            ${totalAmount}
        </div>`
        );
    }
}

// 搜尋跳轉
const searchFrom = document.querySelector(".menu form");
searchFrom.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = searchFrom.querySelector("input").value.trim();
    if (input === "") {
        alert("請輸入產品關鍵字");
        return;
    }
    const isGithub = location.href.includes("github.io");
    const basePath = isGithub ? "/Glacitek_project" : "";
    window.location.href = `${basePath}/HTML/product.html?input=${input}`;
});

// 為body增加touchstart事件，強制讓手機啟動:active
document.body.addEventListener("touchstart", function () {}, { passive: true });
