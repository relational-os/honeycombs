import React from "react";
import Link from "next/link";
import ConnectWalletButton from "./connectWalletButton";

import QueryBar from "./queryBar";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/write">
              <a>Write</a>
            </Link>
          </li>
        </ul>
      </nav>

      <QueryBar></QueryBar>

      <ConnectWalletButton></ConnectWalletButton>

      <style jsx>{`
        header {
          position: relative;
          padding: 20px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }

        .search {
        }

        nav {
          position: fixed;
          top: 1rem;
          left: 1rem;
        }

        nav ul a {
          color: #000;
          font-size: 1.2rem;
          text-decoration: none;
          border-bottom: 1px solid none;
        }

        nav ul a:hover {
          border-bottom: 1px solid pink;
        }

        @media screen and (max-width: 768px) {
          nav,
          .authentication {
            position: absolute;
          }

          nav ul {
            display: flex;
          }

          nav ul li {
            margin-right: 1rem;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
