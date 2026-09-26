// jQuery 的 'fast' 等於 200ms
document.querySelectorAll('.nav__list-item').forEach(function (item) {
    const submenu = item.querySelector(':scope > .nav__list--submenu');
    if (!submenu) return;

    item.addEventListener('mouseenter', function () { //hover In...
        Velocity(submenu, 'finish');
        Velocity(submenu, 'slideDown', { duration: 200 });
    });
    item.addEventListener('mouseleave', function () { //hover Out...
        Velocity(submenu, 'finish');
        Velocity(submenu, 'slideUp', { duration: 200 });
    });
});

const banner = document.querySelector('.banner');
const bannerDescription = document.querySelector('.banner__description');

banner.addEventListener('mouseenter', function () { //hover In...
    Velocity(bannerDescription, 'finish');
    Velocity(bannerDescription, 'fadeIn', { duration: 1000 });
});
banner.addEventListener('mouseleave', function () { //hover Out...
    Velocity(bannerDescription, 'finish');
    Velocity(bannerDescription, 'fadeOut', { duration: 500 });
});
