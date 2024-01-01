console.log("Hello World")

function cancel_show() {
    var element = document.getElementById("cancel_icon")

    if (element) {
        element.style.display = 'block';
    } else {
        console.error('Element not found!');
    }
}

function border_color_change() {
    var element = document.getElementById("search_bar");

    if (element) {
        search_field.style.borderColor = '#0040DD';
    } else {
        console.error('Element not found!');
    }
}

function clear_input() {
    var element_1 = document.getElementById("cancel_icon")
    document.getElementById("search_entry").value = "";
    element_1.style.display = 'none';
}

function search_result(event) {
    var key = event.which || event.keyCode;
    if (key == 13) {
        var searchQuery = document.getElementById('search_entry').value;
        console.log(searchQuery);
        window.location.href = 'search_result.html?q=' + encodeURIComponent(searchQuery);
    }
}