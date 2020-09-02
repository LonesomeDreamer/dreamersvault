let previewImages = document.querySelectorAll(".entryPreviewImage");
previewImages.forEach(image => {
  image.style.height = Math.floor(parseInt(window.getComputedStyle(image).width) / 16) * 9 + "px";
});
