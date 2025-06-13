// @ts-nocheck

let amountNumber = document.querySelectorAll(".amount-number");
let amountButton = document.querySelectorAll(".amount-button");
let plus = document.querySelector(".plus");
let minus = document.querySelector(".minus");

for (let i = 0; i < amountNumber.length; i++) {
    amountNumber[i].addEventListener("click", () => {
        amountNumber[i].classList.toggle("switch");
        amountButton[i].classList.toggle("switch");
    });
}
document.addEventListener("click", (e) => {
    // console.log(e.target);
    for (let i = 0; i < amountNumber.length; i++) {
        // 如果點擊的不是 .amount-number 或 .amount-button 的內容
        if (
            !amountNumber[i].contains(e.target) &&
            !amountButton[i].contains(e.target)
        ) {
            amountNumber[i].classList.remove("switch");
            amountButton[i].classList.remove("switch");
        }
    }
});

let cartContent = document.querySelector(".cart-content");
cartContent.addEventListener("click", (e) => {
    let e_target = e.target;
    // console.log(e_target);
    if (
        e_target.classList.contains("minus") ||
        e_target.classList.contains("plus")
    ) {
        const productCardElement = e_target.closest(".product-card-info");
        const amountNumber = productCardElement.querySelector(".amount-number");
        const amount = productCardElement.querySelector(".amount");
        const name = productCardElement
            .querySelector(".product-card-title")
            .textContent.trim();
        const unitPrice = productCardElement.querySelector(
            ".product-card-price"
        );
        const price = productCardElement.querySelector(".price");
        let unitPriceNumber = parseInt(
            unitPrice.textContent.match(/NT\$[ \t]*([\d,]+)/)?.[1]
        );
        let current = parseInt(amount.textContent);
        if (e_target.classList.contains("plus")) {
            current++;
        } else if (e_target.classList.contains("minus")) {
            if (current > 1) {
                current--;
            } else {
                console.log("此時數量歸0，刪除該區塊");
            }
        }
        amountNumber.textContent = current;
        amount.textContent = current;
        price.textContent = `NT$ ${current * unitPriceNumber}`;

        const totalOrderPrice = cartContent.querySelector(".total-order-price");
        let totalprice = 0;
        const priceList = cartContent.querySelectorAll(".price");
        priceList.forEach((element) => {
            const p = parseInt(element?.textContent.slice(4));
            totalprice += p;
        });
        totalOrderPrice.textContent = `NT$ ${totalprice}`;

        const freightPrice = cartContent.querySelector(".freight-price");
        const fp = parseInt(freightPrice.textContent.slice(4));
        // console.log(totalprice, fp);

        const actualAmountPrice = cartContent.querySelector(
            ".actual-amount-price"
        );
        actualAmountPrice.textContent = `NT$ ${totalprice + fp}`;

        // console.log(totalOrderPrice);
    }
});
