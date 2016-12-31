var React = require('react');
var ReactDom = require('react-dom');


// 搭个架子
// var Product = React.createClass({
//     render: function () {
//         return (
//             <tr>
//                 <td>football</td>
//                 <td>21.1</td>
//             </tr>
//         )
//     }
// });

// var ProductName = React.createClass({
//     render: function () {
//         return (
//             <tr>
//                 <td>Sporting Goods</td>
//             </tr>
//         )
//     }
// });

// var ProductTable = React.createClass({
//     render: function () {
//         return (
//             <table>
//                 <thead>
//                     <tr>
//                         <th>name</th>
//                         <th>price</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <ProductName></ProductName>
//                     <Product></Product>
//                     <Product></Product>
//                     <Product></Product>
//                     <Product></Product>
//                 </tbody>
//             </table>
//         )
//     }
// })
// var SearchBar = React.createClass({
//     render: function () {
//         return (
//             <div>
//                 <input type='text'></input>
//                 <input type='checkbox'></input>
//             </div>
//         )
//     }
// })
// var SearchApp = React.createClass({
//     render: function () {
//         return (
//             <div>
//                 <SearchBar/>
//                 <ProductTable/>
//             </div>
//         )
//     }
// });

// ReactDom.render(
//     <SearchApp/>,
//     document.getElementById('root')
// )




// ProductTable 根据数据生成相应的组件  ProductName Product 根据数据决定内容样式



// var Product = React.createClass({
//     render: function () {
//         return (
//             <tr style={ this.props.product.stocked ? {backgroundColor: 'red'} : {backgroundColor: ''} }>
//                 <td><span>{this.props.product.name}</span></td>
//                 <td><span>{this.props.product.price}</span></td>
//             </tr>
//         )
//     }
// });

// var ProductName = React.createClass({
//     render: function () {
//         return (
//             <tr>
//                 <td>{this.props.category}</td>
//             </tr>
//         )
//     }
// });

// var ProductTable = React.createClass({
//     render: function () {
//         var last = null;
//         var row = [];
//         var products = this.props.products;

//         products.forEach(function (product, index) {
//             // 此货物种类不等于上一个种类的时候需要添加 ProductName
//             if(last !== product.category) {
//                 row.push(<ProductName key={index + 10000} category = {product.category}></ProductName>)
//                 last = product.category;
//             }
//             row.push(<Product key={index} product={product}></Product>);
//         });
//         return (
//             <table>
//                 <thead>
//                     <tr>
//                         <th>name</th>
//                         <th>price</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {row}
//                 </tbody>
//             </table>
//         )
//     }
// })
// var SearchBar = React.createClass({
//     render: function () {
//         return (
//             <div>
//                 <input type='text'></input>
//                 <input type='checkbox'></input>
//             </div>
//         )
//     }
// })
// var SearchApp = React.createClass({
//     render: function () {
//         return (
//             <div>
//                 <SearchBar/>
//                 <ProductTable products={this.props.products}/>
//             </div>
//         )
//     }
// });

// var PRODUCTS = [
//     {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
//     {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
//     {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Baskettball'},
//     {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
//     {category: 'Electronics', price: '$399.99', stocked: false, name: 'iWatch'},
//     {category: 'Electronics', price: '$199.99', stocked: true, name: 'iPad'},

// ]

// ReactDom.render(
//     <SearchApp products={PRODUCTS}/>,
//     document.getElementById('root')
// );


// 通过 父级SearchApp 向  SearchBar 和 ProductTable 传递props （函数）--改变SearchApp state 从而使其两者沟通
var Product = React.createClass({
    render: function () {
        return (
            <tr style={ this.props.product.stocked ? {backgroundColor: ''} : {backgroundColor: 'red'} }>
                <td><span>{this.props.product.name}</span></td>
                <td><span>{this.props.product.price}</span></td>
            </tr>
        )
    }
});

var ProductName = React.createClass({
    render: function () {
        return (
            <tr>
                <td>{this.props.category}</td>
            </tr>
        )
    }
});

var ProductTable = React.createClass({
    render: function () {
        var last = null;
        var row = [];
        var products = this.props.products;

        products.forEach(function (product, index) {
            // 此货物种类不等于上一个种类的时候需要添加 ProductName
            if(last !== product.category) {
                row.push(<ProductName key={index + 10000} category = {product.category}></ProductName>)
                last = product.category;
            }
            row.push(<Product key={index} product={product}></Product>);
        });
        return (
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
var SearchBar = React.createClass({
    onHandleFliterText: function () {
        this.props.onHandleFliterText(this.refs.filter.value);
    },
    render: function () {
        return (
            <div>
                <input type='text' ref='filter' onChange={this.onHandleFliterText}></input>
                <input type='checkbox' onChange={this.props.onHandleShowStocked}></input>
            </div>
        )
    }
})
var SearchApp = React.createClass({
    getInitialState: function () {
        return {
            onlyShowStocked: false,
            filterText: '',
        }  
    },
    onHandleShowStocked: function () {
        this.setState({
            onlyShowStocked: !this.state.onlyShowStocked
        })
    },
    onHandleFliterText: function (text) {
        this.setState({
            filterText: text
        })
    },
    render: function () {
        var products = this.props.products;
        //只显示 stocked 为true的时候过滤一下 数组元素
        if (this.state.onlyShowStocked) {
            //return true的留下
            products = products.filter(function (product) {
                return product.stocked;
            });
        };
        // 过滤文本
        var filterText = this.state.filterText;
        products = products.filter(function (product) {
            return product.name.indexOf(filterText) !== -1;
        });

        return (
            <div>
                <SearchBar onHandleShowStocked={this.onHandleShowStocked} onHandleFliterText={this.onHandleFliterText}/>
                <ProductTable products={products}/>
            </div>
        )
    }
});

// stocked 有货物
var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Baskettball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iWatch'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'iPad'},

]

ReactDom.render(
    <SearchApp products={PRODUCTS}/>,
    document.getElementById('root')
);


// ReactDom.render(
//     <div><input onChange={this.onChange} value={this.state.text}/></div>,
//     document.getElementById('root')
// )