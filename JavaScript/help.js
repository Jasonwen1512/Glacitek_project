// @ts-nocheck

let helpNavBarItem = document.querySelectorAll(".help-nav-bar-item");
console.log(helpNavBarItem);

// let buy_and_pay = document.querySelector("#buy_and_pay");
// let delivery_and_fare = document.querySelector("#delivery_and_fare");
// let returns_and_warranty = document.querySelector("#returns_and_warranty");
let targetArea = document.querySelectorAll(".help-area > div");
console.log(targetArea);

// let targetArea = [buy_and_pay, delivery_and_fare, returns_and_warranty];
for (let i = 0; i < helpNavBarItem.length; i++) {
    helpNavBarItem[i].addEventListener("click", (e) => {
        e.preventDefault();
        if (targetArea[i]) {
            const headerOffset = 59.59; // header 高度
            const elementPosition = targetArea[i].getBoundingClientRect().top; // 取得目標區塊相對於"目前視窗頂部"的距離
            const offsetPosition =
                elementPosition + window.pageYOffset - headerOffset - 50; // 減去50是為了留一點跳轉後的標題與上面的間隙
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    });
    // console.log(targetArea[i].getBoundingClientRect().top);
}

let helpNavBar = document.querySelector(".help-nav-bar");
window.onload = () => {
    helpNavBar.classList.remove("display");
    helpNavBar.classList.add("display");
};
