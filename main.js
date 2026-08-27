import { prepare, layout } from "@chenglou/pretext";


/* -------------------------
   PRETEXT
------------------------- */

const pretextText = "DATA ANALYTICS RESEARCH";

const preparedText = prepare(
  pretextText,
  "13px 'DM Mono'"
);

const pretextLayout = layout(
  preparedText,
  300,
  40
);

console.log("Pretext layout:", pretextLayout);


/* -------------------------
   CUSTOM CURSOR
------------------------- */

const cursor = document.getElementById("cursor-trail");

let mouseX = 0;
let mouseY = 0;

let cursorX = 0;
let cursorY = 0;


document.addEventListener("mousemove", (event) => {

  mouseX = event.clientX;
  mouseY = event.clientY;

  createSparkle(mouseX, mouseY);

});


function animateCursor() {

  cursorX += (mouseX - cursorX) * 0.16;
  cursorY += (mouseY - cursorY) * 0.16;

  cursor.style.transform =
    `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;

  requestAnimationFrame(animateCursor);

}

animateCursor();


/* -------------------------
   SPARKLE TRAIL
------------------------- */

function createSparkle(x, y) {

  if (Math.random() > 0.25) return;

  const sparkle = document.createElement("div");

  sparkle.className = "sparkle";

  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;

  const randomX = Math.random() * 2 - 1;
  const randomY = Math.random() * 2 - 1;

  sparkle.style.setProperty("--x", randomX);
  sparkle.style.setProperty("--y", randomY);

  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 700);

}


/* -------------------------
   INTERACTIVE DATA FIELD
------------------------- */

const interactiveWords = document.querySelectorAll(
  ".magic-word, .field-word"
);

document.addEventListener("mousemove", (event) => {

  interactiveWords.forEach((word) => {

    const rect = word.getBoundingClientRect();

    const wordX = rect.left + rect.width / 2;
    const wordY = rect.top + rect.height / 2;

    const distanceX = event.clientX - wordX;
    const distanceY = event.clientY - wordY;

    const distance = Math.sqrt(
      distanceX * distanceX +
      distanceY * distanceY
    );

    const interactionDistance = 180;


    if (distance < interactionDistance) {

      const strength =
        1 - distance / interactionDistance;


      /* MAGNETIC MOVEMENT */

      const moveX =
        -distanceX * strength * 0.18;

      const moveY =
        -distanceY * strength * 0.18;


      /* WORD GROWS SLIGHTLY */

      const scale =
        1 + strength * 0.2;


      word.style.transform =
        `translate(${moveX}px, ${moveY}px)
         scale(${scale})`;


      /* GREEN ACTIVATION */

      if (word.classList.contains("field-word")) {

        word.style.color =
          `rgba(79, 168, 63, ${0.35 + strength * 0.65})`;

      } else {

        word.style.color =
          "#4fa83f";

      }


      /* GLOW INCREASES WITH PROXIMITY */

      const glow =
        4 + strength * 16;


      word.style.textShadow =
        `0 0 ${glow}px rgba(117, 216, 91, ${strength})`;

    }


    else {

      /* RETURN TO CALM STATE */

      word.style.transform =
        "translate(0px, 0px) scale(1)";


      word.style.textShadow =
        "none";


      if (word.classList.contains("field-word")) {

        word.style.color =
          "rgba(22, 22, 22, 0.16)";

      } else {

        word.style.color =
          "#161616";

      }

    }

  });

});

/* -------------------------
   EDUCATION TIMELINE
------------------------- */

const timelineNodes =
  document.querySelectorAll(".timeline-node");

const educationDetails =
  document.querySelectorAll(".education-detail");


function activateEducation(id) {

  timelineNodes.forEach((node) => {
    node.classList.remove("active");
  });

  educationDetails.forEach((detail) => {
    detail.classList.remove("active");
  });


  const activeNode =
    document.querySelector(
      `[data-education="${id}"]`
    );

  const activeDetail =
    document.querySelector(
      `[data-detail="${id}"]`
    );


  if (activeNode) {
    activeNode.classList.add("active");
  }

  if (activeDetail) {
    activeDetail.classList.add("active");
  }

}


/* DESKTOP HOVER */

timelineNodes.forEach((node) => {

  node.addEventListener("mouseenter", () => {

    if (window.innerWidth > 700) {

      activateEducation(
        node.dataset.education
      );

    }

  });

});


/* MOBILE CLICK */

timelineNodes.forEach((node) => {

  node.addEventListener("click", () => {

    if (window.innerWidth <= 700) {

      activateEducation(
        node.dataset.education
      );

    }

  });

});