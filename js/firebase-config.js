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
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            
            const submitBtn = document.getElementById("submitBtn");
            const submitText = document.getElementById("submitText");
            const loadingSpinner = document.getElementById("loadingSpinner");
            
            try {
                submitBtn.disabled = true;
                submitBtn.style.opacity = "0.7";
                submitText.textContent = "Sending...";

                await firebase.firestore().collection("Portfolio-Messages").add({
                    name: document.getElementById("name").value,
                    phone: document.getElementById("phone").value,
                    message: document.getElementById("message").value,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });

                window.showCustomAlert('Message Sent', 'Thank you for contacting me!');
                contactForm.reset();
            } catch (error) {
                console.error("Error sending message: ", error);
                window.showCustomAlert('Error', 'There was an error sending your message. Please try again later.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.style.opacity = "1";
                submitText.textContent = "Send Message";
            }
        });
    }
}); 