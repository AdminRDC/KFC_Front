import React from 'react';
import $ from 'jquery'
import { Tabs, Button } from 'antd';
import './Category.css';
import creatHistory from 'history/createHashHistory' 

const history = creatHistory();
const TabPane = Tabs.TabPane;

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            form: {
                id: "",
                name: '',
                icon: ''
            }
        }
    }

    componentWillMount() {
        this.loadCategory();
    }

    //加载页面
    loadCategory() {
        let url = 'http://203.195.246.58:8889/Product/findAllWithCategory';
        $.get(url, ({ status, data }) => {
            if (status === 200) {
                this.setState({
                    category: data
                })
            } else {
                alert('接口异常');
            }
        });
    }

    render() {
        let { category } = this.state;

        return (
            <div >
                <Button  onClick={() => {history.goBack();}}>&lt;</Button> 菜单
                <div>
                    <Tabs defaultActiveKey="1" tabPosition="left">
                        {
                            category.map((item) => {
                                return (<TabPane tab={item.category.name} key={item.id}>
                                    {item.name}
                                </TabPane>)
                            })
                        }
                        {/* <TabPane tab="Tab 2" key="2">
                            Content of tab 2
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                            Content of tab 3
                        </TabPane> */}
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default Category;