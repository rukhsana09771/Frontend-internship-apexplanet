const products = [
  // Books
  {
    name: 'JavaScript: The Good Parts',
    price: '$25',
    category: 'books',
    description: 'Classic guide to better JavaScript coding.',
    image: 'js.png',
  },
  {
    name: 'Python Crash Course',
    price: '$30',
    category: 'books',
    description: 'A hands-on, project-based introduction to Python.',
    image: 'images.png',
  },
  {
    name: 'Atomic Habits',
    price: '$18',
    category: 'books',
    description: 'Tiny changes, remarkable results.',
    image: 'aromic.jpg',
  },
  {
    name: 'Clean Code',
    price: '$35',
    category: 'books',
    description: 'A handbook of agile software craftsmanship.',
    image: 'cleancode.jpg',
  },
  // Electronics
  {
    name: 'Wireless Earbuds',
    price: '$59',
    category: 'electronics',
    description: 'High-quality sound with long-lasting battery.',
    image: 'earbuds.jpg',
  },
  {
    name: 'Smartwatch Pro',
    price: '$149',
    category: 'electronics',
    description: 'Track fitness, messages, and more.',
    image: 'smartwatch.jpg',
  },
  // Clothing
  {
    name: 'Denim Jacket',
    price: '$89',
    category: 'clothing',
    description: 'Timeless fashion for any season.',
    image: 'denim.jpg',
  },
  {
    name: 'Graphic T-Shirt',
    price: '$29',
    category: 'clothing',
    description: 'Comfortable and stylish tee.',
    image: 'tshirt.jpg',
  }
];

const productContainer = document.getElementById('productContainer');
const searchInput = document.getElementById('searchInput');

function renderProducts(items) {
  productContainer.innerHTML = '';

  if (items.length === 0) {
    productContainer.innerHTML = '<p style="grid-column: 1 / -1;">No products found.</p>';
    return;
  }

  items.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="content">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">${product.price}</p>
        <button class="add-btn" onclick="addToCart('${product.name}')">Add to Cart</button>
      </div>
    `;
    productContainer.appendChild(card);
  });
}

function filterProducts(category) {
  const filtered =
    category === 'all'
      ? products
      : products.filter(product => product.category === category);
  renderProducts(filtered);
}

function addToCart(productName) {
  alert(`${productName} added to cart!`);
}

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm)
  );
  renderProducts(filtered);
});

// Initial render
renderProducts(products);
