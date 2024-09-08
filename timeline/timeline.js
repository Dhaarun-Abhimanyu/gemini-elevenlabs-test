const years = document.querySelectorAll('.year');
const popup = document.getElementById('popup');

// Add event listeners to each year to show the popup
years.forEach((year, index) => {
    year.addEventListener('mouseenter', (e) => {
        popup.innerHTML = `Historical events in ${year.getAttribute('data-year')}: onnu nadakala da mf`;
        popup.style.top = `40px`;
        console.log(index);

        if (index % 2 === 0) {
            popup.style.right = `40px`;
            popup.style.left = ''; // Reset left style
        } else {
            popup.style.left = `40px`;
            popup.style.right = ''; // Reset right style
            
        }
        popup.style.height = `50%`;
        popup.style.width = '30%';
        popup.style.display = 'block';
    });

    year.addEventListener('mouseleave', () => {
        popup.style.display = 'block';
    });
});