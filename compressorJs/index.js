// Get references to the HTML elements
const compressorInput = document.getElementById('compressorInput');
const compressorButton = document.getElementById('compressorButton');
const saveCompressedFileButton = document.getElementById('saveCompressedFileButton');

// Register event listener for the compressorButton
compressorButton.addEventListener('click', compressImage);

// Function to compress the image
function compressImage() {
  const file = compressorInput.files[0];
  if (!file) {
    alert('Please select an image file.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Calculate the new width and height to maintain the aspect ratio
      const MAX_WIDTH = 800;
      const MAX_HEIGHT = 800;
      let { width } = img;
      let { height } = img;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }

      // Set the canvas dimensions
      canvas.width = width;
      canvas.height = height;

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0, width, height);

      // Convert the compressed image to data URL
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7); // Adjust the quality as needed

      // Do something with the compressed image data (e.g., display it in an <img> tag)
      const compressedImage = document.createElement('img');
      compressedImage.src = compressedDataUrl;
      document.body.appendChild(compressedImage);

      // Enable the saveCompressedFileButton
      saveCompressedFileButton.disabled = false;

      // Notify the user that compression is complete
      alert('Compression complete. Click the "Save Compressed File" button to save.');
    };

    // Set the source of the image to the data URL
    img.src = event.target.result;
  };

  // Read the file as data URL
  reader.readAsDataURL(file);
}

// Register event listener for the saveCompressedFileButton
saveCompressedFileButton.addEventListener('click', saveCompressedFile);

// Function to save the compressed file
function saveCompressedFile() {
  const compressedImage = document.querySelector('img');

  // Create a link element
  const link = document.createElement('a');
  link.href = compressedImage.src;
  link.download = 'compressed_image.jpg'; // Set the desired file name here

  // Simulate a click on the link to trigger the download
  link.click();
}
