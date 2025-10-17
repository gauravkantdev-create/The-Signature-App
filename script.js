document.addEventListener('DOMContentLoaded', () => {
    const colorpicker = document.getElementById("colorpicker");
    const canvascolor = document.getElementById("canvascolor");
    const canvas = document.getElementById("mycanvas");
    const clearbutton = document.getElementById("clearbutton");
    const savebutton = document.getElementById("savebutton");
    const retrievebutton = document.getElementById("retrievebutton");
    const fontsize = document.getElementById("fontsize");
    const ctx = canvas.getContext('2d');

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let lineWidth = 5; // Default line width

    // Change text color
    colorpicker.addEventListener('change', (e) => {
        ctx.strokeStyle = e.target.value;
        ctx.fillStyle = e.target.value;
    });

    // Start drawing
    const startDrawing = (x, y) => {
        isDrawing = true;
        lastX = x;
        lastY = y;
    };

    // Draw on the canvas
    const draw = (x, y) => {
        if (!isDrawing) return;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        lastX = x;
        lastY = y;
    };

    // Stop drawing
    const stopDrawing = () => {
        isDrawing = false;
    };

    // Mouse events
    canvas.addEventListener('mousedown', (e) => {
        startDrawing(e.offsetX, e.offsetY);
    });

    canvas.addEventListener('mousemove', (e) => {
        draw(e.offsetX, e.offsetY);
    });

    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch events
    canvas.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        startDrawing(touch.clientX - rect.left, touch.clientY - rect.top);
        e.preventDefault();
    });

    canvas.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        draw(touch.clientX - rect.left, touch.clientY - rect.top);
        e.preventDefault();
    });

    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchcancel', stopDrawing);

    // Clear canvas
    clearbutton.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Save canvas as image
    savebutton.addEventListener('click', () => {
        localStorage.setItem('canvascontents', canvas.toDataURL());
        const link = document.createElement('a');
        link.download = 'mycanvas.png';
        link.href = canvas.toDataURL();
        link.click();
    });

    // Change canvas background color
    canvascolor.addEventListener('change', (e) => {
        ctx.fillStyle = e.target.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    // Change line width
    fontsize.addEventListener('change', (e) => {
        lineWidth = e.target.value;  // Update lineWidth based on selection
    });

    // Retrieve saved canvas contents from local storage
    retrievebutton.addEventListener('click', () => {
        const savedcanvas = localStorage.getItem('canvascontents');
        if (savedcanvas) {
            const img = new Image();
            img.src = savedcanvas;
            img.onload = () => {
                ctx.drawImage(img, 0, 0);
            };
        }
    });
});
