const apiUrl = 'http://localhost:3000/items'

function generateUniqueId() {
  return (Date.now() + Math.random()).toString();
}

const startCards = [
{
    id: generateUniqueId(),
    name: "Булочка с корицей",
    img: "https://e52e3ee2-628b-49a9-9e26-e5a61fd72b20.selcdn.net/upload/resize_cache/iblock/cce/960_640_1/Булочка%20с%20корицей%20в%20кружке.jpg",
    description: "Приготовлена с теплом и заботой",
    code: 123,
    provider: "ООО Бабушка"
},
{
    id: generateUniqueId(),
    name: "Орешки со сгущенкой",
    img: "https://www.rmkk.by/assets/media/thumb/01-s68_w435.jpg",
    description: "Невероятный вкус детства",
    code: 234,
    provider: "ООО Мама"
}
]

async function fetchApi(url, options) {
  return await fetch(url, options)
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .catch(error => {
          console.error('Error:', error);
      });
}

async function saveProduct() {
  const form = document.getElementById('productForm');

  if (!form.name.value || !form.code.value || !form.provider.value) {
    alert('Заполните обязательные поля: Название, Код товара, Поставщик');
    return;
  }

  if (form.code.value < 0) {
    alert('Код не может быть отрицательным числом');
    return;
  }

  const product = {
    id: generateUniqueId(),
    name: form.name.value,
    description: form.description.value,
    img: form.img.value,
    code: form.code.value,
    provider: form.provider.value,
  };

  const loader = document.getElementById('loader');
  loader.style.display = 'block';

  await fetchApi(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  }).then(() => {
    loader.style.display = 'none';
    displayCards();
  });

  form.reset();
}

function displayCards() {
  const cardsContainer = document.getElementById('cardsContainer');
  cardsContainer.innerHTML = '';

  fetchApi(apiUrl, { method: 'GET' })
      .then(products => {
          products.forEach((product, index) => {
              const card = document.createElement('div');
              card.classList.add('card');

              card.innerHTML = `
                  <figure class="img__poster">
                      <img class="img-poster__image" src="${product.img}" alt="${product.name}">
                  </figure>
                  <div class="card__databox">
                      <div class="card-databox__heading">
                          <h3>${product.name}</h3>
                      </div>
                      <div class="card-databox__description">
                          <p>${product.description}</p>
                          <p><strong>Код товара:</strong> ${product.code}</p>
                          <p><strong>Поставщик:</strong> ${product.provider}</p>
                      </div>
                      <button class="button button__card" onclick="editProduct(${product.id})">Редактировать</button>
                      <button class="button button__card" onclick="deleteProduct(${product.id})">Удалить</button>
                  </div>
              `;

              cardsContainer.appendChild(card);
          });
      });
}

async function editProduct(id) {
  try {
    const product = await fetchApi(apiUrl + `/${id}`, { method: 'GET' });

    const form = document.getElementById('productForm');
    form.name.value = product.name;
    form.description.value = product.description;
    form.img.value = product.img;
    form.code.value = product.code;
    form.provider.value = product.provider;

    const saveButton = document.createElement('button');
    saveButton.classList.add('button')
    saveButton.innerText = 'Сохранить изменения';
    saveButton.addEventListener('click', async () => {
      const updatedProduct = {
        id: product.id,
        name: form.name.value,
        description: form.description.value,
        img: form.img.value,
        code: form.code.value,
        provider: form.provider.value,
      };

      await fetchApi(apiUrl + `/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      displayCards();
    });

    const existingSaveButton = form.querySelector('#save');
    if (existingSaveButton) {
      existingSaveButton.style.display = 'none';
    }

    form.appendChild(saveButton);
  } catch (error) {
    console.error('Error editing product:', error);
  }
}

async function deleteProduct(id) {
  await fetchApi(apiUrl + `/${id}`, { method: 'DELETE' })
      .then(() => displayCards());
}

async function clearDatabase() {
  try {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    const products = await fetchApi(apiUrl, { method: 'GET' });

    for (const product of products) {
      deleteProduct(product.id);
    }

    displayCards();
  } catch (error) {
    console.error('Error clearing database:', error);
  } finally {
    loader.style.display = 'none';
  }
}


async function resetPage() {
  try {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    clearDatabase()

    for (const card of startCards) {
      await fetchApi(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(card),
      });
    }

    displayCards();
  } catch (error) {
    console.error('Error resetting page:', error);
  } finally {
    loader.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  displayCards();
  displayCreatorInfo();
});

function displayCreatorInfo() {
  const creatorInfoContainer = document.getElementById('creatorInfo');

  fetchApi('http://localhost:3000/creatorInfo', { method: 'GET' })
    .then(creatorInfo => {
      creatorInfoContainer.innerHTML = '';

      const creatorName = document.createElement('p');
      creatorName.textContent = `ФИ: ${creatorInfo.name}`;

      const creatorGroup = document.createElement('p');
      creatorGroup.textContent = `Группа: ${creatorInfo.group}`;

      creatorInfoContainer.appendChild(creatorName);
      creatorInfoContainer.appendChild(creatorGroup);
    })
    .catch(error => {
      console.error('Error fetching creator information:', error);
    });
}