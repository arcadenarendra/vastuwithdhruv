export interface Testimonial {
  id: string;
  name: string;
  profession: string;
  location: string;
  review: string;
  photo?: string;
}

// Testimonials will be populated with verified client reviews
export const testimonials: Testimonial[] = [];
