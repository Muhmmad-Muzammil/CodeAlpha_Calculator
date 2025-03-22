// Wait for the DOM to load completely
document.addEventListener('DOMContentLoaded', function () {
    // Welcome Overlay and Enter Button
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    const enterButton = document.getElementById('enterButton');
    const calculator = document.querySelector('.calculator');

    // Initially hide the calculator
    calculator.style.display = 'none';

    // When Enter button is clicked, hide the overlay and show the calculator
    enterButton.addEventListener('click', () => {
        welcomeOverlay.style.animation = 'fadeOut 0.5s ease-in-out forwards';
        setTimeout(() => {
            welcomeOverlay.style.display = 'none';
            calculator.style.display = 'block';
        }, 500);
    });

    // Rest of your calculator functionality
    let input = document.getElementById('inputBox');
    let buttons = document.querySelectorAll('button');
    let historyBox = document.getElementById('history');
    let themeToggle = document.getElementById('themeToggle');
    let body = document.body;

    let string = ""; // Store the current input string
    let history = []; // Store calculation history

    // Add event listeners to all buttons
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            let value = e.target.innerHTML;

            // Handle equals button
            if (value === '=') {
                try {
                    string = eval(string).toString(); // Evaluate the expression
                    history.push(string); // Add result to history
                    updateHistory(); // Update history display
                } catch (err) {
                    string = "Error"; // Show error if evaluation fails
                }
                input.value = string; // Display result or error
            } 
            // Handle AC (All Clear) button
            else if (value === 'AC') {
                string = ""; // Clear the input string
                input.value = string; // Clear the input box
            } 
            // Handle DEL (Delete) button
            else if (value === 'DEL') {
                string = string.slice(0, -1); // Remove the last character
                input.value = string; // Update the input box
            }
            // Handle scientific functions (sin, cos, tan, log, ln, √)
            else if (['sin', 'cos', 'tan', 'log', 'ln', '√'].includes(value)) {
                try {
                    let num = eval(string); // Evaluate the current input
                    if (isNaN(num)) throw new Error("Invalid Input"); // Check for invalid input

                    // Perform the selected scientific operation
                    switch (value) {
                        case 'sin':
                            string = Math.sin(degToRad(num)).toFixed(4); // Sine function
                            break;
                        case 'cos':
                            string = Math.cos(degToRad(num)).toFixed(4); // Cosine function
                            break;
                        case 'tan':
                            if (num % 90 === 0 && (num / 90) % 2 !== 0) {
                                string = "Undefined"; // Tan 90° or 270° is undefined
                            } else {
                                string = Math.tan(degToRad(num)).toFixed(4); // Tangent function
                            }
                            break;
                        case 'log':
                            string = num > 0 ? Math.log10(num).toFixed(4) : "Error"; // Logarithm base 10
                            break;
                        case 'ln':
                            string = num > 0 ? Math.log(num).toFixed(4) : "Error"; // Natural logarithm
                            break;
                        case '√':
                            string = num >= 0 ? Math.sqrt(num).toFixed(4) : "Error"; // Square root
                            break;
                    }
                } catch (err) {
                    string = "Error"; // Show error if operation fails
                }
                input.value = string; // Display result or error
            }
            // Handle square (x²) button
            else if (value === 'x²') {
                try {
                    let num = eval(string); // Evaluate the current input
                    string = Math.pow(num, 2).toString(); // Calculate square
                    input.value = string; // Display result
                } catch (err) {
                    string = "Error"; // Show error if calculation fails
                    input.value = string;
                }
            }
            // Handle exponentiation (xⁿ) button
            else if (value === 'xⁿ') {
                string += '**'; // Add exponentiation operator
                input.value = string; // Update the input box
            }
            // Handle factorial (!) button
            else if (value === '!') {
                try {
                    let num = eval(string); // Evaluate the current input
                    if (num >= 0 && Number.isInteger(num)) {
                        string = factorial(num).toString(); // Calculate factorial
                    } else {
                        string = "Error"; // Show error for invalid input
                    }
                    input.value = string; // Display result or error
                } catch (err) {
                    string = "Error"; // Show error if calculation fails
                    input.value = string;
                }
            }
            // Handle numeric and operator buttons
            else {
                string += value; // Append the button value to the input string
                input.value = string; // Update the input box
            }
        });
    });

    // Convert degrees to radians
    function degToRad(degrees) {
        return degrees * (Math.PI / 180);
    }

    // Calculate factorial of a number
    function factorial(num) {
        if (num === 0 || num === 1) return 1; // Base case
        return num * factorial(num - 1); // Recursive case
    }

    // Update the history display
    function updateHistory() {
        historyBox.innerHTML = history.map(h => `<p>${h}</p>`).join(''); // Map history array to HTML
    }

    // Theme Toggle functionality
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode'); // Toggle light/dark mode
    });
});

// Made by Muhammad-Muzammil
// This JavaScript file is part of a scientific calculator project created by Muhammad-Muzammil.
// Feel free to customize and use it as per your requirements.