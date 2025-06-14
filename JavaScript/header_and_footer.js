// @ts-nocheck

// 負責在載入頁面時讀取購物車內容
{
    let cartContents = JSON.parse(
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
