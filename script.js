$(document).ready(function() {
    // load default description and image
    $('#product-description p strong').load('./descriptions/ash.html');
    $('#product-image').attr('src', './images/ash.jpg');
    $('#product-image').attr('alt', 'Stanley Ash 30 oz Tumbler');
    let currentColor = "ash";

    // Handle color change event
    $('.color-option').click(function() {
        let selectedColor = $(this).data('color');

        if (selectedColor === currentColor) {
            return
        }
        else {
            currentColor = selectedColor;
        }

        let imageFile = './images/' + selectedColor + '.jpg'
        let descriptionFile = './descriptions/' + selectedColor + '.html';

        // Change image source and alt text
        $('#product-image').attr('src', imageFile);
        $('#product-image').attr('alt', `Stanley ${selectedColor} 30 oz Tumbler`);

        // Load description for the selected color
        $('#product-description p strong').load(descriptionFile);
    });
})