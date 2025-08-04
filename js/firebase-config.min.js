// Firebase App (the core Firebase SDK) is loaded via CDN in index.html
// See: https://firebase.google.com/docs/web/setup#add-sdks-initialize

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5I1AlqhGACpPecU8Ly6137txxXvdcrac",
  authDomain: "abdelrahman-ibrahim-info.firebaseapp.com",
  databaseURL: "https://abdelrahman-ibrahim-info-default-rtdb.firebaseio.com",
  projectId: "abdelrahman-ibrahim-info",
  storageBucket: "abdelrahman-ibrahim-info.appspot.com", // fixed typo
  messagingSenderId: "326830243477",
  appId: "1:326830243477:web:1f7d646f95d9cc3839a59c",
  measurementId: "G-GBSD7BNLV9"
};

// Initialize Firebase
console.log('Initializing Firebase...');
firebase.initializeApp(firebaseConfig);

// Initialize Analytics if available
try {
    if (firebase.analytics) {
        firebase.analytics();
        console.log('Firebase Analytics initialized');
    } else {
        console.log('Firebase Analytics not available');
    }
} catch (error) {
    console.log('Firebase Analytics initialization failed:', error);
}

console.log('Firebase initialized successfully');

// Handle form submission with retry mechanism
function setupContactForm() {
    console.log('Setting up contact form handler...');
    const contactForm = document.getElementById("contactForm");
    console.log('Contact form found:', contactForm);
    
    if (contactForm) {
        // Remove any existing event listeners
        const newForm = contactForm.cloneNode(true);
        contactForm.parentNode.replaceChild(newForm, contactForm);
        
        newForm.addEventListener("submit", async function(event) {
            console.log('Form submitted - preventing default');
            event.preventDefault();
            
            const submitBtn = document.getElementById("submitBtn");
            const submitText = document.getElementById("submitText");
            
            if (!submitBtn || !submitText) {
                console.error('Submit button or text not found');
                return;
            }
            
            const nameInput = document.getElementById("name");
            const phoneInput = document.getElementById("phone");
            const messageInput = document.getElementById("message");
            
            if (!messageInput || !messageInput.value.trim()) {
                window.showCustomAlert('Error', 'Please enter a message');
                return;
            }
            
            console.log('Form data:', {
                name: nameInput ? nameInput.value : '',
                phone: phoneInput ? phoneInput.value : '',
                message: messageInput.value
            });
            
            try {
                submitBtn.disabled = true;
                submitBtn.style.opacity = "0.7";
                submitText.textContent = "Sending...";

                console.log('Sending to Firebase...');
                
                // Check if Firebase is available
                if (!firebase || !firebase.firestore) {
                    throw new Error('Firebase not available');
                }
                
                await firebase.firestore().collection("Portfolio-Messages").add({
                    name: nameInput ? nameInput.value : '',
                    phone: phoneInput ? phoneInput.value : '',
                    message: messageInput.value,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });

                console.log('Message sent successfully!');
                window.showCustomAlert('Message Sent', 'Thank you for contacting me!');
                newForm.reset();
            } catch (error) {
                console.error("Error sending message: ", error);
                window.showCustomAlert('Error', 'There was an error sending your message. Please try again later.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.style.opacity = "1";
                submitText.textContent = "Send Message";
            }
        });
        console.log('Form event listener added successfully');
    } else {
        console.error('Contact form not found!');
    }
}

// Try to setup form immediately if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupContactForm);
} else {
    setupContactForm();
}

// Also try after a delay to ensure everything is loaded
setTimeout(setupContactForm, 1000); 