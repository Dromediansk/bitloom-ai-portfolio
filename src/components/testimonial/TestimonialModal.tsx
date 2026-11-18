"use client";

import Modal from "../Modal";
import AuthorHeader from "./AuthorHeader";
import { Testimonial } from "./types";
import VerifiedBadge from "./VerifiedBadge";

interface Props {
  testimonial: Testimonial | null;
  onClose: () => void;
}

const TestimonialModal = ({ testimonial, onClose }: Props) => (
  <Modal isOpen={testimonial !== null} onClose={onClose} labelledBy="testimonial-modal-author">
    {testimonial && (
      <figure className="loom-quote tst-modal">
        <AuthorHeader testimonial={testimonial} id="testimonial-modal-author" />
        <blockquote>&ldquo;{testimonial.testimonial}&rdquo;</blockquote>
        <VerifiedBadge recommendationDate={testimonial.recommendationDate} authorName={testimonial.name} />
      </figure>
    )}
  </Modal>
);

export default TestimonialModal;
