    // Получение значения параметра id из URL
    var urlParams = new URLSearchParams(window.location.search);
    var productId = urlParams.get('id');

    // Загрузка XML-файла
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'productdata.xml', false);
    xmlhttp.send();
    var xml = xmlhttp.responseXML;

    // Поиск товара по id
    var productNode = xml.evaluate('/products/product[id="' + productId + '"]', xml, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Сохранение пути к изображению и описания товара в локальном хранилище
    var productImage = productNode.querySelector('image').textContent;
    var productDescription = productNode.querySelector('description').textContent;
    localStorage.setItem('img', productImage);
    localStorage.setItem('desc', productDescription);

    // Вывод информации о товаре
    var productImageElement = document.getElementById('productImage');
    productImageElement.src = productImage;

    var priceElement = document.querySelector('price');
    priceElement.textContent = 'Цена: ' + productNode.querySelector('price').textContent;

    var nameElement = document.querySelector('name');
    nameElement.textContent = productNode.querySelector('name').textContent;

    
    
    // Получение элемента description из XML
var descriptionElement = document.querySelector('description');

// Создание элемента <p> для каждого параграфа
var paragraphs = productDescription.split('\n');
paragraphs.forEach(function(paragraphText) {
var paragraphElement = document.createElement('p');
paragraphElement.textContent = paragraphText;

// Добавление элемента <p> в элемент description
descriptionElement.appendChild(paragraphElement);
});

    // Очистка локального хранилища
    localStorage.removeItem('img');
    localStorage.removeItem('desc');
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
