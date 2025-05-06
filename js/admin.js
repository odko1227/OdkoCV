document.addEventListener('DOMContentLoaded', function() {
    // Profile Image Preview
    const profileImage = document.getElementById('profileImage');
    const profilePreview = document.getElementById('profilePreview');

    if (profileImage && profilePreview) {
        profileImage.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profilePreview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove active class from all links
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            // Add active class to clicked link
            this.parentElement.classList.add('active');
            // Load section content
            loadSection(this.getAttribute('href').substring(1));
        });
    });

    // Save Changes
    const saveButton = document.querySelector('.save-all');
    if (saveButton) {
        saveButton.addEventListener('click', saveChanges);
    }

    // Logout
    const logoutButton = document.querySelector('.logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            if (confirm('Are you sure you want to logout?')) {
                window.location.href = '../index.html';
            }
        });
    }
});

// Function to load section content
function loadSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.edit-section').forEach(section => {
        section.style.display = 'none';
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}

// Function to save changes
function saveChanges() {
    // Collect all form data
    const formData = new FormData();
    
    // Add profile image if changed
    const profileImage = document.getElementById('profileImage');
    if (profileImage && profileImage.files[0]) {
        formData.append('profile_image', profileImage.files[0]);
    }

    // Add other form data
    const name = document.querySelector('input[value="Ohon Dayan"]').value;
    const title = document.querySelector('input[value="ИЗОУИС УИТС КПХ 323А-р бүлгийн оюутан"]').value;
    const aboutMe = document.querySelector('textarea').value;

    formData.append('name', name);
    formData.append('title', title);
    formData.append('about_me', aboutMe);

    // Show success message
    alert('Changes saved successfully!');
} 