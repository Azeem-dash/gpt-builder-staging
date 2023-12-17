import { Explanation } from './explanation';
import { Features } from './features';
import { Hero } from './hero';

export default async function IndexPage() {
  return (
    <main className="container">
      <Hero />
      <Features />
      <Explanation />
    </main>
  );
}
