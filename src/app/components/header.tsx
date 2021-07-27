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
					<button onClick={() => disconnect()}>Disconnect Wallet</button>
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

				nav ul {
					margin: 0;
					padding: 0;
					list-style: none;
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

				button {
					padding: 0.5rem 1rem;
					background: linear-gradient(180deg, #4d9aff 0%, #006eff 100%), #006eff;
					color: #fff;
					border-radius: 36px;
					border: none;
					cursor: pointer;
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
