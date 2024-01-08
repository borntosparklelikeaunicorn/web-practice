function saveToLocalStorage(dataKey, dataArray) {
    try {
        const existingData = JSON.parse(localStorage.getItem(dataKey)) || [];
        const updatedData = existingData.concat(dataArray);
        localStorage.setItem(dataKey, JSON.stringify(updatedData));
        console.log('Данные сохранены в localStorage');
    } catch (error) {
        console.error('Ошибка сохранения данных в localStorage:', error);
    }
}
  
const startCards = [
    {
    name: "Булочка с корицей",
    img: "https://e52e3ee2-628b-49a9-9e26-e5a61fd72b20.selcdn.net/upload/resize_cache/iblock/cce/960_640_1/Булочка%20с%20корицей%20в%20кружке.jpg",
    description: "Приготовлена с теплом и заботой",
    code: 123,
    provider: "ООО Бабушка"
    },
    {
    name: "Орешки со сгущенкой",
    img: "https://www.rmkk.by/assets/media/thumb/01-s68_w435.jpg",
    description: "Невероятный вкус детства",
    code: 234,
    provider: "ООО Мама"
    }
]

function resetPage() {
    localStorage.removeItem('products');
    if (!localStorage.getItem('products')) {
      saveToLocalStorage('products', startCards);
    }
    displayCards();
 }

if (!localStorage.getItem('products')) {
    saveToLocalStorage('products', startCards);
}
  
document.addEventListener('DOMContentLoaded', () => {
    displayCards();
});
  
function saveProduct() {
    const form = document.getElementById('productForm');
  
    if (!form.name.value || !form.code.value || !form.provider.value) {
        alert('Заполните обязательные поля: Название, Код товара, Поставщик');
        return;
    }
  
    if (form.code.value < 0){
        alert('Код не может быть отрицательным числом')
        return;
    }
  
    const product = {
        name: form.name.value,
        description: form.description.value,
        img: form.img.value,
        code: form.code.value,
        provider: form.provider.value,
    };
  
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
  
    displayCards();
    form.reset();
  }
  
  function createCardElement(product, index) {
    const card = document.createElement('div');
    card.classList.add('card');

    const figure = document.createElement('figure');
    figure.classList.add('img__poster');

    const img = document.createElement('img');
    img.classList.add('img-poster__image');
    img.src = product.img;
    img.alt = `Картинку потеряли...`;

    figure.appendChild(img);
    card.appendChild(figure);

    const databox = document.createElement('div');
    databox.classList.add('card__databox');
    card.appendChild(databox);

    const heading = document.createElement('div');
    heading.classList.add('card-databox__heading');

    const headingTitle = document.createElement('h3');
    headingTitle.textContent = product.name;
    heading.appendChild(headingTitle);

    const description = document.createElement('div');
    description.classList.add('card-databox__description');

    const descriptionParagraph1 = document.createElement('p');
    descriptionParagraph1.textContent = product.description;
    description.appendChild(descriptionParagraph1);

    const descriptionParagraph2 = document.createElement('p');
    descriptionParagraph2.innerHTML = `<strong>Код товара:</strong> ${product.code}`;
    description.appendChild(descriptionParagraph2);

    const descriptionParagraph3 = document.createElement('p');
    descriptionParagraph3.innerHTML = `<strong>Поставщик:</strong> ${product.provider}`;
    description.appendChild(descriptionParagraph3);

    databox.appendChild(heading);
    databox.appendChild(description);

    const editButton = createButton('Редактировать', () => editProduct(index));
    const deleteButton = createButton('Удалить', () => deleteProduct(index));

    databox.appendChild(editButton);
    databox.appendChild(deleteButton);

    return card;
}

function createButton(text, onClick) {
    const button = document.createElement('button');
    button.classList.add('button', 'button__card');
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
}

function displayCards() {
    const cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.innerHTML = '';

    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.forEach((product, index) => {
        const card = createCardElement(product, index);
        cardsContainer.appendChild(card);
    });
}

  
function editProduct(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products[index];
  
    const form = document.getElementById('productForm');
    form.name.value = product.name;
    form.description.value = product.description;
    form.img.value = product.img;
    form.code.value = product.code;
    form.provider.value = product.provider;
  
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
  
    displayCards();
}
  
function deleteProduct(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
  
    displayCards();
}
