export default function DashboardFooter() {
  return (
    <footer className="block py-4">
      <div className="container mx-auto px-4">
        <hr className="mb-4 border-b-1 border-blueGray-200" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4">
            <div className="text-center text-sm text-gray-500 font-semibold py-1">
              Copyright © {new Date().getFullYear()}{' '}
              <a
                href="https://jjdechavez.netlify.app/"
                className="text-gray-500 hover:text-blueGray-700 text-sm font-semibold py-1"
              >
                John Jerald De Chavez
              </a>
            </div>
          </div>
          <div className="w-full md:w-8/12 px-4">
            <ul className="flex flex-wrap list-none md:justify-end  justify-center">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm font-semibold block py-1 px-3"
                >
                  About Me
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm font-semibold block py-1 px-3"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}