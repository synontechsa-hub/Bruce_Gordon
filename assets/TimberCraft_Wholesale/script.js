document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');

    // Sticky Header Scroll Transition
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Volume Calculator Logic: (L * W * T) / 1,000,000,000 = m³
    const lengthInput = document.getElementById('calc-length');
    const widthInput = document.getElementById('calc-width');
    const thicknessInput = document.getElementById('calc-thickness');
    const resultDisplay = document.getElementById('volume-result');

    function calculateVolume() {
        const l = parseFloat(lengthInput.value) || 0;
        const w = parseFloat(widthInput.value) || 0;
        const t = parseFloat(thicknessInput.value) || 0;

        const volume = (l * w * t) / 1000000000;
        resultDisplay.textContent = volume.toFixed(4);
    }

    [lengthInput, widthInput, thicknessInput].forEach(input => {
        input.addEventListener('input', calculateVolume);
    });

    // Simple Species Detail Toggle
    const speciesItems = document.querySelectorAll('.species-item');

    speciesItems.forEach(item => {
        const header = item.querySelector('.species-header');
        header.addEventListener('click', () => {
            item.classList.toggle('active');
            const icon = header.querySelector('span');
            icon.textContent = item.classList.contains('active') ? '-' : '+';
        });
    });
});
