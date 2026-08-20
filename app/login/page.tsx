import { loginUser } from "../actions/UserActions";

const LoginPage = () => {
  return (
    <main className="min-h-screen flex justify-center">
      <form
        action={loginUser}
        className="p-8 rounded shadow-lg w-full h-fit max-w-md flex flex-col gap-4 mt-30"
      >
        <h2 className="text-2xl font-heading mb-4">Logga in</h2>
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
          className="bg-text-black hover:bg-black text-bg-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-60"
          type="submit"
        >
          Logga in
        </button>
      </form>
    </main>
  );
};

export default LoginPage;
