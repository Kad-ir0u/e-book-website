document.addEventListener('DOMContentLoaded', function () {
  var currentPath = window.location.pathname.replace(/\/+$/, '') || '/index.html';
  var currentPage = currentPath.split('/').pop();

  var navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  var toggle = document.getElementById('mobile-toggle');
  var nav = document.querySelector('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  var loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('email');
      var password = document.getElementById('password');
      var valid = true;

      if (!email.value || !isValidEmail(email.value)) {
        email.closest('.form-group').classList.add('error');
        valid = false;
      } else {
        email.closest('.form-group').classList.remove('error');
      }

      if (!password.value || password.value.length < 6) {
        password.closest('.form-group').classList.add('error');
        valid = false;
      } else {
        password.closest('.form-group').classList.remove('error');
      }

      if (valid) {
        window.location.href = 'index.html';
      }
    });
  }

  var registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('name');
      var email = document.getElementById('email');
      var password = document.getElementById('password');
      var confirm = document.getElementById('confirm-password');
      var valid = true;

      if (!name.value) {
        name.closest('.form-group').classList.add('error');
        valid = false;
      } else {
        name.closest('.form-group').classList.remove('error');
      }

      if (!email.value || !isValidEmail(email.value)) {
        email.closest('.form-group').classList.add('error');
        valid = false;
      } else {
        email.closest('.form-group').classList.remove('error');
      }

      if (!password.value || password.value.length < 6) {
        password.closest('.form-group').classList.add('error');
        valid = false;
      } else {
        password.closest('.form-group').classList.remove('error');
      }

      if (!confirm.value || confirm.value !== password.value) {
        confirm.closest('.form-group').classList.add('error');
        valid = false;
      } else {
        confirm.closest('.form-group').classList.remove('error');
      }

      if (valid) {
        window.location.href = 'index.html';
      }
    });
  }

  var forgotForm = document.getElementById('forgot-form');
  if (forgotForm) {
    forgotForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('email');
      if (!email.value || !isValidEmail(email.value)) {
        email.closest('.form-group').classList.add('error');
      } else {
        email.closest('.form-group').classList.remove('error');
        alert('If an account exists with that email, we\'ve sent a reset link.');
      }
    });
  }

  var resetForm = document.getElementById('reset-form');
  if (resetForm) {
    resetForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var password = document.getElementById('password');
      var confirm = document.getElementById('confirm-password');
      var valid = true;

      if (!password.value || password.value.length < 6) {
        password.closest('.form-group').classList.add('error');
        valid = false;
      } else {
        password.closest('.form-group').classList.remove('error');
      }

      if (!confirm.value || confirm.value !== password.value) {
        confirm.closest('.form-group').classList.add('error');
        valid = false;
      } else {
        confirm.closest('.form-group').classList.remove('error');
      }

      if (valid) {
        window.location.href = 'login.html';
      }
    });
  }

  function initPayPalButton() {
    var container = document.getElementById('paypal-button-container');
    if (!container) return;
    if (typeof paypal === 'undefined') {
      setTimeout(initPayPalButton, 500);
      return;
    }
    paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'pay'
      },
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '39.00',
              currency_code: 'USD'
            },
            description: '24 Hours, Used Properly - E-Book',
            item: {
              name: '24 Hours, Used Properly',
              description: 'Time Management & Productivity Guide',
              unit_amount: { value: '39.00', currency_code: 'USD' },
              quantity: '1',
              category: 'DIGITAL_GOODS'
            }
          }]
        });
      },
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
          window.location.href = 'thank-you.html';
        }).catch(function (err) {
          console.error('Capture error:', err);
          window.location.href = 'thank-you.html';
        });
      },
      onError: function (err) {
        console.error('PayPal error:', err);
      }
    }).render('#paypal-button-container');
  }
  initPayPalButton();

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  var inputs = document.querySelectorAll('.form-group input');
  inputs.forEach(function (input) {
    input.addEventListener('input', function () {
      this.closest('.form-group').classList.remove('error');
    });
  });
});
