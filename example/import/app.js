import Toastr from '../../src/toastr';
import '../../dist/css/toastr.min.css'

const toastr = new Toastr({
  position: 'top-right',
  animate: true,
  animation: 'fade',
  timeout: 100000
});

/**
 * @type { HTMLSelectElement }
 */
let select = document.createElement('select');
let positions = [
  'top-right',
  'top-left',
  'top-center',
  'bottom-right',
  'bottom-left',
  'bottom-center'
];
let buttons = [
  'success',
  'error',
  'warning',
  'info'
]

function init() {
  for (let i = 0; i < positions.length; i++) {
    const option = document.createElement('option');
    option.value = positions[i];
    option.innerText = positions[i];
    select.appendChild(option);
  }

  for (let i = 0; i < buttons.length; i++) {
    const button = document.getElementById(buttons[i]);
    if (button) button.onclick = () => toastr[buttons[i]](`${buttons[i]} test`);
  }

  select.classList.add('pure-input');
  select.onchange = updatePosition;
  document.getElementById('form').appendChild(select);
}

function updatePosition(e) {
  toastr.updateConfig({
    position: select.value
  });

  toastr.success(`Position changed to ${select.value.split('-').join(' ')}`);
}

window.onload = init;
