import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faTv,
  faNewspaper,
  faTimes,
  faClipboardList,
  faTools,
} from '@fortawesome/free-solid-svg-icons';

import AccountDropdown from './AccountDropdown';

export default function Navbar() {
  const [collapseShow, setCollapseShow] = React.useState('hidden');
  return (
    <>
      <nav
        className="
          md:left-0 md:block md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden md:w-64
          shadow-xl bg-white flex flex-wrap items-center justify-between relative z-10 py-4 px-6
        "
      >
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          {/* Brand */}
          <div className="md:block text-left md:pb-2 text-gray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
          </div>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <AccountDropdown />
            </li>
          </ul>
        </div>
        {/* Collapse */}
        <div
          className={
            'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
            collapseShow
          }
        >
          <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
            <div className="flex flex-wrap">
              <div className="w-6/12">
                <div className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
                  <Link href="/dashboard">Dashboard</Link>
                </div>
              </div>
              <div className="w-6/12 flex justify-end">
                <button
                  type="button"
                  className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                  onClick={() => setCollapseShow('hidden')}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>
          </div>
          {/*Form*/}
          <form className="mt-6 mb-4 md:hidden">
            <div className="mb-3 pt-0">
              <input
                type="text"
                placeholder="Search"
                className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
              />
            </div>
          </form>
          {/* Navigation */}
          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            <li className="items-center">
              <div className="text-pink-500 hover:text-pink-600 text-xs uppercase py-3 font-bold block">
                <Link href="/dashboard">
                  <a>
                    <FontAwesomeIcon icon={faTv} /> Dashboard
                  </a>
                </Link>
              </div>
            </li>
            <li className="items-center">
              <div className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block">
                <Link href="/">
                  <a>
                    <FontAwesomeIcon icon={faNewspaper} /> Projects
                  </a>
                </Link>
              </div>
            </li>

            <li className="items-center">
              <a
                className="text-blueGray-300 text-xs uppercase py-3 font-bold block"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <FontAwesomeIcon icon={faClipboardList} /> Register (soon)
              </a>
            </li>

            <li className="items-center">
              <a
                className="text-blueGray-300 text-xs uppercase py-3 font-bold block"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <FontAwesomeIcon icon={faTools} /> Settings (soon)
              </a>
            </li>
          </ul>
          {/* Divider */}
          <hr className="my-4 md:min-w-full" />
          {/* Heading */}
          <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Documentation
          </h6>
          {/* Navigation */}
          <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
            <li className="inline-flex">
              <div className="text-blueGray-700 hover:text-blueGray-500  text-sm block mb-4 no-underline font-semibold">
                <Link href="/dashboard">
                  <a>Logout</a>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
