import { useState, useEffect } from 'react';
import ContactModal from './ContactModal';
import ScrollToTop from './ScrollToTop';
import ScrollToBottom from './ScrollToBottom';

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
                    <a href="#achievements">
                        <i className="bx bx-medal"></i>
                    </a>
                    <a href="#blogs">
                        <i className="bx bx-notepad"></i>
                    </a>
                    <a href="#projects">
                        <i className="bx bx-folder-plus"></i>
                    </a>
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
            <section className="achievements" id="achievements">
                <div className="heading">
                    <h2>Achievements</h2>
                </div>
                <div className="achievements-grid">
                    {profile.achievements && profile.achievements.length > 0 ? (
                        profile.achievements.map((img, index) => (
                            <img key={index} src={img} alt={`Achievement ${index + 1}`} className="achievement-img" />
                        ))
                    ) : (
                        <p>No achievements available</p>
                    )}
                </div>
            </section>
            <section className="blogs" id="blogs">
                <div className="heading">
                    <h2>Blogs</h2>
                </div>
                <div className="blogs-grid">
                    {profile.blogs && profile.blogs.length > 0 ? (
                        profile.blogs.map((blog, index) => (
                            <div key={index} className="blog-card">
                                <img src={blog.image} alt={blog.title} className="blog-img" />
                                <h3>{blog.title}</h3>
                                <p>{blog.description}</p>
                                {blog.url && (
                                    <a href={blog.url} target="_blank" className="btn">
                                        Read More
                                    </a>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No blogs available</p>
                    )}
                </div>
            </section>
            <section className="projects" id="projects">
                <div className="heading">
                    <h2>Projects</h2>
                </div>
                <div className="projects-grid">
                    {profile.projects && profile.projects.length > 0 ? (
                        profile.projects.map((project, index) => (
                            <div key={index} className="project-card">
                                <img src={project.image} alt={project.title} className="project-img" />
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                {project.url && (
                                    <a href={project.url} target="_blank" className="btn">
                                        View Project
                                    </a>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No projects available</p>
                    )}
                </div>
            </section>
            <ScrollToTop />
            <ScrollToBottom />
            {modal && <ContactModal setModal={setModal} profile={profile} />}
        </>
    );
}