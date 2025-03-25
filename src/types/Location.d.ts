export interface Location {
  name: string;
  description: string;
  image: string;
  images: string[];
  category: string;
  rating: {
    user: string;
    rating: number;
    comment: string;
  }[];
  bestTimeToVisit: string;
  activities: string[];
  coordinator: {
    name: string;
    email: string;
    phone: string;
  };
}
