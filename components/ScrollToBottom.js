// components/ScrollToBottom.js
import { useState, useEffect } from 'react';

export default function ScrollToBottom() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrolled = window.scrollY;

        // Show button if not near bottom
        if (windowHeight + scrolled < documentHeight - 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        toggleVisibility();
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <button
            className={`scroll-to-bottom ${isVisible ? 'show' : ''}`}
            onClick={scrollToBottom}
            aria-label="Scroll to bottom"
        >
            <i className='bx bx-chevron-down'></i>
        </button>
    );
}