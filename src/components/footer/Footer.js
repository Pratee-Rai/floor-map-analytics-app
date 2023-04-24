import footerStyles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={footerStyles.footer}>
      <p className={footerStyles.content}>
        Copyright &copy; {year} Innova Solutions,Inc. All rights reserved.
      </p>
    </footer>
  );
}
