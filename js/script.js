 const filterButtons = document.querySelectorAll(".filter-btn");
const galleryCards = document.querySelectorAll(".gallery-card");

// LIGHTBOX
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

// =======================
// HELPERS
// =======================
function getVisibleCards() {
  return Array.from(galleryCards).filter(
    (card) => !card.classList.contains("hidden")
  );
}

function openLightbox(index) {
  const visibleCards = getVisibleCards();
  if (!visibleCards.length) return;

  currentIndex = (index + visibleCards.length) % visibleCards.length;

  const img = visibleCards[currentIndex].querySelector("img");
  lightboxImg.src = img.src;

  lightbox.classList.add("active");
}

function closeLightbox() {
  lightbox.classList.remove("active");
}

function showNext() {
  openLightbox(currentIndex + 1);
}

function showPrev() {
  openLightbox(currentIndex - 1);
}

// =======================
// FILTER SYSTEM
// =======================
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    galleryCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");

      if (filterValue === "all" || cardCategory === filterValue) {
        card.classList.remove("hidden");
        setTimeout(() => card.classList.remove("hide"), 50);
      } else {
        card.classList.add("hide");
        setTimeout(() => card.classList.add("hidden"), 350);
      }
    });

    // if lightbox is open and filter changes, close it
    closeLightbox();
  });
});

// =======================
// OPEN LIGHTBOX ON CLICK
// =======================
galleryCards.forEach((card) => {
  card.addEventListener("click", () => {
    const visibleCards = getVisibleCards();
    const index = visibleCards.indexOf(card);

    if (index !== -1) {
      openLightbox(index);
    }
  });
});

// =======================
// BUTTONS
// =======================
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);

lightboxClose.addEventListener("click", closeLightbox);

// click outside image closes
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// =======================
// KEYBOARD SUPPORT
// =======================
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") showNext();
  if (e.key === "ArrowLeft") showPrev();
});

// =======================
// SWIPE SUPPORT (MOBILE)
// =======================
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;

  const diff = touchStartX - touchEndX;

  if (diff > 50) {
    showNext(); // swipe left
  } else if (diff < -50) {
    showPrev(); // swipe right
  }
});

