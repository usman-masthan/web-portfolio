import { useState, useEffect } from 'react';
import ContactModal from './ContactModal';

export default function HomeSection({ profile }) {
    const [darkMode, setDarkMode] = useState(false);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('active');
        } else {
            document.body.classList.remove('active');
        }
    }, [darkMode]);

    if (!profile || !profile.name) {
        return <div>Loading profile...</div>;
    }

    return (
        <>
            <header>
                <label id="darkmode">
                    <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                    />
                    <span className="slider"></span>
                </label>
            </header>
            <section className="home" id="home">
                <div className="social">
                    {profile.socialLinks && profile.socialLinks.length > 0 ? (
                        profile.socialLinks.map((link, index) => (
                            <a key={index} href={link.url}>
                                <i className={`bx ${link.icon}`}></i>
                            </a>
                        ))
                    ) : (
                        <p>No social links available</p>
                    )}
                </div>
                <div className="home-img">
                    <center>
                        <img src={profile.profileImage || '/img/placeholder.jpg'} alt="Profile" />
                    </center>
                </div>
                <div className="home-text">
                    <span>Hello, I'm</span>
                    <h1>{profile.name}</h1>
                    <h2>{profile.title}</h2>
                    <p>{profile.description}</p>
                    <div className="button-container">
                        <a href={profile.cvUrl} target="_blank" download className="btn">
                            My Resume <i className="bx bx-file-blank"></i>
                        </a>
                        <button onClick={() => setModal(true)} className="btn">
                            Contact Me <i className="bx bx-message-dots"></i>
                        </button>
                    </div>
                </div>
            </section>
            {modal && <ContactModal setModal={setModal} profile={profile} />}
        </>
    );
}