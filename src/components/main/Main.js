// import Footer from "../footer/Footer";
import mainStyles from "./Main.module.css";
export default function Main({ children }) {
  return (
    <main className={mainStyles.main}>
      <div className="container-fluid">{children}</div>
    </main>
  );
}
