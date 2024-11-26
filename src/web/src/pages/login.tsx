import React from "react"
import { Link, useNavigate } from "react-router"
import { loginSchema } from "@/schemas/authSchema"
import { FormLayout } from "@/components/forms/FormLayout"
import { AuthForm } from "@/components/forms/AuthForm"
import { AuthService } from "@/api/services/authService"
import { useUserContext } from "@/hooks/useUserContext"

export default function LoginPage() {
  const { login } = useUserContext() // Access the login method from UserContext
  const navigate = useNavigate() // Redirect after login

  // Handle the login form submission
  const handleLogin = async (data: { username: string; password: string }) => {
    try {
      // Call the login service
      const response = await AuthService.login(data.username, data.password)

      // Map the user data from the response
      const userData = response.user

      // Save the user and token in the context
      login(userData, response.token)

      // Redirect the user to the home page
      navigate("/")
    } catch (error) {
      console.error("Error logging in:", error)
      alert("Error logging in. Please check your credentials.")
    }
  }

  return (
    <FormLayout
      title="Log In"
      description="Enter your username and password to access your account"
      footer={
        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-indigo-600 hover:underline">
            Sign Up
          </Link>
        </p>
      }
    >
      <AuthForm
        schema={loginSchema} // Validation schema for the form
        onSubmit={handleLogin} // Form submission handler
        defaultValues={{ username: "", password: "" }} // Default form values
        submitText="Log In"
        fields={[
          {
            name: "username",
            label: "Username",
            placeholder: "your_username",
          },
          {
            name: "password",
            label: "Password",
            placeholder: "••••••••",
            type: "password",
          },
        ]}
      />
    </FormLayout>
  )
}
