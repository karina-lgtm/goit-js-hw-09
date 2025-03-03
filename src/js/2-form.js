
const STORAGE_KEY = 'feedback-msg';

const refs = {
  form: document.querySelector('.feedback-form'),
};

// Оголошуємо змінну для збереження стану форми
let formData = loadFromLS(STORAGE_KEY) || { email: '', message: '' };

// Заповнюємо поля форми при завантаженні сторінки
initPage();

refs.form.addEventListener('input', e => {
  // Оновлюємо лише відповідне поле в об'єкті formData
  formData[e.target.name] = e.target.value.trim();
  saveToLS(STORAGE_KEY, formData);
});

refs.form.addEventListener('submit', e => {
  e.preventDefault();

  // Якщо хоча б одне поле порожнє, виводимо повідомлення і не відправляємо форму
  if (!formData.email || !formData.message) {
    return alert('Fill please all fields');
  }

  console.log(formData);

  // Очищаємо сховище, форму та об'єкт formData
  localStorage.removeItem(STORAGE_KEY);
  refs.form.reset();
  formData = { email: '', message: '' };
});

function initPage() {
  refs.form.elements.email.value = formData.email || '';
  refs.form.elements.message.value = formData.message || '';
}

function saveToLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromLS(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

