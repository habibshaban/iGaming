import type { ReactNode } from "react";
import Header from "./header/Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <Header />
      <main className="layout__content">{children}</main>
    </div>
  );
};
export default Layout;
