// @ts-nocheck

let helpNavBarItem = document.querySelectorAll(".help-nav-bar-item");
// console.log(helpNavBarItem);

let targetArea = document.querySelectorAll(".help-area > div");
// console.log(targetArea);

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

let helpAreaTitle = document.querySelectorAll(".help-area-title");
let helpAreaContent = document.querySelectorAll(".help-area-content");

// let helpAreaContentCardA = document.querySelectorAll(
//     ".help-area-content .help-area-content-card-A"
// );

// ↓手風琴區塊↓
for (let i = 0; i < 3; i++) {
    let helpContentCardQ = helpAreaContent[i].querySelectorAll(
        ".help-area-content-card-Q"
    );
    let helpContentCardA = helpAreaContent[i].querySelectorAll(
        ".help-area-content-card-A"
    );
    // 巢狀手風琴，第一層
    helpAreaTitle[i].addEventListener("click", function () {
        helpAreaTitle[i].classList.toggle("active");
        helpContentCardA.forEach((item) => {
            item.classList.remove("r1");
        });
        helpContentCardQ.forEach((item) => {
            item.classList.remove("active");
        });

        // 退換貨與保固（第3個）
        if (i + 1 === 3) {
            helpAreaContent[i].classList.remove("r3-1", "r3-2", "r3-3");
            helpAreaContent[i].classList.toggle("r3");

            helpAreaContent[0].classList.remove("r2", "r2-1", "r2-2");
            helpAreaTitle[0].classList.remove("active");

            helpAreaContent[1].classList.remove("r2", "r2-1", "r2-2");

            helpAreaTitle[1].classList.remove("active");

            let hatc = document.querySelector(".help-area-title.active");
            let hatr3 = document.querySelector(".help-area-content.r3");
            let hacaAr1 = document.querySelector(
                ".help-area-content-card-A.r1"
            );
            // 當內部有展開的元素，關起來時把所有展開的元素一起關閉
            if (!hatc && hatr3) {
                hatr3.classList.remove("r3");
            }
            if (hacaAr1) {
                hacaAr1.classList.remove("r1");
            }
        }
        // 購買與付款、配送與運費（第1、2個）
        else {
            helpAreaContent[i].classList.remove("r2-1", "r2-2");
            helpAreaContent[i].classList.toggle("r2");
            // 如果此時的i是0（購買與付款），那cancelClickI就是1（配送與運費）反之一樣
            let cancelClickI = i === 0 ? 1 : 0;
            helpAreaContent[cancelClickI].classList.remove(
                "r2",
                "r2-1",
                "r2-2"
            );
            helpAreaTitle[cancelClickI].classList.remove("active");
            helpAreaContent[2].classList.remove("r3", "r3-1", "r3-2", "r3-3");
            helpAreaTitle[2].classList.remove("active");

            // 當內部有展開的元素，關起來時把所有展開的元素一起關閉
            let hatc = document.querySelector(".help-area-title.active");
            let hatr2 = document.querySelector(".help-area-content.r2");
            let hacaAr1 = document.querySelector(
                ".help-area-content-card-A.r1"
            );
            if (!hatc && hatr2) {
                hatr2.classList.remove("r2");
            }
            if (hacaAr1) {
                console.log(1);

                hacaAr1.classList.remove("r1");
            }
        }
    });
    // 巢狀手風琴，第二層
    for (let j = 0; j < helpContentCardQ.length; j++) {
        helpContentCardQ[j].addEventListener("click", function () {
            // console.log(helpContentCardQ);
            helpContentCardQ[j].classList.toggle("active");
            let Alength = helpContentCardA.length;
            // ↓該區塊有幾個A、A的元素list、對應到的A的index
            // console.log(Alength, helpContentCardA, j);
            helpContentCardA[j].classList.toggle("r1");
            helpAreaContent[i].classList.toggle(`r${Alength}`);
            helpAreaContent[i].classList.toggle(`r${Alength}-${j + 1}`);
            // console.log(helpAreaContent[i], i);
        });
    }
}
// ↑手風琴區塊↑
