import axios from "axios";
import "./form.css"
import { useEffect, useState } from "react";
import { itemsList } from "../database/items";

export function ItemList(){

    const [items, setItems] = useState(itemsList);
    const [isBuying, setIsBuying] = useState(false); // tells if the user is in the purchase windows or not
    const [email, setEmail] = useState("");
    const [itemInfo, setItemInfo] = useState([]); // [name, price]
    const [cardInfo, setCardInfo] = useState([]) // [number, expire date, cvc]

    useEffect(() => {
        setItemInfo([]);
        setEmail("");
    }, [])

    function cardInput(event){
        const newList = [...cardInfo];
        newList[0] = event.target.value
        setCardInfo(newList); 
    }

    function expInput(event){ 
        const newList = [...cardInfo];
        newList[1] = event.target.value
        setCardInfo(newList); 
    }

    function cvcInput(event){ 
        const newList = [...cardInfo];
        newList[2] = event.target.value
        setCardInfo(newList); 
    }

    function abort(){ 
        setIsBuying(false); 
    }

    function purchaseWindow(name, price){ 
        setItemInfo([name, price])
        setIsBuying(true); 
    }

    function standardPayment(){
        if(cardInfo === "") return alert("Please enter card info before buying");
        if(email === "") return alert("Please enter an email before buying");
        if (!/^\d{13,16}$/.test(cardInfo)) return alert("Please enter a valid card info");
        if (/\S+@\S+\.\S+/.test(email) === false) return alert("Please enter a valid email");

        /* axios for payment handling */

        /* axios for email sending to be insert in the then() func of the payment req */
        
    }

    function emailInput(event){ setEmail(event.target.value); }

    return (
        <div className="itemList">

            {isBuying === true ? 
            <form>
                <div class="form-group">
                    <h3><em>Checkout</em></h3>
                    <p><em>Product: </em> {itemInfo[0]}</p>  
                    <p><em>Price: </em> ${itemInfo[1]}</p>
                    
                    <label for="cardNumber">Credit Card Number:</label>
                    <input type="text" class="form-control" id="cardNumber" placeholder="Enter credit card number..." onChange={cardInput}/>
                    <div class="row mb-3">
                        <div class="col">
                        <label for="expiresDate" class="form-label">Expires Date</label>
                        <input type="text" class="form-control" id="expiresDate" placeholder="MM / YY" onChange={expInput}/>
                        </div>
                        <div class="col">
                        <label for="cvc" class="form-label">CVC</label>
                        <input type="text" class="form-control" id="cvc" placeholder="CVC" onChange={cvcInput}/>
                        </div>
                    </div>
                    <p>{cardInfo}</p>
                    <br></br>
                    <label for="email">Email:</label>
                    <div class="input-group">
                        <input type="email" class="form-control" id="email" placeholder="Enter email..." onChange={emailInput}/>
                        <div class="input-group-append">
                            <button type="button" id="formButton" class="btn btn-primary" onClick={() => standardPayment()}>Buy</button>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-danger" onClick={() => abort()}>Cancel</button>
            </form>

            :

            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Items</h5>
                    <ul class="list-group">
                    {items.map((item) => {
                        return  <li class="list-group-item">
                                {item.name} ${item.price} <button type="button" class="btn btn-primary" onClick={()=> purchaseWindow(item.name, item.price)}>BUY</button>
                                </li>
                    }) }
                    </ul>
                </div>
            </div>
            }
        </div>
    )
}