import { useContext, useEffect, useState } from 'react';
import logo from '../../assets/img/gakorealogo.png'
import { Link } from 'react-router-dom';
import { GlobalContext } from '../util/GlobalContext';

const TopMenu = () => {
  // 변수 선언
  const {selectedMenu, setSelectedMenu } = useContext(GlobalContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 렌더링 부분
  useEffect(function() {

  }, [])

  return (
    <div>
      <div id="main-ci" className="h-[47px]">
        <h1 className="items-center justify-center align-middle px-1 py-3">
          <img src={logo} alt="" className="w-[150px] h-[27.3px] ml-2"/>
        </h1>
      </div>

      <div id="headerTitle" className="flex bg-[#f9e79f] text-gray-800 justify-between items-center shadow">
        <div className="flex items-center gap-4 ml-4">
          <h1 className="text-lg font-bold text-blue-500">{selectedMenu}</h1>
          
          <ul className="flex gap-4 ml-6">

            <li className="relative group hidden sm:block">
              <Link to="/main/food" className="flex items-center cursor-pointer px-3 py-2 rounded hover:bg-yellow-300 transition">
                <span className="font-semibold">식수관리</span>
              </Link>
            </li>

            <li className="relative group hidden sm:block">
              
              <div className="flex items-center cursor-pointer px-3 py-2 rounded hover:bg-yellow-300 transition">
                  <span className='font-semibold'>전산관리</span>
              </div>

              <ul className='absolute left-0 top-full bg-white rounded shadow-md w-48 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50'>
                <li className="text-sm text-gray-700 hover:bg-yellow-100 px-4 py-2 rounded-t">
                  <Link to="/main/asset">전산자산관리</Link>
                </li>
                <li className="text-sm text-gray-700 hover:bg-yellow-100 px-4 py-2">
                  <Link to="/main/asset/history">자산이력조회</Link>
                </li>
                <li className="text-sm text-gray-700 hover:bg-yellow-100 px-4 py-2">
                  <Link to="/main/asset/ip">IP관리</Link>
                </li>
                <li className="text-sm text-gray-700 hover:bg-yellow-100 px-4 py-2 rounded-b">
                  <Link to="/main/asset/license">S/W라이선스관리</Link>
                </li>
              </ul>
            </li>
          </ul>

          <div className='justify-end'>
            <button className="h-full px-4 hover:bg-yellow-300 rounded lg:hidden ">
              <svg className="w-6 h-full" fill="none" stroke="currentColor"viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopMenu;