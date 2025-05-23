import '../../assets/css/main.css';
import '../../assets/css/style.css';
import image1 from '../../assets/img/featured-item-01.png';
import leftimage from '../../assets/img/pngegg.png';
import rightimage from '../../assets/img/pngegg.png';
import LeftLeft from '../../Utils/Animation/LeftLeft';
import RightRight from '../../Utils/Animation/RightRight';
import Down from '../../Utils/Animation/Down';
import Upper from '../../Utils/Animation/Upper';
import avt1 from '../../assets/img/avt1.jpg';
import avt2 from '../../assets/img/avt2.jpg';
import avt3 from '../../assets/img/avt3.jpg';
import {MessageOutlined, RocketOutlined} from '@ant-design/icons';
import { scroller } from "react-scroll";
import { Element } from "react-scroll";
import { Button, Form, Input } from 'antd';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";


function HomeBody(){
  const { TextArea } = Input;

  const scrollToSection = (str) => {
        scroller.scrollTo(str, {
          duration: 300,
          delay: 0,
          smooth: "easeInOutQuart",
        });
      }

      const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <div class="section-one">
        <div class="container">
          <div class="row">
            <div class="col-xl-12">
              <Element name='head' id="home">
                <div class="section-one__text">
                  <h2 class="section-one__text__h2">Chúng tôi cung cấp chiến lược <b>tốt nhất</b> để phát triển <b>doanh nghiệp</b></h2>
                  <h4 class="section-one__text__h4">Ricky Rice là nền tảng cuối cùng để thuê các trang web chuyên nghiệp bán gạo và quản lý các sản phẩm nông nghiệp</h4>
                  <div onClick={() => scrollToSection("introduction")} class="section-one__text__button">
                    KHÁM PHÁ NGAY
                  </div>
                </div>
              </Element>
            </div>
          </div>
        </div>
          <div class="container">
            <div class="row">
              <div class="section-one__block">
                <Element name='introduction' id="introduction">
                <div class="row">
                    <div class="section-one__block__item col-xl-4">
                      <LeftLeft>
                        <div class="section-one__block__item__inner">
                          <img src={image1} alt="" class="section-one__block__item__inner__img"/>
                          <div class="section-one__block__item__inner__h3">
                            Giải Pháp Bán Gạo Hiệu Quả
                          </div>
                          <div class="section-one__block__item__inner__text">
                            Nâng cao doanh số và theo dõi số lượng hàng hiệu quả
                          </div>
                        </div>
                      </LeftLeft>
                    </div>
                  <div class="section-one__block__item col-xl-4">
                    <Down>
                      <div class="section-one__block__item__inner">
                        <img src={image1} alt="" class="section-one__block__item__inner__img"/>
                        <div class="section-one__block__item__inner__h3">
                        Quản Lý Cửa Hàng Gạo Thông Minh
                        </div>
                        <div class="section-one__block__item__inner__text">
                        Tối ưu hóa quy trình bán hàng và quản lý khách hàng dễ dàng
                        </div>
                      </div>
                    </Down>
                  </div>
                  <div class="section-one__block__item col-xl-4">
                    <RightRight>
                      <div class="section-one__block__item__inner">
                        <img src={image1} alt="" class="section-one__block__item__inner__img"/>
                        <div class="section-one__block__item__inner__h3">
                          Quản lý nợ và doanh số bán hàng
                        </div>
                        <div class="section-one__block__item__inner__text">
                          Minh bạch trong quản lý nợ và quản lý doanh số bán hàng 
                        </div>
                      </div>
                    </RightRight>
                  </div>
                </div>
                </Element>
              </div>
            </div>
          </div>
      </div>

      <div class="section-two">
        <div class="container">
          <div class="row">
            <div class="col-xl-12">
              <div class="section-two__upper">
                <div class="row">
                  <div class="section-two__upper__img col-xl-4">
                    <LeftLeft><img src={rightimage} alt="" class="section-two__upper__img__inner"/></LeftLeft>
                  </div>
                  <div class="col-xl-1"></div>
                  <div class="section-two__upper__text col-xl-6">
                    <RightRight>
                      <h3 class="section-two__upper__text__h3">Khám phá giải pháp tối ưu cho bạn</h3>
                      <h5 class="section-two__upper__text__h5">
                        Hãy khám phá giải pháp quản lý bán gạo hiệu quả. Hệ thống giúp bạn theo dõi doanh số, quản lý đơn đặt hàng và tối ưu hóa quy trình kinh doanh dễ dàng.
                      </h5>
                    </RightRight>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="section-two__straight"></div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-xl-12">
              <div class="section-two__upper">
                <div class="row">
                  <div class="section-two__upper__text col-xl-6">
                    <LeftLeft>
                      <h3 class="section-two__upper__text__h3">Hãy thảo luận về dự án của bạn</h3>
                      <h5 class="section-two__upper__text__h5">
                        Hãy thảo luận về dự án của bạn! Nền tảng của chúng tôi giúp bạn tối ưu quy trình làm việc, nâng cao hiệu quả và quản lý hoạt động một cách dễ dàng.
                      </h5>
                    </LeftLeft>
                  </div>
                  <div class="col-xl-1"></div>
                  <div class="section-two__upper__img col-xl-4">
                    <RightRight><img src={leftimage} alt="" class="section-two__upper__img__inner"/></RightRight>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="section-four">
        <div class="container">
          <div class="row">
            <div class="col-xl-12">
              <Element name='feedback' id="feedback">
                <div class="section-four__inner">
                  <Down>
                    <h2 class="section-four__inner__title">
                      Chia sẻ từ khách hàng
                    </h2>
                    <h4 class="section-four__inner__text">Những phản hồi chân thực từ khách hàng giúp chúng tôi không ngừng cải thiện dịch vụ. Chúng tôi 
                      luôn lắng nghe và đổi mới để mang đến trải nghiệm tốt nhất cho bạn.</h4>
                  </Down>
                  <div class="section-four__inner__box">
                    <div class="row">
                      <div class="col-xl-4">
                        <LeftLeft>
                          <div class="section-four__inner__box__item">
                          <div className='section-four__inner__box__item__img'><MessageOutlined style={{fontSize:'32px'}}/></div>
                            <div class="section-four__inner__box__item__text">Giao diện thân thiện, dễ sử dụng! Tôi có thể quản lý kho gạo và đơn hàng
                              một cách nhanh chóng mà không gặp khó khăn nào.</div>
                            <div class="section-four__inner__box__item__author">
                              <img class="section-four__inner__box__item__author__img" src={avt1} alt="IMG"/>
                              <div class="section-four__inner__box__item__author__des">
                                <div class="section-four__inner__box__item__author__des__name">Nguyễn Tiến Linh</div>
                                <div class="section-four__inner__box__item__author__des__pos">Quả bóng vàng VN 2025</div>
                              </div>
                            </div>
                          </div>
                        </LeftLeft>
                      </div>
                      <div class="col-xl-4">
                        <Upper>
                          <div class="section-four__inner__box__item">
                          <div className='section-four__inner__box__item__img'><MessageOutlined style={{fontSize:'32px'}}/></div> 
                            <div class="section-four__inner__box__item__text">Hệ thống rất tiện lợi, giúp tôi tiết kiệm thời gian trong 
                              việc theo dõi doanh số và tồn kho. Đồng thời dễ dàng quản lý nhân viên.</div>
                            <div class="section-four__inner__box__item__author">
                              <img class="section-four__inner__box__item__author__img" src={avt2} alt="IMG"/>
                              <div class="section-four__inner__box__item__author__des">
                                <div class="section-four__inner__box__item__author__des__name">Nguyễn Văn Trung</div>
                                <div class="section-four__inner__box__item__author__des__pos">Quản lý chuỗi cửa hàng gạo HN</div>
                              </div>
                            </div>
                          </div>
                        </Upper>
                      </div>
                      <div class="col-xl-4">
                        <RightRight>
                          <div class="section-four__inner__box__item">
                            <div className='section-four__inner__box__item__img'><MessageOutlined style={{fontSize:'32px'}}/></div> 
                            <div class="section-four__inner__box__item__text">Dịch vụ hỗ trợ tuyệt vời! Mọi thắc mắc đều được giải đáp nhanh chóng, 
                              giúp tôi vận hành cửa hàng hiệu quả hơn.</div>
                            <div class="section-four__inner__box__item__author">
                              <img class="section-four__inner__box__item__author__img" src={avt3} alt="IMG"/>
                              <div class="section-four__inner__box__item__author__des">
                                <div class="section-four__inner__box__item__author__des__name">Jonny Khang </div>
                                <div class="section-four__inner__box__item__author__des__pos">Chủ cửa hàng gạo Xanh</div>
                              </div>
                            </div>
                          </div>
                        </RightRight>
                      </div>
                    </div>
                  </div>
                </div>
              </Element>
            </div>
          </div>
        </div>
      </div>

      {/* <div class="section-five">
        <div class="container">
          <div class="row">
            <div class="col-xl-12">
              <div class="section-five__inner">
                <h2 class="section-five__inner__title">Dịch vụ gói đăng ký</h2>
                <p class="section-five__inner__text">Các gói đăng ký linh hoạt giúp bạn quản lý cửa hàng dễ dàng hơn. Chọn gói phù hợp để tận hưởng 
                  các tính năng nâng cao và tối ưu hóa hoạt động kinh doanh.</p>
                <div class="section-five__inner__box">
                  <div class="row">
                    <div class="col-xl-4">
                      <div class="section-five__inner__box__item">
                        <div class="section-five__inner__box__item__title">Starter</div>
                        <div class="section-five__inner__box__item__price">
                          <div class="section-five__inner__box__item__price__value">$14.50</div>
                          <div class="section-five__inner__box__item__price__period">monthly</div>
                        </div>
                        <div class="section-five__inner__box__item__des">
                          <div class="section-five__inner__box__item__des__info">60GB space</div>
                          <div class="section-five__inner__box__item__des__info">600 GB transfer</div>
                          <div class="section-five__inner__box__item__des__info">Pro Design Panel</div>
                          <div class="section-five__inner__box__item__des__info" style={{textDecoration: 'line-through'}}>
                            15-minute support</div>
                          <div class="section-five__inner__box__item__des__info" style={{textDecoration: 'line-through'}}>
                            Unlimited Emails</div>
                          <div class="section-five__inner__box__item__des__info" style={{textDecoration: 'line-through'}}>24/7
                            Security</div>
                        </div>
                        <div class="section-five__inner__box__item__button button--violet">PURCHASE NOW</div>
                      </div>
                    </div>
                    <div class="col-xl-4">
                      <div class="section-five__inner__box__item">
                        <div class="section-five__inner__box__item__title">Premium</div>
                        <div class="section-five__inner__box__item__price" style={{backgroundColor:'#67bb59'}}>
                          <div class="section-five__inner__box__item__price__value">$21.50</div>
                          <div class="section-five__inner__box__item__price__period">monthly</div>
                        </div>
                        <div class="section-five__inner__box__item__des">
                          <div class="section-five__inner__box__item__des__info">60GB space</div>
                          <div class="section-five__inner__box__item__des__info">600 GB transfer</div>
                          <div class="section-five__inner__box__item__des__info">Pro Design Panel</div>
                          <div class="section-five__inner__box__item__des__info">15-minute support</div>
                          <div class="section-five__inner__box__item__des__info" style={{textDecoration: 'line-through'}}>
                            Unlimited Emails</div>
                          <div class="section-five__inner__box__item__des__info" style={{textDecoration: 'line-through'}}>24/7
                            Security</div>
                        </div>
                        <div class="section-five__inner__box__item__button button--violet">PURCHASE NOW</div>
                      </div>
                    </div>
                    <div class="col-xl-4">
                      <div class="section-five__inner__box__item">
                        <div class="section-five__inner__box__item__title">Advanced</div>
                        <div class="section-five__inner__box__item__price">
                          <div class="section-five__inner__box__item__price__value">$42.00</div>
                          <div class="section-five__inner__box__item__price__period">monthly</div>
                        </div>
                        <div class="section-five__inner__box__item__des">
                          <div class="section-five__inner__box__item__des__info">60GB space</div>
                          <div class="section-five__inner__box__item__des__info">600 GB transfer</div>
                          <div class="section-five__inner__box__item__des__info">Pro Design Panel</div>
                          <div class="section-five__inner__box__item__des__info">15-minute support</div>
                          <div class="section-five__inner__box__item__des__info">Unlimited Emails</div>
                          <div class="section-five__inner__box__item__des__info">24/7 Security</div>
                        </div>
                        <div class="section-five__inner__box__item__button button--violet">PURCHASE NOW</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div class="section-four">
        <div class="container">
          <div class="row">
            <div class="col-xl-12">
              <Element name='lienhe' id="lienhe">
                <div class="section-four__inner">
                  <Down>
                    <h2 class="section-four__inner__title">
                      Liên hệ với chúng tôi
                    </h2>
                    <h4 class="section-four__inner__text">Nếu bạn có bất kỳ câu hỏi, yêu cầu hỗ trợ hoặc góp ý nào, đừng ngần ngại liên hệ với chúng tôi.</h4>
                  </Down>
                  <Form className='col-xl-12'>
                    <div style={{marginTop:'40px'}} className='col-xl-12'>
                        <div className='row'>
                          <div className='col-xl-6'>
                            <Form.Item>
                              <Input placeholder='Họ và tên' style={{height:'50px'}}/>
                            </Form.Item>
                          </div>
                          <div className='col-xl-6'>
                            <Form.Item>
                              <Input placeholder='Địa chỉ email' style={{height:'50px'}}/>
                            </Form.Item>
                          </div>
                      </div>
                      <div style={{marginTop:'10px'}} className='col-xl-12'>
                        <Form.Item>
                          <TextArea placeholder='Tin nhắn của bạn' rows={8}/>
                        </Form.Item>
                      </div>
                    </div>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'center'}} className='row'>
                      <Button style={{border: 'none',display:'flex', alignItems:'center', justifyContent:'center', 
                        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', fontSize:'16px', width: '100px', borderRadius:'15px',
                        padding: '20px'
                        }} class="section-one__text__button col-xl-1">
                        Gửi
                      </Button>
                    </div>
                  </Form>
                </div>
              </Element>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeBody;