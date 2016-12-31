var React = require('react');
var ReactDom = require('react-dom');
// 获取原生dom的两个方法
// ref = 'Inp' this.refs.Inp
// ref = {function(dom){this._Inp = dom}.bind(this)} this._Inp
// var Input = React.createClass({
//     getInitialState:function(){
//         return{
//             value:'asd'
//         }
//     },
//     onHandleChange:function(){
//         this.setState({
//             value : this.refs.Inp.value
//         })
//     },
//     render:function(){
//         return(
//             <div>
//                 <input value = {this.state.value}type ='text' ref='Inp'onChange={this.onHandleChange}></input>
//                 <br></br>
//                 <span>{this.state.value}</span>    
//             </div>
//         )
//     }
// })
// ReactDom.render(
//     <Input></Input>,
//     document.getElementById('root')
// )
var SearchBar = React.createClass({
    onHandleChange:function(){
        this.props.onHandleFilterText(this.refs.Inp.value)
    },
    render:function(){
        var products = this.props.products
        return(
            <div>
                <input type='text' ref='Inp' onChange = {this.onHandleChange}/>
                <input type='checkbox' onClick = {this.props.onHandleShowStocked}/>
            </div>
        )
    }

})
var ProductCategory = React.createClass({
    render:function(){
        return(
            <tr><td>{this.props.category}</td></tr>
        )
    }
})
var ProductRow = React.createClass({
    render:function(){
        var styles = this.props.stocked?{color:''}:{color:'red'}
        return(
            <tr>
                <td style={styles}>{this.props.name}</td>
                <td style={styles}>{this.props.price}</td>
            </tr>
        )
    }
})
var ProductTable = React.createClass({
    render:function(){
        var products = this.props.products;
        var row = [];
        var lastCategory = ''; 
        products.forEach(function(product, index){
            if(lastCategory !== product.category){
                row.push(<ProductCategory key={index + 10000} category={product.category}/>);
                lastCategory = product.category;
            }
            row.push(<ProductRow key={index + 1000} stocked = {product.stocked} name={product.name} price = {product.price} />)
        })  
        return(
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody>
                    {row}                
                </tbody>
            </table>
        )
    }
})
var SearchApp = React.createClass({
    getInitialState:function(){
        return{
            onlyShowStocked:false,
            filterText:''
        }       
    },
    render:function(){
        var products = this.props.products;
        if(this.state.onlyShowStocked){
            products = products.filter(function(product){
                return product.stocked;
            })
        }
        if(this.state.filterText){
            var filterText = this.state.filterText;
            products = products.filter(function(product){
                return product.name.indexOf(filterText) !== -1
            })
        }
        return(
            <div>
                <SearchBar onHandleShowStocked = {this.onHandleShowStocked} onHandleFilterText = {this.onHandleFilterText}/>
                <ProductTable products = {products} />
            </div>
        )
    },
    onHandleShowStocked:function(){
        this.setState({
            onlyShowStocked:!this.state.onlyShowStocked
        })
    },
    onHandleFilterText:function(text){
        this.setState({
            filterText:text
        })
    }
})
var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Baskettball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iWatch'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'iPad'},
]
ReactDom.render(
    <SearchApp products = {PRODUCTS}></SearchApp>,
    document.getElementById('root')
)
