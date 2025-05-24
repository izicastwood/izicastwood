// script.js
console.log('script.js подключён');

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded сработал');

  // Табы на странице товара
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  tabButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      tabPanels[idx].classList.add('active');
    });
  });

  // Логика калькулятора
  const calcForm = document.querySelector('.calculator-form');
  console.log('calcForm =', calcForm);
  if (!calcForm) return console.warn('Форма калькулятора не найдена!');

  const resultEl       = calcForm.querySelector('.result strong');
  const lengthInput    = document.getElementById('length');
  const widthInput     = document.getElementById('width');
  const thicknessInput = document.getElementById('thickness');
  const checkboxes     = calcForm.querySelectorAll('input[type="checkbox"]');

  console.log('lengthInput =', lengthInput, 'widthInput =', widthInput, 'thicknessInput =', thicknessInput);

  function calculatePrice() {
    const length    = parseFloat(lengthInput.value)    || 0;
    const width     = parseFloat(widthInput.value)     || 0;
    const thickness = parseFloat(thicknessInput.value) || 0;
    console.log('Расчёт:', { length, width, thickness });
    let basePrice = 2000 + (length * width * 5) + (thickness * 200);
    checkboxes.forEach(cb => { if (cb.checked) basePrice += 500; });
    return Math.round(basePrice);
  }

  calcForm.addEventListener('input', () => {
    console.log('input event');
    const price = calculatePrice();
    resultEl.textContent = price + ' ₽';
  });

  calcForm.addEventListener('submit', function() {
    // подстановка скрытых полей, если используете Formspree
    calcForm.querySelector('input[name="length"]').value    = lengthInput.value;
    calcForm.querySelector('input[name="width"]').value     = widthInput.value;
    calcForm.querySelector('input[name="thickness"]').value = thicknessInput.value;
  });
});
