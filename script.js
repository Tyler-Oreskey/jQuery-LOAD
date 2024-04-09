$(document).ready(function() {
    // load default
    $('#product-description p strong').load('./descriptions/ash.html');
    $('#product-image').attr('src', './images/ash.jpg');
    $('#product-image').attr('alt', 'Stanley Ash 30 oz Tumbler');

    // Handle color change event
    $('#color-selector').change(function() {
        let selectedColor = $(this).val();
        let imageFile = './images/' + selectedColor + '.jpg'
        let descriptionFile = './descriptions/' + selectedColor + '.html';

        // Change image source and alt text
        $('#product-image').attr('src', imageFile);
        $('#product-image').attr('alt', `Stanley ${selectedColor} 30 oz Tumbler`);

        // Load description for the selected color
        $('#product-description p strong').load(descriptionFile);
    });
})