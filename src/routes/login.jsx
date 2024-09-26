import React, {useState, useContext, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { Icon } from '@iconify/react';
// import { AuthContext }  from "./AuthContext.jsx";
import img from './HomePage/lolo.png';

export function UnLoginText_Move() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(2); // 初始倒计时秒数

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        // 倒數结束跳轉到登入畫面
        if (countdown === 0) {
            clearInterval(interval); //倒數完清除interval
            navigate('/login');
        }

        // 清除 interval
        return () => {
            clearInterval(interval);
        };
    }, [countdown, navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="flex flex-col items-center border-4 border-gray-400 p-16 rounded-lg shadow-lg bg-white">
                <h1 className="text-5xl font-semibold text-black-800">請先登入!!</h1>
                <p className="text-3xl text-gray-600 mt-4">{countdown}秒後轉至登入畫面...</p>
            </div>
        </div>
    );
}
const Login = () => {
    const [isStuModalOpen, setIsStuModalOpen] = useState(false);
    const [studentId, setStudentId] = useState('');
    const openStuModal = () => {
        setIsStuModalOpen(true);
    };
    const closeModal = () => {
        setStudentId(null)
        setIsStuModalOpen(false);
    };
    // const {setAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        // Account: '',
        password: '',
        up_user: '',
        captcha: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    // const [captchaSrc, setCaptchaSrc] = useState('');
    // const { Account, password, captcha } = formData;
    //
    // useEffect(() => {
    //     fetchCaptcha();
    // }, []);

    // const fetchCaptcha = async () => {
    //     const response = await fetch(`/api/stuAPI//captcha`);
    //     const captchaSvg = await response.text();
    //     setCaptchaSrc(`data:image/svg+xml;base64,${btoa(captchaSvg)}`);
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    // const notify = () =>
    //     toast.success(`登入成功，歡迎回來${Account}!`, {
    //         className: "font-semibold text-xl",
    //     });

    const notifyError = (message) =>
        toast.error(message, {
            className: "font-semibold",
        });

    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //
    //     // Assuming Account and password are states or variables holding your form data
    //     if (!Account || !password) {
    //         toast.error('請輸入帳號密碼', {
    //             className: "font-semibold text-xl",
    //         });
    //         return;
    //     }
    //
    //     try {
    //         const response = await fetch(`/api/stuAPI/stulogin`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ Account, password, captcha }),
    //         });
    //         const data = await response.json();
    //         console.log("data123",data)
    //
    //         if (data.redirect) {
    //             navigate('/newpwd');
    //         } else if (data.success) {
    //             setAuth({ loggedIn: true });
    //             notify();
    //             navigate('/stuhome');
    //         } else {
    //             console.error('login failed');
    //             notifyError(data.message || '帳號或密碼錯誤');
    //             fetchCaptcha(); // 刷新驗證碼
    //         }
    //     } catch (error) {
    //         console.error('登入過程中出現錯誤:', error);
    //         notifyError('伺服器錯誤，請稍後再試');
    //         fetchCaptcha(); // 刷新驗證碼
    //     }
    // };
    const accountRef = useRef(null);
    const passwordRef = useRef(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        const account = accountRef.current.value;
        const password = passwordRef.current.value;

        if (!account || !password) {
            notifyError('帳號或密碼不能為空');
            return;
        }
        try {
            // 模擬成功的登入邏輯，跳過伺服器驗證
            // setAuth({ loggedIn: true });
            // notify();
            navigate('/root1');


        } catch (error) {
            console.error('登錄過程中出現錯誤:', error);
            notifyError('伺服器錯誤，請稍後再試');
        }
    };


    const handleSubmit = async () => {
        if (!studentId) {
            toast.error('請輸入學號', {
                className: "font-semibold text-xl",
            });
            return;
        }
        // 发送POST请求到服务器，将学生ID发送到API
        try {
            const response = await fetch('api/stuAPI/reset-password-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ studentId })
            });
            const data = await response.json();
            console.log(data); // 可以根据返回的数据执行其他操作
            closeModal();
            setStudentId(null)
            toast('已成功寄信至您的信箱', {
                className: "font-semibold text-xl",
            })
        } catch (error) {
            console.error('Error during reset password:', error);
            closeModal();
            toast.success('已成功寄信至您的信箱', {
                className: "font-semibold text-xl",
            })
        }
    }



    return (

        <div className="h-screen   grid grid-cols-2 justify-center  ">

            <div className="h-full overflow-hidden">
                <img src={img} alt="Your Image" className="h-full w-full " />
            </div>
            <div className="h-full flex items-center  mx-auto">

                <div className="relative px-6 py-6 rounded-lg border-2 bg-white  sm:rounded-3xl sm:p-8">
                    {/*含login框*/}

                    <div className=" mx-auto" >
                        <div ><h1 className="text-center m-8 py-2 text-3xl font-semibold   "><Icon className="text-4xl mr-4 inline " icon="line-md:account" />
                            老師登入</h1></div>

                        <div>
                            <h1 className="text-center py-2 text-3xl font-semibold">SnowOwl</h1>
                            <h1 className="text-center py-2 text-3xl font-semibold">腦波監測與AI預測之學生問答與分析系統</h1>
                        </div>

                        <div className="divide-y divide-gray-200">
                        {/*form框*/}
                            <form onSubmit={handleLogin}>
                                <div className="py-10 px-8  text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 ">
                                    <div className="relative ">
                                        <input
                                            type="text"
                                            id="account"
                                            name="Account"
                                            ref={accountRef}
                                            // value={Account}
                                            required
                                            onChange={handleChange}
                                            className="rounded-lg peer placeholder-transparent h-16 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none "
                                            placeholder="Username"
                                        />
                                        <label htmlFor="account"
                                               className=" absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440
                                               peer-placeholder-shown:top-3 transition-all peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm px-1">
                                            Username
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            name="password"
                                            ref={passwordRef}
                                            // value={password}
                                            onChange={handleChange}
                                            placeholder="Password"
                                            className="rounded-lg peer placeholder-transparent h-16 w-full mb-8 mt-4 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                                        />
                                        <label
                                            htmlFor="password"
                                            className="absolute left-0 -top-2 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-7 transition-all peer-focus:-top-2 peer-focus:text-gray-600 peer-focus:text-sm px-1"
                                        >
                                            Password
                                        </label>

                                        <Icon icon="ph:eye-bold" color={showPassword ? 'blue' : 'gray'}
                                              width="30" height="30"
                                              onClick={() => setShowPassword(!showPassword)}
                                              className="absolute right-0 top-7 mr-2 "/>
                                    </div>
                                    {/*<div className="relative w-80">*/}
                                    {/*    <input*/}
                                    {/*        type="text"*/}
                                    {/*        id="captcha"*/}
                                    {/*        name="captcha"*/}
                                    {/*        value={captcha}*/}
                                    {/*        required*/}
                                    {/*        onChange={handleChange}*/}
                                    {/*        className="peer placeholder-transparent h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none"*/}
                                    {/*        placeholder="Captcha"*/}
                                    {/*    />*/}
                                    {/*    <label htmlFor="captcha"*/}
                                    {/*           className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">*/}
                                    {/*        驗證碼*/}
                                    {/*    </label>*/}
                                    {/*    <img src={captchaSrc} alt="captcha" className="absolute right-0 top-0 cursor-pointer" onClick={fetchCaptcha} />*/}
                                    {/*</div>*/}
                                    <button type="submit" className="bg-green-600 text-white w-full rounded-md px-5 py-3 hover:bg-green-700 mt-4 font-semibold   text-xl" onClick={handleLogin}>登入</button>
                                    <button type="submit" className=" text-blue-500 w-full rounded-md px-5 py-3 hover:text-blue-700 mt-4 font-semibold   text-xl"  onClick={() => openStuModal()}>忘記密碼</button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>



            </div>

        </div>


    );
};

export default Login;
