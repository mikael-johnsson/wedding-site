import Link from "next/link";
import { checkAuth } from "../actions/UserActions";
import { UserDTO } from "../models/User";

const Header = async () => {
  const authUser: UserDTO | null = await checkAuth();
  return (
    <header className="bg-white shadow px-20">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <nav>
          <Link href="/">
            <span className="rounded p-3 text-white bg-gray-500 hover:bg-gray-700 mx-4">
              VÄLKOMNA
            </span>
          </Link>
          <Link href="/schedule">
            <span className="rounded p-3 text-white bg-gray-500 hover:bg-gray-700 mx-4">
              UPPLÄGG
            </span>
          </Link>

          <Link href="/osa">
            <span className="rounded p-3 text-white bg-gray-500 hover:bg-gray-700 mx-4">
              OSA
            </span>
          </Link>
          <Link href="/info">
            <span className="rounded p-3 text-white bg-gray-500 hover:bg-gray-700 mx-4">
              INFO
            </span>
          </Link>
          {authUser && (
            <Link href="/guests">
              <span className="rounded p-3 text-white bg-gray-500 hover:bg-gray-700 mx-4">
                GÄSTLISTAN
              </span>
            </Link>
          )}
        </nav>
        {authUser ? (
          <p>Du är inloggad som, {authUser.username}!</p>
        ) : (
          <div>
            <p>Du är inte inloggad.</p>
            <Link href="/login">
              <span className="rounded p-1 text-white bg-gray-500 hover:bg-gray-700 mx-4">
                Logga in
              </span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
