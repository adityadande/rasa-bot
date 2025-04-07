let model = null;
const imageUpload = document.getElementById('image-upload');
const imagePreview = document.getElementById('image-preview');
const predictionsList = document.getElementById('predictions-list');
const loading = document.querySelector('.loading');

// Load the model when the page loads
async function loadModel() {
    loading.classList.add('active');
    try {
        // Load a simple model
        model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
        
        loading.classList.remove('active');
        console.log('Model loaded successfully!');
        
        // Enable the upload button
        imageUpload.disabled = false;
    } catch (error) {
        console.error('Error loading model:', error);
        loading.innerHTML = `
            <p style="color: red;">Error loading AI model: ${error.message}</p>
            <p>Please check your internet connection and try again.</p>
            <button onclick="window.location.reload()" style="margin-top: 10px;">Retry</button>
        `;
    }
}

// Handle image upload
imageUpload.addEventListener('change', async function(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Show loading
    loading.classList.add('active');

    // Display the image
    const reader = new FileReader();
    reader.onload = function(e) {
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);

    // Wait for the image to load
    imagePreview.onload = async function() {
        try {
            // Convert image to tensor
            const tensor = tf.browser.fromPixels(imagePreview)
                .resizeNearestNeighbor([224, 224])
                .toFloat()
                .expandDims();
            
            // Get predictions
            const predictions = await model.predict(tensor).data();
            
            // Get top 5 predictions
            const top5 = Array.from(predictions)
                .map((prob, i) => ({probability: prob, class: `Class ${i}`}))
                .sort((a, b) => b.probability - a.probability)
                .slice(0, 5);
            
            // Display predictions
            predictionsList.innerHTML = top5.map(pred => `
                <div class="prediction-item">
                    <div>
                        <strong>${pred.class}</strong>
                        <div class="confidence-bar">
                            <div class="confidence-fill" style="width: ${pred.probability * 100}%"></div>
                        </div>
                        <small>${(pred.probability * 100).toFixed(2)}% confidence</small>
                    </div>
                </div>
            `).join('');
            
            // Clean up
            tensor.dispose();
        } catch (error) {
            console.error('Error getting predictions:', error);
            predictionsList.innerHTML = '<p style="color: red;">Error analyzing image. Please try again.</p>';
        } finally {
            loading.classList.remove('active');
        }
    };
});

// Start loading the model
loadModel(); 