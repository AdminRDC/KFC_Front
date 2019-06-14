import { Button } from 'antd';
import React from 'react';
import $ from 'jquery'

import './Right.css';

class OrderLine extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderLines:[],
            orders:[],
            products:[],
            form:{
                num:'',
                orderId:'',
                productId:''
            }
        }
    }

    componentWillMount(){
        this.loadOrder();
        this.loadOrderLine();
        this.loadProduct();
    }

    //加载信息
    loadOrderLine(){
        let url = 'http://127.0.0.1:8888/OrderLine/findAll';
        $.get(url,({status,data}) => {
            if(status === 200){
                this.setState({
                    orderLines:data,
                })
            }else{
                alert('接口异常');
            }
        });
    }
    loadOrder(){
        let url = 'http://127.0.0.1:8888/Order/findAll';
        $.get(url,({status,data}) => {
            if(status === 200){
                this.setState({
                    orders:data,
                })
            }else{
                alert('接口异常');
            }
        });
    }
    loadProduct(){
        let url = 'http://127.0.0.1:8888/Product/findAll';
        $.get(url,({status,data}) => {
            if(status === 200){
                this.setState({
                    products:data,
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
        let url = 'http://127.0.0.1:8888/OrderLine/findById?id='+id;
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
        let url = 'http://127.0.0.1:8888/OrderLine/saveOrUpdate';
        $.post(url,this.state.form,({status,message}) => {
            if(status === 200){
                alert(message);
                this.setState({
                    form:{
                        num:'',
                        orderId:'',
                        productId:''
                    }
                })
                this.loadOrderLine();
            }
        });
        event.preventDefault();
    }

    //删除
    delById(id,handler){
        let url = 'http://127.0.0.1:8888/OrderLine/deleteById?id='+id;
        $.get(url,function(result){
            handler(result);
        })
    }
    delHandler(id){
        this.delById(id,({status,message}) => {
            if(status === 200){
                alert(message);
                this.loadOrderLine();
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
        let {orderLines,orders,products,form} = this.state;

        return(
            <div className='outer'>
                <div className='div_top'>
                    <span>单行订单管理</span>
                </div> 
                {JSON.stringify(form)}
                <div className='div-right'>
                    <Button className='div_right_button' type="primary" onClick={this.showForm}>添加</Button>
                    <Button className='div_right_button' type="danger">批量删除</Button>
                    <form onSubmit={this.submitForm}>
                        数量 
                        <input type='text' name="num" value={form.num} onChange={this.changeHandler}/>
                        订单号
                        <select name='orderId' value={form.orderId} onChange={this.changeHandler}>
                            {
                                orders.map((item)=>{
                                    return <option key={item.id}  value={item.id}>{item.id}</option>
                                })
                            }
                        </select>
                        商品编号
                        <select name='productId' value={form.productId} onChange={this.changeHandler}>
                            {
                                products.map((item)=>{
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
                            <th>数量</th>
                            <th>订单号</th>
                            <th>商品编号</th>
                            <th className='make'>操作</th>
                        </thead>
                        <tbody>
                            {
                                orderLines.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td><input type='checkbox' /></td>
                                            <td>{item.id}</td>
                                            <td>{item.num}</td>
                                            <td>{item.orderId}</td>
                                            <td>{item.productId}</td>
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

export default OrderLine;