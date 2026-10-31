// Данные автомобилей
const cars = [
  { id: 1, name: 'Toyota Camry', type: 'sedan', price: 3200000, year: 2024, engine: '2.5 л, 200 л.с.', gearbox: 'Автомат', img: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800' },
  { id: 2, name: 'BMW X5', type: 'suv', price: 8900000, year: 2023, engine: '3.0 л, 340 л.с.', gearbox: 'Автомат', img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800' },
  { id: 3, name: 'Porsche 911', type: 'sport', price: 14500000, year: 2024, engine: '3.0 л, 385 л.с.', gearbox: 'Робот', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800' },
  { id: 4, name: 'Mercedes E-Class', type: 'sedan', price: 6700000, year: 2023, engine: '2.0 л, 258 л.с.', gearbox: 'Автомат', img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800' },
  { id: 5, name: 'Audi Q7', type: 'suv', price: 7800000, year: 2022, engine: '3.0 л, 249 л.с.', gearbox: 'Автомат', img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800' },
  { id: 6, name: 'Chevrolet Camaro', type: 'sport', price: 5400000, year: 2022, engine: '6.2 л, 455 л.с.', gearbox: 'Автомат', img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800' },
];

const formatPrice = (n) => n.toLocaleString('ru-RU') + ' ₽';

// Шапка при скролле
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// Бургер-меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  nav.classList.toggle('open');
});
nav.querySelectorAll('a').forEach((link) =>
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    nav.classList.remove('open');
  })
);

// Каталог
const cardsEl = document.getElementById('cards');

function renderCards(filter = 'all') {
  const list = filter === 'all' ? cars : cars.filter((c) => c.type === filter);
  cardsEl.innerHTML = list.map((car) => `
    <article class="card">
      <img class="card__img" src="${car.img}" alt="${car.name}" loading="lazy">
      <div class="card__body">
        <h3 class="card__title">${car.name}</h3>
        <p class="card__specs">${car.year} · ${car.engine} · ${car.gearbox}</p>
        <div class="card__footer">
          <span class="card__price">${formatPrice(car.price)}</span>
          <button class="btn btn--primary" data-id="${car.id}">Подробнее</button>
        </div>
      </div>
    </article>
  `).join('');
}

document.querySelectorAll('.filters__btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector('.filters__btn.active').classList.remove('active');
    btn.classList.add('active');
    renderCards(btn.dataset.filter);
  });
});

// Модальное окно
const modal = document.getElementById('modal');
const carSelect = document.getElementById('carSelect');
let currentCar = null;

cardsEl.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-id]');
  if (!btn) return;
  currentCar = cars.find((c) => c.id === Number(btn.dataset.id));
  document.getElementById('modalImg').src = currentCar.img;
  document.getElementById('modalImg').alt = currentCar.name;
  document.getElementById('modalTitle').textContent = currentCar.name;
  document.getElementById('modalPrice').textContent = formatPrice(currentCar.price);
  document.getElementById('modalSpecs').innerHTML = `
    <li>Год выпуска <b>${currentCar.year}</b></li>
    <li>Двигатель <b>${currentCar.engine}</b></li>
    <li>Коробка <b>${currentCar.gearbox}</b></li>
  `;
  modal.classList.add('open');
});

const closeModal = () => modal.classList.remove('open');
document.getElementById('modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

document.getElementById('modalBtn').addEventListener('click', () => {
  if (currentCar) carSelect.value = currentCar.name;
  closeModal();
});

// Список авто в форме
carSelect.insertAdjacentHTML('beforeend',
  cars.map((c) => `<option value="${c.name}">${c.name}</option>`).join('')
);

// Кредитный калькулятор
const price = document.getElementById('price');
const down = document.getElementById('down');
const term = document.getElementById('term');
const RATE = 4.9;

function calcCredit() {
  const p = Number(price.value);
  const d = Number(down.value);
  const t = Number(term.value);
  const loan = p * (1 - d / 100);
  const r = RATE / 100 / 12;
  const monthly = loan * (r * Math.pow(1 + r, t)) / (Math.pow(1 + r, t) - 1);

  document.getElementById('priceOut').textContent = formatPrice(p);
  document.getElementById('downOut').textContent = `${d}% (${formatPrice(p * d / 100)})`;
  document.getElementById('termOut').textContent = `${t / 12} ${t === 12 ? 'год' : t < 60 ? 'года' : 'лет'}`;
  document.getElementById('monthly').textContent = formatPrice(Math.round(monthly));
}

[price, down, term].forEach((input) => input.addEventListener('input', calcCredit));

// Форма заявки
const form = document.getElementById('form');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const { name, phone } = form.elements;
  const phoneValid = phone.value.replace(/\D/g, '').length >= 10;

  name.classList.toggle('error', !name.value.trim());
  phone.classList.toggle('error', !phoneValid);

  if (!name.value.trim() || !phoneValid) {
    formMessage.className = 'form__message error';
    formMessage.textContent = 'Пожалуйста, укажите имя и корректный телефон';
    return;
  }

  formMessage.className = 'form__message success';
  formMessage.textContent = `Спасибо, ${name.value.trim()}! Мы перезвоним вам в ближайшее время.`;
  form.reset();
});

// Анимация счётчиков
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    const duration = 1500;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target).toLocaleString('ru-RU');
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

// Старт
document.getElementById('year').textContent = new Date().getFullYear();
renderCards();
calcCredit();
animateCounters();
