import Link from "next/link";
import { checkAuth } from "../actions/UserActions";
import { UserDTO } from "../models/User";

const Header = async () => {
  const authUser: UserDTO | null = await checkAuth();
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold">Olivia & Simons Bröllop</h1>
        {authUser ? (
          <p>Du är inloggad som, {authUser.username}!</p>
        ) : (
          <>
            <p>Du är inte inloggad.</p>
            <Link href="/login" className="text-blue-500 hover:underline">
              Logga in
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
