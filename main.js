// Global Shoe E-Commerce Script

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initial State & Setup
  initNavigation();
  initCart();
  initCategoryPages();
  initProductDetailPage();
  initContactForm();
});

// --- NAVIGATION SCROLL EFFECT ---
function initNavigation() {
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Highlight active link in header based on current URL path
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (currentPath.includes(href) && href !== 'index.html') {
      link.classList.add('active');
    } else if (currentPath.endsWith('/') || currentPath.includes('index.html')) {
      if (href === 'index.html') link.classList.add('active');
    }
  });
}

// --- CART STATE & UI MANAGEMENT ---
let cart = [];

function initCart() {
  // Load from localStorage
  const savedCart = localStorage.getItem('shoe_cart');
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
    } catch (e) {
      cart = [];
    }
  }

  // Bind Drawer Open/Close UI elements
  const cartIcon = document.getElementById('cart-icon-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartClose = document.getElementById('cart-close-btn');

  if (cartIcon && cartDrawer && cartOverlay) {
    cartIcon.addEventListener('click', () => {
      cartDrawer.classList.add('open');
      cartOverlay.classList.add('open');
      renderCart();
    });
  }

  const closeCartFn = () => {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.remove('open');
      cartOverlay.classList.remove('open');
    }
  };

  if (cartClose) cartClose.addEventListener('click', closeCartFn);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCartFn);

  // Initial badge update
  updateCartBadge();
}

function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-badge');
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  badges.forEach(badge => {
    badge.textContent = totalQty;
    badge.style.display = totalQty > 0 ? 'flex' : 'none';
  });
}

function saveCart() {
  localStorage.setItem('shoe_cart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, size = '42', qty = 1) {
  const product = window.PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingItemIndex = cart.findIndex(item => item.id === productId && item.size === size);
  if (existingItemIndex > -1) {
    cart[existingItemIndex].qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      qty: qty
    });
  }

  saveCart();
  showToast(`已將「${product.name}」加入購物車！`);
  renderCart();
  
  // Auto open cart drawer
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  if (cartDrawer && cartOverlay) {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
  }
}

function renderCart() {
  const container = document.getElementById('cart-items-container');
  const totalValElement = document.getElementById('cart-total-price-val');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-empty-msg">您的購物車目前是空的。</div>';
    if (totalValElement) totalValElement.textContent = 'NT$ 0';
    return;
  }

  let html = '';
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    html += `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.name}</div>
          <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 5px;">尺寸: EU ${item.size}</div>
          <div class="cart-item-price">NT$ ${item.price.toLocaleString()}</div>
          <div class="cart-item-controls">
            <div class="cart-qty-select">
              <span class="cart-qty-btn" onclick="adjustCartQty(${index}, -1)">-</span>
              <span class="cart-qty-val">${item.qty}</span>
              <span class="cart-qty-btn" onclick="adjustCartQty(${index}, 1)">+</span>
            </div>
            <span class="cart-item-remove" onclick="removeCartItem(${index})"><i class="fas fa-trash-alt"></i> 移除</span>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  if (totalValElement) totalValElement.textContent = `NT$ ${total.toLocaleString()}`;
}

window.adjustCartQty = function(index, change) {
  if (cart[index]) {
    cart[index].qty += change;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    saveCart();
    renderCart();
  }
};

window.removeCartItem = function(index) {
  if (cart[index]) {
    const name = cart[index].name;
    cart.splice(index, 1);
    saveCart();
    renderCart();
    showToast(`已從購物車移除「${name}」`);
  }
};

// Checkout event
window.triggerCheckout = function() {
  if (cart.length === 0) return;
  alert('感謝您的訂購！本專案為靜態網頁展示，沒有後端處理。您的模擬訂單已建立。');
  cart = [];
  saveCart();
  renderCart();
  
  // Close drawer
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  if (cartDrawer && cartOverlay) {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
  }
};

// --- TOAST NOTIFICATIONS ---
function showToast(message) {
  // Check if toast-container exists
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 30px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
    `;
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.style.cssText = `
    background: rgba(18, 24, 36, 0.95);
    color: #fff;
    border-left: 4px solid var(--accent-gold);
    padding: 15px 25px;
    border-radius: 4px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    font-size: 0.95rem;
    font-weight: 500;
    min-width: 250px;
    transform: translateX(-120%);
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
  toast.innerHTML = `
    <span>${message}</span>
    <span style="margin-left: 15px; cursor: pointer; color: var(--text-muted);" onclick="this.parentElement.remove()">×</span>
  `;

  container.appendChild(toast);
  
  // Trigger transition
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 50);

  // Auto remove
  setTimeout(() => {
    toast.style.transform = 'translateX(-120%)';
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 4000);
}

// --- DYNAMIC CATEGORY PAGE RENDERING ---
function initCategoryPages() {
  const container = document.getElementById('category-product-grid');
  if (!container) return;

  // Detect which category page this is from custom data attribute
  const category = container.getAttribute('data-category');
  if (!category) return;

  const products = window.PRODUCTS.filter(p => p.category === category);
  renderProductGrid(container, products);

  // Setup sorting interactivity
  const sorter = document.getElementById('sort-products');
  if (sorter) {
    sorter.addEventListener('change', (e) => {
      let sorted = [...products];
      if (e.target.value === 'price-low') {
        sorted.sort((a, b) => a.price - b.price);
      } else if (e.target.value === 'price-high') {
        sorted.sort((a, b) => b.price - a.price);
      } else {
        // default by id sequence
        sorted = products;
      }
      renderProductGrid(container, sorted);
    });
  }
}

function renderProductGrid(container, products) {
  if (products.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">無此分類的產品</p>';
    return;
  }

  container.innerHTML = products.map(product => `
    <div class="product-card">
      <a href="product.html?id=${product.id}">
        <div class="product-img-wrapper">
          <img class="product-card-img" src="${product.image}" alt="${product.name}">
        </div>
      </a>
      <div class="product-info">
        <span class="product-category">${product.categoryName}</span>
        <a href="product.html?id=${product.id}">
          <h3 class="product-title">${product.name}</h3>
        </a>
        <div class="product-bottom">
          <span class="product-price">NT$ ${product.price.toLocaleString()}</span>
          <div class="btn-add-cart" onclick="addToCart('${product.id}')" title="加入購物車">
            <i class="fas fa-shopping-bag"></i>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Update page product counts
  const countDisplay = document.getElementById('category-product-count');
  if (countDisplay) {
    countDisplay.textContent = `共 ${products.length} 款產品`;
  }
}

