// Displaying the search results.

export function display(result, resultBox){
    if(result.length > 0){
        const content = result.map((list)=>{
            return "<li>" + list + "<button type='button' class='add'>" +'+'+"</button></li>";
        });
        resultBox.innerHTML = "<ul>" + content.join('') + "</ul>";
        resultBox.style.display = 'block'; // Show the result box
    } else {
        resultBox.innerHTML = ''; // Clear the result box
        resultBox.style.display = 'none'; // Hide the result box
    }
}