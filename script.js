        function initRasaWebchat() {
            console.log("Initializing Rasa WebChat...");
            
            // Check if the WebChat object is available
            if (typeof window.WebChat === 'undefined') {
                console.error('Rasa WebChat library not loaded properly');
                alert('Error loading Rasa WebChat. Please check your internet connection and try again.');
                return;
            }
            
            try {
                // Log the WebChat object to see its structure
                console.log('WebChat object:', window.WebChat);
                
                // Create a simple chat interface if WebChat initialization fails
                const webchatDiv = document.getElementById('webchat');
                webchatDiv.innerHTML = `
                    <div style="width: 100%; height: 500px; background: white; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); display: flex; flex-direction: column;">
                        <div style="background: #0078D4; color: white; padding: 15px; border-radius: 10px 10px 0 0; display: flex; align-items: center;">
                            <img src="https://i.imgur.com/nGF1K8f.jpg" alt="Bot Avatar" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px;">
                            <div>
                                <h3 style="margin: 0;">Resume Bot (Rasa Mode)</h3>
                                <small>Ask me about my experience</small>
                            </div>
                        </div>
                        <div id="rasa-messages" style="flex-grow: 1; padding: 15px; overflow-y: auto;">
                            <div style="margin: 10px 0; padding: 10px; border-radius: 10px; max-width: 80%; background: #f0f0f0; margin-right: auto;">
                                Hello! I'm your resume chatbot powered by Rasa. You can ask me about my experience, skills, education, and more!
                            </div>
                        </div>
                        <div style="padding: 15px; border-top: 1px solid #eee; display: flex;">
                            <input type="text" id="rasa-input" placeholder="Type your message..." style="flex-grow: 1; padding: 10px; border: 1px solid #ddd; border-radius: 20px; margin-right: 10px;">
                            <button onclick="sendRasaMessage()" style="background: #0078D4; color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer;">Send</button>
                        </div>
                    </div>
                `;
                
                // Add event listener for Enter key
                document.getElementById('rasa-input').addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        sendRasaMessage();
                    }
                });
                
                // Try to initialize the WebChat if possible
                if (typeof window.WebChat.default !== 'undefined' && typeof window.WebChat.default.init === 'function') {
                    console.log("Using WebChat.default.init");
                    window.WebChat.default.init({
                        selector: "#webchat",
                        initPayload: '/get_started',
                        socketUrl: "http://localhost:5005",
                        socketPath: "/socket.io/",
                        customData: { language: "en" },
                        title: "Resume Bot",
                        subtitle: "Ask me about my experience",
                        profileAvatar: "https://i.imgur.com/nGF1K8f.jpg",
                        userAvatar: "https://i.imgur.com/8yQC5aG.jpg",
                        params: {
                            storage: "session"
                        },
                        theme: {
                            primary_color: "#0078D4",
                            secondary_color: "#005a9e",
                            background_color: "white",
                            text_color: "black",
                            header_text_color: "black",
                            font_family: "Arial, sans-serif",
                            message_bubble_style: {
                                borderRadius: "10px",
                                padding: "10px",
                                margin: "5px"
                            }
                        }
                    });
                } else if (typeof window.WebChat.init === 'function') {
                    console.log("Using WebChat.init");
                    window.WebChat.init({
                        selector: "#webchat",
                        initPayload: '/get_started',
                        socketUrl: "http://localhost:5005",
                        socketPath: "/socket.io/",
                        customData: { language: "en" },
                        title: "Resume Bot",
                        subtitle: "Ask me about my experience",
                        profileAvatar: "https://i.imgur.com/nGF1K8f.jpg",
                        userAvatar: "https://i.imgur.com/8yQC5aG.jpg",
                        params: {
                            storage: "session"
                        },
                        theme: {
                            primary_color: "#0078D4",
                            secondary_color: "#005a9e",
                            background_color: "white",
                            text_color: "black",
                            header_text_color: "black",
                            font_family: "Arial, sans-serif",
                            message_bubble_style: {
                                borderRadius: "10px",
                                padding: "10px",
                                margin: "5px"
                            }
                        }
                    });
                } else {
                    console.warn("WebChat initialization function not found, using custom implementation");
                }
            } catch (error) {
                console.error('Error initializing Rasa WebChat:', error);
                alert('Error initializing Rasa WebChat: ' + error.message);
            }
        } 