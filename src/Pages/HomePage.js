import About from "../Components/About";
import Carousel from "../Components/Carousel";
import CreateCampaigns from "../Components/CreateCampaigns";
import Footer from "../Components/Footer";
import JoinUs from "../Components/JoinUs";
import Navbar from "../Components/Navbar";
import Parallax from "../Components/Parallax";
import PastCampaigns from "../Components/PastCampaigns";
export default function HomePage() {
    return (
        <>
            {/* <Hero /> */}
            <Navbar />

            <Parallax />
            <About />
            <PastCampaigns />
            <JoinUs />
            <CreateCampaigns />
            <Carousel />
            <Footer />
        </>
    );
}
