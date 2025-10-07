import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/ContextAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

const Header = () => {
  const { currentUser } = useAuthContext();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm8 8v2a1 1 0 01-1 1H6a1 1 0 01-1-1v-2h8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Room Booker</h1>
            </Link>
          </div>
          {currentUser && (
            <nav className="flex space-x-8">
              <Link
                to="/rooms"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Кімнати
              </Link>
              <Link
                to="/bookings"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Мої бронювання
              </Link>
            </nav>
          )}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <span className="text-gray-700 text-sm font-medium">Привіт, {currentUser.displayName || currentUser.email}!</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer"
                >
                  Вийти
                </button>
              </>
            ) : (
              // Користувач не увійшов
              <>
                <Link
                  to="/auth?type=login"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Увійти
                </Link>
                <Link
                  to="/auth?type=register"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Реєстрація
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
