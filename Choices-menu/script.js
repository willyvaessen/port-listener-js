let activeWindow = null;

function openWindow(content) {
  const container = document.getElementById('container');

  // Check if an active window exists
  if (activeWindow) {
    // Minimize the current window
    activeWindow.classList.remove('active');
  }

  // Create a new window
  const window = document.createElement('div');
  window.className = 'window active';
  window.innerHTML = `
    <div class="title-bar">
      <span class="close-button" onclick="minimizeWindow(this.parentNode.parentNode)">-</span>
    </div>
    <div class="content">
      <h2>${content}</h2>
      <p>This is the content of the window.</p>
    </div>
  `;

  // Append the window to the container
  container.appendChild(window);

  // Update the active window reference
  activeWindow = window;
}

function minimizeWindow(window) {
  // Minimize the window
  window.classList.remove('active');
}
