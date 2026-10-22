// 20CLIPS: site interactions (progressive enhancement only; all content
// is present in the HTML without JavaScript)

document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', links.classList.contains('open'));
    });
  }

  // Portfolio filter UI removed by request; grids simply display all items.

  // Lightbox for portfolio thumbs
  var modal = document.getElementById('lightbox');
  if (modal) {
    var modalBody = modal.querySelector('.lightbox-body');

    function closeLightbox() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      var vid = modalBody.querySelector('video');
      if (vid) { vid.pause(); }
      modalBody.innerHTML = '';
    }

    document.querySelectorAll('.thumb[data-lightbox-video]').forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var src = thumb.getAttribute('data-lightbox-video');
        var poster = thumb.querySelector('video') ? thumb.querySelector('video').getAttribute('poster') : '';
        modalBody.innerHTML = '<video src="' + src + '"' +
          (poster ? ' poster="' + poster + '"' : '') +
          ' controls autoplay playsinline class="lightbox-video"></video>';
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    document.querySelectorAll('.thumb[data-lightbox]:not([data-lightbox-video])').forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var label = thumb.getAttribute('data-lightbox');
        modalBody.innerHTML = '<div class="lightbox-placeholder">' +
          '<p class="thumb-tag">Video placeholder</p>' +
          '<p>' + label + '</p>' +
          '<p class="lightbox-note">Replace with final vertical video asset.</p></div>';
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.classList.contains('lightbox-close')) {
        closeLightbox();
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeLightbox(); }
    });
  }
});
