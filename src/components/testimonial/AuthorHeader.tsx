"use client";

import { useTranslations } from "next-intl";
import { Testimonial } from "./types";

const AuthorHeader = ({ testimonial, id }: { testimonial: Testimonial; id?: string }) => {
  const t = useTranslations("testimonials");
  return (
    <figcaption id={id}>
      <b>{testimonial.name}</b>
      <span className="loom-soft">
        {testimonial.role}
        {testimonial.company ? ` ${t("at")} ${testimonial.company}` : ""}
      </span>
    </figcaption>
  );
};

export default AuthorHeader;
