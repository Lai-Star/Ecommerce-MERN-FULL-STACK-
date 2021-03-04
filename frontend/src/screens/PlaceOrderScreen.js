import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import {Button ,Row ,Col ,ListGroup ,Image,Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import CheckoutSteps from '../components/CheckoutSteps.js'
import {createOrder} from '../actions/orderActions'

const PlaceOrderScreen = ({history}) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    const addDecimals = (num) => {
        return (Math.round(num * 100)/100).toFixed(2)
    }
    //Calculate prices 
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc,item)=> acc + item.price * item.qty,0))

    cart.shippingPrice = addDecimals(cart.itemsPrice >2000 ? 0 : 299)

    cart.taxPrice =addDecimals( Number((0.18 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice = addDecimals(Number(cart.itemsPrice)+ Number(cart.shippingPrice)+Number(cart.taxPrice))

   
 const orderCreate = useSelector(state => state.orderCreate)
 const {order , success , error} = orderCreate

 useEffect( () => {
     if(success){
         history.pushState(`order/order._id`);
     }
     //eslint-disable-next-line
 },[history,success])
   
    const placeOrderHandler = () =>{
        
       dispatch(createOrder({
           orderItems:cart.cartItems,
           shippingAddress:cart.shippingAddress,
           paymentMethod: cart.paymentMethod,
           itemsPrice:cart.itemsPrice,
           shippingPrice:cart.shippingPrice,
           taxPrice: cart.taxPrice,
           totalPrice:cart.totalPrice
       }))
    }


    return (
        <>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md= {8}>
                <ListGroup variant= 'flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address:</strong>
                            {cart.shippingAddress.address},
                            {cart.shippingAddress.city},
                            {cart.shippingAddress.postalCode},
                            {cart.shippingAddress.country}

                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>Method:</strong>
                        {cart.PaymentMethod}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message>:(
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item,index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>

                                            </Col>
                                            <Col>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x &#8377;{item.price} = &#8377;{item.qty*item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ) )}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md ={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>&#8377;{cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>&#8377;{cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>GST</Col>
                                <Col>&#8377;{cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>&#8377;{cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type ='button' className='btn-block' disabled={cart.cartItems===0} onClick={placeOrderHandler}>
                                Place Order
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
            
        </>
    );
}

export default PlaceOrderScreen;
