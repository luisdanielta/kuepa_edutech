import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormField } from "./FormField";

export function AuthForm({ schema, onSubmit, defaultValues, submitText, fields }) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {fields.map(({ name, label, placeholder, type }) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            label={label}
            placeholder={placeholder}
            type={type || "text"}
          />
        ))}
        <Button type="submit" className="w-full">
          {submitText}
        </Button>
      </form>
    </Form>
  );
}
