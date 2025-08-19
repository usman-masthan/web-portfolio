import HomeSection from '../components/HomeSection';

export default function Home({ profile }) {
  return <HomeSection profile={profile} />;
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/profile`);
    if (!res.ok) {
      console.error('API error:', res.status, res.statusText);
      return { props: { profile: null } };
    }
    const profile = await res.json();
    return { props: { profile } };
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    return { props: { profile: null } };
  }
}