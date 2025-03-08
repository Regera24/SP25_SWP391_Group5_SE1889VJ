import '../../assets/css/main.css';
import '../../assets/css/style.css';
import logo from '../../assets/img/logoviet.png'
import Upper from '../../Utils/Animation/Upper';
import { useNavigate } from 'react-router-dom';
import { getToken, logout, getRole } from '../../Utils/UserInfoUtils';
import Loading from '../../Pages/Loading/Loading';
import { useState } from 'react';
import { successWSmile } from '../../Utils/AntdNotification';
import { message } from 'antd';

function HomeHeader(){
	const [messageApi, contextHolder] = message.useMessage();
	const [loading,setLoading] = useState(false);
	const token = getToken();
	const role = getRole();
	const navigate = useNavigate();
  const naviLogin = () =>{
    navigate('/login');
  }
  const naviRegister = () =>{
    navigate('/register');
  }
	const handleLogout = () =>{
		setLoading(true);
		successWSmile('See you later!', messageApi);
		logout();
		setTimeout(()=>{
			setLoading(false);
			navigate('/');
		},1000)
	}
	const naviDashboard = () =>{
		console.log(role);
		if(role=='ADMIN'){
			setLoading(true)
			setTimeout(()=>{
				setLoading(false);
				navigate('/admin');
			},1000)
		}else if(role=='EMPLOYEE'){
			setLoading(true)
			setTimeout(()=>{
				setLoading(false);
				navigate('/employee/products');
			},1000)
		}else if(role=='STORE_OWNER'){
			setLoading(true)
			setTimeout(()=>{
				setLoading(false);
				navigate('/store-owner/store');
			},1000)
		}
	}

  return (
    <>
			{contextHolder}
			{loading && <Loading/>}
			<Upper>
				<div class="header">
					<div class="container">
						<div class="row">
							<div class="col-xl-12">
								<div class="header__navbar">
									<img style={{width:'90px', marginRight:'100px'}} src={logo} alt="logo" class="header__navbar__img"/>
									<div class="header__navbar__menu">
										<div class="header__navbar__menu__item">Trang chủ</div>
										<div class="header__navbar__menu__item">Giới thiệu</div>
										<div class="header__navbar__menu__item">Quy trình</div>
										<div class="header__navbar__menu__item">Gói đăng ký</div>
										<div class="header__navbar__menu__item">Blog</div>
										<div class="header__navbar__menu__item">Liên hệ</div>
										{
											token 
											? 
											<>
												<div onClick={naviDashboard} class="header__navbar__menu__item">Dashboard</div>
												<div onClick={handleLogout} class="header__navbar__menu__item">Đăng xuất</div>
											</>
											: 
											<>
												<div onClick={naviLogin} class="header__navbar__menu__item">Đăng nhập</div>
												<div onClick={naviRegister} class="header__navbar__menu__item">Đăng ký</div>
											</>
										}
									</div>
								</div>
							</div>
						</div>
					</div>
			</div>
			</Upper>
		</>
  )
}

export default HomeHeader;
