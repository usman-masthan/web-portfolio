import { useRouter } from 'next/router';

export default function ProjectDetail({ project }) {
    const router = useRouter();

    if (!project) {
        return <div>Project not found</div>;
    }

    // Parse YouTube video ID from URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)
    const getYouTubeEmbedUrl = (url) => {
        if (!url) return null;
        const videoId = url.split('v=')[1]?.split('&')[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    };

    const embedUrl = getYouTubeEmbedUrl(project.videoUrl);

    return (
        <div className="project-detail">
            <h1>{project.title}</h1>
            <p>{project.detailedDescription}</p>

            {embedUrl && (
                <div className="video-embed">
                    <iframe
                        width="560"
                        height="315"
                        src={embedUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}

            {project.galleryImages && project.galleryImages.length > 0 && (
                <div className="image-gallery">
                    <h2>Image Gallery</h2>
                    <div className="gallery-grid">
                        {project.galleryImages.map((img, index) => (
                            <img key={index} src={img} alt={`Gallery image ${index + 1}`} className="gallery-img" />
                        ))}
                    </div>
                </div>
            )}

            {project.docs && project.docs.length > 0 && (
                <div className="docs-section">
                    <h2>Documents</h2>
                    <ul>
                        {project.docs.map((doc, index) => (
                            <li key={index}>
                                <a href={doc.url} target="_blank" rel="noopener noreferrer">{doc.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="key-links">
                <h2>Key Links</h2>
                {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn">
                        GitHub Repository <i className="bx bxl-github"></i>
                    </a>
                )}
                {project.linkedinUrl && (
                    <a href={project.linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn">
                        LinkedIn Post <i className="bx bxl-linkedin"></i>
                    </a>
                )}
            </div>

            <button onClick={() => router.back()} className="btn">Back to Projects</button>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.params;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/profile`);
        if (!res.ok) {
            return { props: { project: null } };
        }
        const profile = await res.json();
        const project = profile.projects.find((p) => p._id.toString() === id);
        return { props: { project: project || null } };
    } catch (error) {
        console.error('Failed to fetch project:', error);
        return { props: { project: null } };
    }
}