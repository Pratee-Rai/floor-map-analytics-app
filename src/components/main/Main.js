import Footer from "../footer/Footer";
import mainStyles from "./Main.module.css";
export default function Main({ children }) {
  return (
    <main className={mainStyles.main}>
      <div className={mainStyles.mainContent}>{children}</div>
      <Footer />
    </main>
  );
}
