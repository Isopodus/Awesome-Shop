import React, {Component} from 'react'
import ProductsContainer from "../Product/ProductsContainer/ProductsContainer";
import Header from "../Header/Header";

class Home extends Component {
    render() {
        return (
            <div className="home">
                <Header
                    user={this.props.user}
                    order={this.props.order}
                    />

                {this.props.m_notice && <div>{this.props.m_notice}</div>}
                {this.props.m_alert && <div>{this.props.m_alert}</div>}

                <ProductsContainer
                    user={this.props.user}
                    order={this.props.order}
                    orderHandler={this.props.orderHandler}
                    m_notice={this.props.m_notice}
                    m_alert={this.props.m_alert}/>
            </div>
        )
    }
}

export default Home