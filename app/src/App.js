import "./App.scss";
import BgImage from "./assets/images/bg-img.jpg";
import Header from "./components/Header/Header";
import SideNav from "./components/SideNav/SideNav";
import SectionWrapper from "./components/SectionWrapper/SectionWrapper";

function App() {
  return (
    <div className="App">
      <img src={BgImage} className="App__bg-img" alt="App Background Image" />
      <Header />
      <SideNav />
      <SectionWrapper />
    </div>
  );
}

export default App;
