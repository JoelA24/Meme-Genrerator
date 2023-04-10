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
