class BoltSlider {
    constructor(slider, options = null) {

        // slider list
        if (options === null) {
            options = {};
        }

        // init
        this.slider = slider;
        this.slides = this.slider.querySelectorAll('.bolt-slider__item');
        this.countSlide = this.slides.length;
        this.parentBlock = this.slider.parentNode;
        this.widthSlide = 0;

        this.responze = options.responze || false;
        this.countSlideWiev = options.countSlideWiev || this.getCountSlideWiev() || 1;
        this.currentSlideNumber = options.currentSlideNumber || 0;
        this.adaptiveHeight = options.adaptiveHeight || false;

        // infinite
        this.infinite = options.infinite || false;
        this.infiniteView = false;
        this.firstLi = false;
        this.lastLi = false;

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
        if (this.infinite) {
            this.createInfinite();
        }
        this.sliderInint();
        this.checkControllInfinite();
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
    }

    // resize
    window.addEventListener('resize', windowResize.bind(null, this), false);

    function windowResize(obj) {
        if (obj.responze) {
            obj.getCountSlideWiev();
            if (!obj.controllOff) {
                obj.checkControllInfinite();
            }
        }
        obj.getWidthSlider();
    }

    if (this.countSlideWiev == 1 && this.lastLi && this.infiniteView) {
        this.infiniteView = true;
        this.firstLi.hidden = false;
        this.lastLi.hidden = false;
        this.countSlide = this.slides.length + 2;
        this.currentSlideNumber++;
    }
}

BoltSlider.prototype.checkControllInfinite = function () {

    if (this.responze) {
        if (this.countSlideWiev > 1 && this.lastLi && this.infiniteView) {
            this.infiniteView = false;
            this.firstLi.hidden = true;
            this.lastLi.hidden = true;
            this.countSlide = this.slides.length;
            this.currentSlideNumber--;
        } else if (this.countSlideWiev == 1 && this.lastLi && !this.infiniteView) {
            this.infiniteView = true;
            this.firstLi.hidden = false;
            this.lastLi.hidden = false;
            this.countSlide = this.slides.length + 2;
            this.currentSlideNumber++;
        }
        if (this.countSlideWiev >= this.countSlide) {
            this.controllList.hidden = true;
        } else if (this.countSlideWiev < this.countSlide) {
            this.controllList.hidden = false;
        }
    }
    this.getWidthSlider();

    this.drawSlide();
}

BoltSlider.prototype.getWidthSlider = function () {
    this.slider.style.width = (this.parentBlock.offsetWidth / this.countSlideWiev) * this.countSlide + 'px';
    this.widthSlide = this.parentBlock.offsetWidth / this.countSlideWiev;
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

// infinite
BoltSlider.prototype.createInfinite = function () {
    this.infiniteView = true;
    this.firstLi = document.createElement('li');
    this.firstLi.innerHTML = this.slides[this.slides.length - 1].innerHTML;
    this.firstLi.setAttribute('class', this.slides[this.slides.length - 1].getAttribute('class'));

    this.lastLi = document.createElement('li');
    this.lastLi.innerHTML = this.slides[0].innerHTML;
    this.lastLi.setAttribute('class', this.slides[0].getAttribute('class'));

    this.slider.insertBefore(this.firstLi, this.slides[0]);
    this.slider.appendChild(this.lastLi);
}
// \infinite

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

    this.parentBlock.appendChild(this.controllList);
}
// \controll

// drawSlide
BoltSlider.prototype.drawSlide = function () {
    console.log(this.currentSlideNumber)
    this.slider.style.transform = `translateX(-${this.widthSlide * this.currentSlideNumber}px)`;
}
// \drawSlide