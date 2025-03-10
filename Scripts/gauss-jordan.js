function createMatrixInputs() {
    const dimension = parseInt(document.getElementById('dimension').value);
    const matrixInputsDiv = document.getElementById('matrixInputs');
    const matrixOutputDiv = document.getElementById('matrixOutput');
    matrixInputsDiv.innerHTML = '';
    matrixInputsDiv.classList.add("matrix-grid");
    matrixOutputDiv.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("matrix-row");

        for (let j = 0; j < dimension + 1; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `matrix_${i}_${j}`;
            input.name = `matrix_${i}_${j}`;
            input.required = true;
            input.classList.add("matrix-input");
            rowDiv.appendChild(input);
        }

        matrixInputsDiv.appendChild(rowDiv);
    }
}

function solveMatrix(method) {
    const matrixOutputDiv = document.getElementById('matrixOutput');
    matrixOutputDiv.innerHTML = '';

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

    let solution;
    if (method === 'gauss') {
        solution = gauss(matrix);
    } else if (method === 'gaussJordan') {
        solution = gaussJordan(matrix);
    }

    if (solution) {
        printSolution(solution);
    }
}

function gauss(matrix) {
    const n = matrix.length;

    for (let k = 0; k < n; k++) {
        // Asegurarse de que el pivote no sea 0
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

        for (let i = k + 1; i < n; i++) {
            const factor = matrix[i][k] / matrix[k][k];
            for (let j = k; j < matrix[i].length; j++) {
                matrix[i][j] -= factor * matrix[k][j];
            }
        }
        printMatrixLog(matrix, `Paso ${k + 1} (Gauss)`);
    }

    const solution = [];
    for (let i = n - 1; i >= 0; i--) {
        let sum = 0;
        for (let j = i + 1; j < n; j++) {
            sum += matrix[i][j] * solution[j];
        }
        solution[i] = (matrix[i][n] - sum) / matrix[i][i];
    }

    return solution;
}


function gaussJordan(matrix) {
    const n = matrix.length;

    for (let k = 0; k < n; k++) {
        // Asegurarse de que el pivote no sea 0
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

        // Normalizar la fila del pivote
        const pivot = matrix[k][k];
        for (let j = 0; j < matrix[k].length; j++) {
            matrix[k][j] /= pivot;
        }

        // Hacer ceros en las demás filas
        for (let i = 0; i < n; i++) {
            if (i !== k) {
                const factor = matrix[i][k];
                for (let j = 0; j < matrix[i].length; j++) {
                    matrix[i][j] -= factor * matrix[k][j];
                }
            }
        }
        printMatrixLog(matrix, `Paso ${k + 1} (Gauss-Jordan)`);
    }

    const solution = [];
    for (let i = 0; i < n; i++) {
        solution.push(matrix[i][n]);
    }

    return solution;
}


function printMatrixLog(matrix, message) {
    const matrixOutputDiv = document.getElementById('matrixOutput');

    const stepDiv = document.createElement('div');
    stepDiv.className = 'text-section';

    const stepMessage = document.createElement('p');
    stepMessage.textContent = message;
    stepDiv.appendChild(stepMessage);

    const table = document.createElement('div');
    table.classList.add('matrix-grid');

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
    solutionDiv.className = "text-section";
    solutionDiv.innerHTML = `<h3>Solución:</h3><p>${solution.join(", ")}</p>`;
    matrixOutputDiv.appendChild(solutionDiv);
}
