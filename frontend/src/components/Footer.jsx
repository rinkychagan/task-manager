function Footer() {
  return (
    <footer className="bg-[#ADE9E9] text-black py-4 flex flex-col items-center shadow-md">
      <p className="font-dohyeon text-lg mb-2">
        donezo. created by{" "}
        <span className="font-semibold text-[#2E563C]">
          &copy; 2024 Rinky Chagan. All rights reserved.
        </span>
      </p>
      <div className="flex gap-4 mb-2">
        <a
          href="https://www.linkedin.com/in/rinky-chagan/"
          className="hover:text-gray-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/rinkychagan"
          className="hover:text-gray-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}

export default Footer;
