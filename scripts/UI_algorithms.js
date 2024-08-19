// COLORS:
const ERROR = "rgb(255, 0, 0)"; // Red
const GREY = "rgb(255, 255, 255)"; // Grey
const YELLOW = "rgb(255, 255, 0)"; // Yellow
const GREEN = "rgb(0, 255, 0)"; // Green


function buildTable(cols, rows, tableContainerID, tableID) {

    // Create a new table element
    const table = document.createElement("table");
    table.id = tableID;

    // Create rows and cells
    for (let i = 0; i < rows; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < cols; j++) {
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "text";
            input.maxLength = "1";
            input.style.backgroundColor = GREY;
            cell.appendChild(input);

            cell.addEventListener("click", function() {
                changeCellColor(input);
            });
            cell.addEventListener("input", function(event) {
                tabToNextCell(event);
                allCaps(input);
            });

            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    const tableContainer = document.getElementById(tableContainerID);
    if (tableContainer) {
        tableContainer.appendChild(table);
    } else {
        console.error(`Table container with ID '${tableContainerID}' not found.`);
    }
}


function allCaps(input){
    input.value = input.value.toUpperCase();
}

function changeCellColor(input){

    if (input.value === ""){
        return;
    }
    let currentColor = input.style.backgroundColor;

    let newColor;

    switch (currentColor) {
        case GREY:
            newColor = YELLOW;
            break;
        case YELLOW:
            newColor = GREEN;
            break;
        case GREEN:
            newColor = GREY;
            break;
        default:
            newColor = ERROR;
    }

    input.style.backgroundColor = newColor;   
}

function tabToNextCell(event){

    if (event.inputType != "insertText"){
        return;
    }
    const currentInput = event.target;
    const currentCell = currentInput.parentElement;
    const nextCell = currentCell.nextElementSibling;

    if (nextCell) {
        const nextInput = nextCell.querySelector("input");
        if (nextInput) {
            nextInput.focus();
        }
    }
}

function updateWordList(listID, words){
    let list = document.getElementById(listID);

    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    for (const word of words){
        let listItem = document.createElement("li");
        listItem.innerText = word;
        list.appendChild(listItem);
    }
}

