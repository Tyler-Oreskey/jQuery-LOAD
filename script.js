$(document).ready(function() {
    // load default description and image
    $('#product-description').load('./descriptions/ash.html');
    $('#product-image').attr('src', './images/ash.jpg');
    $('#product-image').attr('alt', 'Stanley Ash 30 oz Tumbler');

    let currentColor = "ash";
    const selectColorParagraphText = document.querySelector('p');
    const strong = selectColorParagraphText.querySelector('strong');
    
    // Handle color selection hover event
    $('.color-option div').hover(function() {
        let hoveredColor = $(this).data('color');
        let descriptionFile = './descriptions/' + hoveredColor + '.html';

        $.get(descriptionFile, function(data) {
            const description = $(data)[0];
            strong.innerHTML = description.querySelector('strong').innerHTML;
        });

    }, function() {
        strong.innerHTML = "";
    })

    // Handle color change event
    $('.color-option div').click(function() {
        let selectedColor = $(this).data('color');

        if (selectedColor === currentColor) {
            return
        }
        else {
            currentColor = selectedColor;
        }

        let imageFile = './images/' + selectedColor + '.jpg'
        let descriptionFile = './descriptions/' + selectedColor + '.html';

        $('#product-image').attr('src', imageFile);
        $('#product-image').attr('alt', `Stanley ${selectedColor} 30 oz Tumbler`);
        $('#product-description').load(descriptionFile);
    });
})