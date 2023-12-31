import { Link } from "react-router-dom";
import useHandleNavigationClick from "../../hooks/useHandleNavigationClick";
import Logo from "../common/Logo";
const Footer = () => {
  const handleNavigationClick = useHandleNavigationClick();
  const navigation = [
    { name: "Write Your Story", href: "/write", current: true },
    { name: "Bookmarks", href: "/bookmarks", current: false },
    { name: "Stories", href: "/stories", current: false },
    { name: "Contact Us", href: "#", current: false },
  ];

  return (
    <div className="flex flex-col justify-between items-center lg:flex-row py-4 px-2 md:px-20 bg-black h-[165px]">
      <div className="flex flex-col justify-center gap-5">
        <Link
          to={"/"}
          className="flex gap-1 items-center justify-center lg:justify-start"
        >
          <Logo color="white" />
        </Link>

        <ul className="flex text-white gap-2.5 md:gap-6 no-underline">
          {navigation.map((link, index) => (
            <li key={index}>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigationClick(link.href);
                }}
                to={link.href}
                className={"text-sm font-normal"}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-white text-sm font-normal lg:text-lg">
        Made with ❤️ in India by{" "}
        <a className="underline" href="https://github.com/kishorcodes">
          Kishor
        </a>{" "}
      </p>
    </div>
  );
};

export default Footer;
