import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

// 초기 로그인 페이지
const Login = () => {

    // 변수 선언
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    // useEffect 작성
    useEffect(function() {
        
    }, [])

    // Axios 요청
    const logincheck = async () => {
        await axios
        .post("/user/login", {
            userid: userId,
            userpw: password,
        })
        .then((response) => {
        console.log(JSON.stringify(response.data));
            if (response.data === 1) {
                // 전역변수에다가 지정
                
                navigate('/main/asset');
            }
            else {
                alert('아이디 또는 패스워드를 확인해주세요');
                setUserId('');
                setPassword('');
            }
        })
        .catch((err) => {
            // alert(err);
            alert("네트워크 문제가 발생하였습니다.");
        });

    };

    // 로그인 확인 및 전달
    const handleMain = (event) => {
        event.preventDefault();
        logincheck();
    }

    return (
        <>
            <div className='w-screen h-screen bg-gray-50 dark:bg-gray-900'>
            <div className="m-auto md:w-1/2 items-center justify-center p-10 lg:pt-48 bg-gray-50 dark:bg-gray-900 ">
                <form className="items-center justify-center" onSubmit={handleMain}>
                    <h2 className="mb-10 mt-5 text-4xl text-center font-black ">GA KOREA</h2>
                        <div className='lg:w-96 m-auto'>
                            <div className="mb-5">
                                <label for="input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">아이디</label>
                                <input type="input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="아이디를 입력하세요" required />
                            </div>
                            <div className="mb-5">
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호</label>
                                <input type="password"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={password} onChange={(e) => setPassword(e.target.value)}  placeholder='비밀번호를 입력하세요' required />
                            </div>
                            <div className="flex items-start mb-5">
                                <div className="flex items-center h-5">
                                    {/* required 필수 입력사항 표시 체크박스에서는 제거함 향후 쿠키를 통한 아이디 저장 방식을 이용할 예정 */}
                                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                                </div>
                                <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">아이디 저장하기</label>
                            </div>
                            <div className='items-center justify-center text-center'>
                                <button type="submit" className=" items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full
                                                            px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    로그인
                                </button>
                            </div>
                        </div>
                </form>
            </div>
            </div>
        </>
    );
}

export default Login;