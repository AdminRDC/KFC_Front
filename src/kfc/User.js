import { Button } from 'antd';
import React from 'react';
import $ from 'jquery'

import './Right.css';

class User extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users:[],
            form:{
                name:'',
                telephone:'',
                password:'',
                photo:''
            }
        }
    }

    componentWillMount(){
        this.loadUser();
    }

    //加载信息
    loadUser(){
        let url = 'http://127.0.0.1:8888/User/findAll';
        $.get(url,({status,data}) => {
            if(status === 200){
                this.setState({
                    users:data,
                })
            }else{
                alert('接口异常');
            }
        });
    }

    //监测表单
    changeHandler = (event) => {
        let name = event.target.name;
        let val = event.target.value;
        this.setState({
            form:{...this.state.form,...{[name]:val}}
        })
    }

    //修改
    updateHandler(id){
        let url = 'http://127.0.0.1:8888/User/findById?id='+id;
        $.get(url,({status,data,message}) => {
            if(status === 200){
                this.setState({
                    form:data,
                })
                this.showForm();
            }else{
                alert(message)
            }
        });
    }

    //提交表单
    submitForm = (event) => {
        alert(JSON.stringify(this.state.form));
        let url = 'http://127.0.0.1:8888/User/saveOrUpdate';
        $.post(url,this.state.form,({status,message}) => {
            if(status === 200){
                alert(message);
                this.setState({
                    form:{
                        name:'',
                        telephone:'',
                        password:'',
                        photo:''
                    }
                })
                this.loadUser();
            }
        });
        event.preventDefault();
    }

    //删除
    delById(id,handler){
        let url = 'http://127.0.0.1:8888/User/deleteById?id='+id;
        $.get(url,function(result){
            handler(result);
        })
    }
    delHandler(id){
        this.delById(id,({status,message}) => {
            if(status === 200){
                alert(message);
                this.loadOrder();
            }else{
                alert(message);
            }
        })
    }

    //显示表单
    showForm(){
        $('form').css('display','block');
      }

    render(){
        let {users,form} = this.state;

        return(
            <div className='outer'>
                <div className='div_top'>
                    <span>用户管理</span>
                </div> 
                {JSON.stringify(form)}
                <div className='div-right'>
                    <Button className='div_right_button' type="primary" onClick={this.showForm}>添加</Button>
                    <Button className='div_right_button' type="danger">批量删除</Button>
                    <form onSubmit={this.submitForm}>
                        姓名 
                        <input type='text' name="name" value={form.name} onChange={this.changeHandler}/>
                        电话
                        <input type='text' name='telephone' value={form.telephone} onChange={this.changeHandler} />
                        密码
                        <input type='password' name='password' value={form.password} onChange={this.changeHandler} />
                        配图
                        <input type='text' name='photo' value={form.photo} onChange={this.changeHandler} />
                        <input type='submit' value='提交' />
                    </form>

                    <table>
                        <thead>
                            <th className='choose'>选择</th>
                            <th>编号</th>
                            <th>姓名</th>
                            <th>电话</th>
                            <th>密码</th>
                            <th>配图</th>
                            <th className='make'>操作</th>
                        </thead>
                        <tbody>
                            {
                                users.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td><input type='checkbox' /></td>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.telephone}</td>
                                            <td>{item.password}</td>
                                            <td>{item.photo}</td>
                                            <td>
                                                <Button className='link_button' type="link" onClick={this.delHandler.bind(this,item.id)}>删除</Button>
                                                <Button className='link_button' type="link" onClick={this.updateHandler.bind(this,item.id)}>修改</Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default User;