import React from "react";
import {useDispatch , useSelector} from "react-redux";
import { clearErrors, createOrder } from "../../actions/orderActions";

const PayPal = ( payment ) => {

    const [paid, setPaid] = React.useState(false);
   
    const [error, setError] = React.useState(null);

    const dispatch = useDispatch();
    const {paymentError} = useSelector(state => state.newOrder);

    const paypalRef = React.useRef();

    React.useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "",
                                amount: {
                                    currency_code: "USD",
                                    value: payment.price,
                            },
                        },
                     ],
                });
            },
            onApprove: async (data, action) =>{
                const order = await action.order.capture();

                payment.order.paymentInfo = {
                    id: order.id,
                    status: order.status
                }

                setPaid(true);
                dispatch(createOrder(payment.order));
                console.log(order);
            },
            onError: async (err) => {
                setError(err)
                alert.error(paymentError);
                dispatch(clearErrors());
                console.log(err);
            },
    })
    .render(paypalRef.current);
}, [payment, dispatch]);

// If the payment has been made
if (paid) {
    payment.history.push("/success");
  }

  // If any error occurs
  if (error) {
    return <div style = {{ 
         color:  '#9e2146',
         fontSize: '16px'
        }}>Error Occurred in processing payment.! Please try again.</div>;
  }

    return (
        <div>
          <div ref={paypalRef} />
        </div>
    )
}

export default PayPal;