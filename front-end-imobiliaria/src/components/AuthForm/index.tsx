import React from "react";

interface AuthFormProps {
  title: string;
  buttonText: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, buttonText }) => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 flex flex-col md:flex-row w-4/5 max-w-4xl">
        {/* Lado Esquerdo */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 bg-gray-200 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <img src="/logo.svg" alt="Logo" className="w-20 my-4" />
          <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg flex items-center mt-4">
            <img src="/google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
            Continue com o Google
          </button>
        </div>

        {/* Lado Direito */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">FAÇA LOGIN</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Digite seu email"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Senha</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Digite sua senha"
              />
            </div>

            <div className="flex justify-between text-sm mb-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Lembrar-me
              </label>
              <a href="#" className="text-blue-500">Esqueceu a senha?</a>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
