
import AuthForm from "@/components/AuthForm"
import { LoadingWrapper } from "@/components/loading/loadingServer"
export default function CadastroPage() {
  return (
    <LoadingWrapper>
      <AuthForm
        title="CADASTRO"
        buttonText="Cadastrar"
        loginOuCadastro="Já tem uma conta? Faça login"
        isCadastro={true}
      />
    </LoadingWrapper>
  )
}