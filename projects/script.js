document.addEventListener('DOMContentLoaded', (event) => {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const captionText = document.getElementById('caption');
    const closeBtn = document.getElementsByClassName('close')[0];
    const prevBtn = document.getElementsByClassName('prev')[0];
    const nextBtn = document.getElementsByClassName('next')[0];

    const gallery = document.getElementById('gallery');
    const randomImageContainer = document.getElementById('random-image-container');

    let currentIndex = 0;

    // Generate gallery items
    function generateGallery() {
        for (let i = 1; i <= 40; i++) {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            const img = document.createElement('img');
            img.src = `images/image${i}.jpeg`;
            img.alt = ``; // Add alt text
            div.appendChild(img);
            gallery.appendChild(div);
        }
    }

    generateGallery();

    const images = document.querySelectorAll('.gallery-item img');

    // Display a random image
    function displayRandomImage() {
        const randomIndex = Math.floor(Math.random() * images.length);
        const randomImage = images[randomIndex].cloneNode();
        randomImageContainer.appendChild(randomImage);
    }

    displayRandomImage();

    function showModal(index) {
        modal.style.display = 'block';
        setTimeout(() => modal.classList.add('show'), 10); // Add delay to ensure transition effect
        modalImg.src = images[index].src;
        captionText.innerHTML = images[index].alt;
        currentIndex = index;
    }

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 500); // Wait for transition to complete
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showModal(currentIndex);
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showModal(currentIndex);
    }

    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            showModal(index);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'Escape') {
                closeModal();
            }
        }
    });
});
