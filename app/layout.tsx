import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import { Toaster } from "sonner";

export const metadata: Metadata = {
	title: "Bernozzi Wedding",
	description: "Bröllopssida för Olivia och Simon",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`h-full antialiased`}
		>
			<body>
				<div className="px-4">
					<Header />
				</div>
				{children}
				<Toaster
					toastOptions={{
						style: { background: "#46423f", color: "#f5f0ed", border: "none" },
					}}
				/>{" "}
			</body>
		</html>
	);
}
