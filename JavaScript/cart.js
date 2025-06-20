// @ts-nocheck

let plus = document.querySelector(".plus");
let minus = document.querySelector(".minus");

// 點擊外部區塊時，關閉加減數量按鈕（開啟的功能在27行）
document.addEventListener("click", (e) => {
    // console.log(e.target);
    let amountNumber = document.querySelectorAll(".amount-number");
    let amountButton = document.querySelectorAll(".amount-button");
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
const productArea = document.querySelector(".product-area");
const cartContent = document.querySelector(".cart-content");
const cartContents = JSON.parse(sessionStorage.getItem("cartContents") || "[]");
cartContent.addEventListener("click", (e) => {
    let e_target = e.target;
    // .amount-number與.amount點擊切換（點擊外部全關閉的功能在第7行）
    if (
        e_target.classList.contains("amount-number") ||
        e_target.classList.contains(".amount")
    ) {
        const amountButton_and_totalPrice = e_target.closest(
            ".amount-button_and_total-price"
        );
        let amountNumber =
            amountButton_and_totalPrice.querySelector(".amount-number");
        let amountButton =
            amountButton_and_totalPrice.querySelector(".amount-button");
        amountNumber.classList.add("switch");
        amountButton.classList.add("switch");
    }
    // 加減商品數量的功能實作
    if (
        e_target.classList.contains("minus") ||
        e_target.classList.contains("plus")
    ) {
        const productCardElement = e_target.closest(".product-card-info");
        const productCard = e_target.closest(".product-card");
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
            unitPrice.textContent
                .match(/NT\$[ \t]*([\d,]+)/)?.[1]
                .replace(/,/g, "")
        );
        let current = parseInt(amount.textContent);

        const cartContentAmount = document.querySelector(
            ".cart-content-amount"
        );
        // 更新購物車內容的函式
        const updateProductOfCartContents = (plusOrMinus) => {
            switch (plusOrMinus) {
                case "plus":
                    for (let item of cartContents) {
                        if (item.name === name) {
                            item.amount++;
                        }
                    }
                    break;
                case "minus":
                    for (let item of cartContents) {
                        if (item.name === name) {
                            item.amount--;
                        }
                    }
                    break;
                case "remove":
                    if (confirm("確定要移除該商品嗎？")) {
                        // 為了移除節點，改用in
                        for (let i in cartContents) {
                            if (cartContents[i].name === name) {
                                cartContents.splice(i, 1);
                            }
                        }
                        // console.log(productCard.parentNode);
                        const productArea = productCard.parentNode;
                        productArea.removeChild(productCard);
                        if (!productArea.innerHTML) {
                            // console.log("購物車內無商品");
                            productArea.innerHTML = `<div class="no-product">購物車內沒有商品</div>`;
                            // 若購物車內沒有東西 則右上角小紅點隱藏
                            const cartContentAmount = document.querySelector(
                                ".cart-content-amount"
                            );
                            cartContentAmount.classList.add("hide");
                        }
                    } else {
                        // 由於第130行已經先減掉數量了，如果反悔沒有刪除商品擇要把數量+1加回來
                        cartContentAmount.textContent =
                            parseInt(cartContentAmount.textContent.trim()) + 1;
                    }
                    break;
                default:
                    alert("錯誤");
                    break;
            }
            sessionStorage.setItem(
                "cartContents",
                JSON.stringify(cartContents)
            );
        };

        // 購物車"數量"、"小計"的計算，以及右上角購物車小點的即時更新

        if (e_target.classList.contains("plus")) {
            current++;
            updateProductOfCartContents("plus");
            cartContentAmount.textContent =
                parseInt(cartContentAmount.textContent.trim()) + 1;
        } else if (e_target.classList.contains("minus")) {
            cartContentAmount.textContent =
                parseInt(cartContentAmount.textContent.trim()) - 1;
            if (current > 1) {
                current--;
                updateProductOfCartContents("minus");
            } else {
                updateProductOfCartContents("remove");
                console.log("此時數量歸0，刪除該區塊");
            }
        }
        // console.log(cartContents);

        // 更新購物車畫面上的"數量"、"小計"數字
        amountNumber.textContent = current;
        amount.textContent = current;
        price.textContent = `NT$ ${current * unitPriceNumber}`;

        // 更新訂單摘要的商品總計、運費、實附金額
        const totalOrderPrice = cartContent.querySelector(".total-order-price");
        let totalprice = 0;
        const priceList = cartContent.querySelectorAll(".price");
        priceList.forEach((element) => {
            const p = parseInt(element?.textContent.slice(4));
            totalprice += p;
        });
        totalOrderPrice.textContent = `NT$ ${totalprice}`;
        const freightPrice = cartContent.querySelector(".freight-price");
        freightPrice.textContent = totalprice < 5000 ? `NT$ 70` : `NT$ 0`;
        const fp = parseInt(freightPrice.textContent.slice(4));
        // console.log(totalprice, fp);
        const actualAmountPrice = cartContent.querySelector(
            ".actual-amount-price"
        );
        actualAmountPrice.textContent = `NT$ ${totalprice + fp}`;
    }
    // 點選商品圖片、名字跳轉
    if (
        e_target.tagName === "IMG" ||
        e_target.classList.contains("product-card-title")
    ) {
        const productArea = e_target.closest(".product-area");
        const productCardTitle = productArea
            .querySelector(".product-card-title")
            .textContent.trim();
        sessionStorage.setItem("gotoPage", productCardTitle);
        window.location.href = "../HTML/product.html";
    }
});

// console.log(cartContents);
if (cartContents.length > 0) {
    let html = "";
    let totalPrice = 0;
    for (let item of cartContents) {
        html += `<div class="product-card">
                    <div class="product-card-img">
                        <img
                            src="${item.src}"
                            alt=""
                        />
                    </div>
                    <div class="product-card-info">
                        <div class="product-card-title">
                            ${item.name}
                        </div>
                        <div class="product-card-price">
                            單價：NT$ ${item.price}
                        </div>
                        <div class="amount-button_and_total-price">
                            <div class="amount-number">${item.amount}</div>
                            <div class="amount-button">
                                <button type="button" class="minus">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="13"
                                        height="1"
                                        viewBox="0 0 13 1"
                                        fill="none"
                                    >
                                        <path
                                            d="M0 1V0H13V1H0Z"
                                            fill="black"
                                        />
                                    </svg>
                                </button>
                                <div class="amount">${item.amount}</div>
                                <button type="button" class="plus">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="13"
                                        height="13"
                                        viewBox="0 0 13 13"
                                        fill="none"
                                    >
                                        <path
                                            d="M0 7V6H6V0H7V6H13V7H7V13H6V7H0Z"
                                            fill="black"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div class="total-price">
                                <span>小計：</span>
                                <span class="price">NT$ ${
                                    parseInt(item.price.replace(/,/g, "")) *
                                    item.amount
                                }</span>
                            </div>
                        </div>
                    </div>
                </div>`;
        totalPrice += parseInt(item.price.replace(/,/g, "")) * item.amount;
    }
    // console.log(totalPrice);
    productArea.innerHTML = html;
    const totalOrderPrice = document.querySelector(".total-order-price");
    const freightPrice = document.querySelector(".freight-price");
    const actualAmountPrice = document.querySelector(".actual-amount-price");
    totalOrderPrice.textContent = `NT$ ${totalPrice}`;
    // console.log(parseInt(freightPrice.textContent.slice(4)) + totalPrice);
    freightPrice.textContent = totalPrice < 5000 ? `NT$ 70` : `NT$ 0`;
    actualAmountPrice.textContent = `NT$ ${
        parseInt(freightPrice.textContent.slice(4)) + totalPrice
    }`;

    // actualAmountPrice.textContent=totalPrice+
} else {
    productArea.innerHTML = `<div class="no-product">購物車內沒有商品</div>`;
}

// 購物車送出檢查
const submitform = document.querySelector(".cart-content");
submitform.addEventListener("submit", (e) => {
    e.preventDefault();
    const noProduct = submitform.querySelector(".no-product");
    // 開始檢查
    if (noProduct) {
        alert("購物車內沒有商品");
        return;
    }
    const items = [
        {
            id: "name",
            checkHasNotInput: (val) => val == "",
        },
        {
            id: "phone",
            checkHasNotInput: (val) => val == "",
            checkFormat: (val) => /^09\d{8}$/.test(val),
        },
        {
            id: "email",
            checkHasNotInput: (val) => val == "",
            checkFormat: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        },
    ];
    for (const item of items) {
        const el = submitform.querySelector(`#${item.id}`);
        const val = el.value.trim();
        // 如果輸入框為空
        if (item.checkHasNotInput(val)) {
            el.classList.add("error");
            el.focus();
            return;
        } // 若不為空，則開始檢查是否符合格式
        else if (item.checkFormat && !item.checkFormat(val)) {
            el.classList.add("format-error");
            el.value = "";
            el.focus();
            return;
        }
        el.classList.remove("error", "format-error");
    }
    if (confirm("確定要送出嗎？")) {
        alert("送出資料完成！");
    }
    // if (!noProduct) {
    //     // console.log("購物車有東西");
    //     const name = submitform.querySelector("#name");
    //     const nameInput = name.value.trim();
    //     if (nameInput === "") {
    //         name.focus();
    //         // 若出問題，添加警告資訊
    //         name.classList.add("error");
    //         return;
    //     }
    //     const phone = submitform.querySelector("#phone");
    //     const phoneInput = phone.value.trim();
    //     if (phoneInput === "") {
    //         phone.focus();
    //         phone.classList.add("error");
    //         return;
    //     }
    //     const PhoneRegexp = /^09\d{8}$/;
    //     if (!PhoneRegexp.test(phoneInput)) {
    //         phone.value = "";
    //         phone.focus();
    //         phone.classList.add("error");
    //         phone.classList.add("format-error");
    //         return;
    //     }
    //     const email = submitform.querySelector("#email");
    //     const emailInput = email.value.trim();
    //     if (emailInput === "") {
    //         email.focus();
    //         email.classList.add("error");
    //         return;
    //     }
    //     const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     if (!emailRegexp.test(emailInput)) {
    //         email.value = "";
    //         email.focus();
    //         email.classList.add("error");
    //         email.classList.add("format-error");
    //         return;
    //     }
    //     if (confirm("確定要送出嗎？")) alert("送出資料完成！");
    // } else {
    //     alert("購物車內沒有商品");
    //     return;
    // }
});
// 設定在更改input內容時、焦點不在input上時，移除警告資訊
const inputs = document.querySelectorAll(".buyer-info-content input");
inputs.forEach((item) => {
    item.addEventListener("input", () => {
        item.classList.remove("error");
        item.classList.remove("format-error");
    });
    item.addEventListener("blur", () => {
        item.classList.remove("error");
        item.classList.remove("format-error");
    });
});
// 備註textarea自適應高度
const textarea = document.getElementById("remark");
textarea?.addEventListener("input", (e) => {
    textarea.style.height = "auto";
    // console.log(
    //     `高度：${textarea.style.height}`,
    //     `可滾動高度：${textarea.scrollHeight}`
    // );
    textarea.style.height =
        screen.width >= 1024
            ? `${e.target.scrollHeight + 2}px`
            : `${e.target.scrollHeight + 1.78}px`;
});
