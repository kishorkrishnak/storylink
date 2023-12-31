import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useHandleNavigationClick from "../../hooks/useHandleNavigationClick";
import Logo from "../common/Logo";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const handleNavigationClick = useHandleNavigationClick();
  const navigation = [
    { name: "Write Your Story", href: "/write" },
    { name: "Bookmarks", href: "/bookmarks" },
    { name: "Stories", href: "/stories" },
    { name: "Contact Us", href: "/contact" },
  ];

  const { isLoggedIn, userProfile, login, logout } = useContext(AuthContext);

  const handleLoginClick = (e) => {
    e.preventDefault();
    login();
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-8xl px-3 py-1.5 sm:px-6 lg:px-20">
            <div className="relative flex h-16 items-center justify-between">
              <div className="cursor-pointer flex flex-1 items-center justify-between sm:items-stretch sm:justify-start">
                <Logo color={"black"} />
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigationClick(item.href);
                        }}
                        className={
                          "hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-normal"
                        }
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}

                    {userProfile ? (
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex hover:scale-105 duration-75 transition-all rounded-full bg-gray-800 text-sm focus:outline-none">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={userProfile.picture}
                              alt="user"
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <p
                                  className={classNames(
                                    "font-bold underline underline-offset-2 font-bold block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {userProfile.name}
                                </p>
                              )}
                            </Menu.Item>

                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  onClick={handleLogoutClick}
                                  href="/"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Sign out
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    ) : (
                      <a
                        onClick={handleLoginClick}
                        href={"/"}
                        className={classNames(
                          "text-white bg-[#0029FF] hover:bg-[#001C8C]",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={undefined}
                      >
                        Login
                      </a>
                    )}
                  </div>
                </div>

                {userProfile ? (
                  <Menu as="div" className="relative mr-3 sm:hidden">
                    <div>
                      <Menu.Button className="flex hover:scale-105 duration-75 transition-all rounded-full bg-gray-800 text-sm focus:outline-none">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={userProfile.picture}
                          alt="user"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <p
                              className={classNames(
                                "font-bold underline underline-offset-2 font-bold block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {userProfile.name}
                            </p>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={handleLogoutClick}
                              href="/"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <a
                    onClick={handleLoginClick}
                    href={"/"}
                    className={classNames(
                      "sm:hidden mr-10 text-white bg-[#0029FF] hover:bg-[#001C8C]",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    aria-current={undefined}
                  >
                    Login
                  </a>
                )}

                {isLoggedIn && (
                  <a
                    key={55}
                    href={"/write"}
                    onClick={() => handleNavigationClick("/write")}
                    className={classNames(
                      "bg-gray-900 text-white mr-10 sm:hidden",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    aria-current={"page"}
                  >
                    Write
                  </a>
                )}
                <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black-300 hover:bg-[#424242] hover:text-white ">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  onClick={() => handleNavigationClick(item.href)}
                  className={
                    "hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-normal"
                  }
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
