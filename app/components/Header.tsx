import Link from "next/link";
import { checkAuth } from "../actions/UserActions";
import { UserDTO } from "../models/User";

const Header = async () => {
  const authUser: UserDTO | null = await checkAuth();
  return (
    <header className="bg-white shadow px-20">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link href="/" className="text-gray-800 hover:text-gray-600">
          <h1 className="text-2xl font-bold">Olivia & Simons Bröllop</h1>
        </Link>
        <nav>
          <Link
            href="/osa"
            className="rounded p-3 text-white bg-gray-500 hover:bg-gray-700 mx-4"
          >
            OSA
          </Link>
          {authUser && (
            <Link
              href="/guests"
              className="rounded p-3 text-white bg-gray-500 hover:bg-gray-700 mx-4"
            >
              Gästlistan
            </Link>
          )}
        </nav>
        {authUser ? (
          <p>Du är inloggad som, {authUser.username}!</p>
        ) : (
          <div>
            <p>Du är inte inloggad.</p>
            <Link href="/login" className="text-blue-500 hover:underline">
              Logga in
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
