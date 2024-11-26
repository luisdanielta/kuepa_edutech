import React from "react"
import { Link, useNavigate } from "react-router"
import { signupSchema } from "@/schemas/authSchema"
import { FormLayout } from "@/components/forms/FormLayout"
import { AuthForm } from "@/components/forms/AuthForm"
import { AuthService } from "@/api/services/authService"
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastViewport,
} from "@/components/ui/toast"

export default function SignupPage() {
  const navigate = useNavigate() // To redirect after successful signup
  const [toastMessage, setToastMessage] = React.useState<{
    title: string
    description: string
    variant?: "success" | "error"
  } | null>(null)

  // Handle the signup form submission
  const handleSignup = async (data: {
    email: string
    username: string
    password: string
  }) => {
    try {
      // Call the signup service without expecting a token
      await AuthService.signup(data.username, data.email, data.password)

      // Show success toast and redirect to login
      setToastMessage({
        title: "Account Created",
        description: "Please log in to continue.",
        variant: "success",
      })
      setTimeout(() => navigate("/login"), 3000) // Redirect after 3 seconds
    } catch (error) {
      console.error("Error during signup:", error)

      // Show error toast
      setToastMessage({
        title: "Signup Failed",
        description:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
        variant: "error",
      })
    }
  }

  return (
    <ToastProvider>
      <FormLayout
        title="Create Account"
        description="Fill in the fields below to create your account."
        footer={
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Log In
            </Link>
          </p>
        }
      >
        <AuthForm
          schema={signupSchema} // Validation schema for the form
          onSubmit={handleSignup} // Form submission handler
          defaultValues={{ email: "", username: "", password: "" }} // Default form values
          submitText="Sign Up"
          fields={[
            {
              name: "email",
              label: "Email",
              placeholder: "you@example.com",
            },
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

      {/* Toast Notification */}
      {toastMessage && (
        <Toast variant={toastMessage.variant}>
          <ToastTitle>{toastMessage.title}</ToastTitle>
          <ToastDescription>{toastMessage.description}</ToastDescription>
        </Toast>
      )}
      <ToastViewport />
    </ToastProvider>
  )
}
