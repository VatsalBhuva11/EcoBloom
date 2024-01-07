
import About from "./Components/About";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import SignIn from "./SignIn";

export default function App() {
    return (
        <div>
            <Navbar />
            <Hero/>           
            <About />
        </div>
    );
}
