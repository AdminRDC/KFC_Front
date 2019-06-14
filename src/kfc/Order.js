import React from 'react';
import $ from 'jquery'
import { Tabs, Button } from 'antd';
import moment from 'moment';
import creatHistory from 'history/createHashHistory' 

const history = creatHistory();
const TabPane = Tabs.TabPane;

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: [],
            form: {
                id: "",
                name: '',
                icon: ''
            }
        }
    }

    componentWillMount() {
        this.loadOrder();
    }

    //加载页面
    loadOrder() {
        let url = 'http://203.195.246.58:8889/Order/findAll';
        $.get(url, ({ status, data }) => {
            if (status === 200) {
                this.setState({
                    order: data
                })
            } else {
                alert('接口异常');
            }
        });
    }

    render() {
        let { order } = this.state;
        return (
            <div >
                <Button  onClick={() => {history.goBack();}}>&lt;</Button> 我的订单
                <div>
                    <Tabs defaultActiveKey="1" tabPosition="left">
                        {
                            order.map((item) => {
                                return (<TabPane tab={item.id} key={item.id}>
                                    下单时间:{moment(parseInt(item.orderTime)).format("YYYY年MM月DD日 HH:mm:ss")}<br/>
                                    订单状态:{item.status}
                                </TabPane>)
                            })
                        }
                    </Tabs>
                </div>
                
            </div>
        )
    }
}

export default Order;