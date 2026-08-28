import { createUser } from "../actions/UserActions";

const SignUpPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        action={createUser}
        className="bg-white p-8 rounded shadow-md w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-3xl font-heading mb-4">Skapa användare</h2>
        <div className="flex flex-col gap-1">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Användarnamn:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="username"
            name="username"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Lösenord:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            id="password"
            name="password"
            required
          />
        </div>

        <button
          className="hover:cursor-pointer bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-60"
          type="submit"
        >
          Skapa användare
        </button>
      </form>
    </main>
  );
};

export default SignUpPage;
