
import AuthForm from "@/components/AuthForm"


export default function LoginPage() {
  return (
    <AuthForm title="LOGIN" buttonText="Entrar" loginOuCadastro="Não tem uma conta? Cadastre-se" isCadastro={false} />
  )
}
