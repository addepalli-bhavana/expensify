import {
  AiFillTwitterCircle,
  AiFillYoutube,
  AiOutlineInstagram,
} from "react-icons/ai";

export const sidebarLinks = [
  {
    id: 1,
    label: "expenses",
    url: "/",
  },
  {
    id: 2,
    label: "reset password",
    url: "/reset-password",
  },
];

export const footerIcons = [
  { id: 1, url: "https://twitter.com", icon: <AiFillTwitterCircle /> },
  { id: 2, url: "https://www.instagram.com", icon: <AiOutlineInstagram /> },
  { id: 3, url: "https://www.youtube.com", icon: <AiFillYoutube /> },
];
