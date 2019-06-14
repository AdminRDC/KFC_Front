import { Button } from 'antd';
import React from 'react';
import $ from 'jquery'

import './Right.css';

class Product extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            products:[],
            categorys:[],
            form:{
                name:'',
                description:'',
                price:'',
                photo:'',
                status:'',
                xiaoliang:'',
                categoryId:''
            }
        }
    }

    componentWillMount(){
        this.loadCategory();
        this.loadProduct();
    }

    //加载信息
    loadCategory(){
        let url = 'http://127.0.0.1:8888/Catrgory/findAll';
        $.get(url,({status,data}) => {
            if(status === 200){
                this.setState({
                    categorys:data,
                })
            }else{
                alert('接口异常')
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
                alert('接口异常')
            }
        });
    }

    //修改
    updateHandler(id){
        let url = 'http://127.0.0.1:8888/Product/findById?id='+id;
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

    //监测改变
    changeHandler = (event) => {
        let name = event.target.name;
        let val = event.target.value;
        this.setState({
            form:{...this.state.form,...{[name]:val}}
        });
    }

    //提交表单
    submitForm = (event) => {
        alert(JSON.stringify(this.state.form));
        let url = 'http://127.0.0.1:8888/Product/saveOrUpdate';
        $.post(url,this.state.form,({status,message}) => {
            if(status === 200){
                alert(message);
                this.setState({
                    form:{
                        name:'',
                        description:'',
                        price:'',
                        photo:'',
                        status:'',
                        xiaoliang:'',
                        categoryId:''
                    }
                })
                this.loadProduct();
            }
        });
        event.preventDefault();
    }

    //删除
    delById(id,handler){
        let url = 'http://127.0.0.1:8888/Product/deleteById?id='+id;
        $.get(url,function(result){
            handler(result);
        })
    }
    delHandler(id){
        this.delById(id,({status,message}) => {
            if(status === 200){
                alert(message);
                this.loadProduct();
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
        let {products,categorys,form} = this.state;
        return(
            <div className='outer'>
                <div className='div_top'>
                    <span>餐食管理</span>
                </div> 
                <div className='div-right'>
                    <Button className='div_right_button' type="primary" onClick={this.showForm}>添加</Button>
                    <Button className='div_right_button' type="danger">批量删除</Button>
                    <form onSubmit={this.submitForm}>
                        名称 
                        <input type='text' name="name" value={form.name} onChange={this.changeHandler}/>
                        简介 
                        <input type='text' name="description" value={form.description} onChange={this.changeHandler}/>
                        价格 
                        <input type='text' name="price" value={form.price} onChange={this.changeHandler}/>
                        图片
                        <input type='text' name="photo" value={form.photo} onChange={this.changeHandler}/>
                        状态 
                        <input type='text' name="status" value={form.status} onChange={this.changeHandler}/>
                        销量 
                        <input type='text' name="xiaoliang" value={form.xiaoliang} onChange={this.changeHandler}/>
                        品种 
                        <select name='categoryId' value={form.categoryId} onChange={this.changeHandler}>
                            {
                                categorys.map((item)=>{
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
                            <th>名称</th>
                            <th>简介</th>
                            <th>价格</th>
                            <th>图片</th>
                            <th>状态</th>
                            <th>销量</th>
                            <th>品种</th>
                            <th className='make'>操作</th>
                        </thead>
                        <tbody>
                            {
                                products.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td><input type='checkbox' /></td>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.description}</td>
                                            <td>{item.price}</td>
                                            <td>{item.photo}</td>
                                            <td>{item.status}</td>
                                            <td>{item.xiaoliang}</td>
                                            <td>{item.categoryId}</td>
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

export default Product;