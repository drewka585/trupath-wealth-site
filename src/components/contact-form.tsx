"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FULLOUT_URL = "https://forms.fillout.com/t/oFD6EFxsojus";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactForm() {
  const [formState, setFormState] = useState(initialState);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams({
      first_name: formState.firstName.trim(),
      last_name: formState.lastName.trim(),
      email: formState.email.trim(),
      phone: formState.phone.trim(),
      message: formState.message.trim(),
    });

    const url = `${FULLOUT_URL}?${params.toString()}`;
    window.open(url, "_blank", "noopener,noreferrer");
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
      <Button className="w-full rounded-full" size="lg" type="submit">
        Continue in Fillout
      </Button>
    </form>
  );
}
