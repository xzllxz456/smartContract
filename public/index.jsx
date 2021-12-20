const {Component}=React;
const {Router,Route,IndexRoute,Link}=ReactRouter;

 
class Main extends Component{
    render(){
        return(
            <div>
                <h1>SmartContract</h1>
                <ul className="header">
                    {/* <li><Link exact to="/">홈으로가기</Link></li> */}
                    <li><Link to="/payment">결제이력메뉴</Link></li>
                    <li><Link to="/calculate">정산이력메뉴</Link></li>
                    <li><Link to="/license">계약이력메뉴</Link></li>

                </ul>
                
                {/* <div ></div> */}
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
 
class Home extends Component{
    render(){
        return(
            <div>
                {/* <h2>홈입니다.</h2> */}
                <h2>스마트컨트렉트</h2>
            </div>
        );
    }
}
class PaymentNetwork extends Component{
    state={
        payment:null
    }
 
    paymentWallet=()=>{
        axios.get('payment/connect')
        .then((res)=>{
            console.log(res);
        })
        .catch((error)=>{
            console.log(error);
        });
    }
 
    queryAll=()=>{       
        // alert("^____^"); 
        axios.get('/payment/queryAll')
        .then((res)=>{
            console.log(res.data.msg);
            this.setState({
                payment:res.data.msg
            });
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    
    query=()=>{
        // alert(">__<");
        const data={
            'pnumber':this.querykey.value
        }
        // alert(JSON.stringify(data));
        JSON.stringify(data)
        axios.post('/payment/searchquery',data).then((res)=>{
            console.log(res.data.msg);
            this.setState({
                payment:res.data.msg
            });
        }).catch((err)=>{
            console.log(err);
        });
    }

    createPayment=()=>{
        const data={
            'key':this.key.value,
            'pnumber':this.pnumber.value,
            'id':this.id.value,
            'store':this.store.value,
            'name':this.name.value,
            'product':this.product.value,
            'price':this.price.value
        }
        //alert(JSON.stringify(data));
        JSON.stringify(data)
        axios.post('/payment/send',data)
        .then((res)=>{
            alert(res.data.msg);
            console.log(res.data.msg);
        })
        .catch((err)=>{
            console.log(err);
        });
    }
 
    render(){
        return(
            <div>
                <div>
                <h2>결제내역</h2>
                {/* <button onClick={this.paymentWallet}>지갑생성</button> */}
                <hr/>
                    <span>결제내역 키 : </span><input ref={ref=>this.key=ref}/><br/>
                    <span>결제 번호 : </span><input ref={ref=>this.pnumber=ref}/><br/>
                    <span>사용자 ID : </span><input ref={ref=>this.id=ref}/><br/>
                    <span>가계이름 : </span><input ref={ref=>this.store=ref}/><br/>
                    <span>이름 : </span><input ref={ref=>this.name=ref}/><br/>
                    <span>상품 : </span><input ref={ref=>this.product=ref}/><br/>
                    <span>가격 : </span><input ref={ref=>this.price=ref}/><br/>
                <button onClick={this.createPayment}>결제이력등록하기</button>
                <hr/></div>
                KEY <input ref={ref=>this.querykey=ref}/>
                <button onClick={this.query}> 결제이력 조회하기</button>
                <button onClick={this.queryAll}> 결제이력 전체 조회하기</button><br/><hr/>
                <div>{this.state.payment}</div>
            </div>
        );
    }
}
class CalculateNetwork extends Component{  
    state={
        allcalculs:null
    }
    createCalcul=()=>{
        const data={
            'key':this.key.value,
            'cnumber':this.cnumber.value,
            'userid':this.userid.value,
            'userprofile':this.userprofile.value,
            'totalrevenues':this.totalrevenues.value,
            'commision':this.commision.value,
            'revenues':this.revenues.value,
            'clearingcommission':this.clearingcommission.value,
            'contractoption':this.contractoption.value,
            'salesinfo':this.salesinfo.value,
            'distribution':this.distribution.value,
        }
        // alert(JSON.stringify(data));
        JSON.stringify(data)

        axios.post('/calculate/createCalcul',data)
        .then((res)=>{
            alert(res.data.msg);
            console.log(res.data.msg);
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    wallet=()=>{
        // alert("^^");

        axios.get('/calculate/wallet')
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    queryAllCalcul=()=>{
        // alert("^____^");

        axios.get('/calculate/queryAllCalcul')
        .then((res)=>{
            console.log(res.data.msg);
            this.setState({
                allcalculs:res.data.msg
            });
        })
        .catch((err)=>{
            console.log(err);
        });
    }
 
    querycalcul=()=>{
        const data={
            'key':this.querykey.value
        }
        JSON.stringify(data)
        axios.post('/calculate/searchquery',data).then((res)=>{
            console.log(res.data.msg);
            this.setState({
                allcalculs:res.data.msg
            });
        }).catch((err)=>{
            console.log(err);
        });
    }

    render(){
        return(
            <div>
                <h2>정산내역</h2> 
                {/* <button onClick={this.wallet}>지갑 생성</button> */}
                <hr/>
                정산내역 키 :            <input ref={ref=>this.key=ref}/><br/>
                정산 번호 :     <input ref={ref=>this.cnumber=ref}/><br/>
                사용자 ID :    <input ref={ref=>this.userid=ref}/><br/>
                사용자정보 :   <input ref={ref=>this.userprofile=ref}/><br/>
                총 매출 :      <input ref={ref=>this.totalrevenues=ref}/><br/>
                수수료 :       <input ref={ref=>this.commision=ref}/><br/>
                수익금 :       <input ref={ref=>this.revenues=ref}/><br/>
                수수료율 :     <input ref={ref=>this.clearingcommission=ref}/><br/>
                이익분배 방식 :  <input ref={ref=>this.contractoption=ref}/><br/>
                매출정보 :     <input ref={ref=>this.salesinfo=ref}/><br/>
                배분액 :       <input ref={ref=>this.distribution=ref}/><br/>
                <button onClick={this.createCalcul}>정산이력 등록하기</button>
                <hr/>
                {/* <button onClick={this.queryAllCalcul}>정산이력 조회</button> */}
                
                KEY <input ref={ref=>this.querykey=ref}/>
                <button onClick={this.querycalcul}>정산이력 조회하기</button>
                <button onClick={this.queryAllCalcul}>정산이력 전체 조회하기</button><br/><hr/>
                <div>{this.state.allcalculs}</div>
                {/* <div>{this.state.allcalculs}</div> */}
            </div>
        );
    }
}

class LicenseNetwork extends Component{  
    
    state={
        allLicense:null,
    }

    createLicense=(e)=>{
        const data = {
            'key':this.key.value,
            'cnumber':this.cnumber.value,
            'userid':this.userid.value,
            'policy1':this.policy1,
            'policy2':this.policy2,
            'policy3':this.policy3,
            'userprofil':this.userprofil.value,
        }
        
        console.log(data);
        // console.log(JSON.stringify(data));
        // alert(JSON.stringify(data));
        JSON.stringify(data)

        axios.post('/license/createLicense',data)
        .then((res)=>{
            alert(res.data.msg);
            console.log(res.data.msg);
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    handleChange = (e) => {
        console.log(`선택한 값 : ${e.target.value}`);
        // this.policy1.value=e.target.value;
        this[e.target.name]=e.target.value
      };
      
    wallet=()=>{
        // alert("^^");

        axios.get('/license/wallet')
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    queryAllLicense=()=>{
        // alert("^____^");

        axios.get('/license/queryAlllicense')
        .then((res)=>{
            console.log(res.data.msg);
            this.setState({
                allLicense:res.data.msg
            });
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    queryLicense=()=>{
        // alert(">__<");
        const data={
            'key':this.querykey.value
        }
        // alert(JSON.stringify(data));
        JSON.stringify(data)
        axios.post('/license/searchquery',data).then((res)=>{
            console.log(res.data.msg);
            this.setState({
                allLicense:res.data.msg
            });
        }).catch((err)=>{
            console.log(err);
        });
    }
 
    render(){
        return(
            <div>
                <h2>계약내역</h2> 
                {/* <button onClick={this.wallet}>지갑 생성</button> */}
                <hr/>
                계약내역 키 : <input ref={ref=>this.key=ref}/><br/>
                계약번호 :  <input ref={ref=>this.cnumber=ref}/><br/>
                사용자 ID : <input ref={ref=>this.userid=ref}/><br/>
                {/* 정책1 동의<input type={'radio'} name="policy1" value="true" ref={ref=>this.policy1=ref}/>
                    비동의<input type={'radio'} name="policy1" value="false" ref={ref=>this.policy1=ref}/><br/> */}               
                    <a>정책1:</a> 
                        <a>동의</a><input type={'radio'} name="policy1" value={'true'} onChange={this.handleChange} />
                        <a>비동의</a><input type={'radio'} name="policy1" value={"false"} onChange={this.handleChange} /><br/>
                    <a>정책2:</a>
                        <a>동의</a><input type={'radio'} name="policy2" value={'true'} onChange={this.handleChange} />
                        <a>비동의</a><input type={'radio'} name="policy2" value={'false'} onChange={this.handleChange} /><br/>
                
                    <a>정책3:</a>
                        <a>동의</a><input type={'radio'} name="policy3" value={'true'} onChange={this.handleChange} />
                        <a>비동의</a><input type={'radio'} name="policy3" value={'false'} onChange={this.handleChange} /><br/>
                    
                사용자정보 <input ref={ref=>this.userprofil=ref}/><br/>
                <button onClick={this.createLicense}>계약이력 등록하기</button>
                <hr/>
                KEY <input ref={ref=>this.querykey=ref}/>
                <button onClick={this.queryLicense}>계약이력 조회하기</button>
                <button onClick={this.queryAllLicense}>계약이력 전체 조회</button><br/><hr/>
                <div>{this.state.allLicense}</div>
            </div>
        );
    }
}



class FirstNetwork extends Component{
    render(){
        return(
            <div>
                <h2>FirstNetwork</h2>
            </div>
        );
    }
}

ReactDOM.render(
    (<Router>
        <Route path="/" component={Main} >
            <Route path="payment" component={PaymentNetwork} />
            <Route path="first" component={FirstNetwork} />
            <Route path="calculate" component={CalculateNetwork} />
            <Route path="license" component={LicenseNetwork} />
            <IndexRoute component={Home} />
        </Route>
    </Router>)
     , document.getElementById("root")
);
