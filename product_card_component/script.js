function changeImage() {
    var img = document.getElementById("product-img");
    if (window.innerWidth >= 768) {
      img.src = "images/image-product-desktop.jpg";
    } else {
      img.src = "images/image-product-mobile.jpg";
    }
  }

window.onresize = changeImage;
  
changeImage();