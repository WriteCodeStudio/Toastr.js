/**
 * @author OsirisFrik
 */

/**
 * @typedef { Object } ToastrConfig
 * @property { Boolean } [animate=true]
 * @property { ('top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center' ) } [position=top-right]
 * @property { ( 'fade' ) } [animation=fade]
 * @property { Number } [timeout=6000] - This is a default timeout to remove toastr, you can change individuali per toastr
 */

let mainContainer;
let container = document.getElementById('toastr-container') || document.createElement('div');
let toastrs = [];

class Toastr {
  
  /**
   * @method constructor
   * @param { ToastrConfig } config
   * @param { HTMLElement } appendTo
   */

  constructor(
    config = {
      position: 'top-right',
      animation: 'fade',
      animate: true,
      timeout: 6000
    },
    appendTo = document.body
  ) {
    if (!container.id) container.id = 'toastr-container';
    mainContainer = appendTo;

    /**
     * @type { ToastrConfig }
     */
    this.config = config;

    container.classList.add('toastr-container', config.position);
    mainContainer = appendTo;

    mainContainer.appendChild(container);
  }

  toastr(message, type = 'info', timeout = this.config.timeout, customClass = []) {
    let toastr = document.createElement('div');
    let id = Math.floor(Math.random() * 0xFFFFFF).toString(16);

    toastr.classList.add('toastr', type, ...customClass);
    toastr.id = id;
    toastr.innerHTML = message;

    if (this.config.animate) {
      toastr.classList.add('animated', `${this.config.animation}In${this.__getAnimationSide(true)}` );
    }

    toastrs.push(id);
    container.appendChild(toastr);

    setTimeout(() => this.removeToastr(toastr), timeout);
  };

  removeToastr(toastr, count = 0) {
    try {
      let toastrIndex = toastrs.findIndex(item => item === toastr.id);
      
      if (this.config.animate) {
        toastr.classList.add(`${this.config.animation}Out${this.__getAnimationSide(false)}`);
        setTimeout(() => {
          container.removeChild(toastr);
          toastrs.splice(toastrIndex, 1);
        }, 1000);
      } else {
        container.removeChild(toastr);
        toastrs.splice(toastrIndex, 1);
      }
    } catch (err) {
      if (count <= 5) {
        toastr = document.getElementById(toastr.id);
        this.removeToastr(toastr, count++);
      } else {
        throw new Error(`Can't remove toastr ${toastr.id}`);
      }
    }
  }

  success(message, timeout, customClass) {
    return this.toastr(message, 'success', timeout, customClass)
  }

  error(message, timeout, customClass) {
    return this.toastr(message, 'error', timeout, customClass);
  }

  warning(message, timeout, customClass) {
    return this.toastr(message, 'warning', timeout, customClass);
  }

  info(message, timeout, customClass) {
    return this.toastr(message, 'info', timeout, customClass);
  }

  /**
   * @method updateConfig
   * @param { ToastrConfig } config 
   */
  updateConfig(config = {
    position: 'top-right',
    animation: 'fade',
    animate: true
  }) {
    for (const key in this.config) {
      if (config[key] && config[key] !== this.config[key]) {
        if (key === 'position') {
          container.classList.replace(this.config.position, config.position);
        }
        this.config[key] = config[key];
      }
    }
  };

  /**
   * @method __getAnimationSide
   * @param { Boolean } [In=false]
   */

  __getAnimationSide(In = false) {
    let position = this.config.position;

    if (position.includes('top-')) {
      if (position.includes('center')) return In ? 'Down' : 'Up';
      else return position.includes('left') ? 'Left' : 'Right';
    }

    if (position.includes('bottom-')) {
      if (position.includes('center')) return In ? 'Up' : 'Down';
      else return position.includes('left') ? 'Left' : 'Right';
    }
  }
}

module.exports = Toastr;