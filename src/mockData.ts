export interface Room {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export const mockRooms: Room[] = [
  {
    id: "room-1",
    name: "Lorem Ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    createdAt: "2024-09-15",
  },
  {
    id: "room-2",
    name: "Dolor Sit Amet",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    createdAt: "2024-09-20",
  },
  {
    id: "room-3",
    name: "Consectetur Adipiscing",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    createdAt: "2024-10-01",
  },
  {
    id: "room-4",
    name: "Sed Do Eiusmod",
    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    createdAt: "2024-10-05",
  },
  {
    id: "room-5",
    name: "Tempor Incididunt",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    createdAt: "2024-08-10",
  },
];
