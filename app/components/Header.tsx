import Link from "next/link";
import { checkAuth } from "../actions/UserActions";
import { UserDTO } from "../models/User";

const Header = async () => {
  const authUser: UserDTO | null = await checkAuth();
  return (
    <header className="shadow px-20">
      <div className="container mx-auto px-4 py-6 flex justify-between">
        <nav className="grow-2 flex items-center justify-center">
          <Link href="/">
            <span className=" p-3 mx-4 font-bold text-text-black hover:underline">
              HEM
            </span>
          </Link>
          <Link href="/helgen">
            <span className="rounded p-3 mx-4 font-bold text-text-black hover:underline">
              HELGEN
            </span>
          </Link>

          <Link href="/osa">
            <span className="rounded p-3 mx-4 font-bold text-text-black hover:underline">
              OSA
            </span>
          </Link>
          <Link href="/kontakt">
            <span className="rounded p-3 mx-4 font-bold text-text-black hover:underline">
              KONTAKT
            </span>
          </Link>
          <Link href="/ovrigt">
            <span className="rounded p-3 mx-4 font-bold text-text-black hover:underline">
              ÖVRIGT
            </span>
          </Link>
          {authUser && (
            <Link href="/guests">
              <span className="rounded p-3 mx-4 font-bold text-text-black hover:underline">
                GÄSTLISTAN
              </span>
            </Link>
          )}
        </nav>
        {authUser ? (
          <span className="justify-self-end p-3 mx-4  text-text-black">
            Du är inloggad som: {authUser.username}!
          </span>
        ) : (
          <Link href="/login">
            <span className=" p-3 mx-4 text-text-black hover:underline">
              Logga in
            </span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
