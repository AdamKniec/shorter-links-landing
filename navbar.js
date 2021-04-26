(function () {
  const hamburger = document.getElementById("hamburger");
  const menuList = document.getElementById("menu-list");
  const handleHamburgerClick = () => {
    menuList.classList.toggle("mobile-active");
  };
  hamburger.addEventListener("click", handleHamburgerClick);
})();
