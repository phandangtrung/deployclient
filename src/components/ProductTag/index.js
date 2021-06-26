import React, { useState } from "react";
import "./style.css";
import { Images } from "../../config/image";
import { Empty, notification } from "antd";
import { Link } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import {
  ShoppingCartOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";

function ProductTag(props) {
  console.log("props", props);
  const addtoCart = () => {
    // console.log(">>>product : ", props.name, " ", props._id, " ", props.price);
    // localStorage.clear();
    try {
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (cart === null) {
        cart = [];
        cart.push({
          key: props._id,
          product_id: props._id,
          name: props.name,
          size: "M",
          price_L: props.size_L,
          quantity: 1,
          price: props.price,
          storequantity: props.storequantity,
        });
      } else {
        let check_available = false;
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].product_id === props._id) {
            cart[i].quantity = cart[i].quantity + 1;
            check_available = true;
          }
        }
        if (check_available !== true) {
          cart.push({
            key: props._id,
            product_id: props._id,
            name: props.name,
            size: "M",
            quantity: 1,
            price_L: props.size_L,
            price: props.price,
            storequantity: props.storequantity,
          });
        }
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log("Cart>>", localStorage.cart);
      notification.open({
        message: `${props.name}`,
        description: `${props.name} đã được thêm vào giỏ hàng`,
        placement: "bottomRight",
        icon: <ShoppingCartOutlined style={{ color: "# rgb(164, 115, 67)" }} />,
      });
    } catch {
      notification.open({
        message: "Thêm vào giỏ không thành công",
        description: "Something went wrong",
        icon: <ExclamationCircleFilled style={{ color: "#red" }} />,
      });
    }
  };
  return (
    <div>
      <div
        style={{
          height: "415px",
          width: "266px",
          padding: "0px 20px 15px 0px",
        }}
      >
        <div
          style={{
            height: "61%",
            width: "100%",
          }}
        >
          <img
            style={{ height: "auto", width: "100%" }}
            alt="picture"
            src={`https://backendcfs.herokuapp.com/${props.img}`}
          />
        </div>
        <div
          style={{
            fontFamily: '"Bangers", cursive',
            backgroundColor: "#f2f0eb",
            paddingTop: "5px",
            height: "36%",
            width: "100%",
          }}
        >
          <Link
            // to={`singleproduct/${props._id}`}
            // idpro={props._id}
            // namepro={props.name}
            to={{
              pathname: `singleproduct/${props._id}`,
              state: {
                idpro: props._id,
                namepro: props.name,
                pricepro: props.price,
                despro: props.description,
                size_L: props.size_L,
                img: props.img,
                quantity: props.quantity,
              },
              addtoCart: () => addtoCart(),
            }}
          >
            <div
              style={{
                color: "#3b3838",
                fontSize: "25px",
                textShadow: "0.5px 1.5px #9ea19d",
                cursor: "pointer",
                transition: "1s",
              }}
              className="title-name-menu "
            >
              {props.name}
            </div>
          </Link>

          <div style={{ color: "rgb(164, 115, 67)", fontSize: "18px" }}>
            <CurrencyFormat
              value={props.price}
              displayType={"text"}
              thousandSeparator={true}
            />{" "}
            VND
          </div>
          <div
            style={{
              marginTop: "15px",
              width: "100%",
              height: "40px",
              marginBottom: "0px",
            }}
            className="menu-detail-button-form"
          >
            {props.quantity === 0 ? (
              <a style={{ fontSize: "20px" }}>Hết hàng</a>
            ) : (
              <button
                style={{
                  display: "inline-block",
                  width: "80%",
                  background:
                    "linear-gradient(to left, #f2f0eb 50%, rgb(164, 115, 67) 50%) right",
                  border: "2px solid rgb(164, 115, 67)",
                  color: "rgb(164, 115, 67)",
                  fontSize: "20px",
                  cursor: "pointer",
                  backgroundSize: "200%",
                  transition: "0.5s ease-out",
                }}
                onClick={addtoCart}
              >
                MUA NGAY
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductTag;
