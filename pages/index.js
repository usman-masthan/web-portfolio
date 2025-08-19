import HomeSection from '../components/HomeSection';

export default function Home({ profile }) {
  return <HomeSection profile={profile} />;
}

export async function getServerSideProps() {
  try {
    const res = await fetch('http://localhost:3000/api/profile');
    if (!res.ok) {
      console.error('API error:', res.status, res.statusText);
      return { props: { profile: null } };
    }
    const profile = await res.json();
    console.log('Fetched profile:', profile);
    return { props: { profile } };
  } catch (error) {
    console.error('Error fetching profile:', error);
    return { props: { profile: null } };
  }
}