// --- DYNAMIC PRODUCT DETAIL PAGE LOADING ---
function initProductDetailPage() {
  const container = document.getElementById('product-detail-page-wrapper');
  if (!container) return;

  // Parse product id from URL query parameter
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  if (!productId) {
    container.innerHTML = '<h2 style="grid-column: 1/-1; text-align: center; margin-top: 50px;">產品不存在，請返回商城。</h2>';
    return;
  }

  const product = window.PRODUCTS.find(p => p.id === productId);
  if (!product) {
    container.innerHTML = '<h2 style="grid-column: 1/-1; text-align: center; margin-top: 50px;">找不到該項產品！</h2>';
    return;
  }

  // Update HTML elements dynamically
  document.title = `${product.name} | Premium Shoe Store`;
  
  // Inject product data
  container.innerHTML = `
    <div class="product-gallery">
      <img class="product-main-img" src="${product.image}" alt="${product.name}" id="product-detail-img">
    </div>
    <div class="product-summary">
      <span class="detail-category">${product.categoryName}</span>
      <h1 class="detail-title">${product.name}</h1>
      <div class="detail-price">NT$ ${product.price.toLocaleString()}</div>
      
      <p class="detail-desc">${product.description}</p>
      
      <div class="detail-options">
        <div class="option-group">
          <span class="option-label">選擇尺寸 (EU)</span>
          <div class="size-selector" id="size-selector-container">
            <button class="size-btn">40</button>
            <button class="size-btn">41</button>
            <button class="size-btn active">42</button>
            <button class="size-btn">43</button>
            <button class="size-btn">44</button>
          </div>
        </div>
        
        <div class="option-group">
          <span class="option-label">顏色風格</span>
          <div class="color-selector">
            <span class="color-dot active black" data-color="經典黑"></span>
            <span class="color-dot white" data-color="簡約白"></span>
            <span class="color-dot brown" data-color="紳士棕"></span>
          </div>
        </div>
      </div>
      
      <div class="detail-actions">
        <div class="quantity-selector">
          <button class="qty-btn" id="qty-minus">-</button>
          <span class="qty-val" id="qty-value">1</span>
          <button class="qty-btn" id="qty-plus">+</button>
        </div>
        <button class="btn btn-primary" id="btn-add-detail-cart" style="flex-grow: 1;">加入購物車</button>
      </div>
      
      <div class="detail-features">
        <h4>產品特色</h4>
        <div class="feature-list" id="feature-list-container">
          ${product.features.map(f => `
            <div class="feature-item">
              <i class="fas fa-check"></i>
              <span>${f}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Bind interactive size buttons
  const sizeBtns = container.querySelectorAll('.size-btn');
  let selectedSize = '42';
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSize = btn.textContent;
    });
  });

  // Bind interactive colors
  const colorDots = container.querySelectorAll('.color-dot');
  colorDots.forEach(dot => {
    dot.addEventListener('click', () => {
      colorDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      const colorName = dot.getAttribute('data-color');
      showToast(`選擇顏色: ${colorName}`);
    });
  });

  // Bind quantity selector
  const qtyMinus = document.getElementById('qty-minus');
  const qtyPlus = document.getElementById('qty-plus');
  const qtyValue = document.getElementById('qty-value');
  let qtyVal = 1;

  if (qtyMinus && qtyPlus && qtyValue) {
    qtyMinus.addEventListener('click', () => {
      if (qtyVal > 1) {
        qtyVal--;
        qtyValue.textContent = qtyVal;
      }
    });
    qtyPlus.addEventListener('click', () => {
      qtyVal++;
      qtyValue.textContent = qtyVal;
    });
  }

  // Bind add-to-cart button
  const addToCartBtn = document.getElementById('btn-add-detail-cart');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      addToCart(product.id, selectedSize, qtyVal);
    });
  }
}

// --- CONTACT FORM SUBMISSION ---
function initContactForm() {
  const form = document.getElementById('contact-us-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Read input values
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;

    if (!name || !email || !message) {
      alert('請填寫所有必填欄位。');
      return;
    }

    // Display a beautiful feedback alert
    alert(`感謝您的來信，${name}！您的訊息「${subject}」已成功發送。我們會盡快與您聯絡。`);
    form.reset();
  });
}
