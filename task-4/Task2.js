const form = document.getElementById('contactForm');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !subject || !message) {
    showMessage('Please fill in all fields.', 'error');
    return;
  }

  if (!emailPattern.test(email)) {
    showMessage('Please enter a valid email address.', 'error');
    return;
  }

showMessage('Your message has been sent successfully!', 'success');
confetti(); // 🎉 Celebration effect
form.reset();

  // Redirect to previous page after 3 seconds
  setTimeout(() => {
    window.history.back();
  }, 3000);
});



function showMessage(msg, type) {
  confetti();
  formMessage.textContent = msg;
  formMessage.className = '';
  formMessage.classList.add(type);
  formMessage.classList.add('visible');
  formMessage.classList.remove('hidden');

  // Optional auto-hide
  setTimeout(() => {
    formMessage.classList.add('hidden');
  }, 2500);
}
