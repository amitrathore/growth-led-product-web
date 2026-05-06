import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Methodology from "@/components/Methodology";
import BookSection from "@/components/BookSection";
import WhyNow from "@/components/WhyNow";
import TableOfContents from "@/components/TableOfContents";
import Community from "@/components/Community";
import Invitation from "@/components/Invitation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Methodology />
        <BookSection />
        <WhyNow />
        <TableOfContents />
        <Community />
        <Invitation />
      </main>
      <Footer />
    </>
  );
}
