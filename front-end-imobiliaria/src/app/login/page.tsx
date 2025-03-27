import AuthForm from "@/components/authForm";

export default function LoginPage() {
  return (
    <div className="relative w-full min-h-screen">
      <AuthForm title="FAÇA LOGIN" buttonText="ENTRAR" loginOuCadastro="Não possui uma conta? Cadastre-se" />
    </div>
  )
}
