document.addEventListener("DOMContentLoaded", function () {
    var menuItems = document.querySelectorAll('.menu > li');

    menuItems.forEach(function (item) {
      var link = item.querySelector('a');
      var submenu = item.querySelector('.second');
      var image = item.querySelector('div');
      var isExpanded = false;

      var toggleSubmenu = function () {
        isExpanded = !isExpanded;
        submenu.style.opacity = isExpanded ? '1' : '0';
        submenu.style.display = isExpanded ? 'block' : 'none';
        image.classList.toggle('clicked');
        if (isExpanded) {
          image.style.transform = 'rotate(180deg)';
          image.style.left = '102px';
        } else {
          setTimeout(function () {
            image.style.transform = 'none';
            image.style.left = '12px';
          }, 300);
        }
      };

      link.addEventListener('click', function (e) {
        e.preventDefault();
        toggleSubmenu();
      });

      image.addEventListener('click', function (e) {
        e.preventDefault();
        toggleSubmenu();
      });

      document.addEventListener('click', function (event) {
        var isClickInside = item.contains(event.target) || link === event.target || image === event.target;
        if (!isClickInside) {
          submenu.style.display = 'none';
          submenu.style.opacity = '0';
          isExpanded = false;
          image.classList.remove('clicked');
          image.style.transform = 'none';
          image.style.left = '12px';
        }
      });
    });

  });