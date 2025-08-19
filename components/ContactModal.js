import { useState } from 'react';

export default function ContactModal({ setModal, profile }) {
    const [formData, setFormData] = useState({
        name: '', // Ensure these are empty strings
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert('Message sent successfully!');
                setModal(false);
            } else {
                // Log the response status and text for debugging
                console.error('API response not OK:', res.status, res.statusText);
                const errorData = await res.json();
                console.error('API error data:', errorData);
                alert('Failed to send message: ' + (errorData.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Form submission network error:', error);
            alert('An error occurred while sending the message. Check console for details.');
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Contact Me</h2>
                <div className="contact-options">
                    <a href={`tel:${profile.phone}`} className="contact-btn">
                        <i className="bx bx-phone"></i> Call Me
                    </a>
                    <a href={`mailto:${profile.email}`} className="contact-btn">
                        <i className="bx bx-envelope"></i> Email Me
                    </a>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name" // Correct placeholder
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email" // Correct placeholder
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message" // Correct placeholder for message
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                    <button type="submit" className="btn">
                        Send Message
                    </button>
                </form>
                <button onClick={() => setModal(false)} className="close-btn">
                    <i className="bx bx-x"></i>
                </button>
            </div>
        </div>
    );
}