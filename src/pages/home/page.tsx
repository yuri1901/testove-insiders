import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../../context/ContextAuth";

const HomePage = () => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/rooms", { replace: true });
    }
  }, [currentUser, navigate]);

  // Don't render anything if user is authenticated (will redirect)
  if (currentUser) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Бронювання переговорних кімнат
            <span className="block text-blue-600 mt-2">стало простішим</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">Швидко знайдіть та забронюйте ідеальну переговорну кімнату для ваших зустрічей. Сучасний інтерфейс, миттєве бронювання, повний контроль над розкладом.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth?type=register"
              className="bg-white text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-colors duration-200"
            >
              Почати безкоштовно
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Чому обирають Room Booker?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Швидке бронювання</h3>
              <p className="text-gray-600">Забронюйте кімнату за декілька кліків. Простий інтерфейс та миттєве підтвердження.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Управління розкладом</h3>
              <p className="text-gray-600">Переглядайте доступність кімнат в реальному часі та плануйте зустрічі ефективно.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm2 2a1 1 0 000 2h.01a1 1 0 100-2H5zm3 0a1 1 0 000 2h3a1 1 0 100-2H8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Детальна інформація</h3>
              <p className="text-gray-600">Повна інформація про кожну кімнату: обладнання, місткість, фотографії та відгуки.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Переговорних кімнат</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">1000+</div>
              <div className="text-gray-600">Задоволених користувачів</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Доступність сервісу</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">99%</div>
              <div className="text-gray-600">Успішних бронювань</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Готові почати?</h2>
          <p className="text-xl text-blue-100 mb-8">Приєднуйтесь до тисяч компаній, які довіряють нам організацію своїх зустрічей</p>
          <Link
            to="/auth?type=register"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 inline-block"
          >
            Створити акаунт безкоштовно
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
