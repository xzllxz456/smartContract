const {Component} = React;
const {Router,Route,IndexRoute,Link} = ReactRouter;

import PaymentSave from "./payment/paymentSave";
//import MainPage from "./main";

{/*
class Index extends Component {
    render() {
        return(
            <div id="page-container" class="page-container fade page-sidebar-fixed page-header-fixed">
          
                <div id="header" class="header navbar-default">
                    <div class="navbar-header">
                        <a href="#main/dashboard.html" class="navbar-brand"><span class="logo"><img src='../assets/ci/rathon.png' /></span> <b>RathonTech</b></a>
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
*/}
class Index extends Component{
    render(){
        return(
            <div>
                <h1>SmartContract</h1>
                <ul className="header">
                    <li><Link exact to="/main">홈으로가기</Link></li>
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

ReactDOM.render(<PaymentSave/>, document.getElementById("root"));
/*
ReactDOM.render(
    (<Router>
        <Route path="/" component={Index} >
            <IndexRoute path="main" component={Home} />
            <Route path="payment" component={PaymentSave} />
        </Route>
    </Router>)
     , document.getElementById("root")
);
*/
