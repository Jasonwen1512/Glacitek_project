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
