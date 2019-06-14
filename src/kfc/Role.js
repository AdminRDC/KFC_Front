import { Button } from 'antd';
import React from 'react';
import $ from 'jquery'

import './Right.css';

class Role extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            roles:[],
            form:{
                name:''
            }
        }
    }

    componentWillMount(){
        this.loadRole();
    }

    //加载信息
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
        let url = 'http://127.0.0.1:8888/Role/findById?id='+id;
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
        let url = 'http://127.0.0.1:8888/Role/saveOrUpdate';
        $.post(url,this.state.form,({status,message}) => {
            if(status === 200){
                alert(message);
                this.setState({
                    form:{
                        name:''
                    }
                })
                this.loadRole();
            }
        });
        event.preventDefault();
    }

    //删除
    delById(id,handler){
        let url = 'http://127.0.0.1:8888/Role/deleteById?id='+id;
        $.get(url,function(result){
            handler(result);
        })
    }
    delHandler(id){
        this.delById(id,({status,message}) => {
            if(status === 200){
                alert(message);
                this.loadRole();
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
        let {roles,form} = this.state;

        return(
            <div className='outer'>
                <div className='div_top'>
                    <span>角色管理</span>
                </div> 
                {JSON.stringify(form)}
                <div className='div-right'>
                    <Button className='div_right_button' type="primary" onClick={this.showForm}>添加</Button>
                    <Button className='div_right_button' type="danger">批量删除</Button>
                    <form onSubmit={this.submitForm}>
                        角色名 
                        <input type='text' name="name" value={form.name} onChange={this.changeHandler}/>
                        <input type='submit' value='提交' />
                    </form>

                    <table>
                        <thead>
                            <th className='choose'>选择</th>
                            <th>编号</th>
                            <th>角色名</th>
                            <th className='make'>操作</th>
                        </thead>
                        <tbody>
                            {
                                roles.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td><input type='checkbox' /></td>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
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

export default Role;