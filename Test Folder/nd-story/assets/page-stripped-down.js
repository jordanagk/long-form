/*!
 * Replace no-js on HTML with js
 */
document.documentElement.className = document.documentElement.className.replace(/(\s|^)no-js(\s|$)/, '$1' + 'js' + '$2');

/*!
 * Progress Scroller
 * @author Erik Runyon
 * Updated 2016-12-20
 * Based on https://css-tricks.com/reading-position-indicator/
 */
jQuery(function($){
  var winHeight = $(window).height(),
      docHeight = $(document).height(),
      progressBar = $('progress'),
      max,
      value;

  progressBar.attr('max', docHeight - winHeight);

  $(document).on('scroll', function(){
    topval = $(window).scrollTop();
    progressBar.attr('value', topval);
  });
});


/* Slides */

jQuery(function($){
  var scrollTop,
      $sections = $('.section'),
      sectionCount = $sections.length,
      $diagramCaptions = $('.diagram-caption'),
      // image slider is used for the iphone mockup screen.
      $slider = $('.image-slider'),
      // in Serendipity this code is used for the plastic hand parallax scroll effect at the top of the page.
      $layer1 = $('.layer-1'),
      $layer2 = $('.layer-2'),
      $layer3 = $('.layer-3'),
      hero = false,
      parallax = false,
      timelapse = false,
      diagram = false,
      $overlayContent = null,
      $overlayMedia = null,
      video = null,
      $sliderSentry = null,
      lastSection,
      currentSection,
      currentIndex,
      winHeight = function() { return $(window).height(); }

  // Track current section
  function scrollSpy() {
    var viewedSections = $sections.map(function() { if (scrollTop > $(this).offset().top - (winHeight() * 0.5)) return this; });


    currentSection = viewedSections[viewedSections.length - 1];
    currentIndex = $(currentSection).index();

    /*****************************************
     * Update variables on section change
     *****************************************/

    if (lastSection !== currentSection){
      var $currentSection = $(currentSection);
      lastSection = currentSection;

      $sections.removeClass('active');
      $currentSection.addClass('active');

      hero = $currentSection.hasClass('titlebar');
      parallax = $currentSection.hasClass('s-intro');
      timelapse = $currentSection.hasClass('s-timelapse');
      if (hero || timelapse ) { video = $currentSection.find('video')[0]; }

      // Overlays
      if ($currentSection.hasClass('overlay')) {
        $overlayContent = $currentSection.find('.section-copy');
        $overlayMedia = $currentSection.find('.section-media');
      } else {
        $overlayContent = null;
        $overlayMedia = null;
      }

      // Diagram
      if ($currentSection.hasClass('s-diagram')) {
        diagram = true;
      } else {
        diagram = false;
        $diagramCaptions.removeClass('show');
      }

      // iPhone
      if ($currentSection.hasClass('s-slider')) {
        photoSlider = true;
        $sliderSentry = $currentSection.find('.slider-sentry');
      } else {
        photoSlider = false;
      }
    }

    /*****************************************
     * Do tasks based on current variables
     *****************************************/

    if ($overlayContent && $overlayMedia) {
      $overlayMedia.toggleClass('darken', (scrollTop > $overlayContent.offset().top - (winHeight() * 0.5)));
    }

    if (parallax) {
      var delta = scrollTop - $(currentSection).offset().top;
      $layer1.css('transform','translateY(' + delta * -1 + 'px)')
      $layer2.css('transform', 'translateY(' + delta * -0.8 + 'px)')
      $layer3.css('transform', 'translateY(' + delta * -0.7 + 'px)')
    }
  };

  $(window).on('resize', function() {
      if (typeof currentSection !== 'undefined') {
        var target = $(currentSection).offset().top;
        $(window).scrollTop(target);
      }
  });

  $(window).on('load scroll', function() {
      scrollTop = $(window).scrollTop();
      scrollSpy();
  });
});
