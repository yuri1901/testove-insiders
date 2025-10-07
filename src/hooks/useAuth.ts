// hooks/useAuth.ts
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut, type User } from "firebase/auth";

export interface FormData {
  name: string;
  email: string;
  password: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const useAuth = (isLogin: boolean) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Відслідковуємо стан користувача
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Скидання форми при зміні режиму (login/register)
  useEffect(() => {
    clearForm();
  }, [isLogin]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = "Ім'я є обов'язковим";
      } else if (formData.name.trim().length < 2) {
        newErrors.name = "Ім'я повинно містити принаймні 2 символи";
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email є обов'язковим";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Невірний формат email";
    }

    if (!formData.password) {
      newErrors.password = "Пароль є обов'язковим";
    } else if (formData.password.length < 6) {
      newErrors.password = "Пароль повинен містити принаймні 6 символів";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (isLogin) {
        // Вхід
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        alert("Вхід успішний!");
      } else {
        // Реєстрація
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

        if (auth.currentUser) {
          await updateProfile(auth.currentUser, { displayName: formData.name });
        }

        alert("Реєстрація успішна!");
      }

      clearForm();
    } catch (error: any) {
      // Виводимо помилку Firebase
      let message = "Сталася помилка. Спробуйте ще раз.";
      if (error.code === "auth/email-already-in-use") {
        message = "Цей email вже використовується";
      } else if (error.code === "auth/user-not-found") {
        message = "Користувача з таким email не існує";
      } else if (error.code === "auth/wrong-password") {
        message = "Невірний пароль";
      }
      alert(message);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearForm = () => {
    setFormData({ name: "", email: "", password: "" });
    setErrors({});
  };

  const logout = async () => {
    await signOut(auth);
    alert("Ви вийшли із системи");
  };

  return {
    formData,
    errors,
    isSubmitting,
    currentUser,
    handleInputChange,
    handleSubmit,
    clearForm,
    logout,
  };
};

export default useAuth;
