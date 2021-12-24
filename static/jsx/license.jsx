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
                    {/* <li><Link to="/calculate">정산이력메뉴</Link></li> */}
                    {/* <li><Link to="/license">계약이력메뉴</Link></li> */}

                </ul>                
                <div ></div> 
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
                <h2>스마트컨트렉트</h2>
            </div>
        );
    }
}

class PaymentNetwork extends Component {

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
        
        axios.get('/payment')
        .then((res)=>{
            console.log(res.data.msg);
            alert('1');
            this.setState({
                
            });
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
                {/*
                KEY <input ref={ref=>this.querykey=ref}/>
                <button onClick={this.query}> 결제이력 조회하기</button>
                <button onClick={this.queryAll}> 결제이력 전체 조회하기</button><br/><hr/>
                <div>{this.state.payment}</div>
                */}
            </div>
        );
    }
}

ReactDOM.render(
    (<Router>
        <Route path="/" component={Main} >
            <Route path="payment.jsx" component={PaymentNetwork} />
            <IndexRoute component={Home} />
        </Route>
    </Router>)
     , document.getElementById("root")
);
