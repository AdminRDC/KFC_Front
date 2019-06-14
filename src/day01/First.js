import React from 'react';
import { Button } from 'antd';
import './First.css'
import { Carousel } from 'antd';
class First extends React.Component {
    // constructor(props) {
    //     super(props);

    // }
    state = {
        size: 'large',
    };

    handleSizeChange = e => {
        this.setState({ size: e.target.value });
    };

    render() {
        const size = this.state.size;
        return (
            <div>
                <header className='header'>
                    <h2>肯德基自助点餐</h2>
                </header>
                <div>
                    <div className='welecome'>
                        <span>
                            欢迎您,浮云都是神马
                            <Button size="small"> 退出</Button>
                            <Button type="danger" icon="question" size="small"></Button><br />
                        </span>
                        <br/><br/>
                    </div>
                    <Carousel autoplay>
                        <div>
                            <h3><img src={require('../imgs/1.jpg')} alt=''/></h3>
                        </div>
                        <div>
                            <h3><img src={require('../imgs/2.jpg')} alt=''/></h3>
                        </div>
                        <div>
                            <h3><img src={require('../imgs/3.jpg')} alt=''/></h3>
                        </div>
                        <div>
                            <h3><img src={require('../imgs/4.jpg')} alt=''/></h3>
                        </div>
                    </Carousel>
                    <br/>
                    <span className="big">
                        晚上好,浮云都是神马
                    </span><br/><br/>
                    <Button type="primary" shape="round" icon="apple" size={size} block onClick={() => {
                        window.location.href = "./Category"}}>
                    开始点餐</Button><br/><br/>
                    <div className="tr1">
                        <div><img src={require('../imgs/会员码.png')} alt=''/><br/>会员码</div>
                        <div><img src={require('../imgs/我的卡包.png')} alt=''/><br/>我的卡包</div>
                        <div><div onClick={() => {window.location.href = "./Order"}}><img src={require('../imgs/我的订单.png')} alt=''/><br/>我的订单</div></div>
                    </div>
                        <br/>
                    <span className="big">
                        更多服务
                    </span><br />
                    <ul>
                        <li className="bli">
                            <div className="imgbox">
                                <img src={require('../imgs/9.jpg')} alt=''/>
                            </div>
                        </li>
                        <li className="bli">
                            <div className="imgbox">
                                <img src={require('../imgs/8.jpg')} alt=''/>
                            </div>
                        </li>
                    </ul>
                    <ul className="ul_kfc">
                        <li className="li_kfc">
                            <div className="imgbox_kfc">
                                <img src={require('../imgs/kfc.png')} alt=''/><span>我的订单</span>
                            </div>
                        </li>
                        <li className="li_kfc">
                            <div className="imgbox_kfc">
                                <img src={require('../imgs/kfc.png')} alt=''/><span>我的订单</span>
                            </div>
                        </li>
                        <li className="li_kfc">
                            <div className="imgbox_kfc">
                                <img src={require('../imgs/kfc.png')} alt=''/><span>我的订单</span>
                            </div>
                        </li>
                        <li className="li_kfc">
                            <div className="imgbox_kfc">
                                <img src={require('../imgs/kfc.png')} alt=''/><span>我的订单</span>
                            </div>
                        </li>
                        <li className="li_kfc">
                            <div className="imgbox_kfc">
                                <img src={require('../imgs/kfc.png')} alt=''/><span>我的订单</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default First;