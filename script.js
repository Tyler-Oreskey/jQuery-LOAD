$(document).ready(function() {
    let currentColorName = "Ash";

    // load default description and image
    $('#product-description').load('./descriptions/ash.html');

    $('#product-image').attr('src', './images/ash.jpg')
                       .attr('alt', `Stanley ${currentColorName} 30 oz Tumbler`);

    const selectColorParagraphText = document.getElementById('color-selector-header');
    const strong = selectColorParagraphText.querySelector('strong');

    strong.innerHTML = currentColorName;
    
    // Handle color selection hover event
    $('.color-option div').hover(function() {
        strong.innerHTML = $(this).data('color');
    }, function() {
        strong.innerHTML = currentColorName;
    })

    // Handle color change event
    $('.color-option div').click(function() {
        let className = $(this).attr('class');
        let selectedColorName = $(this).data('color');

        if (selectedColorName === currentColorName) {
            return
        }
        else {
            currentColorName = selectedColorName;
        }

        $('#product-image').attr('src', `./images/${className}.jpg`);
        $('#product-image').attr('alt', `Stanley ${currentColorName} 30 oz Tumbler`);
        $('#product-description').load(`./descriptions/${className}.html`);
    });
})