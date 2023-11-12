// Add this line at the beginning of script.js to log a message when the script is executed
console.log('Script loaded');

function startDrag(e, windowId) {
  e.preventDefault();
  let offsetX, offsetY;

  if (e.type === 'mousedown' || e.type === 'touchstart') {
    offsetX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    offsetY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
  } else {
    return; // Do nothing if other events
  }

  const window = document.getElementById(windowId);

  // Bring the clicked window to the front
  const windows = document.querySelectorAll('.window');
  windows.forEach(w => (w.style.zIndex = 0));
  window.style.zIndex = 1;

  function dragMove(moveEvent) {
    let newX, newY;

    if (moveEvent.type === 'mousemove' || moveEvent.type === 'touchmove') {
      newX = moveEvent.type === 'mousemove' ? offsetX - moveEvent.clientX : offsetX - moveEvent.touches[0].clientX;
      newY = moveEvent.type === 'mousemove' ? offsetY - moveEvent.clientY : offsetY - moveEvent.touches[0].clientY;
    } else {
      return; // Do nothing if other events
    }

    offsetX = moveEvent.type === 'mousemove' ? moveEvent.clientX : moveEvent.touches[0].clientX;
    offsetY = moveEvent.type === 'mousemove' ? moveEvent.clientY : moveEvent.touches[0].clientY;

    const rect = window.getBoundingClientRect();

    const newLeft = rect.left - newX;
    const newTop = rect.top - newY;

    // Check if new position is within the screen bounds
    if (newLeft >= 0 && newTop >= 0) {
      window.style.left = newLeft + 'px';
      window.style.top = newTop + 'px';
    }
  }

  function dragEnd() {
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('touchmove', dragMove);
    document.removeEventListener('mouseup', dragEnd);
    document.removeEventListener('touchend', dragEnd);
  }

  document.addEventListener('mousemove', dragMove);
  document.addEventListener('touchmove', dragMove, { passive: false });
  document.addEventListener('mouseup', dragEnd);
  document.addEventListener('touchend', dragEnd);
}

// Add a common class 'title-bar' to all title bars
const titleBars = document.querySelectorAll('.title-bar');

titleBars.forEach(titleBar => {
  titleBar.addEventListener('touchstart', function (e) {
    const windowId = this.closest('.window').id;
    startDrag(e, windowId);
  });

  titleBar.addEventListener('mousedown', function (e) {
    const windowId = this.closest('.window').id;
    startDrag(e, windowId);
  });
});

// Arrange the windows next to each other after the page has fully loaded
window.addEventListener('load', function () {
  arrangeWindows();
  checkScreenSize();
});

function arrangeWindows() {
  const windows = document.querySelectorAll('.window');
  let left = 0;

  windows.forEach((window) => {
    window.style.left = left + 'px';
    left += window.offsetWidth + 10; // Adjust the spacing as needed
  });
}

function checkScreenSize() {
  const warningMessage = document.getElementById('warningMessage');
  const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  if (screenWidth < 350 || screenHeight < 500) {
    warningMessage.style.display = 'block';
  } else {
    warningMessage.style.display = 'none';
  }
}

// Update warning on window resize
window.addEventListener('resize', function () {
  arrangeWindows();
  checkScreenSize();
});



//
//
// // Add this line at the beginning of script.js to log a message when the script is executed
// console.log('Script loaded');
//
//
// function initializeWindows() {
//   console.log('Initializing windows...');
//   arrangeWindows();
//   checkScreenSize();
// }
//
// // Arrange the windows next to each other after the page has fully loaded
// window.addEventListener('load', initializeWindows);
//
//
// function startDrag(e, windowId) {
//     console.log('startDrag executed', e.type);
//   e.preventDefault();
//   let offsetX, offsetY;
//
//   if (e.type === 'mousedown' || e.type === 'touchstart') {
//     offsetX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
//     offsetY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
//   } else {
//     return; // Do nothing if other events
//   }
//
//   const window = document.getElementById(windowId);
//
//   // Bring the clicked window to the front
//   const windows = document.querySelectorAll('.window');
//   windows.forEach(w => (w.style.zIndex = 0));
//   window.style.zIndex = 1;
//
//   function dragMove(moveEvent) {
//       console.log('dragMove executed', moveEvent.type);
//     let newX, newY;
//
//     if (moveEvent.type === 'mousemove' || moveEvent.type === 'touchmove') {
//       newX = moveEvent.type === 'mousemove' ? offsetX - moveEvent.clientX : offsetX - moveEvent.touches[0].clientX;
//       newY = moveEvent.type === 'mousemove' ? offsetY - moveEvent.clientY : offsetY - moveEvent.touches[0].clientY;
//     } else {
//       return; // Do nothing if other events
//     }
//
//     offsetX = moveEvent.type === 'mousemove' ? moveEvent.clientX : moveEvent.touches[0].clientX;
//     offsetY = moveEvent.type === 'mousemove' ? moveEvent.clientY : moveEvent.touches[0].clientY;
//
//     const rect = window.getBoundingClientRect();
//
//     const newLeft = rect.left - newX;
//     const newTop = rect.top - newY;
//
//     // Check if new position is within the screen bounds
//     if (newLeft >= 0 && newTop >= 0) {
//       window.style.left = newLeft + 'px';
//       window.style.top = newTop + 'px';
//     }
//   }
//
//   function dragEnd() {
//       console.log('dragEnd executed');
//     document.removeEventListener('mousemove', dragMove);
//     document.removeEventListener('touchmove', dragMove);
//     document.removeEventListener('mouseup', dragEnd);
//     document.removeEventListener('touchend', dragEnd);
//   }
//
//   document.addEventListener('mousemove', dragMove);
//   document.addEventListener('touchmove', dragMove, { passive: false });
//   document.addEventListener('mouseup', dragEnd);
//   document.addEventListener('touchend', dragEnd);
// }
//
//
// // Arrange the windows next to each other after the page has fully loaded
// window.addEventListener('load', function () {
//   arrangeWindows();
//   checkScreenSize();
// });
//
// function arrangeWindows() {
//   const windows = document.querySelectorAll('.window');
//   let left = 0;
//
//   windows.forEach((window) => {
//     window.style.left = left + 'px';
//     left += window.offsetWidth + 10; // Adjust the spacing as needed
//   });
// }
//
// function checkScreenSize() {
//   const warningMessage = document.getElementById('warningMessage');
//   const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//   const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
//
//   if (screenWidth < 350 || screenHeight < 500) {
//     warningMessage.style.display = 'block';
//   } else {
//     warningMessage.style.display = 'none';
//   }
// }
//
// // Update warning on window resize
// window.addEventListener('resize', function () {
//   arrangeWindows();
//   checkScreenSize();
// });
//
//
// // Add a common class 'title-bar' to all title bars
// const titleBars = document.querySelectorAll('.title-bar');
//
// titleBars.forEach(titleBar => {
//   titleBar.addEventListener('touchstart', function (e) {
//     const windowId = this.closest('.window').id;
//     startDrag(e, windowId);
//   });
// });