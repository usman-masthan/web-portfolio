import { useState, useEffect } from 'react';
import ContactModal from './ContactModal';
import ScrollToTop from './ScrollToTop';
import ScrollToBottom from './ScrollToBottom';
import Link from 'next/link';

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

    // Group achievements by category
    const groupedAchievements = Object.groupBy(profile.achievements || [], ({ category }) => category);

    // Group projects by domain
    const groupedProjects = Object.groupBy(profile.projects || [], ({ domain }) => domain);

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
                    <h2>Achievements and Certifications</h2>
                </div>
                {Object.keys(groupedAchievements).length > 0 ? (
                    Object.entries(groupedAchievements).map(([category, items]) => (
                        <div key={category} className="achievement-group">
                            <h3 className="subheading">{category}</h3>
                            <div className="achievements-grid">
                                {items.map((achievement, index) => (
                                    <div key={index} className="achievement-card">
                                        <div className="card-inner">
                                            <div className="card-front">
                                                {achievement.image ? (
                                                    <img src={achievement.image} alt={achievement.title} className="card-img" />
                                                ) : (
                                                    <div className="text-logo">{achievement.issuer || category}</div>
                                                )}
                                            </div>
                                            <div className="card-back">
                                                <h4>{achievement.title}</h4>
                                                <p>Issuer: {achievement.issuer || 'N/A'}</p>
                                                <p>Date: {achievement.date ? new Date(achievement.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'N/A'}</p>
                                                <p>{achievement.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No achievements available</p>
                )}
            </section>
            <section className="projects" id="projects">
                <div className="heading">
                    <h2>Featured Projects</h2>
                </div>
                {Object.keys(groupedProjects).length > 0 ? (
                    Object.entries(groupedProjects).map(([domain, projects]) => (
                        <div key={domain} className="project-group">
                            <h3 className="subheading">{domain}</h3>
                            <div className="projects-grid">
                                {projects.map((project, index) => (
                                    <Link key={index} href={`/projects/${project._id}`} legacyBehavior>
                                        <div className="project-card">
                                            <div className="card-inner">
                                                <div className="card-front">
                                                    {project.image ? (
                                                        <img src={project.image} alt={project.title} className="card-img" />
                                                    ) : (
                                                        <div className="text-logo">
                                                            <h3>{project.title}</h3>
                                                            <p>View Project</p>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="card-back">
                                                    <h4>{project.title}</h4>
                                                    <div className="project-links">
                                                        {project.githubUrl && (
                                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                                <i className="bx bxl-github"></i>
                                                            </a>
                                                        )}
                                                        {project.linkedinUrl && (
                                                            <a href={project.linkedinUrl} target="_blank" rel="noopener noreferrer">
                                                                <i className="bx bxl-linkedin"></i>
                                                            </a>
                                                        )}
                                                    </div>
                                                    <button className="btn">View Project</button>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No projects available</p>
                )}
            </section>
            <ScrollToTop />
            <ScrollToBottom />
            {modal && <ContactModal setModal={setModal} profile={profile} />}
        </>
    );
}