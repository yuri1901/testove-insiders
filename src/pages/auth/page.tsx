import { useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/ContextAuth";
import useAuth from "../../hooks/useAuth";
import "./AuthForm.css";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();

  const authType = searchParams.get("type") || "login";
  const isLogin = authType === "login";

  const { formData, errors, isSubmitting, handleInputChange, handleSubmit } = useAuth(isLogin);

  useEffect(() => {
    if (currentUser) {
      navigate("/rooms", { replace: true });
    }
  }, [currentUser, navigate]);

  return (
    <div className="auth-form-container">
      <div className="auth-form-wrapper">
        <h2 className="auth-form-title">{isLogin ? "Вхід" : "Реєстрація"}</h2>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >
          {!isLogin && (
            <div className="form-group">
              <label
                htmlFor="name"
                className="form-label"
              >
                Ім'я *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`form-input ${errors.name ? "error" : ""}`}
                placeholder="Введіть ваше ім'я"
                disabled={isSubmitting}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
          )}

          <div className="form-group">
            <label
              htmlFor="email"
              className="form-label"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`form-input ${errors.email ? "error" : ""}`}
              placeholder="Введіть ваш email"
              disabled={isSubmitting}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label
              htmlFor="password"
              className="form-label"
            >
              Пароль *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`form-input ${errors.password ? "error" : ""}`}
              placeholder="Введіть пароль"
              disabled={isSubmitting}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {errors.auth && (
            <div className="form-group">
              <span className="error-message auth-error">{errors.auth}</span>
            </div>
          )}

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (isLogin ? "Вхід..." : "Реєстрація...") : isLogin ? "Увійти" : "Зареєструватися"}
          </button>
        </form>

        <div className="auth-form-footer">
          <p>
            {isLogin ? (
              <>
                Немає акаунта?{" "}
                <Link
                  to="/auth?type=register"
                  className="auth-link"
                >
                  Зареєструватися
                </Link>
              </>
            ) : (
              <>
                Вже маєте акаунт?{" "}
                <Link
                  to="/auth?type=login"
                  className="auth-link"
                >
                  Увійти
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
