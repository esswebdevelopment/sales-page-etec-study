import Header from "./Header";
import PlatformPreview from "./PlatformPreview";
import Identify from "./Identify";
import useSmoothScroll from "./useSmoothScroll";
import Receive from "./Receive";
import Plans from "./Plans";
import Results from "./Results";
import Testimonials from "./Testimonials";
import Faq from "./Faq";
import Closing from "./Closing";
import Footer from "./Footer";

export default function App() {
  useSmoothScroll();

  return (
    <>
      <Header />
      <main>
        <PlatformPreview />
        <Identify />
        <Receive />
        <Plans />
        <Results />
        <Testimonials />
        <Faq />
        <div className="end">
          <Closing />
          <Footer />
        </div>
      </main>
    </>
  );
}