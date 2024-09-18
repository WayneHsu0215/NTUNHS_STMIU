import React, {useState,useContext,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { Icon } from '@iconify/react';
// import { AuthContext, AuthProvider }  from "./AuthContext.jsx";

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
    // const {setAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        AccID: '',
        password: '',
        AccType: '',
        UP_User: '',
        captcha: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    // const [captchaSrc, setCaptchaSrc] = useState('');
    const { AccID, password, captcha } = formData;

    // useEffect(() => {
    //     fetchCaptcha();
    // }, []);

    // const fetchCaptcha = async () => {
    //     const response = await fetch(`/api/captcha`);
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
    const notify = () =>
        toast.success(`登入成功，歡迎回來${AccID}!`, {
            className: "font-semibold text-xl",
        });

    const notifyError = (message) =>
        toast.error(message, {
            className: "font-semibold",
        });


    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch(`/api/login`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ AccID, password, captcha}),
    //         });
    //         const data = await response.json();
    //         if (data.success) {
    //             setAuth({loggedIn:true});
    //             notify();
    //             navigate('/export');
    //         }else if(AccID===''||password==='')
    //         {
    //             alert('請輸入帳號密碼');
    //         }
    //         else {
    //             notifyError(data.message || '帳號或密碼錯誤');
    //             fetchCaptcha(); // 刷新驗證碼
    //         }
    //     } catch (error) {
    //         console.error('登錄過程中出現錯誤:', error);
    //         notifyError('伺服器錯誤，請稍後再試');
    //         fetchCaptcha(); // 刷新驗證碼
    //     }
    // };

    const handleLogin = async (e) => {
        e.preventDefault();
        // 檢查帳號或密碼是否為空
        if (AccID.length === 0 || password.length === 0) {
            toast.error('請輸入帳號和密碼');
            return;
        }

        try {
            // 模擬成功的登入邏輯，跳過伺服器驗證
            // setAuth({ loggedIn: true });
            notify();
            navigate('/root1');

            // 如果你還想保留伺服器請求的部分
            /*
            const response = await fetch(`/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ AccID, password, captcha }),
            });
            const data = await response.json();
            if (data.success) {
                setAuth({loggedIn:true});
                notify();
                navigate('/export');
            } else if(AccID === '' || password === '') {
                alert('請輸入帳號密碼');
            } else {
                notifyError(data.message || '帳號或密碼錯誤');
                fetchCaptcha(); // 刷新驗證碼
            }
            */
        } catch (error) {
            console.error('登錄過程中出現錯誤:', error);
            notifyError('伺服器錯誤，請稍後再試');
            fetchCaptcha(); // 刷新驗證碼
        }
    };


    // useEffect(() => {
    //     setFormData({
    //         AccID: 'ntunhsEmp',
    //         password: 'ntunhsEmp',
    //     });})

    return (
        <div className="min-h-screen bg-gray-200 py-4 flex flex-col justify-center sm:py-12">
            <div className="relative py-12 sm:max-w-xl sm:mx-auto">
                {/*白色外框*/}
                <div className="relative px-6 py-6 bg-white shadow-lg sm:rounded-3xl sm:p-8">
                    {/*含login框*/}
                    <div className=" mx-auto" >
                        <div><h1 className="text-center py-2 text-4xl font-semibold   ">老師登入</h1></div>
                        <div className="divide-y divide-gray-200">
                            {/*form框*/}
                            <form onSubmit={handleLogin}>
                                <div className="py-10 px-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 ">
                                    <div className=" relative w-80">
                                        <input
                                            type="text"
                                            id="AccID"
                                            name="AccID"
                                            value={AccID}
                                            required
                                            onChange={handleChange}
                                            className="rounded-lg peer placeholder-transparent h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none "
                                            placeholder="Username"
                                        />
                                        <label htmlFor="AccID"
                                               className=" absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440
                                               peer-placeholder-shown:top-3 transition-all peer-focus:-top-8 peer-focus:text-gray-600 peer-focus:text-sm px-1">
                                            Username
                                        </label>
                                    </div>
                                    <div className="relative w-80 ">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            name="password"
                                            value={password}
                                            onChange={handleChange}
                                            placeholder="Password"
                                            className="rounded-lg peer placeholder-transparent h-12 w-full mb-8 mt-4 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                                        />
                                        <label
                                            htmlFor="password"
                                            className="absolute left-0 -top-2 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-7 transition-all peer-focus:-top-4 peer-focus:text-gray-600 peer-focus:text-sm px-1"
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
                                    {/*    /!*<img src={captchaSrc} alt="captcha" className="absolute right-0 top-0 cursor-pointer" onClick={fetchCaptcha} />*!/*/}
                                    {/*</div>*/}
                                    <button type="submit" className="bg-blue-500 text-white w-full rounded-md px-5 py-3 hover:bg-blue-600 mt-4 font-semibold   text-xl" onClick={handleLogin}>登入</button>
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
