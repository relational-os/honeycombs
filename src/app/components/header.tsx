import React from "react";
import { useWallet } from "@gimmixfactory/use-wallet";
import Link from "next/link";

const Header = () => {
	const { account, connect, disconnect } = useWallet();
	console.log(account);
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

			<div className="authentication">
				{account == undefined ? (
					<button onClick={() => connect()}>Connect Wallet</button>
				) : (
					<>
						<button onClick={() => disconnect()} className="disconnect">
							Disconnect Wallet
						</button>

						<div className="newButton">
							<span>+</span>
							<ul>
								<li>Text</li>
								<li>Image</li>
							</ul>
						</div>
					</>
				)}
			</div>

			<style jsx>{`
				header {
					position: relative;
					padding: 20px;
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

				.authentication {
					position: fixed;
					top: 1rem;
					right: 1rem;
				}

				.newButton {
					position: relative;
					height: 3rem;
					width: 3rem;
					background: linear-gradient(180deg, #4d9aff 0%, #006eff 100%), #006eff;
					text-align: center;
					border-radius: 100%;
					transition: color 0.15s ease-in-out;
					cursor: pointer;
				}

				.newButton > span {
					color: #fff;
					font-size: 2rem;
					line-height: 2.8rem;
				}

				.newButton:hover ul {
					display: block;
				}

				.newButton ul {
					display: none;
					position: absolute;
					width: 5rem;
					top: 3em;
					left: -1rem;
					padding: 0.35rem 0;
					text-align: center;
				}

				.newButton ul li {
					padding: 0 0.25rem;
				}

				.newButton ul li:hover {
					color: #006eff;
				}

				button {
					padding: 0.5rem 1rem;
					background: linear-gradient(180deg, #4d9aff 0%, #006eff 100%), #006eff;
					color: #fff;
					border-radius: 36px;
					border: 0;
					outline: 0;
					cursor: pointer;
				}

				button.disconnect {
					position: fixed;
					bottom: 1rem;
					left: 1rem;
					background: transparent;
					color: #666;
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
