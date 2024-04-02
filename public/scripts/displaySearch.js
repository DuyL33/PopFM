export function display(result, resultBox) {
    if (result.length > 0) {
        const content = result.map((song) => {
            return "<li>" + song.title + " - " + song.artist + "<button type='button' class='add'>" + '+' + "</button></li>";
        });
        resultBox.innerHTML = "<ul>" + content.join('') + "</ul>";
        resultBox.style.display = 'block'; // Show the result box
    } else {
        resultBox.innerHTML = ''; // Clear the result box
        resultBox.style.display = 'none'; // Hide the result box
    }
}
