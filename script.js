// =========================================================
// ОСТРОВ НЕВЕЗЕНИЯ — V2
// Лёгкий JS без библиотек
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

    // Плавное появление блоков при прокрутке
    const revealItems = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add('visible'));
    }


    // Анимация чисел статистики
    const counters = document.querySelectorAll('[data-target]');

    const animateCounter = (element) => {
        const target = Number(element.dataset.target);

        if (!Number.isFinite(target)) return;

        const duration = 1100;
        const start = performance.now();

        const update = (now) => {
            const progress = Math.min((now - start) / duration, 1);

            // Плавное замедление в конце
            const eased = 1 - Math.pow(1 - progress, 3);

            element.textContent = Math.floor(target * eased);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        };

        requestAnimationFrame(update);
    };


    // Запускаем счётчики только когда они появились на экране
    const stats = document.querySelector('.stats-grid');

    if (stats && 'IntersectionObserver' in window) {
        let started = false;

        const statsObserver = new IntersectionObserver((entries, obs) => {
            if (entries[0].isIntersecting && !started) {
                started = true;
                counters.forEach(animateCounter);
                obs.disconnect();
            }
        }, {
            threshold: 0.35
        });

        statsObserver.observe(stats);
    } else {
        counters.forEach((counter) => {
            counter.textContent = counter.dataset.target;
        });
    }


    // Закрываем мобильное меню/фокус после перехода по навигации
    document.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            link.blur();
        });
    });

});
