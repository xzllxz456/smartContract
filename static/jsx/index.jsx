const {Component} = React;
const {Router,Route,IndexRoute,Link} = ReactRouter;

class Index extends Component {
    render() {
        return(
            <div id="page-container" class="page-container fade page-sidebar-fixed page-header-fixed">
          
                <div id="header" class="header navbar-default">
                    <div class="navbar-header">
                        <a href="#main/dashboard.html" class="navbar-brand"><span class="logo"><img src='../assets/ci/rathon.png' /></span> <b>RathonTech</b></a>
                        {/*<button type="button" class="navbar-toggle" data-click="sidebar-toggled">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>*/}
                    </div>
                </div>

                <div id="sidebar" class="sidebar f-s-12">
                    <div data-scrollbar="true" data-height="100%">
                        <ul class="nav">
                            <li>
                                <a href="#main/dashboard.html" data-toggle="ajax">
                                    <i class="fa fa-th-large"></i>
                                    <span>처음으로</span>
                                </a>
                            </li>
                            <li class="has-sub">
                                <a href="#">
                                    <b class="caret"></b>
                                    <i class="fa fa-users"></i> 
                                    <span>결제이력</span>
                                </a>
                                <ul class="sub-menu">
                                    <li><a href="#user/userList.html">결제이력 저장</a></li>
                                    <li><a href="#user/adminList.html">결제이력 조회</a></li>
                                </ul>
                            </li>
                            <li class="has-sub">
                                <a href="#">
                                    <b class="caret"></b>
                                    <i class="fa fa-server"></i> 
                                    <span>정산이력</span>
                                </a>
                                <ul class="sub-menu">
                                    <li><a href="#service/list.html">배분이력 저장</a></li>
                                    <li><a href="#service/policy.html">배분이력 조회</a></li>
                                </ul>
                            </li>
                            <li class="has-sub">
                                <a href="#">
                                    <b class="caret"></b>
                                    <i class="fa fa-university"></i> 
                                    <span>계약이력</span>
                                </a>
                                <ul class="sub-menu">
                                    <li><a href="#idp/list.html">계약이력 저장</a></li>
                                    <li><a href="#idp/serviceList.html">계약이력 조회</a></li>
                                </ul>
                            </li>
                            
                            <li><a href="#" class="sidebar-minify-btn" data-click="sidebar-minify"><i class="fa fa-angle-double-left"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div class="sidebar-bg"></div>

            </div>
        );
    }
}

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
        
        axios.get('../api/payment')
        .then((res)=>{
            console.log("success");
            console.log("success");
            this.setState({
                
            });
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    testGet = () => {

        axios.get('/api/payment')
        .then((res)=>{
            console.log("get success");
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    testPost = () => {
        axios.post('/api/payment')
        .then((res)=>{
            console.log("post success");
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
                <button onClick={this.testGet}>결제이력등록하기</button>
                <button onClick={this.testPost}>결제이력등록하기</button>
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
            <IndexRoute component={Home} />
            <Route path="payment" component={PaymentNetwork} />            
        </Route>
    </Router>)
     , document.getElementById("root")
);
