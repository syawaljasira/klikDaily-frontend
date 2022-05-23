import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {
  dummyDataDC,
  dummyDataPayment,
  dummyDataProducts,
} from "../utils/dummyData";

const baseURL = "http://dummy.restapiexample.com";

const FormContext = createContext({
  dataEmployee: [],
  dataDC: dummyDataDC,
  dataPaymentType: dummyDataPayment,
  dataProducts: dummyDataProducts,
  setDataEmployee: () => {},
  setDataDC: () => {},
  setDataPaymentType: () => {},
  setDataProducts: () => {},
});

export const FormContextProvider = (props) => {
  const [dataEmployee, setDataEmployee] = useState([]);
  const [dataDC, setDataDC] = useState(dummyDataDC);
  const [dataPaymentType, setDataPaymentType] = useState(dummyDataPayment);
  const [dataProducts, setDataProducts] = useState(dummyDataProducts);

  const fetchEmployeeList = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/api/v1/employees`);
      setDataEmployee(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (dataEmployee.length === 0) {
      fetchEmployeeList();
    }
  }, [dataEmployee]);

  return (
    <FormContext.Provider
      value={{
        dataEmployee,
        dataDC,
        dataPaymentType,
        dataProducts,
        setDataEmployee,
        setDataDC,
        setDataPaymentType,
        setDataProducts,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};

export default FormContext;
