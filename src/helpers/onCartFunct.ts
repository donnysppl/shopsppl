import jwtDecode from "jwt-decode"
import toast from "react-hot-toast"

type decodeTokenType = {
    id: string,
}

export const onCartNow = async (id?: string) => {
    const custToken = window.localStorage.getItem('customer-admin')
    console.log(custToken)
    if (!custToken) {
        console.log('token not exixt')
        const cartData = localStorage.getItem('cart');

        if (cartData) {
            const cartDataArr = JSON.parse(cartData);
            for (let i = 0; i < cartDataArr.length; i++) {
                if (cartDataArr[i] === id) {
                    return alert('Product Already in cart')
                }
            }
            cartDataArr.push(id);
            localStorage.setItem('cart', JSON.stringify(cartDataArr));
        }
        else {
            const data = [id]
            localStorage.setItem('cart', JSON.stringify(data));
        }
    }
    else {
        console.log("token ", custToken)
        const decodeToken: decodeTokenType = jwtDecode(custToken)
        console.log(decodeToken)
        await fetch(`/api/product/cart?user=${decodeToken.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    toast.success(res.message)
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
}