import React from "react"
import { Link } from "react-router"
import { loginSchema } from "@/schemas/authSchema"
import { FormLayout } from "@/components/forms/FormLayout"
import { AuthForm } from "@/components/forms/AuthForm"
import { AuthService } from "@/api/services/authService"

export default function LoginPage() {
  const handleLogin = async (data: { username: string; password: string }) => {
    try {
      AuthService.login(data.username, data.password)
    } catch (error) {
      console.error("Error al iniciar sesión:", error)
      alert("Error al iniciar sesión. Verifica tus credenciales.")
    }
  }

  return (
    <FormLayout
      title="Iniciar Sesión"
      description="Ingresa tu usuario y contraseña para acceder a tu cuenta"
      footer={
        <p className="text-center text-sm text-gray-500">
          ¿No tienes una cuenta?{" "}
          <Link to="/sign-up" className="text-indigo-600 hover:underline">
            Regístrate
          </Link>
        </p>
      }
    >
      <AuthForm
        schema={loginSchema}
        onSubmit={handleLogin}
        defaultValues={{ username: "", password: "" }}
        submitText="Iniciar Sesión"
        fields={[
          {
            name: "username",
            label: "Nombre de Usuario",
            placeholder: "tu_usuario",
          },
          {
            name: "password",
            label: "Contraseña",
            placeholder: "••••••••",
            type: "password",
          },
        ]}
      />
    </FormLayout>
  )
}
