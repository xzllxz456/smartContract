import React, { Component } from 'react';

class PaymentSave extends Component {
    
    saveApi = () => {
        const data={
            'key':this.key.value,
            'pnumber':this.pnumber.value,
            'id':this.id.value,
            'store':this.store.value,
            'name':this.name.value,
            'product':this.product.value,
            'price':this.price.value
        }
        
        JSON.stringify(data);
        axios.post('../api/payment', data)
        .then((res)=>{
            console.log(res.data.msg);
            console.log(res.state);
            if(res.state == "200") {
                alert("결제이력 저장에 성공하였습니다.");
            }
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    
    render(){
        return(
            <div>
                <div>
                    <h2>결제이력 저장</h2>
                    <hr/>

                    <span>결제내역 키 : </span><input ref={ref=>this.key=ref}/><br/>
                    <span>결제 번호 : </span><input ref={ref=>this.pnumber=ref}/><br/>
                    <span>사용자 ID : </span><input ref={ref=>this.id=ref}/><br/>
                    <span>가계이름 : </span><input ref={ref=>this.store=ref}/><br/>
                    <span>이름 : </span><input ref={ref=>this.name=ref}/><br/>
                    <span>상품 : </span><input ref={ref=>this.product=ref}/><br/>
                    <span>가격 : </span><input ref={ref=>this.price=ref}/><br/>
                
                    <button onClick={this.saveApi}>저장하기</button>
                    <hr/>
                </div>
            </div>
        );
    }    
}

export default PaymentSave;