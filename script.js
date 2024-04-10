$(document).ready(function() {
    // Set default color
    $('.ash').attr('data-selected', 'true');
    let activeColor = $('[data-selected="true"]');
    let activeColorName = activeColor.data('color');

    // Set default description and image
    updateProductDescriptionAndImage('ash', activeColorName);

    // Set initial strong element text
    updateColorSelectionHeader(activeColorName);

    // Handle color selection hover event
    handleColorHoverEvent();

    // Handle color change event
    handleColorChangeEvent(activeColor);
});

function updateProductImage(className, activeColorName) {
    $('#product-image').attr({
        'src': `./images/${className}.jpg`,
        'alt': `Stanley ${activeColorName} 30 oz Tumbler`
    });
}

function updateProductDescription(className) {
    $('#product-description').load(`./descriptions/${className}.html`);
}

function updateProductDescriptionAndImage(className, activeColorName) {
    updateProductDescription(className);
    updateProductImage(className, activeColorName);
}

function updateColorSelectionHeader(text) {
    const strong = $('#color-selector-header strong');
    strong.text(text);
}

function handleColorHoverEvent() {
    $('.color-option div').hover(function() {
        let color = $(this).data('color');
        updateColorSelectionHeader(color);
    },
    function() {
        let activeColor = $('[data-selected="true"]').data('color');
        updateColorSelectionHeader(activeColor);
    });
}

function handleColorChangeEvent(activeColor) {
    $('.color-option div').click(function() {
        let className = $(this).attr('class');
        let selectedColorName = $(this).data('color');

        if ($(this).is(activeColor)) {
            return;
        }
        else {
            activeColor.removeAttr('data-selected');
            activeColor = $(this);
            activeColorName = activeColor.data('color');
            $(this).attr('data-selected', 'true');
            updateColorSelectionHeader(selectedColorName);
            updateProductDescriptionAndImage(className, activeColorName);
        }
    });
}
