import { signupSchema } from "@/schemas/authSchema"
import { FormLayout } from "@/components/forms/FormLayout"
import { AuthForm } from "@/components/forms/AuthForm"
import React from "react"
import { Link } from "react-router"

export default function SignupPage() {
  const handleSignup = (data) => {
    console.log("Signup Data:", data)
  }

  return (
    <FormLayout
      title="Crear Cuenta"
      description="Rellena los campos para registrarte"
      footer={
        <p className="text-center text-sm text-gray-500">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Inicia Sesión
          </Link>
        </p>
      }
    >
      <AuthForm
        schema={signupSchema}
        onSubmit={handleSignup}
        defaultValues={{ username: "", email: "", password: "" }}
        submitText="Registrarse"
        fields={[
          {
            name: "email",
            label: "Correo Electrónico",
            placeholder: "correo@ejemplo.com",
          },
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
