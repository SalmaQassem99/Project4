const homePage = document.querySelector(".homepage");
const playButton = document.querySelector(".play-button");
const gamePage = document.querySelector(".game");
const cards = document.querySelectorAll(".card-wrapper");
const soundIcons = document.querySelectorAll(".icon.sound");
const recordIcons = document.querySelectorAll(".icon.speak");
const recordIcons1 = document.querySelectorAll(".icon-new.speak");
const successModal = document.querySelector(".success-card");
const closeButton = document.querySelector(".closeModal");
const overlay = document.querySelector(".overlay");
playButton.addEventListener("click", () => {
  homePage.classList.add("hide");
  homePage.addEventListener("animationend", () => {
    homePage.classList.remove("hide");
    homePage.classList.add("hidden");
    cards.forEach((card) => {
      card.classList.add("show");
    });
    gamePage.classList.add("show");
  });
});
cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    card.classList.add("is-flipped");
    const cardId = card.dataset.id;
    const icons = document.querySelectorAll(
      `.icons[data-id="${cardId}"] .icon`
    );
    const icons2 = document.querySelectorAll(
      `.icons[data-id="${cardId}"] .icon-new`
    );
    icons.forEach((icon) => {
      icon.style.visibility = "visible";
      icon.classList.add("show");
      icon.addEventListener("animationend", () => {
        icon.classList.remove("show");
      });
    });
    icons2.forEach((icon) => {
      icon.style.visibility = "visible";
      icon.classList.add("show");
      icon.addEventListener("animationend", () => {
        icon.classList.remove("show");
      });
    });
  });
});
soundIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.classList.add("clicked");
    icon.addEventListener("animationend", () => {
      icon.classList.remove("clicked");
    });
  });
});
recordIcons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    e.preventDefault();
  });
  icon.addEventListener("pointerdown", () => {
    icon.classList.add("animate");
    icon.addEventListener("pointerup", () => {
      icon.classList.remove("animate");
    });
    icon.addEventListener("pointerout", () => {
      icon.classList.remove("animate");
    });
  });
});
recordIcons1.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    icon.classList.add("animate");
    icon.querySelector("img").src = "../media/images/microphone.svg";
    setTimeout(() => {
      icon.classList.remove("animate");
      icon.querySelector("img").src = "../media/images/speakIcon.svg";
    }, 5000);
  });
});
const checkScore = (score) => {
  if (score >= 70) {
    return "green";
  } else if (score < 70 && score >= 40) {
    return "yellow";
  } else {
    return "red";
  }
};
document.querySelector(".show-success").addEventListener("click", () => {
  successModal.classList.add("show");
  overlay.classList.add("show");
  const score = 70;
  const scoreElement = document.querySelector(".score");
  scoreElement.textContent = `${score}%`;
  const className = checkScore(score);
  scoreElement.classList.add(className);
  const words = [
    { text: "first", score: 60 },
    { text: "second", score: 20 },
  ];
  document.querySelector(".score-text").innerHTML = "";
  words.forEach((word) => {
    const className = checkScore(word.score);
    const newSpan = document.createElement("span");
    newSpan.textContent = `${word.text}:(${word.score}%)`;
    newSpan.classList.add(className);
    document.querySelector(".score-text").appendChild(newSpan);
  });
});
document.addEventListener("click", function (event) {
  const isVisible =
    window.getComputedStyle(successModal).visibility === "visible";
  var isClickInside =
    successModal.contains(event.target) || event.target === closeButton;
  if (!isClickInside && isVisible) {
    successModal.classList.remove("show");
    setTimeout(() => {
      overlay.classList.remove("show");
    }, 400);
  }
});
closeButton.addEventListener("click", () => {
  successModal.classList.remove("show");
  setTimeout(() => {
    overlay.classList.remove("show");
  }, 400);
});
