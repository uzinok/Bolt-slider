class BoltSlider {
    constructor(slider, options = null) {

        // slider list
        this.slider = slider;
        if (options === null) {
            options = {};
        }

        this.slides = this.slider.querySelectorAll('.bolt-slider__item');
        // count slide
        this.countSlide = this.slides.length;

        // parent block
        this.parentBlock = this.slider.parentNode;
        // width sliderList
        this.responze = options.responze || false;
        this.countSlideWiev = options.countSlideWiev || this.getCountSlideWiev() || 1;
        // this.infinite = options.infinite || false;

        // controll list
        this.controllOff = options.controllOff || false;
        this.controllClass = options.controllClass || false;
        this.controllAria = options.controllAria || 'Gallery controls';

        this.btnNextClass = options.btnNextClass || false;
        this.btnNextText = options.btnNextText || false;
        this.btnNextAria = options.btnNextAria || 'Next';

        this.btnPrevClass = options.btnPrevClass || false;
        this.btnPrevText = options.btnPrevText || false;
        this.btnPrevAria = options.btnPrevAria || 'Previous';


        // css interactive
        this.interactiveCSS = `a[href]:not([tabindex='-1']), area[href]:not([tabindex='-1']), input:not([disabled]):not([tabindex='-1']), select:not([disabled]):not([tabindex='-1']), textarea:not([disabled]):not([tabindex='-1']), button:not([disabled]):not([tabindex='-1']), iframe:not([tabindex='-1']), [tabindex]:not([tabindex='-1']), [contentEditable=true]:not([tabindex='-1'])`;

        // init slider
        this.sliderInint();
    }
}

// init
BoltSlider.prototype.sliderInint = function () {
    // init
    this.slider.classList.add('bolt-slider--init');

    this.getWidthSlider();

    let boltWrap = document.createElement('div');
    boltWrap.classList.add('bolt-slider-wrap');
    this.parentBlock.insertBefore(boltWrap, this.slider);
    boltWrap.appendChild(this.slider);

    // controll
    if (!this.controllOff) {
        this.drawControll();
        this.checkControll();
    }

    // resize
    window.addEventListener('resize', windowResize.bind(null, this), false);

    function windowResize(obj) {
        if (obj.responze) {
            obj.getCountSlideWiev();
            if (!obj.controllOff) {
                obj.checkControll();
            }
        }
        obj.getWidthSlider();
    }
}

BoltSlider.prototype.checkControll = function () {
    if (this.responze) {
        if (this.countSlideWiev >= this.countSlide) {
            this.controllList.hidden = true;
        } else if (this.countSlideWiev < this.countSlide) {
            this.controllList.hidden = false;
        }
    }
    this.getWidthSlider();
}

BoltSlider.prototype.getWidthSlider = function () {
    this.slider.style.width = (this.parentBlock.offsetWidth / this.countSlideWiev) * this.countSlide + 'px';
}

BoltSlider.prototype.getCountSlideWiev = function () {
    for (let responzeWidth in this.responze) {
        if (responzeWidth < window.innerWidth) {
            this.countSlideWiev = this.responze[responzeWidth];
        }
    }
    return this.countSlideWiev;
}
// \init

// controll
BoltSlider.prototype.drawControll = function () {
    this.controllList = document.createElement('ul');
    if (this.controllClass) {
        this.controllList.classList.add(this.controllClass);
    }
    this.controllList.setAttribute('aria-label', this.controllAria);

    let li = document.createElement('li');
    let btnNext = document.createElement('button');
    if (this.btnNextClass) {
        btnNext.classList.add(this.btnNextClass);
    }
    if (this.btnNextText) {
        btnNext.innerHTML = this.btnNextText;
    } else {
        btnNext.setAttribute('aria-label', this.btnNextAria);
    }

    let li1 = document.createElement('li');
    let btnPrev = document.createElement('button');
    if (this.btnPrevClass) {
        btnPrev.classList.add(this.btnPrevClass);
    }
    if (this.btnPrevText) {
        btnPrev.innerHTML = this.btnPrevText;
    } else {
        btnPrev.setAttribute('aria-label', this.btnPrevAria);
    }

    li.appendChild(btnNext);
    this.controllList.appendChild(li);
    li1.appendChild(btnPrev);
    this.controllList.appendChild(li1);

    this.parentBlock.appendChild(this.controllList)
}
// \controll