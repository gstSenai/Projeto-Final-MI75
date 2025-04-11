
import AuthForm from "@/components/AuthForm"

export default function CadastroPage() {
  return (
    <AuthForm
      title="CADASTRO"
      buttonText="Cadastrar"
      loginOuCadastro="Já tem uma conta? Faça login"
      isCadastro={true}
    />
  )
}