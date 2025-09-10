jQuery(document).ready(oxygen_init_repeater_carousel);

function oxygen_init_repeater_carousel($) {

    Flickity.createMethods.push('_createPrevNextCells');

    Flickity.prototype._createPrevNextCells = function() {
        this.on('select', this.setPrevNextCells);
    };

    Flickity.prototype.setPrevNextCells = function() {
        // remove classes
        changeSlideClasses(this.previousSlide, 'remove', 'is-previous');
        changeSlideClasses(this.nextSlide, 'remove', 'is-next');
        // set slides
        var previousI = fizzyUIUtils.modulo(this.selectedIndex - 1, this.slides.length);
        var nextI = fizzyUIUtils.modulo(this.selectedIndex + 1, this.slides.length);
        this.previousSlide = this.slides[previousI];
        this.nextSlide = this.slides[nextI];
        // add classes
        changeSlideClasses(this.previousSlide, 'add', 'is-previous');
        changeSlideClasses(this.nextSlide, 'add', 'is-next');
    };

    function changeSlideClasses(slide, method, className) {
        if (!slide) {
            return;
        }
        slide.getCellElements().forEach(function(cellElem) {
            cellElem.classList[method](className);
        });
    }
    
    Flickity.prototype._createResizeClass = function() {
      this.element.classList.add('flickity-resize');
    };

    Flickity.createMethods.push('_createResizeClass');

    var resize = Flickity.prototype.resize;
    Flickity.prototype.resize = function() {
      this.element.classList.remove('flickity-resize');
      resize.call( this );
      this.element.classList.add('flickity-resize');
    };


    $('.oxy-carousel-builder').each( function( i, carousel ) {

        var $carousel = $( carousel ),
            $inner = $carousel.find('.oxy-inner-content'),
            $carouselslider = '#' + $carousel.attr('id') + ' ' + $inner.data('carousel');
            if ('.oxy-dynamic-list' === $inner.data('carousel')) {
                var $carouselcell = '#' + $($carouselslider).children('.ct-div-block').attr('id');
            } else {
                var $carouselcell = $inner.data('cell');
            }
        var $prev = $inner.data('prev'),
            $next = $inner.data('next'),
            $contain = $inner.data('contain'),
            $free_scroll = $inner.data('freescroll'),
            $draggable = $inner.data('draggable'),
            $wrap_around = $inner.data('wraparound'),
            $group_cells = $inner.data('groupcells'),
            $autoplay = $inner.data('autoplay'),
            $initial_index = $inner.data('initial') - 1,
            $accessibility = $inner.data('accessibility'),
            $cell_align = $inner.data('cellalign'),
            $right_to_left = $inner.data('righttoleft'),
            $page_dots = $inner.data('pagedots'),
            $percent = $inner.data('percent'),
            $asnavfor = $($inner.data('asnavfor') + ' ' + $($inner.data('asnavfor')).find('.oxy-inner-content').data('carousel'))[0],
            $dragthreshold = $inner.data('dragthreshold'),
            $selectedattraction = $inner.data('selectedattraction'),
            $friction = $inner.data('friction'),
            $freescrollfriction = $inner.data('freescrollfriction'),
            $bgspeed = $inner.data('bgspeed'),
            $adaptheight = $inner.data('adaptheight'),
            $fullscreen = $inner.data('fullscreen'),
            $lazy = $inner.data('lazy'),
            $maybe_fade = $inner.data('fade'),
            $pause_autoplay = $inner.data('pauseautoplay');

        /* Count cells before flickity initialises
        var count = $carousel.find($carouselcell).length;

        if (count < $disablecells) {
            $inner.addClass('oxy-carousel-builder_disable');
        } else {
            $inner.removeClass('oxy-carousel-builder_disable');
        } */

        $($carouselslider).on('ready.flickity', function(event, index) {

            setTimeout(function() {
                disable_nav(); // disable navigation on ready, depending which cell we're on.
            }, 0);

        }); 


        let $flickityCarousel = $($carouselslider).flickity({
            groupCells: $group_cells,
            contain: $contain,
            freeScroll: $free_scroll,
            draggable: $draggable,
            wrapAround: $wrap_around,
            cellSelector: $carouselcell,
            autoPlay: $autoplay,
            initialIndex: $initial_index,
            accessibility: $accessibility,
            cellAlign: $cell_align,
            rightToLeft: $right_to_left,
            pageDots: $page_dots,
            percentPosition: false,
            asNavFor: $asnavfor,
            adaptiveHeight: $adaptheight,
            dragThreshold: $dragthreshold,
            selectedAttraction: $selectedattraction,
            friction: $friction,
            freeScrollFriction: $freescrollfriction,
            imagesLoaded: true,
            lazyLoad: $lazy,
            prevNextButtons: false,
            watchCSS: true,
            fullscreen: $fullscreen,
            fade: $maybe_fade,
            pauseAutoPlayOnHover: $pause_autoplay
        });


        $($next).on('click', function(e) {
            e.preventDefault();
            $($carouselslider).flickity('next');
        });

        $($prev).on('click', function(e) {
            e.preventDefault();
            $($carouselslider).flickity('previous');
        });


        // Cells are clickable to select
        if (true === $inner.data('clickselect')) {

            $flickityCarousel.on('staticClick.flickity', function(event, pointer, cellElement, cellIndex) {
                if (typeof cellIndex == 'number') {
                    $flickityCarousel.flickity('selectCell', cellIndex);
                }
            });

        }

        // Parallax Elems    
        if (true === $inner.data('parallaxbg')) {

            if ('.oxy-dynamic-list' === $inner.data('carousel')) {
                var $parallaxCells = $flickityCarousel.find('.flickity-slider').children('.ct-div-block');
            } else {
                var $parallaxCells = $flickityCarousel.find($carouselcell);
            }
            

            var docStyle = document.documentElement.style;
            var transformProp = typeof docStyle.transform == 'string' ?
                'transform' : 'WebkitTransform';

            var flkty = $flickityCarousel.data('flickity');


            function parallaxbg() {
                flkty.slides.forEach(function(slide, i) {

                    var $parallaxCell = $parallaxCells[i];
                    var $parallaxElem = $($parallaxCell).find('[data-speed]');

                    var x = (slide.target + flkty.x); // Cell transform

                    $parallaxElem.each(function() {

                        var $parallaxSpeed = $(this).attr('data-speed');
                        var $parallaxElemDom = $(this)[0];
                        var trans = x * (-1 / $parallaxSpeed); // Cell transform * paralax speed

                        $parallaxElemDom.style[transformProp] = 'translateX(' + trans + 'px)';

                    });

                });
            }

            parallaxbg();

            $flickityCarousel.on('scroll.flickity', function(event, progress) {

                parallaxbg();

            });


        }

        // If ticker mode is selected & wraparound enabled
        if ((true === $inner.data('tick')) && (true === $inner.data('wraparound'))) {

            let tickerSpeed = $inner.data('ticker');

            let flickity = null;
            let isPaused = false;
            const slideshowEl = document.querySelector($carouselslider);

            const update = () => {
                if (isPaused) return;
                if (flickity.slides) {
                    flickity.x = (flickity.x - tickerSpeed) % flickity.slideableWidth;
                    flickity.selectedIndex = flickity.dragEndRestingSelect();
                    flickity.updateSelectedSlide();
                    flickity.settle(flickity.x);
                }
                window.requestAnimationFrame(update);
            };

            const pause = () => {
                isPaused = true;
            };

            const play = () => {
                if (isPaused) {
                    isPaused = false;
                    window.requestAnimationFrame(update);
                }
            };

            flickity = $($carouselslider).data('flickity');
            flickity.x = 0;
            
            if (true === $inner.data('tickerpause')) {

                slideshowEl.addEventListener('mouseenter', pause, false);
                slideshowEl.addEventListener('focusin', pause, false);
                slideshowEl.addEventListener('mouseleave', play, false);
                slideshowEl.addEventListener('focusout', play, false);
            
            }

            flickity.on('dragStart', () => {
                isPaused = true;
            });


            update();

        }



        $flickityCarousel.on('select.flickity', function(event, index) {
            disable_nav();
        });
        
        $flickityCarousel.on( 'fullscreenChange.flickity', function( event, isFullscreen ) {
            
            if (true === isFullscreen) {
                $($prev).addClass('oxy-carousel-builder_icon-fullscreen');
                $($next).addClass('oxy-carousel-builder_icon-fullscreen');
            } else {
                $($prev).removeClass('oxy-carousel-builder_icon-fullscreen');
                $($next).removeClass('oxy-carousel-builder_icon-fullscreen');
            }
            
            setTimeout(function(){
                $flickityCarousel.flickity('resize');
            }, 300); // wait
        });
        
        

        function disable_nav() {

            // Only if wraparound disabled, othwerwise no end
            if (false === $inner.data('wraparound')) {

                var flickity = $($carouselslider).data('flickity');

                var target = flickity.selectedCell.target;
                
                if (target == flickity.cells[0].target) {
                    $($prev).addClass('oxy-carousel-builder_icon_disabled');
                    $($next).removeClass('oxy-carousel-builder_icon_disabled');
                } else if (target == flickity.getLastCell().target) {
                    $($next).addClass('oxy-carousel-builder_icon_disabled');
                    $($prev).removeClass('oxy-carousel-builder_icon_disabled');
                } else {
                    $($prev).removeClass('oxy-carousel-builder_icon_disabled');
                    $($next).removeClass('oxy-carousel-builder_icon_disabled');
                }

            }
        }


        $carousel.find('.oxy-carousel-next').parent('.oxy-carousel-navigation').addClass('oxy-carousel-navigation_next');
        $carousel.find('.oxy-carousel-previous').parent('.oxy-carousel-navigation').addClass('oxy-carousel-navigation_prev');
        
        $(window).on('load', function(){
            $flickityCarousel.flickity('resize');
        });

    });

};