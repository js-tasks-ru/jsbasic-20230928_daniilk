function initCarousel() {
  let containerClick = document.querySelector(".carousel");
  let i = 0;
  document.querySelector(".carousel__arrow_left").style.display = "none";
  containerClick.addEventListener("click", (event) => {
    let container = document.querySelector(".carousel__inner");
    let buttonSwipe = event.target.closest("div");
    let swipe = document.querySelector(".carousel__slide");

    switch (buttonSwipe.className) {
      case "carousel__arrow carousel__arrow_right":
        document.querySelector(".carousel__arrow_left").style.display = "";
        i += 1;
        container.style.transform = `translateX(-${swipe.offsetWidth * i}px)`;
        if (i == 3) {
          buttonSwipe.style.display = "none";
        }
        break;

      case "carousel__arrow carousel__arrow_left":
        document.querySelector(".carousel__arrow_right").style.display = "";
        i -= 1;
        container.style.transform = `translateX(-${swipe.offsetWidth * i}px)`;
        if (i == 0) {
          buttonSwipe.style.display = "none";
        }
        break;
    }
  });
}
