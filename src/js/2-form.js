const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const formData = {
    email: '',
    message: '',
};

document.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        formData.email = parsedData.email || '';
        formData.message = parsedData.message || '';

        form.elements.email.value = formData.email;
        form.elements.message.value = formData.message;
    }
});

form.addEventListener('input', (event) => {
    formData[event.target.name] = event.target.value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!formData.email || !formData.message) {
        alert('Fill please all fields');
        return;
    }

    console.log('Submitted data:', formData);

    localStorage.removeItem(STORAGE_KEY);
    form.reset();
    formData.email = '';
    formData.message = '';
});
