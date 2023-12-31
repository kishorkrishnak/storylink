import { Disclosure } from "@headlessui/react";
import Button from "../common/Button";
import Logo from "../common/Logo";
const Submitbar = ({ setPublishMode }) => {
  const handlePublishClick = () => {
    setPublishMode(true);
  };

  return (
    <Disclosure as="nav" className="font-arial">
      {() => (
        <div className="px-3 py-1.5">
          <div className="flex h-16 items-center justify-between lg:justify-around">
            <Logo />
            <Button
              text={"Submit"}
              bgColor={"black"}
              fgColor={"white"}
              hoverColor={"[#388E3C]"}
              onClick={handlePublishClick}
            />
          </div>
        </div>
      )}
    </Disclosure>
  );
};

export default Submitbar;
