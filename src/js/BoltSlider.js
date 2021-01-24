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

        this.speed = options.speed || 200;

        // infinite
        this.infinite = options.infinite || false;
        this.infiniteView = false;
        this.firstLi = false;
        this.lastLi = false;

        // controll list
        this.controllOff = options.controllOff || false;
        this.controllClass = options.controllClass || false;
        this.controllAria = options.controllAria || 'Gallery controls';

        this.btnNext = '';
        this.btnNextClass = options.btnNextClass || false;
        this.btnNextText = options.btnNextText || false;
        this.btnNextAria = options.btnNextAria || 'Next';

        this.btnPrev = '';
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
    }

    if (this.countSlideWiev == 1 && this.lastLi && this.infiniteView) {
        this.infiniteView = true;
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
            this.slider.style.transform = '';
            this.slider.style.width = '';
        } else if (this.countSlideWiev < this.countSlide) {
            this.getWidthSlider();
            this.controllList.hidden = false;
            this.getWidthSlider();
            this.actionSlide();
        }
    }
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
    this.btnNext = document.createElement('button');
    if (this.btnNextClass) {
        this.btnNext.classList.add(this.btnNextClass);
    }
    if (this.btnNextText) {
        this.btnNext.innerHTML = this.btnNextText;
    } else {
        this.btnNext.setAttribute('aria-label', this.btnNextAria);
    }

    let li1 = document.createElement('li');
    this.btnPrev = document.createElement('button');
    if (this.btnPrevClass) {
        this.btnPrev.classList.add(this.btnPrevClass);
    }
    if (this.btnPrevText) {
        this.btnPrev.innerHTML = this.btnPrevText;
    } else {
        this.btnPrev.setAttribute('aria-label', this.btnPrevAria);
    }

    li.appendChild(this.btnNext);
    this.controllList.appendChild(li);
    li1.appendChild(this.btnPrev);
    this.controllList.appendChild(li1);

    this.parentBlock.appendChild(this.controllList);

    this.btnNext.addEventListener('click', btnNextClick.bind(null, this))

    function btnNextClick(obj) {
        obj.nextSlider();
    }

    this.btnPrev.addEventListener('click', btnPrevClick.bind(null, this))

    function btnPrevClick(obj) {
        obj.prevSlider();
    }
}

// \controll

// actionSlide
BoltSlider.prototype.nextSlider = function () {

    this.slider.style.transition = `transform ${this.speed}ms linear 0ms`;

    if (this.infiniteView && (this.currentSlideNumber++) >= (this.countSlide - 2)) {

        this.actionSlide();
        setTimeout(nullCurrentSlideNumber.bind(null, this), this.speed)

    } else if ((this.currentSlideNumber + this.countSlideWiev) >= (this.countSlide - 1) && !this.infiniteView) {

        this.currentSlideNumber += this.countSlideWiev;
        console.log(this.countSlideWiev)
        this.actionSlide();
        this.btnNext.disabled = true;

    } else {

        this.currentSlideNumber = this.currentSlideNumber + this.countSlideWiev;
        this.actionSlide();

    }

    function nullCurrentSlideNumber(obj) {
        obj.currentSlideNumber = 1;
        obj.slider.style.transition = `transform 0ms linear 0ms`;
        obj.actionSlide();
    }
}
BoltSlider.prototype.prevSlider = function () {
    if (this.btnNext.disabled) {
        this.btnNext.disabled = false;
    }
    this.currentSlideNumber--;
    this.actionSlide();
}

BoltSlider.prototype.actionSlide = function () {
    console.log(this.currentSlideNumber)
    this.slider.style.transform = `translateX(-${this.widthSlide * this.currentSlideNumber}px)`;
}
// \actionSlide