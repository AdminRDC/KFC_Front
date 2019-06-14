import { Button } from 'antd';
import React from 'react';
import $ from 'jquery'

import './Right.css';

class userRole extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users:[],
            userRoles:[],
            roles:[],
            form:{
                userId:'',
                roleId:''
            }
        }
    }

    componentWillMount(){
        this.loadUser();
        this.loadRole();
        this.loadUserRole();
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
    loadUserRole(){
        let url = 'http://127.0.0.1:8888/UserRole/findAll';
        $.get(url,({status,data}) => {
            if(status === 200){
                this.setState({
                    userRoles:data,
                })
            }else{
                alert('接口异常');
            }
        });
    }
    loadRole(){
        let url = 'http://127.0.0.1:8888/Role/findAll';
        $.get(url,({status,data}) => {
            if(status === 200){
                this.setState({
                    roles:data,
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
        let url = 'http://127.0.0.1:8888/UserRole/findById?id='+id;
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
        let url = 'http://127.0.0.1:8888/UserRole/saveOrUpdate';
        $.post(url,this.state.form,({status,message}) => {
            if(status === 200){
                alert(message);
                this.setState({
                    form:{
                        userId:'',
                        roleId:''
                    }
                })
                this.loadUserRole();
            }
        });
        event.preventDefault();
    }

    //删除
    delById(id,handler){
        let url = 'http://127.0.0.1:8888/UserRole/deleteById?id='+id;
        $.get(url,function(result){
            handler(result);
        })
    }
    delHandler(id){
        this.delById(id,({status,message}) => {
            if(status === 200){
                alert(message);
                this.loadUserRole();
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
        let {users,userRoles,roles,form} = this.state;

        return(
            <div className='outer'>
                <div className='div_top'>
                    <span>用户角色管理</span>
                </div> 
                {JSON.stringify(form)}
                <div className='div-right'>
                    <Button className='div_right_button' type="primary" onClick={this.showForm}>添加</Button>
                    <Button className='div_right_button' type="danger">批量删除</Button>
                    <form onSubmit={this.submitForm}>
                        客户
                        <select name='userId' value={form.userId} onChange={this.changeHandler}>
                            {
                                users.map((item)=>{
                                    return <option key={item.id}  value={item.id}>{item.name}</option>
                                })
                            }
                        </select>
                        角色
                        <select name='roleId' value={form.roleId} onChange={this.changeHandler}>
                            {
                                roles.map((item)=>{
                                    return <option key={item.id}  value={item.id}>{item.name}</option>
                                })
                            }
                        </select>
                        <input type='submit' value='提交' />
                    </form>

                    <table>
                        <thead>
                            <th className='choose'>选择</th>
                            <th>编号</th>
                            <th>客户</th>
                            <th>角色</th>
                            <th className='make'>操作</th>
                        </thead>
                        <tbody>
                            {
                                userRoles.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td><input type='checkbox' /></td>
                                            <td>{item.id}</td>
                                            <td>{item.userId}</td>
                                            <td>{item.roleId}</td>
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

export default userRole;