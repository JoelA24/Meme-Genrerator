const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    let topFontSize = 24;
    let bottomFontSize = 24;

    // Generate meme
    function generateMeme() {
      // Get top and bottom text
      const topText = document.getElementById('topText').value.toUpperCase();
      const bottomText = document.getElementById('bottomText').value.toUpperCase();

      // Load image
      const fileInput= document.getElementById('imgUpload');
      const urlInput = document.getElementById('imgURL');
      const image = new Image();
      image.crossOrigin = "anonymous";
      if (fileInput.files && fileInput.files[0]) {
        image.src = URL.createObjectURL(fileInput.files[0]);
      } else if (urlInput.value) {
        image.src = urlInput.value;
      } else {
        // Handle error here, no file or URL specified
      }
      
      // Use the image object here

      image.onload = () => {
        // Set canvas dimensions
        canvas.width = image.width;
        canvas.height = image.height;
        canvas.style.display = 'block';
        canvas.style.margin = '0px';
        image.maxWidth=400;
        image.maxHeight=400;
        
      

        // Draw image on canvas
        ctx.drawImage(image, 0, 0);

        // Add top text
        ctx.font = `bold ${topFontSize}px Comic Sans`;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(topText, canvas.width/2, 10);

        // Add bottom text
        ctx.font = `bold ${bottomFontSize}px Comic Sans`;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(bottomText, canvas.width/2, canvas.height-10);

        // Update preview
        const previewContainer = document.getElementById('memeDemo');
        previewContainer.innerHTML = '';
        const previewImage = new Image();
        previewImage.src = canvas.toDataURL('image/png');
        previewContainer.appendChild(previewImage);

        // Set the max and min width and center it
        previewImage.style.maxWidth = '400px'
        previewImage.style.maxHeight = '400px'
       
        // Push generated meme to savedMemes array
        savedMemes.push({
          topText: topText,
          bottomText: bottomText,
          imageUrl: image.src
        });
      };
    }

    // Update top font size
    document.getElementById('topSize').addEventListener('input', (event) => {
      topFontSize = event.target.value;
    });

    // Update bottom font size
    document.getElementById('bottomSize').addEventListener('input', (event) => {
      bottomFontSize = event.target.value;
    });

    // Generate meme on image upload
    document.getElementById('imgUpload').addEventListener('change', generateMeme);
    document.getElementById('imgURL').addEventListener('change', generateMeme);

// Add a button to save the generated meme
const saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', () => {
// Create a new image element to display the saved meme
const savedMeme = {
imageUrl: canvas.toDataURL('image/png'),
topText: document.getElementById('topText').value.toUpperCase(),
bottomText: document.getElementById('bottomText').value.toUpperCase()
};
savedMemes.push(savedMeme);
const savedMemeElement = document.createElement('div');
const savedMemeImage = new Image();
savedMemeImage.src = savedMeme.imageUrl;
savedMemeElement.appendChild(savedMemeImage);
savedMemeElement.innerHTML += <p>${savedMeme.topText}</p>;
savedMemeElement.innerHTML += <p>${savedMeme.bottomText}</p>;
const deleteButton = document.createElement('button');
deleteButton.innerText = 'Delete';
deleteButton.addEventListener('click', () => {
// Remove the saved meme from the array and from the page
const index = savedMemes.indexOf(savedMeme);
if (index !== -1) {
savedMemes.splice(index, 1);
savedMemesContainer.removeChild(savedMemeElement);
}
});
savedMemeElement.appendChild(deleteButton);
savedMemesContainer.appendChild(savedMemeElement);
});

// Initialize array to hold saved memes
const savedMemes = [];

// Get container for saved memes
const savedMemesContainer = document.getElementById('savedMemes');

// Display saved memes on load
savedMemes.forEach((savedMeme) => {
const savedMemeElement = document.createElement('div');
const savedMemeImage = new Image();
savedMemeImage.src = savedMeme.imageUrl;
savedMemeElement.appendChild(savedMemeImage);
savedMemeElement.innerHTML += <p>${savedMeme.topText}</p>;
savedMemeElement.innerHTML += <p>${savedMeme.bottomText}</p>;
const deleteButton = document.createElement('button');
deleteButton.innerText = 'Delete';
deleteButton.addEventListener('click', () => {
// Remove the saved meme from the array and from the page
const index = savedMemes.indexOf(savedMeme);
if (index !== -1) {
savedMemes.splice(index, 1);
savedMemesContainer.removeChild(savedMemeElement);
}
});
savedMemeElement.appendChild(deleteButton);
savedMemesContainer.appendChild(savedMemeElement);
});

// Update top font size
document.getElementById('topSize').addEventListener('input', (event) => {
topFontSize = event.target.value;
generateMeme();
});

// Update bottom font size
document.getElementById('bottomSize').addEventListener('input', (event) => {
bottomFontSize = event.target.value;
generateMeme();
});

// Generate meme on image upload
document.getElementById('imgUpload').addEventListener('change', generateMeme);
document.getElementById('imgURL').addEventListener('change', generateMeme);

// Generate preview in real-time
document.getElementById('topText').addEventListener('input', generateMeme);
document.getElementById('bottomText').addEventListener('input', generateMeme);