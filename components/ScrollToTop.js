// components/ScrollToTop.js
import { useState, useEffect } from 'react';
export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        toggleVisibility(); // Check initial scroll position
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <button
            className={`scroll-to-top ${isVisible ? 'show' : ''}`}
            onClick={scrollToTop}
            aria-label="Scroll to top"
        >
            <i className='bx bx-chevron-up'></i>
        </button>
    );
}