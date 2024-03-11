import React, { useRef, useEffect } from "react";
import * as bookingService from "../../service/BookingService"
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
export function Paypal(props) {
    const paypal = useRef();
    const sum = props.information.totalAmount;
    const dataTicket = props.information;
    const vnd = props.information.vnd.vnd;
    console.log(dataTicket)
    const navigate = useNavigate()
    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: function (data, actions) {
                    return actions.order.create({
                        purchase_units: [{ "amount": { "currency_code": "USD", "value": (Number((sum / vnd).toFixed(2))) } }]
                    });
                },
                onApprove: async (data, actions) => {
                    await bookingService.handleSuccess(dataTicket);
                    navigate(`/user/information`)
                    swal({
                        title: "Thông báo",
                        text: "Bạn đã thanh toán thành công!",
                        type: "success",
                        icon: "success",
                        button: {
                            text: "OK",
                        },
                    });
                    //     });
                    // }
                },
                onError: async (err) => {
                    let result = await bookingService.handleFail(dataTicket)
                    console.log(err);
                    navigate("/user/information")
                    // swal({
                    //     title: "Thông báo",
                    //     text: "Thanh toán không thành công!",
                    //     type: "error",
                    //     icon: "error",
                    //     button: {
                    //         text: "OK",
                    //     },
                    // });
                },
                style: {
                    layout: 'horizontal',
                    color: 'gold',
                    shape: 'rect',
                    label: 'paypal',
                    height: 40,
                    'padding-top': '15px'
                },
                funding: {
                    disallowed: [window.paypal.FUNDING.CARD, window.paypal.FUNDING.CREDIT]
                }
            })
            .render(paypal.current);
    }, [sum, dataTicket]);
    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
}