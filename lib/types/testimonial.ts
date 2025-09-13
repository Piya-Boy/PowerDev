import { User } from './user';

export interface Testimonial {
  id: string;
  position: string[];
  content: string;
  image: string;
  profile_link: string;
  userId: string;
  user: User;
}
