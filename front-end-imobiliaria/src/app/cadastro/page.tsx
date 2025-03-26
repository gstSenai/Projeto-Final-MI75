import AuthForm from "@/components/authForm";

export default function CadastroPage() {
  return (
    <div className="relative w-full min-h-screen">
      <AuthForm
        title="CADASTRE-SE"
        buttonText="CADASTRAR"
        loginOuCadastro="Já possui uma conta? Faça login"
        isCadastro={true}
      />
    </div>
  )
}