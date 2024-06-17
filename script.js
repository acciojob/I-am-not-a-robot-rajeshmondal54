document.addEventListener("DOMContentLoaded", function () {
  const images = ["img1", "img2", "img3", "img4", "img5"];
  const container = document.getElementById("image-container");
  const resetButton = document.getElementById("reset");
  const verifyButton = document.getElementById("verify");
  const para = document.getElementById("para");

  let selectedImages = [];
  let state = 1; // Initial state

  // Function to shuffle array randomly
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Function to render images in random order
  function renderImages() {
    shuffleArray(images);
    container.innerHTML = "";
    images.forEach((imgClass) => {
      const img = document.createElement("img");
      img.classList.add(imgClass);
      img.addEventListener("click", () => handleImageClick(imgClass));
      container.appendChild(img);
    });
  }

  // Function to handle image click events
  function handleImageClick(imgClass) {
    if (selectedImages.length < 2) {
      const img = document.querySelector(`.${imgClass}`);
      img.classList.toggle("selected");
      if (img.classList.contains("selected")) {
        selectedImages.push(imgClass);
      } else {
        selectedImages = selectedImages.filter((item) => item !== imgClass);
      }
    }

    if (selectedImages.length === 2) {
      verifyButton.style.display = "inline-block";
    } else {
      verifyButton.style.display = "none";
    }

    if (state === 1 && selectedImages.length > 0) {
      resetButton.style.display = "inline-block";
      state = 2; // Move to state 2
    }
  }

  // Function to handle reset button click
  resetButton.addEventListener("click", function () {
    resetButton.style.display = "none";
    verifyButton.style.display = "none";
    para.textContent = "";
    selectedImages = [];
    renderImages();
    state = 1; // Reset to initial state
  });

  // Function to handle verify button click
  verifyButton.addEventListener("click", function () {
    verifyButton.style.display = "none";
    if (selectedImages.length === 2 && selectedImages[0] === selectedImages[1]) {
      para.textContent = "You are a human. Congratulations!";
    } else {
      para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    state = 3; // Move to state 3
  });

  // Initial render of images
  renderImages();
});