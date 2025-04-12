
import AuthForm from "@/components/AuthForm"
import { LoadingWrapper } from "@/components/loading/loadingServer" 

export default function LoginPage() {
  return (
    <LoadingWrapper>
      <AuthForm title="LOGIN" buttonText="Entrar" loginOuCadastro="Não tem uma conta? Cadastre-se" isCadastro={false} />
    </LoadingWrapper>
  )
}
