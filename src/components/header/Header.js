import logo from "../../images/innova-logo.svg";
import headerStyles from "./Header.module.css";
export default function Header() {
  return (
    <header className={headerStyles.header}>
      <img
        src={logo}
        className={headerStyles.logo}
        alt="Innova Solutions Logo"
        height={60}
      />
      <div className={headerStyles.accountInfo}></div>
    </header>
  );
}
