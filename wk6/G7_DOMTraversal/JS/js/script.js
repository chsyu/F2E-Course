// jQuery fadeOut() 預設為 400ms
document.querySelectorAll('.modal-close').forEach(function (btn) {
    btn.addEventListener('click', function () {
        Velocity(btn.closest('.modal'), 'fadeOut', { duration: 400 });
        Velocity(document.querySelector('.cover'), 'fadeOut', { duration: 400 });
    });
});
