const openButton = document.querySelector("#openButton");
const dialogBox = document.querySelector("#dialogBox");
const closeButton = document.querySelector("#closeButton");
const dialogBoxText = document.querySelector("#dialogBox div");

openButton1.addEventListener("click", () => {
  dialogBox.showModal();
  dialogBoxText.innerHTML =
    "One Apple contains 95 calories, 25 grams of carbohydrates and 14 grams of sugar. Apples are also a good source of fiber and vitamin C.";
});

openButton2.addEventListener("click", () => {
  dialogBox.showModal();
  dialogBoxText.innerHTML =
    "One Orange contains 62 calories, 15 grams of carbohydrates and 12 grams of sugar. Oranges are also a good source of fiber and vitamin C.";
});

openButton3.addEventListener("click", () => {
  dialogBox.showModal();
  dialogBoxText.innerHTML =
    "One Banana contains 105 calories, 27 grams of carbohydrates and 14 grams of sugar. Bananas are also a good source of fiber and vitamin C.";
});

closeButton.addEventListener("click", () => {
  dialogBox.close();
});
