import React from 'react';
import { Form, Button, } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer.js'


const ShippingScreen = ({history}) => {
    const [address,setAddress] = useState('');
    const [city,setCity] = useState('');
    const [postalCode,setpostalCode] = useState('');
    const [country,setCountry] = useState('');
    return (
      <FormContainer>
          <h1>Shipping</h1>
          <Form>
          <Form.Group controlId='address'>
                    <Form.Label>address </Form.Label>
                    <Form.Control
                        type='address'
                        placeholder='Enter address'
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)} >
                    </Form.Control>
                </Form.Group>
          </Form>
      </FormContainer>
    );
}

export default ShippingScreen;
