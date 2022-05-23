import React, { Fragment, useContext, useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import Input from "../components/Input";
import Select from "../components/Select";
import Textarea from "../components/Textarea";
import FormContext from "../store/FormContext";

const ProductForm = () => {
  const ctx = useContext(FormContext);

  // Detail Form State
  const [name, setName] = useState(
    ctx.dataEmployee.length !== 0 ? ctx.dataEmployee[0].employee_name : ""
  );
  const [distributionCenter, setDistributionCenter] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [notes, setNotes] = useState("");

  // Products Form State
  const [product, setProduct] = useState([
    {
      id: 1,
      product_name: "",
      unit: "",
      quantity: "",
      price: "",
      total_price: "",
    },
  ]);
  const [total, setTotal] = useState(0);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useEffect(() => {
    let newTotal = 0;
    product.map((item) => (newTotal += item.total_price));

    setTotal(newTotal);
  }, [product]);

  const handleAddProduct = () =>
    setProduct((currentProduct) => [
      ...currentProduct,
      {
        id: product[product.length - 1].id + 1,
        product_name: "",
        unit: "",
        price: "",
        total_price: "",
      },
    ]);

  const handleConfirm = () => {};

  return (
    <div id="productForm">
      <h4 className="text-lg py-3 px-10 font-bold">Create Order</h4>
      <div className="w-form mx-auto p-3 flex flex-col gap-14 bg-white border border-gray-200 shadow-md">
        <div className="w-full flex flex-row">
          <h5 className="w-4/12 text-base font-bold">Detail</h5>
          <div className="w-8/12 flex flex-col gap-10">
            {/* Name Input */}
            <div className="w-10/12 flex flex-col gap-2">
              <div className="w-9/12 flex flex-col gap-2">
                <label className="text-base text-gray-700" htmlFor="name">
                  Name<span className="text-red-600">*</span>
                </label>
                <Select
                  name="name"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name !== "" ? name : "Name"}
                >
                  <option placeholder="No Data Available" value="Name" disabled>
                    Name
                  </option>
                  {ctx.dataEmployee.length !== 0 ? (
                    ctx.dataEmployee.map((item) => {
                      return (
                        <option key={item.id} value={item.employee_name}>
                          {item.employee_name}
                        </option>
                      );
                    })
                  ) : (
                    <option
                      placeholder="No Data Available"
                      value="No Data Available"
                      disabled
                    >
                      No Data Available
                    </option>
                  )}
                </Select>
              </div>
            </div>

            {/* Distribution Center Input */}
            <div className="w-5/12 flex flex-col gap-2">
              <label
                className="text-base text-gray-700"
                htmlFor="distribution_center"
              >
                Distribution Center<span className="text-red-600">*</span>
              </label>
              <Select
                name="distribution_center"
                id="distribution_center"
                onChange={(e) => setDistributionCenter(e.target.value)}
                value={distributionCenter}
              >
                {name !== "" && ctx.dataDC.length !== 0 ? (
                  <Fragment>
                    <option value="" disabled hidden>
                      Distribution Center
                    </option>
                    {ctx.dataDC.map((item) => {
                      return (
                        <option key={item.id} value={item.dc_name}>
                          {item.dc_name}
                        </option>
                      );
                    })}
                  </Fragment>
                ) : (
                  <option value="" disabled hidden>
                    No Data Available
                  </option>
                )}
              </Select>
            </div>

            {/* Payment Type & Expired Date Input */}
            <div
              className={`${
                distributionCenter !== ""
                  ? "w-10/12 flex flex-row gap-2"
                  : "hidden"
              }`}
            >
              <div className="w-6/12 flex flex-col gap-2">
                <label
                  className="text-base text-gray-700"
                  htmlFor="payment_type"
                >
                  Payment Type<span className="text-red-600">*</span>
                </label>
                <Select
                  name="payment_type"
                  id="payment_type"
                  onChange={(e) => setPaymentType(e.target.value)}
                  value={paymentType}
                >
                  {ctx.dataPaymentType.length !== 0 ? (
                    <Fragment>
                      <option value="" disabled hidden>
                        Payment Type
                      </option>
                      {ctx.dataPaymentType.map((item) => {
                        return (
                          <option key={item.id} value={item.payment_type}>
                            {item.payment_type}
                          </option>
                        );
                      })}
                    </Fragment>
                  ) : (
                    <option value="" disabled hidden>
                      No Data Available
                    </option>
                  )}
                </Select>
              </div>
              <div className="w-6/12 flex flex-col gap-2">
                <label
                  className="text-base text-gray-700"
                  htmlFor="expired_date"
                >
                  Expired Date<span className="text-red-600">*</span>
                </label>
                <Input
                  name="expired_date"
                  id="expired_date"
                  type="date"
                  placeholder="Expired Date"
                  onChange={(e) => setExpiredDate(e.target.value)}
                  value={expiredDate}
                />
              </div>
            </div>

            {/* Notes Input */}
            <div
              className={`${
                distributionCenter === ""
                  ? "hidden"
                  : "w-10/12 flex flex-col gap-2"
              }`}
            >
              <div className="w-9/12 flex flex-col gap-2">
                <label className="text-base text-gray-700" htmlFor="notes">
                  Notes
                </label>
                <Textarea
                  name="notes"
                  id="notes"
                  placeholder=""
                  rows="4"
                  onChange={(e) => setNotes(e.target.value)}
                  value={notes}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product Form */}
        <div
          className={`${
            distributionCenter === "" ? "hidden" : "w-full flex flex-row"
          }`}
        >
          <h5 className="w-4/12 text-base font-bold">Products</h5>
          <div className="w-8/12 flex flex-col gap-10">
            {product.map((item) => {
              return (
                <Fragment key={item.id}>
                  <div className="w-10/12 flex flex-row gap-2">
                    <div className="w-9/12 flex flex-col gap-2">
                      <label
                        className="text-base text-gray-700"
                        htmlFor="product"
                      >
                        Product<span className="text-red-600">*</span>
                      </label>
                      <Select
                        name="product"
                        id="product"
                        onChange={(e) =>
                          setProduct((currentProduct) =>
                            currentProduct.map((product) =>
                              product.id === item.id
                                ? { ...product, product_name: e.target.value }
                                : product
                            )
                          )
                        }
                        value={item.product_name}
                      >
                        {ctx.dataProducts.length !== 0 ? (
                          <Fragment>
                            <option value="" disabled hidden>
                              Product Name
                            </option>
                            {ctx.dataProducts.map((product) => {
                              return (
                                <option
                                  key={product.id}
                                  value={product.product_name}
                                >
                                  {product.product_name}
                                </option>
                              );
                            })}
                          </Fragment>
                        ) : (
                          <option value="" disabled hidden>
                            No Data Available
                          </option>
                        )}
                      </Select>
                    </div>
                    <div className="w-3/12 flex flex-col gap-2">
                      <label className="text-base text-gray-700" htmlFor="unit">
                        Unit<span className="text-red-600">*</span>
                      </label>
                      <Select
                        name="unit"
                        id="unit"
                        onChange={(e) => {
                          let priceUnit = 0;
                          priceUnit = ctx.dataProducts
                            .filter(
                              (product) =>
                                product.product_name === item.product_name
                            )[0]
                            .units.filter(
                              (unit) => unit.name === e.target.value
                            )[0].price;

                          setProduct((currentProduct) =>
                            currentProduct.map((product) =>
                              product.id === item.id
                                ? {
                                    ...product,
                                    unit: e.target.value,
                                    price: priceUnit,
                                  }
                                : product
                            )
                          );
                        }}
                        value={item.unit}
                      >
                        <option value="" disabled hidden>
                          Unit
                        </option>
                        {item.product_name === "" && (
                          <option value="" disabled>
                            No Data Available
                          </option>
                        )}
                        {ctx.dataProducts.length !== 0 &&
                        item.product_name !== "" ? (
                          <Fragment>
                            {ctx.dataProducts.length !== 0 &&
                              ctx.dataProducts
                                .filter(
                                  (product) =>
                                    product.product_name === item.product_name
                                )[0]
                                .units.map((product) => {
                                  return (
                                    <option
                                      key={product.id}
                                      value={product.name}
                                    >
                                      {product.name}
                                    </option>
                                  );
                                })}
                          </Fragment>
                        ) : (
                          <option value="" disabled hidden>
                            No Data Available
                          </option>
                        )}
                      </Select>
                    </div>
                  </div>

                  <div className="w-10/12 flex flex-row gap-2">
                    <div className="w-3/12 flex flex-col gap-2">
                      <label
                        className="text-base text-gray-700"
                        htmlFor="quantity"
                      >
                        Quantity<span className="text-red-600">*</span>
                      </label>
                      <Input
                        name="quantity"
                        id="quantity"
                        placeholder="Quantity"
                        type="number"
                        onChange={(e) =>
                          setProduct((currentProduct) =>
                            currentProduct.map((product) =>
                              product.id === item.id
                                ? {
                                    ...product,
                                    quantity: e.target.value,
                                    total_price: e.target.value * product.price,
                                  }
                                : product
                            )
                          )
                        }
                        value={item.quantity}
                      />
                    </div>
                    <div className="w-3/12 flex flex-col gap-2">
                      <label
                        className="text-base text-gray-700"
                        htmlFor="price"
                      >
                        Price<span className="text-red-600">*</span>
                      </label>
                      <Input
                        name="price"
                        id="price"
                        placeholder="0"
                        type="number"
                        onChange={(e) =>
                          setProduct((currentProduct) =>
                            currentProduct.map((product) =>
                              product.id === item.id
                                ? {
                                    ...product,
                                    price: e.target.value,
                                  }
                                : product
                            )
                          )
                        }
                        value={item.unit !== "" ? item.price : ""}
                      />
                    </div>
                    <div className="w-6/12 flex flex-col gap-2">
                      <label
                        className="text-base text-gray-700"
                        htmlFor="total_price"
                      >
                        Total Price<span className="text-red-600">*</span>
                      </label>
                      <Input
                        name="total_price"
                        id="total_price"
                        placeholder="0"
                        type="number"
                        onChange={(e) =>
                          setProduct((currentProduct) =>
                            currentProduct.map((product) =>
                              product.id === item.id
                                ? {
                                    ...product,
                                    total_price:
                                      product.price * product.quantity,
                                  }
                                : product
                            )
                          )()
                        }
                        value={item.quantity !== "" ? item.total_price : ""}
                        disabled={item.quantity !== "" ? true : false}
                      />
                    </div>
                  </div>
                  <div className="w-10/12 flex flex-row justify-end">
                    <div className="w-6/12 flex flex-col p-3">
                      <hr className="bg-gray-300 h-1 w-full" />
                      <div className="w-full flex flex-row justify-between py-3">
                        <h6 className="text-base font-bold text-gray-700">
                          Total Nett Price
                        </h6>
                        <span className="text-base font-bold text-gray-700">
                          {item.total_price !== ""
                            ? numberWithCommas(item.total_price)
                            : 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </Fragment>
              );
            })}
            <div className="w-10/12 flex flex-row pl-4 -mt-4">
              <button
                onClick={handleAddProduct}
                className="p-2 flex flex-row gap-4 items-center bg-yellow-500 text-white"
              >
                <span className="text-sm font-bold">NEW ITEM</span>
                <MdAdd className="text-base" />
              </button>
            </div>
            <div className="w-10/12 flex flex-row justify-end -mt-4">
              <div className="w-6/12 flex flex-col p-3">
                <div className="w-full flex flex-row justify-between py-3">
                  <h6 className="text-xl font-bold text-gray-700">Total</h6>
                  <span className="text-xl font-bold text-gray-700">
                    {numberWithCommas(total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end p-2">
          <button className="bg-white text-gray-700 text-sm font-bold py-2 px-5 rounded-sm">
            CANCEL
          </button>
          <button
            onClick={handleConfirm}
            disabled={total > 0 ? false : true}
            className={`text-sm font-bold py-2 px-5 rounded-sm ${
              total > 0
                ? "bg-green-600 text-white"
                : "bg-gray-300 text-gray-400"
            }`}
          >
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
