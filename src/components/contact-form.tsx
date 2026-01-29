"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactForm() {
  const [formState, setFormState] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setFormState(initialState);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Unable to send your request.");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          name="firstName"
          placeholder="First name"
          value={formState.firstName}
          onChange={handleChange}
          required
          className="border-white/15 bg-white/10 text-white placeholder:text-white/50"
        />
        <Input
          name="lastName"
          placeholder="Last name"
          value={formState.lastName}
          onChange={handleChange}
          required
          className="border-white/15 bg-white/10 text-white placeholder:text-white/50"
        />
      </div>
      <Input
        name="email"
        placeholder="Email"
        type="email"
        value={formState.email}
        onChange={handleChange}
        required
        className="border-white/15 bg-white/10 text-white placeholder:text-white/50"
      />
      <Input
        name="phone"
        placeholder="Phone"
        type="tel"
        value={formState.phone}
        onChange={handleChange}
        className="border-white/15 bg-white/10 text-white placeholder:text-white/50"
      />
      <Textarea
        name="message"
        placeholder="Tell us about your goals"
        className="min-h-[120px] border-white/15 bg-white/10 text-white placeholder:text-white/50"
        value={formState.message}
        onChange={handleChange}
        required
      />
      <Button className="w-full rounded-full" size="lg" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Submit request"}
      </Button>
      {status === "success" ? (
        <p className="text-sm text-emerald-600">Thanks! We will follow up within 1 business day.</p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-red-500">{errorMessage}</p>
      ) : null}
    </form>
  );
}
