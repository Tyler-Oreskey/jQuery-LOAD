class Color {
    constructor(displayName, className) {
        this._displayName = displayName;
        this._className = className;
        this._selected = false;
    }

    get className() { return this._className; }
    get displayName() { return this._displayName; }
    get selected() { return this._selected; }

    set selected(val) {
        if (!(typeof val === 'boolean')) {
            throw new Error('param must be a boolean.')
        }
        this._selected = val;
    }

    getHTML() {
        return `<div class="${this.className}" data-color="${this.displayName}"
            data-selected="${this.selected}"></div>`;
    }
}

class Selection {
    constructor(activeIndex) {
        this._colors = this.getColorData(activeIndex);
        this._activeIndex = activeIndex;
    }

    get colors() { return this._colors; }
    get active() { return this._colors[this._activeIndex]; }

    set active(val) {
        if (!(typeof val === 'number')) {
            throw new Error('value must be a number.')
        }

        if (val < 0 || val > this._colors.length - 1) {
            throw new Error(`value must be between 0 and ${this._colors.length - 1}.`)
        }

        this._activeIndex = val;
    }

    getHTML() {
        return this.colors.reduce((html, color) => {
            return html + color.getHTML();
        }, '');
    }
    

    getColorByName(displayName) {
        return this.colors.find((color) => color.displayName === displayName);
    }

    getIndexByName(displayName) {
        return this.colors.findIndex((color) => color.displayName === displayName);
    }

    getColorData(activeIndex) {
        const colors = [
            {displayName: 'Ash', className: 'ash'},
            {displayName: 'Azure', className: 'azure'},
            {displayName: 'Frost', className: 'frost'},
            {displayName: 'Fuchsia', className: 'fuchsia'},
            {displayName: 'Neon Green', className: 'neon-green'},
            {displayName: 'Neon Orange', className: 'neon-orange'}
        ].map((color) => new Color(color.displayName, color.className));
        colors[activeIndex].selected = true;
        return colors;
    }
}

$(document).ready(function() {
    const colors = new Selection(0);
    const colorOption = $('.color-option');
    const activeColor = colors.active;

    colorOption.html(colors.getHTML());

    // Set initial product image and description
    updateProductDescriptionAndImage(activeColor)

    // Set initial strong element text
    updateColorSelectionHeader(activeColor);

    // Handle color selection hover event
    handleColorHoverEvent(colors);

    // Handle color change event
    handleColorChangeEvent(colors);
});

function updateProductImage(className, displayName) {
    $('#product-image').attr({
        'src': `./images/${className}.jpg`,
        'alt': `Stanley ${displayName} 30 oz Tumbler`
    });
}

function updateProductDescription(className) {
    $('#product-description').load(`./descriptions/${className}.html`);
}

function updateProductDescriptionAndImage(color) {
    updateProductDescription(color.className);
    updateProductImage(color.className, color.displayName);
}

function updateColorSelectionHeader(color) {
    const strong = $('#color-selector-header strong');
    strong.text(color.displayName);
}

function handleColorHoverEvent(colors) {
    $('.color-option div').hover(function() {
        let hoveredColorName = $(this).data('color');
        let color = colors.getColorByName(hoveredColorName);
        updateColorSelectionHeader(color);
    },
    function() {
        updateColorSelectionHeader(colors.active);
    });
}

function updateActiveColor(activeColor, clickedColor) {
    const activeElement = $('[data-color="' + activeColor.displayName + '"]');
    const clickedElement = $('[data-color="' + clickedColor.displayName + '"]');
    activeColor.selected = false;
    clickedColor.selected = true;
    activeElement.attr('data-selected', false);
    clickedElement.attr('data-selected', true);
}

function handleColorChangeEvent(colors) {
    $('.color-option div').click(function() {
        let clickedColorName = $(this).data('color');
        let clickedColor = colors.getColorByName(clickedColorName);
        let activeColor = colors.active;

        if (clickedColor.displayName === activeColor.displayName) {
            return;
        }
        else {
            let clickedColorIndex = colors.getIndexByName(clickedColorName);
            colors.active = clickedColorIndex;
            updateActiveColor(activeColor, clickedColor);
            updateColorSelectionHeader(colors.active);
            updateProductDescriptionAndImage(colors.active);
        }
    });
}