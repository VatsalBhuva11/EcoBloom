
import About from "./Components/About";
import Navbar from "./Navbar";
import SignIn from "./SignIn";

export default function App() {
    return (
        <div>
            <Navbar />;
            <SignIn />;
            <About/>
        </div>
    );
}
