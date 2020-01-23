const tag = document.createElement('script');
const webinarDate = moment('2020-12-03').startOf('day');
const todaysDate = moment().startOf('day');

tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

$(function() {
  $(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
  });
    
  /* Video player code */
  const $playBtn = $('.play-btn'),
  $uniqueBox = $('.unique-box'),
  $teamBox = $('.team-box'),
  $youthBox = $('.youth-box'),
  $lb = $('.lb'),
  $html = $('html');

  $playBtn.click(function() {
    const player = new YT.Player('player', {
      videoId: 's8HwfSykmNo',
      playerVars: { rel: 0, autoplay: 1 },
      events: {
        onReady: function(event) {
          event.target.playVideo();
        },
        onStateChange: function(event) {
          if (event.data === 0) {
            $lb.trigger('click');
          }
        }
      }
    });

    $lb.removeClass('dn');
    $html.addClass('ofh');
  });
    
  /* Our Unique Solution video */
  $uniqueBox.click(function() {
    const player = new YT.Player('player', {
      videoId: 'BKyYOWIpAWc',
      playerVars: { rel: 0, autoplay: 1 },
      events: {
        onReady: function(event) {
          event.target.playVideo();
        },
        onStateChange: function(event) {
          if (event.data === 0) {
            $lb.trigger('click');
          }
        }
      }
    });
    
    $lb.removeClass('dn');
    $html.addClass('ofh');
  });
    
  /* Our Team video */
  $teamBox.click(function() {
    const player = new YT.Player('player', {
      videoId: 'IupfMGU-vE0',
      playerVars: { rel: 0, autoplay: 1 },
      events: {
        onReady: function(event) {
          event.target.playVideo();
        },
        onStateChange: function(event) {
          if (event.data === 0) {
            $lb.trigger('click');
          }
        }
      }
    });

    $lb.removeClass('dn');
    $html.addClass('ofh');
  });
    
  /* Youth video */
  $youthBox.click(function() {
    const player = new YT.Player('player', {
      videoId: '_Gf_aO6gyiI',
      playerVars: { rel: 0, autoplay: 1 },
      events: {
        onReady: function(event) {
          event.target.playVideo();
        },
        onStateChange: function(event) {
          if (event.data === 0) {
            $lb.trigger('click');
          }
        }
      }
    });

    $lb.removeClass('dn');
    $html.addClass('ofh');
  });

  $lb.click(function() {
    $('.youtube-content').html('<div id="player"></div>');
    $lb.addClass('dn');
    $html.removeClass('ofh');
  });
    
  /* Scroll Animation */
  // Go Down
  const $goDown = $('.go-down');

  $goDown.click(function() {
    $('html,body').animate({
      scrollTop: $('#parent-id').offset().top
    });
  });
    
  /* Share Button */
  $('.share-icon').click(function() {
    // Slide in Share Box
    $('.share_box').css('visibility','visible');
    $('.share_box').addClass('fadeInRight');
    $('.share_box').removeClass('fadeOutRight');
    
    // Show Exit icon
    $('.x-icon').addClass('dis-inline');
    
    // Hide Share icon
    $('.share-icon').addClass('dis-none');
  });
    
  $('.x-icon').click(function() {
    // Slide out Share Box
    $('.share_box').addClass('fadeOutRight');
    $('.share_box').removeClass('fadeInRight');
    
    // Hide Exit icon
    $('.x-icon').removeClass('dis-inline');
    
    // Show Share icon
    $('.share-icon').removeClass('dis-none');
  });
    
  // Share Out 2
  $('.share-out').click(function() {
    if ($('.share_box').hasClass('fadeInRight')) {
      $('.share_box').removeClass('fadeInRight');
      $('.share_box').addClass('fadeOutRight');
    } else {
      $('.share_box').removeClass('fadeOutRight');
      $('.share_box').addClass('fadeInRight');
      $('.share_box').css('visibility','visible');
    }
  });
  
  /* Webinar Headline */
  const daysUntilWebinar = webinarDate.diff(todaysDate, 'days');
  $('.webinar-top-p').html('<p class="text-center acumin-pro webinar-top-p">Have More Questions? Join Us For A Live Webcast in ' + daysUntilWebinar + ' days!</p>');
  
  /* Support Modal */
  $('.modal-activate').on('click', function() {
    $('#modal-one').modal('show');
  });
});