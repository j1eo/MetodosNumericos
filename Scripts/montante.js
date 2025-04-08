function createMatrixInputs() {
    const dimension = parseInt(document.getElementById('dimension').value);
    const matrixInputsDiv = document.getElementById('matrixInputs');
    const matrixOutputDiv = document.getElementById('matrixOutput');
    matrixInputsDiv.innerHTML = ''; // Limpiar los inputs previos
    matrixInputsDiv.classList.add("matrix-grid"); // Agregar clase contenedora
    matrixOutputDiv.innerHTML = ''; // Limpiar los outputs previos

    for (let i = 0; i < dimension; i++) {
        const rowDiv = document.createElement("div"); // Fila para mejor organización
        rowDiv.classList.add("matrix-row");

        for (let j = 0; j < dimension + 1; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `matrix_${i}_${j}`;
            input.name = `matrix_${i}_${j}`;
            input.required = true;
            input.classList.add("matrix-input"); // Agregar clase a los inputs
            rowDiv.appendChild(input);
        }

        matrixInputsDiv.appendChild(rowDiv);
    }
}

function solveMatrix() {
    const matrixOutputDiv = document.getElementById('matrixOutput');
    matrixOutputDiv.innerHTML = ''; // Limpiar la respuesta anterior

    const dimension = parseInt(document.getElementById('dimension').value);
    if (!dimension || dimension < 1) {
        alert("Ingrese una dimensión válida.");
        return;
    }

    const matrix = [];
    for (let i = 0; i < dimension; i++) {
        const row = [];
        for (let j = 0; j < dimension + 1; j++) {
            const value = document.getElementById(`matrix_${i}_${j}`).value;
            row.push(Number(value) || 0);
        }
        matrix.push(row);
    }

    const solution = montante(matrix);
    if (solution) {
        printSolution(solution);
    }
}


function montante(matrix) {
    let n = matrix.length;
    let pivote = 1;
    let prevPivote = 1;

    for (let k = 0; k < n; k++) {
        if (matrix[k][k] === 0) {
            let swapped = false;
            for (let i = k + 1; i < n; i++) {
                if (matrix[i][k] !== 0) {
                    [matrix[k], matrix[i]] = [matrix[i], matrix[k]]; // Intercambiar filas
                    swapped = true;
                    break;
                }
            }
            if (!swapped) {
                alert("El sistema no tiene solución única.");
                return null;
            }
        }

        prevPivote = pivote;
        pivote = matrix[k][k];
        printMatrixLog(matrix, `Paso ${k + 1} - Pivote actual: ${pivote}`);

        for (let i = 0; i < n; i++) {
            if (i !== k) {
                for (let j = 0; j < matrix[i].length; j++) {
                    if (j !== k) {
                        matrix[i][j] = Number(((matrix[i][j] * pivote - matrix[i][k] * matrix[k][j]) / prevPivote).toFixed(4));
                    }
                }
                matrix[i][k] = 0;
            }
        }
        printMatrixLog(matrix, `Matriz después del paso ${k + 1}`);
    }

    let solution = [];
    for (let i = 0; i < n; i++) {
        solution.push(Number((matrix[i][n] / matrix[i][i]).toFixed(/4)));
    }

    return solution;
}

function printMatrixLog(matrix, message) {
    const matrixOutputDiv = document.getElementById('matrixOutput');

    const stepDiv = document.createElement('div');
    stepDiv.className = 'text-section'; // Mantiene el mismo estilo

    const stepMessage = document.createElement('p');
    stepMessage.textContent = message;
    stepDiv.appendChild(stepMessage);

    const table = document.createElement('div');
    table.classList.add('matrix-grid'); // Usa la misma clase

    for (let i = 0; i < matrix.length; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('matrix-row'); 

        for (let j = 0; j < matrix[i].length; j++) {
            const cell = document.createElement('input');
            cell.type = 'text';
            cell.classList.add('matrix-input'); 
            cell.value = matrix[i][j];
            cell.readOnly = true;
            rowDiv.appendChild(cell);
        }
        table.appendChild(rowDiv);
    }

    stepDiv.appendChild(table);
    matrixOutputDiv.appendChild(stepDiv);

    const hr = document.createElement('hr');
    matrixOutputDiv.appendChild(hr);
}


function printSolution(solution) {
    const matrixOutputDiv = document.getElementById('matrixOutput');
    const solutionDiv = document.createElement('div');
    solutionDiv.className = "text-section"; // Reutiliza la clase para dar estilo

    let formattedSolution = "<h3>Solución:</h3><p>";
    for (let i = 0; i < solution.length; i++) {
        // Formato en LaTeX
        formattedSolution += `\\(X_{${i + 1}} = ${solution[i]}\\)`;
        if (i < solution.length - 1) {
            formattedSolution += ", "; // Coma entre las soluciones
        }
    }
    formattedSolution += "</p>";

    solutionDiv.innerHTML = formattedSolution;
    matrixOutputDiv.appendChild(solutionDiv);

    // Actualizar MathJax para renderizar las expresiones LaTeX
    MathJax.typesetPromise();
}


