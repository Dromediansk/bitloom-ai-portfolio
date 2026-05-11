"use client";

import Modal from "../Modal";
import AuthorHeader from "./AuthorHeader";
import DecorativeQuote from "./DecorativeQuote";
import { Testimonial } from "./types";

interface Props {
  testimonial: Testimonial | null;
  onClose: () => void;
}

const TestimonialModal = ({ testimonial, onClose }: Props) => (
  <Modal isOpen={testimonial !== null} onClose={onClose}>
    {testimonial && (
      <div className="relative">
        <DecorativeQuote />
        <AuthorHeader testimonial={testimonial} />
        <blockquote className="mt-6 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed whitespace-pre-line">
          &ldquo;{testimonial.testimonial}&rdquo;
        </blockquote>
      </div>
    )}
  </Modal>
);

export default TestimonialModal;
