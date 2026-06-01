const data = window.siteData || { posters: [], gallery: [], socials: [] };

function createMediaCard(item, options = {}) {
  const article = document.createElement("article");
  article.className = "media-card";

  const image = document.createElement("img");
  image.src = item.image;
  image.alt = item.title || "ICT class media";
  image.loading = "lazy";
  if (options.lightbox) {
    image.tabIndex = 0;
    image.role = "button";
    image.addEventListener("click", () => openLightbox(item.image, image.alt));
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(item.image, image.alt);
      }
    });
  }

  const body = document.createElement("div");
  body.className = "media-card-body";

  const title = document.createElement("h3");
  title.textContent = item.title || "Untitled";

  const caption = document.createElement("p");
  caption.textContent = item.caption || "";

  body.append(title, caption);
  article.append(image, body);
  return article;
}

function renderMediaGrid(id, items, emptyText, options = {}) {
  const grid = document.getElementById(id);
  if (!grid) return;
  grid.innerHTML = "";

  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = emptyText;
    grid.append(empty);
    return;
  }

  items.forEach((item) => grid.append(createMediaCard(item, options)));
}

function renderGradeGallery() {
  const filters = document.getElementById("gradeFilters");
  const grades = ["All", ...Array.from({ length: 6 }, (_, index) => `Grade ${index + 6}`)];
  if (!filters) return;

  let activeGrade = "All";

  function renderButtons() {
    filters.innerHTML = "";
    grades.forEach((grade) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = grade === activeGrade ? "grade-filter is-active" : "grade-filter";
      button.textContent = grade;
      button.setAttribute("aria-pressed", grade === activeGrade ? "true" : "false");
      button.addEventListener("click", () => {
        activeGrade = grade;
        renderButtons();
        renderItems();
      });
      filters.append(button);
    });
  }

  function renderItems() {
    const items = activeGrade === "All"
      ? data.gallery
      : data.gallery.filter((item) => item.grade === activeGrade);
    renderMediaGrid(
      "galleryGrid",
      items,
      `${activeGrade} gallery is ready. Upload student drawings for this grade and add them in site-data.js.`,
      { lightbox: true }
    );
  }

  renderButtons();
  renderItems();
}

function setupLightbox() {
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.id = "imageLightbox";
  lightbox.innerHTML = '<button type="button" aria-label="Close image">Close</button><img alt="">';
  document.body.append(lightbox);

  const closeButton = lightbox.querySelector("button");
  closeButton.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
}

function openLightbox(src, alt) {
  const lightbox = document.getElementById("imageLightbox");
  if (!lightbox) return;

  const image = lightbox.querySelector("img");
  image.src = src;
  image.alt = alt;
  lightbox.classList.add("is-open");
}

function closeLightbox() {
  const lightbox = document.getElementById("imageLightbox");
  if (!lightbox) return;

  lightbox.classList.remove("is-open");
}

function renderSocialLinks() {
  const container = document.getElementById("socialLinks");
  if (!container) return;

  data.socials
    .filter((item) => item.url && item.url !== "#")
    .forEach((item) => {
      const link = document.createElement("a");
      link.href = item.url;
      link.textContent = item.label;
      link.target = "_blank";
      link.rel = "noreferrer";
      container.append(link);
    });
}

function renderHeroBackground() {
  const hero = document.getElementById("heroSection");
  const track = document.getElementById("heroBgTrack");
  if (!hero || !track) return;

  const backgrounds = Array.isArray(data.heroBackgrounds) && data.heroBackgrounds.length
    ? data.heroBackgrounds
    : data.heroBackground
      ? [data.heroBackground]
      : [];

  if (!backgrounds.length) return;

  backgrounds.forEach((image, index) => {
    const slide = document.createElement("div");
    slide.className = "hero-bg-slide";
    slide.style.backgroundImage = `url("${image}")`;
    slide.style.animationDelay = `${index * 6}s`;
    track.append(slide);
  });
}

function renderTeacherPhotos() {
  const slider = document.getElementById("teacherPhotoSlider");
  if (!slider) return;

  const photos = Array.isArray(data.teacherPhotos) && data.teacherPhotos.length
    ? data.teacherPhotos
    : ["assets/logo/anshaf-ict-logo.png"];

  photos.forEach((photo, index) => {
    const image = document.createElement("img");
    image.src = photo;
    image.alt = index === 0 && photos.length === 1 ? "ICT Class logo" : "ICT class teacher";
    image.loading = "lazy";
    image.className = "teacher-photo";
    image.style.animationDelay = `${index * 5}s`;
    slider.append(image);
  });

  slider.style.setProperty("--photo-count", photos.length);
}

function renderGameProject() {
  const container = document.getElementById("gameProject");
  if (!container) return;

  const project = data.gameProject || {};

  const videoCard = document.createElement("article");
  videoCard.className = "video-frame";

  if (project.video) {
    const video = document.createElement("video");
    video.src = project.video;
    video.controls = true;
    video.preload = "metadata";
    if (project.studentPhoto) {
      video.poster = project.studentPhoto;
    }
    videoCard.append(video);
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "video-placeholder";
    placeholder.textContent = "Game video space is ready.";
    videoCard.append(placeholder);
  }

  const gameCopy = document.createElement("div");
  gameCopy.className = "game-copy";
  const title = document.createElement("h3");
  title.textContent = project.title || "Student Game Project";
  const description = document.createElement("p");
  description.textContent = project.description || "Student-created game project.";
  gameCopy.append(title, description);
  videoCard.append(gameCopy);

  const studentCard = document.createElement("aside");
  studentCard.className = "student-profile";

  if (project.studentPhoto) {
    const photo = document.createElement("img");
    photo.src = project.studentPhoto;
    photo.alt = project.studentName || "Student creator";
    photo.loading = "lazy";
    studentCard.append(photo);
  } else {
    const photoPlaceholder = document.createElement("div");
    photoPlaceholder.className = "student-photo-placeholder";
    photoPlaceholder.textContent = "Student photo space is ready.";
    studentCard.append(photoPlaceholder);
  }

  const studentBody = document.createElement("div");
  studentBody.className = "student-profile-body";
  const studentName = document.createElement("h3");
  studentName.textContent = project.studentName || "Student Creator";
  const studentDetails = document.createElement("p");
  studentDetails.textContent = project.studentDetails || "ICT practical project";
  studentBody.append(studentName, studentDetails);
  studentCard.append(studentBody);

  container.append(videoCard, studentCard);
}

// Theme toggle
(function () {
  const toggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (toggle) {
      toggle.textContent = theme === "dark" ? "Light" : "Dark";
      toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
  }

  const stored = localStorage.getItem("theme") || "dark";
  applyTheme(stored);

  if (toggle) {
    toggle.addEventListener("click", function () {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      applyTheme(next);
    });
  }
}());

renderHeroBackground();
renderTeacherPhotos();
renderMediaGrid("posterGrid", data.posters, "Poster space is ready. Upload poster images into assets/posters and add them in site-data.js.");
setupLightbox();
renderGradeGallery();
renderGameProject();
renderSocialLinks();
